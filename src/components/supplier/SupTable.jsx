import React, { useState } from 'react';
import client from "../../assets/Supplier/Client.jpg"
const SupTable = () => {
  const[togle,setToggle]=useState(false)
  function toggleDropdown(){
    setToggle((prevToggle) => !prevToggle);
  }
  console.log(togle);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">

      

          <label htmlFor="table-search" className="sr-only text-black ">Search</label>
          <div className="relative">
         <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users......."/>
          </div>

        </div>
        

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  {/* <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/> */}
                  <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
            Phone number
              </th>
              <th scope="col" className="px-6 py-3">
           
               Location
           </th>
              <th scope="col" className="px-6 py-3">
           
              Quantity
              </th>
              <th scope="col" className="px-6 py-3">
              
                Delivered
              </th>
            </tr>
          </thead>

          {[...Array(10)].map((x)=>(
            <>
            <tbody>
 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="w-4 p-4">


                {/* <div className="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div> */}
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
              <img className="w-10 h-10 rounded-full" src={client} alt="Jese image"/>
                <div className="ps-3">
                  <div className="text-base font-semibold">Neil Sims</div>

                  <div className="font-normal text-gray-500">John Samuel</div>
                </div>  
              </th>


              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">9526077147</a>
              </td>
              <td className="px-6 py-4">
                <td className="px-6 py-4">
               <p>Kakkanchery</p>
               kinfra
                </td>
                </td>


              <td className="px-6 py-4">
                <td className="px-6 py-4">
                12
                </td>
                </td>
             
                <td className="px-6 py-4">
                <td className="px-6 py-4">
                <div className="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                  <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
                </td>
                </td>
             
            </tr>
           
          </tbody>
            
            </>
          ))}
          

          
        </table>
      </div>
    </div>
  );
}

export default SupTable;
