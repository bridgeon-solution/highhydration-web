import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import {PDFDownloadLink } from '@react-pdf/renderer';

import api from '../../../axiosInterceptors';
import Pdffile from './Pdffile';

const PaymentCompleted2  = ({name}) => {

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
    <> 
<div className="w-full">
  <div className="mx-auto mt-8 max-w-screen-lg px-2">
    <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row mb-4">
      <p className="flex-1 text-lg font-bold text-gray-900">Latest Payments</p>
    </div>

    <div className="overflow-hidden rounded-xl border shadow">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
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
            {paymentsMonth?.map((x,i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {x.paymentDate.slice(0,10)}
                  <div className="mt-1 lg:hidden">
                    <p className="font-normal text-gray-500">{x?.paymentDate.slice(0,10)}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {x?.paymentMonth}
                  <div className="mt-1 lg:hidden">
                    <p className="font-normal text-gray-500">{x?.paymentMonth}</p>
                  </div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-right text-sm text-gray-600">
                  {x?.amount}
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-sm font-normal text-gray-500 lg:table-cell cursor-pointer"> 
                {/* <PDFDownloadLink >
                <div className="inline-flex items-center rounded-full bg-red-600 py-2 px-3 text-xs text-white cursor-pointer hover:bg-blue-700">
                    Download
                  </div>
                 </PDFDownloadLink> */}
                       <PDFDownloadLink document={<Pdffile productName={x.product?.productname} amount={x?.amount} adress={x?.address} name={name} />} fileName="invoice.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                      </PDFDownloadLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {status &&<Pdffile  props={payments}/>}
      </div>
    </div>
  </div>
</div>




    </>
  )
}

export default PaymentCompleted2


