import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { CiSearch } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { MdBlock, MdDeleteOutline } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Loader from "../../components/Loader";
const baseUrl = import.meta.env.VITE_BASE_URL;
const manageUrl=import.meta.env.VITE_BASE_URL_SUPPLIERMANGEMENT;


const SupplierMangement = () => {
  const [active, setActive] = useState(1);
  const [suppliers, setSuppliers] = useState([]);
  const [display, setDisply] = useState();
  const [search,setSearch]=useState('')
  const [loading,setLoading]=useState(false)
  const totalPageCount = Math.ceil(suppliers.length / 5);

  const handlePageChange = (action) => {
    setLoading(true)
    let newActive = active;
    if (action === "prev") {
      newActive = Math.max(active - 1, 1);
    } else if (action === "next") {
      newActive = Math.min(active + 1, totalPageCount);
    } else {
      newActive = action;
    }

    setActive(newActive);
    setLoading(false)
  };

  const itemsPerPage = 6;
  const startIndex = (active - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, suppliers.length);
  const currentPageData = suppliers.slice(startIndex, endIndex);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "red" : "black",
    onClick: () => setActive(index),
    className: "rounded-full",
    style: {
      fontSize: "1rem",
      textAlign: "center",
    },
  });
  const blockUnblock=async(id,status)=>{
    try {
      setLoading(true)
      const response=await axios.patch(`${baseUrl}${manageUrl}`,{id,status})
      console.log(response);
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

      const response=await axios.delete(`${baseUrl}${manageUrl}`, {
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
    const response=await axios.get(`${baseUrl}${manageUrl}`)
    setLoading(false)
    if(response.status==200){
      setSuppliers(response.data.data);
    }else{
      console.log('responess Not Found');
    }
  } catch (error) {
    console.log(error)
  }
}
  useEffect(()=>{
allusers()
  },[])

  const Search = currentPageData.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.first_name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return "";
    }
  });


  return (
    <div className="flex h-screen ">
      {loading&&<Loader/>}
      <div>
        <AdminSidebar />
      </div>
      <div className=" w-full h-screen ">
        <div className="flex w-full h-28 justify-between items-center">
          <p className="ml-5 text-2xl font-bold">Manage Suppliers</p>
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
                  Message
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
              {Search.map((person, index) => (
                <tr
                  key={person.email}
                  className={index % 2 === 1 ? "bg-[#F7F6FE]" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {person.first_name} {person.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.phoneNumber || "00000000"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {person.createdAt || "Nodate"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
                    {/* Assuming there's a message field in the person object */}
                    <button className="btn bg-[#0A65CC] w-20 flex justify-center rounded-md">
                      <FiMessageCircle />
                    </button>
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
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={() => handlePageChange("prev")}
              disabled={active === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(totalPageCount)].map((_, index) => (
                <IconButton
                  style={{ textAlign: "center" }}
                  key={index}
                  {...getItemProps(index + 1)}
                >
                  {index + 1}
                </IconButton>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 rounded-full"
              onClick={() => handlePageChange("next")}
              disabled={active === 5}
            >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMangement;
  