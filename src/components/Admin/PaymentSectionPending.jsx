import React, { useEffect, useState } from 'react'
import api from '../../axiosInterceptors'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



const PaymentSectionPending = () => {
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const [toatalpage,setTotalaPage]=useState(0)
  const [totalLength,setTotalLength]=useState(0)
  useEffect(()=>{
    
      const fetchData=async()=>{
        try {
        const response=await api.get('/payments/',{
            params: {
              value: "pending",
              page:page
            }})
        console.log(response);
        setData(response?.data?.payment)
        setTotalaPage(response?.data?.totalpage)
        setTotalLength(response?.data?.totalLength)
        
        
      } catch (error) {
      console.log(error);
    }
  }
  fetchData()
  
  },[])
  return (
    <div className='w-5/6'>
      <div className='w-full bg-white rounded-2xl'>
        <table className='w-full bg-white rounded-2xl'>
        <thead className="bg-gray-50 ">
            <tr className=''>
            <th className='text-center font-light'>Order ID</th>
            <th className='text-center font-light'>Order Date</th>
            <th className='text-center font-light'>Amount</th>
            <th className='text-center font-light'>Type</th>
            <th className='text-center font-light'>Status</th>
          </tr>
          </thead>
          <tbody className="">
    {data.map((i, index) => (
      <tr className="" key={i._id || index}>
        <td className="text-center">{i?._id.slice(-6)}</td>
        <td className=" text-center ">{i && new Date(i.createdAt).toLocaleDateString()}</td>
        <td className=" text-center">{i?.amount}</td>
        <td className=" text-center">{i?.type}</td>
        <td className={`py-3 text-center ${i.status==="paid"?"text-green-500":"text-red-500"}`}>{i?.status}</td>
      </tr>
    ))}
  </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to <span className="font-medium">{toatalpage}</span> of{' '}
            <span className="font-medium">{totalLength}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {[...Array(toatalpage)].map((_, index) => (
  <a
    key={index}
    href="#"
    aria-current="page"
    className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    {index + 1}
  </a>
))}

            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default PaymentSectionPending