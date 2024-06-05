import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import { IoIosSave, IoMdAdd } from 'react-icons/io';
import ad from '../../assets/Supplier/sup1.png';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
const baseUrl = import.meta.env.VITE_BASE_URL;


const AllProducts = () => {
    const[data,setData]=useState([])
    const navigate= useNavigate()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
      const  fetchDatas=async()=>{
        try {
          setLoading(true)
            const response= await axios.get(`${baseUrl}/admin/products`)
            setData(response.data.data)
            setLoading(false)
            console.log(response,'hiiii')
        } catch (error) {
            console.log(error)
        }
        }
        fetchDatas()
    },[])
    console.log(data,"datumm");
  return (
    <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]'>
      {loading&&<Loader/>}
    <div className='mt-2 min-h-screen'>
      <AdminSidebar />
    </div>
  
    <div className='mt-1 w-full overflow-scroll overscroll-none'>

      <div className='w-full h-1/4 flex border rounded-lg' style={{ backgroundColor: '#303c6c' }}>
        <div className='w-3/4'>
          <p className='text-white s:flex s:justify-center s:text-2xl s:items-center md:text-6xl font-bold md:pt-12 md:pl-'>Welcome To High Hydration</p>
        </div>
        <div className='s:p-1 md:p-5'>
          <img className='s:h-14 s:w-14 md:h-36 md:w-36 xl:h-36 xl:w-40' src={ad}  alt="Advertisement" />
        </div>
      </div>
      <div className='mt-2 w-full flex justify-between'>
              <div className='flex w-1/6 ml-2 items-center'>
                <button type='button' className='flex' onClick={()=>navigate('/addproduct')}>
                  <IoMdAdd className='w-6 h-6' />
                  <p className='font-semibold ml-2 text-sky-600' >Add new Product</p>
                </button>
              </div>
              <button type='submit'>
                <div className='flex bg-[#FA976C] py-2 px-5 mr-3 border rounded-full items-center'>
                  <IoIosSave className='w-6 h-6 text-white' />
                  <p className='text-white font-semibold ml-2'>Edit</p>
                </div>
              </button>
            </div>


{/* table */}
<div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
  {/* <div class="flex flex-wrap items-center justify-between pb-4 space-y-4 md:space-y-0 bg-white dark:bg-gray-900 sm:rounded-t-lg">
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative">
      <input type="text" id="table-search-users" class="block w-80 p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users......."/>
    </div>
  </div> */}
  
  <div class="overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
      <thead class="text-xs uppercase bg-[#303c6c]">
        <tr>
          <th scope="col" className="p-4"></th>
          <th scope="col" className="px-6 py-3">Product Name</th>
          <th scope="col" className="px-6 py-3">Product Description</th>
          <th scope="col" className="px-6 py-3">Category</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.map((x) => (
          <tr className="bg-white border-b  hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4"></td>
            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
              <img className="w-16 h-16 " src={x.image} alt="Jese image"/>
              <div className="ps-3">
               
                <div className="font-normal text-gray-500">{x.productname}</div>
              </div>  
            </td>
            <td className="px-6 py-4">
              {x.productDescription}
            </td>
            <td className="px-6 py-4">
              <p>{x.category}</p>
            </td>
            <td className="px-6 py-4">
              <p>{x.price}</p>
            </td>
            <td className="px-6 py-4">
              <p>{x.stock}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


{/* table */}



  </div>
  </div>

  )
}

export default AllProducts