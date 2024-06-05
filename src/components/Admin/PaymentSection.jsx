import React from 'react'
import AdminSidebar from './AdminSidebar'

const PaymentSection = () => {
  return (
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
      </div>
    </div>
  )
}

export default PaymentSection