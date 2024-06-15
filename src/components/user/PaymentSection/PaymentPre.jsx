import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import api from '../../../axiosInterceptors';

const PaymentPre = () => {
    const orders = [
        { _id: '123456', createdAt: '2024-06-14T12:00:00Z', amount: 100, type: 'Type1', status: 'Pending' },
        { _id: '234567', createdAt: '2024-06-13T12:00:00Z', amount: 200, type: 'Type2', status: 'Completed' },
        // Add more orders as needed
      ];
      
      const totalLength = orders.length; // Replace this with the actual total number of results
      const totalPages = Math.ceil(totalLength / 5); // Replace 5 with the actual number of items per page
      const userid=localStorage.getItem('userId')
      const [paymentsMonth,setPaymentsMonth]=useState([])
  
  
  
      const orderfetch= async ()=>{
      try {
            const response=await api.get(`payments/paymentsById/${userid}`)
             console.log(response,"respooo");
             const data = response.data.userpay;
             setPaymentsMonth(data)
           
        }
        catch (error) {
        console.log(error);
        toast.error(error?.message)
    }
  }
  
  
      useEffect(()=>{
          orderfetch()
      },[])
  
      const handelDetalis=(id)=>{
          setProduct(orders.find((i)=>i._id===id))
          setmodal(true)
      }
  
      console.log(paymentsMonth,"ordureded");
  return (
    <div className="w-5/6">
    <div className="w-full bg-white rounded-2xl">
      <table className="w-full bg-white rounded-2xl">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-center font-light">Order ID</th>
            <th className="text-center font-light">Order Date</th>
            <th className="text-center font-light">Amount</th>
            <th className="text-center font-light">Type</th>
            <th className="text-center font-light">Status</th>
          </tr>
        </thead>
        <tbody>
          {paymentsMonth.map((x,i) => (
            <tr key={i}>
              <td className="text-center">{x.paymentDate.slice(0,10)}</td>
              <td className="text-center">{x.paymentDate.slice(0,10)}</td>
              <td className="text-center"> {x?.paymentMonth}</td>
              <td className="text-center">{x?.amount}</td>
              <td className="py-3 text-center">status</td>
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{totalPages}</span> of{' '}
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
              {[...Array(totalPages)].map((_, index) => (
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

export default PaymentPre