import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import { CiSearch } from "react-icons/ci";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Loader from "../../../components/Loader";
import SupplierMangementModal from "../../../components/Admin/modal/SupplierManagementModal";
import adminApi from "./../utils/axiosInterceptors";
const baseUrl = import.meta.env.VITE_BASE_URL;
const manageUrl=import.meta.env.VITE_BASE_URL_SUPPLIERMANGEMENT;
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const SupplierMangement = () => {
  const [active, setActive] = useState(1);
  const [suppliers, setSuppliers] = useState([]);
  const [display, setDisply] = useState();
  const [search,setSearch]=useState('')
  const [loading,setLoading]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const [page,setPage]=useState(1)
  const [totalPage,setTotalPage]=useState(0)

  const handleChange=(event,value)=>{
    setPage(value)
  }
  const blockUnblock=async(id,status)=>{
    try {
      setLoading(true)
      const response=await adminApi.patch(`${manageUrl}`,{id,status})
      setLoading(false)
      if(response.status==200){
        allusers()
      }
    } catch (error) {
      console.log(error);
    }
  }
  const deleteSupplier=async(id)=>{
    try {
      setLoading(true)
      const supplierId=id

      const response=await adminApi.delete(`${manageUrl}`, {
        data: { supplierId: supplierId },
      })
      setLoading(false)
      if(response.status==200){
        allusers()
      }
    } catch (error) {
      console.log(error);
    }
  }
const allusers=async()=>{
  try {
    setLoading(true)
    const response=await adminApi.get(`${manageUrl}`,{params:{page,search}})
    setLoading(false)
    console.log(response);
    if(response.status==200){
      setSuppliers(response.data.data.data);
      setTotalPage(response?.data?.data.totalpage)
    }else{
      console.log('responess Not Found');
    }
  } catch (error) {
    console.log(error)
  }
}
  useEffect(()=>{
allusers()
  },[page,search])

  // const Search = currentPageData.filter((item) => {
  //   if (search === "") {
  //     return item;
  //   } else if (item.first_name.toLowerCase().includes(search.toLowerCase())) {
  //     return item;
  //   } else {
  //     return "";
  //   }
  // });

  console.log(totalPage);

  return (
    <div className="flex h-screen overflow-hidden">
      { isOpen && <SupplierMangementModal handleClose={setIsOpen} isOpen={isOpen} fethcData={allusers}/>
      }
      {loading&&<Loader/>}
      <div>
        <AdminSidebar />
      </div>
      <div className=" w-full h-screen bg-[#e5e1e6] overflow-y-scroll ">
        <div className="flex w-full h-28 justify-between items-center">
          <p className="ml-5 text-2xl  text-     font-bold">Manage Suppliers</p>
          <div className="flex mr-2">
            <input
              type="text"
              className="w-3/4 rounded-lg h-8 mr-2 p-2 bg-[#f1f1f4] "
              placeholder={`Search Users`}
              onChange={(e)=>setSearch(e.target.value)}
            />
            <button className="w-28 h-8 rounded-md text-white bg-[#624DE3] flex justify-center items-center">
              <CiSearch />
            </button>
          </div>
        </div>

        <div className=" m-2 p-1 bg-[#F7F6FE] rounded-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium "
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium "
                >
                  Join Date
                </th>
          
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium "
                >
                  Action
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-l font-medium "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((person, index) => (
                <tr 
                
                  key={person.email}
                  className={index % 2 === 1 ? "bg-[#F7F6FE]" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" onClick={()=>{setIsOpen(person)}}>
                    {person.first_name} {person.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.phoneNumber || "00000000"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.createdAt || "Nodate"}
                  </td>
              
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person?.is_blocked==true? (
                      <button onClick={()=>blockUnblock(person._id,true)} className="btn bg-orange-400 w-20 flex justify-center rounded-md">
                        <CgUnblock />
                      </button>
                    ) : (
                      <button onClick={()=>blockUnblock(person._id,false)} className="btn bg-[#F20C0C] w-20 flex justify-center rounded-md">
                        <MdBlock />
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={()=>deleteSupplier(person._id)} className="btn rounded-fullw-20 flex justify-center text-red-500">
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end gap-4">
          <div className='mt-2 mb-5 p-2  border-t-2'>
        {totalPage>1&&
        <Stack className='flex justify-center items-center mb-3'>
        <Pagination count={totalPage} onChange={handleChange} variant="outlined" color="primary" />
        </Stack>
        } 
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMangement;
  