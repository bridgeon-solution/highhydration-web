import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PaymentSectionAll from './PaymentSectionAll';
import PaymentSectionPending from './PaymentSectionPending';
import PaymentSectionPaid from './PaymentSectionPaid';


const PaymentSection = () => {
const [value,setValue]=useState("all")
  return (
    <>
    <div className='flex w-full h-scree bg-[#F8F8F8]'>
      <div className=' mt-2 min-h-screen' >
        <AdminSidebar />
      </div>
      <div className='w-full'>
        <div className='flex w-full gap-10 mt-3 p-2'>
          <div className='bg-blue-100 w-80 h-32 rounded-lg'></div>
          <div className='bg-green-100 w-80 h-32 rounded-lg'></div>
          <div className='bg-red-100 w-80 h-32 rounded-lg'></div>
        </div>
      <div className='mx-4 mt-3'>
        <h1 className='font-semibold text-xl text-gray-500'>Payment History</h1>
      </div>
      
      <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="hidden sm:flex sm:items-center sm:justify-between ">
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
    </div>
    <div className=''>
      {value==="all"&&<PaymentSectionAll/>}
      {value==="paid"&&<PaymentSectionPaid/>}
      {value==="pending"&&<PaymentSectionPending/>}
    </div>
    </div>
      </div>
    </>
  )
}

export default PaymentSection