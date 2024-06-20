import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import api from '../../../axiosInterceptors';
import PdfFile2 from './PdfFile2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import toast from 'react-hot-toast';

const PaymentPre = ({userData}) => {
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
            const response=await api.get(`payment/bill/${userid}`)
             console.log(response,"respooo");
           
             setPaymentsMonth(response.data.data)
           
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
  




  
  return (
    <div className="w-5/6">
    <div className="w-full bg-white rounded-2xl">



   <div className="w-full bg-gradient-to-r flex flex-col justify-center items-center p-5 space-y-10 ">
        {paymentsMonth?.map((x) => (
                <div key={x.month} className="bg-white border rounded-lg shadow-2xl p-6 w-full max-w-4xl">
                    <h1 className="font-bold text-3xl my-4 text-center text-blue-600">{x.Month}</h1>
                    <hr className="mb-4" />
                    <div>
                        <div className="flex justify-between mb-6">
                            <h1 className="text-lg font-bold">Invoice</h1>
                            <div className="text-gray-700 text-right">
                                <div>{x?._id}</div>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr>
                                    <th className="text-left font-bold text-gray-700">Description</th>
                                    <th className="text-right font-bold text-gray-700">Amount</th>
                                </tr>
                            </thead>
                            <tbody>

                            {x.ProductIds?.map((x,i) => (
   
        <tr key={i}>
            <td className="text-left text-gray-700">{x.productname}</td>
            <td className="text-right text-gray-700">{x.price}</td>
        </tr>
    
))}

                            </tbody>
                            <tfoot>
                                <hr className="mb-4" />
                                <tr>
                                    <td className="text-left font-bold text-gray-700 text-2xl">Total</td>
                                    <td className="text-right font-bold text-gray-700 text-2xl">{x.totalAmount}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className='flex justify-between'>
                            <div>
                                <div className="text-gray-700 mb-2">Thank you for your business!</div>
                                <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
                            </div>
                            <div>
                                {/* <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                    
                                >
                                    Download
                                </button> */}

                     <PDFDownloadLink document={<PdfFile2  month={x.Month}  ProductIds={x.ProductIds} total={x.totalAmount} userData={userData} billno={x?._id} /> } fileName="invoice.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                      </PDFDownloadLink>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>



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