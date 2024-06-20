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
import api from "../../axiosInterceptors";
import adminApi from "./utils/axiosInterceptors";
const baseUrl = import.meta.env.VITE_BASE_URL;
const manageUrl=import.meta.env.VITE_BASE_URL_SUPPLIERMANGEMENT;



const UserManagement = () => {
    const [active, setActive] = useState(1);
    const [users, setUsers] = useState([]);
    const [display, setDisply] = useState();
    const [search,setSearch]=useState('')
    const [loading,setLoading]=useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [personIdToDelete, setPersonIdToDelete] = useState(null);
    const totalPageCount = Math.ceil(users.length / 5);
  
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
    const endIndex = Math.min(startIndex + itemsPerPage, users.length);
    const currentPageData = users.slice(startIndex, endIndex);
  
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
        const response=await adminApi.patch('/admin/users',{id,status})
        console.log(response,"resputinnnnn");
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
        const userId=id
  
        const response=await adminApi.delete('/admin/users', {
          data: { userId: userId },
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
      const response=await adminApi.get('/admin/users')
      setLoading(false)
      if(response.status==200){
        setUsers(response.data.data);
        // console.log(response);
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



 function handleTogglle(id){
        setIsModalVisible(prevState => !prevState);
        setPersonIdToDelete(id)
        console.log(isModalVisible,"modaall");
    }

  
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
                  email
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
                    {person.email }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {" "}
               
                    <button className="btn bg-[#0A65CC] w-20 flex justify-center rounded-md">
                      <FiMessageCircle />
                    </button>
                  </td>
             
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  {person?.is_blocked ? (
    <button 
      onClick={() => blockUnblock(person._id, true)} 
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
    >
      <CgUnblock className="h-5 w-5 mr-2" />
    
    </button>
  ) : (
    <button 
      onClick={() => blockUnblock(person._id, false)} 
      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <MdBlock className="h-5 w-5 mr-2" />
    
    </button>
  )}
</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    
<button 
  data-modal-target="popup-modal" 
  data-modal-toggle="popup-modal" 
  className="btn rounded-fullw-20 flex justify-center text-red-500 hover:text-red-900 " 
  type="button"
  onClick={()=>handleTogglle(person._id)}
>
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
      
    { 
  isModalVisible && (
   <div 
  id="popup-modal" 
  tabIndex="-1" 
  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
>
  <div className="p-4 w-full max-w-md">
    <div className="bg-white rounded-lg shadow-lg">
      <div className="p-4 md:p-5 text-center">
        <svg 
          className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 20 20"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Are you sure you want to delete this product?
        </h3>
        <div className="flex justify-center space-x-4">
          <button 
            type="button" 
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center"
            onClick={async () => {
              await deleteSupplier(personIdToDelete);
              setIsModalVisible(false); 
            }}
          >
           Delete
          </button>
          <button 
            type="button" 
            className="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center"
            onClick={handleTogglle}
          >
             cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</div>




  )
 }

            
 </div>
    
  )
}

export default UserManagement