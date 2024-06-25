import React, { useEffect, useState } from 'react'
import AdminSidebar from '../sidebar/AdminSidebar'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PaymentSectionAll from './PaymentSectionAll';
import PaymentSectionPending from './PaymentSectionPending';
import PaymentSectionPaid from './PaymentSectionPaid';

import { FaFilter } from 'react-icons/fa';
import FilterModal from '../modal/FilterModal';
import Loader from '../../Loader';
import adminApi from '../../../pages/Admin/utils/axiosInterceptors';

const PaymentSection = () => {
const [value,setValue]=useState("all")
const [total,setTotal]=useState(0)
const [success,setSuccess]=useState(0)
const [pendingAmount,setPendingAmount]=useState(0)
const [isOpen, setIsOpen] = useState(false);
const [filter,setFilter]=useState()
const [loading,setLoading]=useState(false)
const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit' });

  useEffect(()=>{
    const fetchData=async (req,res)=>{
      try {
        const response=await adminApi.get('/payments/details/')
        console.log(response);
        setTotal(response.data.totalAmount[0].totalAmount)
        setSuccess(response.data.totalSuccessAmount[0].totalAmount)
        setPendingAmount(response.data.totalPendingAmount[0].totalAmount)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  console.log(total);
  console.log(success);
  console.log(pendingAmount);
  return (
    <>
    {loading&& <Loader />}
    <div className='flex w-full h-scree bg-[#F8F8F8]'>
      <div className=' mt-2 min-h-screen' >
        <AdminSidebar />
      </div>
      <div className='w-full'>


  


      <div className='max-w-7xl ml-2 flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row w-full gap-6 mt-3 p-2 m-2'>
  <div className='bg-blue-100 w-full lg:w-1/3 h-32 rounded-lg text-start pl-3'>
    <p className='text-gray-500 font-light text-lg'>Total Amount</p>
    <p className='text-2xl text-blue-500 font-semibold'>${total}</p>
    <span className='text-end mx-1 font-light text-gray-400'>{formattedDate}</span>
  </div>
  <div className='bg-green-100 w-full lg:w-1/3 h-32 rounded-lg pl-3'>
    <p className='text-gray-500 font-light text-lg'>Success Amount</p>
    <p className='text-green-500 font-semibold text-2xl'>${success}</p>
    <span className='text-end mx-1 font-light text-gray-400'>{formattedDate}</span>
  </div>
  <div className='bg-red-100 w-full lg:w-1/3 h-32 rounded-lg pl-3'>
    <p className='text-gray-500 font-light text-lg'>Pending Amount</p>
    <p className='text-red-500 font-semibold text-2xl'>${pendingAmount}</p>
    <span className='text-end mx-1 font-light text-gray-400'>{formattedDate}</span>
  </div>
</div>













      <div className='mx-4 mt-3'>
        <h1 className='font-semibold text-xl text-gray-500'>Payment History</h1>
      </div>
      
      <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 w-10/12 flex justify-between ">
      
      <div className=" sm:flex sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex  -space-x-px rounded-md  w-80 justify-between" aria-label="Pagination">
            {/* Pagination buttons */}
            <a
            onClick={()=>{setValue("all")}}
              href="#"
              className={`relative inline-flex mb-4 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-full ${value==="all"?"text-violet-500 border-violet-500 border-1":"text-black border-gray-500"}`}
            >
              All
            </a>
            <a
              href="#"
              onClick={()=>{setValue("paid")}}
              className={`relative inline-flex mb-4 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-full ${value==="paid"?"text-violet-500 border-violet-500 border-1":"text-black border-gray-500"}`}
            >
              Paid
            </a>
            <a
            onClick={()=>{setValue("pending")}}
              href="#"
                className={`relative inline-flex mb-4 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-full ${value==="pending"?"text-violet-500 border-violet-500 border-1":"text-black border-gray-500"}`}
            >
              Pending
            </a>
          </nav>
        </div>
      </div>
      <div>
        {!isOpen && <FaFilter onClick={toggleDropdown} className='s:mt-2' />}
      
      {isOpen&&
    <FilterModal  isOpen={isOpen} setIsOpen={setIsOpen} setFilter={setFilter}/>
    }
      </div>
      
    </div>
    <div className=''>   
      {value==="all"&&<PaymentSectionAll filter={filter} setLoading={setLoading}/>}
      {value==="paid"&&<PaymentSectionPaid filter={filter} setLoading={setLoading} />}
      {value==="pending"&&<PaymentSectionPending filter={filter} setLoading={setLoading} />}
    </div>
    </div>
      </div>
    </>
  )
}

export default PaymentSection