import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import { CiSearch } from 'react-icons/ci'
import { FiMessageCircle } from 'react-icons/fi'
import { MdDeleteOutline, MdOutlineMoreHoriz } from 'react-icons/md'
import api from '../../../axiosInterceptors'
import RoleModal from '../../../components/Admin/modal/RoleModal'
import adminApi from '../utils/axiosInterceptors'

const RolesManagement = () => {
const [suppliers,setSuppliers]=useState([])
const [search,setSearch]=useState('')
const [isOpen,setIsOpen]=useState(false)
useEffect(()=>{
    const fetchData=async ()=>{
    try {
        const response= await adminApi.get('/admin/role',{params:{value:"admin"}})  
        console.log(response);
        setSuppliers(response?.data?.supplier)
    } catch (error) {
        console.log(error)
    }
}
fetchData()
},[])
const Search = suppliers.filter((item) => {
    if (search === "") {
      return item;
    } else if (item.first_name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    } else {
      return "";
    }
  });
  console.log(Search);
  return (
    
    <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]' >
      {isOpen&& <RoleModal isOpen={isOpen} handleClose={setIsOpen}/>}
<div className=' mt-2 min-h-screen' >
        <AdminSidebar />
      </div>
<div className="w-full h-screen">
  <div className="flex w-full h-28 justify-between items-center">
    <p className="ml-5 text-2xl font-bold">Manage Roles</p>
    <div className="flex mr-2">
      <input
        type="text"
        className="w-3/4 rounded-lg h-8 mr-2 p-2 bg-[#f1f1f4] "
        placeholder="Search Users"
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button className="w-28 h-8 rounded-md text-white bg-[#624DE3] flex justify-center items-center">
        <CiSearch />
      </button>
    </div>
  </div>

  <div className="m-2 p-1 bg-[#F7F6FE] rounded-md overflow-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="bg-gray-50">
          <th
            scope="col"
            className="px-6 py-3 text-left text-l font-medium"
          >
            Profile
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-l font-medium"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-l font-medium"
          >
            Phone Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-l font-medium"
          >
            Join Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-l font-medium"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {Search.map((i,index)=>(
        <tr key={i?._id||index} className={index % 2 === 1 ? "bg-[#F7F6FE]" : "bg-white"} onClick={()=>{setIsOpen(i)}}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <img className='w-10 h-10 rounded-full' src={i?.profile_pic ||"https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"} alt="" />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {i?.first_name}{i?.last_name}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {i?.phone_number||8965584576}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(i?.createdAt).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {i?.roles}
          </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default RolesManagement