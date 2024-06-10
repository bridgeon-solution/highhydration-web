import React, { useEffect, useState } from 'react';
import client from "../../assets/Supplier/Client.jpg"
import { CgUnblock } from 'react-icons/cg';
import SideBar from './Sidebar';
import api from '../../axiosInterceptors';

const SupTable = () => {
  const[data,setdata]=useState(null)
  const[pagination,setPagination]=useState(null)
  const [page,setpage]=useState(1)
  const userId=localStorage.getItem('userid')
console.log(userId,"usurrrr");
  const[togle,setToggle]=useState(false)
  function toggleDropdown(){
    setToggle((prevToggle) => !prevToggle);
  }
  console.log(togle);

useEffect(()=>{
  try {
    async function fetchData(){
      const response=await api.get(`/suppliers/supplierPincode/`,{
        params: {
          id:userId,
          page:page
        }})
      setdata(response.data.data)
      setPagination(response.data.pagination)
      console.log(response,"resputinn");
      console.log(data,"datum");
      console.log(pagination,"pagination");
    }
    fetchData()
  } catch (error) {
    console.log(error,"error");
  }
},[page])

async function  handleButton(id){
console.log(id,"huzzzzz");
try {
  const response=await api.patch('suppliers/order',{_id:id})
  console.log(response,"huhuhu");
} catch (error) {
  console.log(error);
}

}




function handleIncrement(){
  
  if(pagination?.totalPages>page){
    setpage(prev=>prev+1)
  }
}

  return (
    <div className='flex w-full h-screen overflow-hidden '> 
    <div className='mt-2 min-h-screen'>
       <SideBar/>
    </div>


      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">

      

          <label htmlFor="table-search" className="sr-only text-black ">Search</label>
          <div className="relative">
         <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users......."/>
          </div>

        </div>
        

   <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          No
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          UserName
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone number
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Location
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Quantity
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Delivered
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.map((x, i) => (
        <tr key={i} className="hover:bg-gray-100">
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{x.uniqueNumber}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex items-center">
              <img className="w-10 h-10 rounded-full" src={x.userId.image} alt="User image" />
              <div className="ml-4">{x.userId.first_name + ' ' + x.userId.last_name}</div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <a href="#" className="text-blue-600 hover:underline">{x.address.phone_number}</a>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div>{x.address.address_line1}</div>
            <div>{x.address.address_line2}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{x.totalItems}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 "
            onClick={()=>handleButton(x._id)}>
              {x.deliveryStatus}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




<div className="flex flex-col  items-center mb-2">
  {/* Help text */}
  <span className="text-sm  dark:text-gray-400">
      Showing <span className="font-semibold text-blue-600 ">{pagination?.currentPage}</span> to <span className="font-semibold  text-blue-600 ">{pagination?.totalPages}</span> of <span className="font-semibold  text-blue-600  ">{pagination?.totalOrdersCount}</span> Entries
  </span>
  <div className="inline-flex mt-2 xs:mt-0">
    {/* Buttons */}
    <button 
    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#3751FE] rounded-s hover:bg-blue-900 "
    onClick={() => setpage(prev => Math.max(prev - 1, 1))}>
        <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        Prev
    </button>
    <button 
    className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-[#3751FE] border-0 border-s border-gray-700 rounded-e hover:bg-blue-900"
    onClick={handleIncrement}>
   
        Next
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
      
    </button>
  </div>
</div>








</div>









    </div>
  );
}

export default SupTable;
