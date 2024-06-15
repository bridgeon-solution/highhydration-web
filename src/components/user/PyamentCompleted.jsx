import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../axiosInterceptors'
import {PDFDownloadLink } from '@react-pdf/renderer';
import Pdffile from './Pdffile';
import PaymentBulk from './PaymentSection/PaymentBulk'
import PaymentPre from './PaymentSection/PaymentPre';

const PyamentCompleted = ({name}) => {
  const[ispaymentModal,setIspaymentModal]=useState('bulkOrder')
    const userid=localStorage.getItem('userId')
   
    const [payments,setPayments]=useState([])




    const orderfetch= async ()=>{
    try {
          const response=await api.get(`payments/paymentsById/${userid}`)
     
           setPayments(response.data.data)
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
    <> 
<div className="w-full">
  <div className="mx-auto mt-8 max-w-screen-lg px-2">
    <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row mb-4">
      <p className="flex-1 text-lg font-bold text-gray-900">Latest Payments</p>
    </div>


    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
      <div className="hidden sm:flex sm:items-center sm:justify-between ">
        <div>
          <nav className="isolate inline-flex  -space-x-px rounded-md  w-80 justify-between" aria-label="Pagination">
       
            <a
              href="#"
             className={`relative inline-flex mb-4 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-full ${ispaymentModal==='bulkOrder'?"text-violet-500 border-violet-500 border-1":"text-black border-gray-500" }`}
             onClick={()=>setIspaymentModal('bulkOrder')}
            >
              Bulk Order
            </a>
            <a
           
           
              href="#"
                className={`relative inline-flex mb-4 items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 rounded-full ${ispaymentModal==="preOrder"?"text-violet-500 border-violet-500 border-1":"text-black border-gray-500"}`}
                onClick={()=>setIspaymentModal('preOrder')}
            >
              Pre Order
            </a>
          </nav>
        </div>
      </div>
    </div>

    <div className="h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-[500px]">
  {ispaymentModal==="bulkOrder" && <PaymentBulk/>}
  {ispaymentModal==="preOrder" && <PaymentPre/>}
</div>



















    {/* <div className="overflow-hidden rounded-xl border shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th scope="col" className="px-8 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((x) => (
              <tr key={x.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {x.purchaseDate.slice(0, 10)}
                  <div className="mt-1 lg:hidden">
                    <p className="font-normal text-gray-500">{x.purchaseDate.slice(0, 10)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {x.product.productname}
                  <div className="mt-1 lg:hidden">
                    <p className="font-normal text-gray-500">{x.product.productname}</p>
                  </div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  {x.amount}
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-sm font-normal text-gray-500 lg:table-cell cursor-pointer"> 
                {/* <PDFDownloadLink >
                <div className="inline-flex items-center rounded-full bg-red-600 py-2 px-3 text-xs text-white cursor-pointer hover:bg-blue-700">
                    Download
                  </div>
                 </PDFDownloadLink> */}
                       {/* <PDFDownloadLink document={<Pdffile productName={x.product.productname} amount={x.amount} adress={x.address} name={name} />} fileName="invoice.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                      </PDFDownloadLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {status&&<Pdffile  props={payments}/>}
      </div>
    </div> */} 


  </div>
</div>




    </>
  )
}

export default PyamentCompleted