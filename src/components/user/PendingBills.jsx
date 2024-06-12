import React, { useEffect, useState } from 'react'
import api from '../../axiosInterceptors'

const PendingBills = () => {
    const userId = localStorage.getItem('userId');
    const [orders, setOrders] = useState([]);
    const [totals, setTotals] = useState([]);
    useEffect(()=>{
try {
    async function fetchApi(){
        const response = await api.get(`orders/totalOrder/${userId}`);
        console.log(response, "response");
       const { datas } = response.data;
        
        setOrders(datas[0]);
        setTotals(datas[1]);

        console.log(datas[0], "orders");
        console.log(datas[1], "totals");
    }
    fetchApi()
} catch (error) {
    
}
    },[])
  return (


<div className="w-full bg-gradient-to-r  flex flex-col justify-center items-center p-5 space-y-10">

{Object.entries(totals)?.map(([month, total]) => (
  <div key={month} className="bg-white border rounded-lg shadow-2xl p-6 w-full max-w-4xl">
    <h1 className="font-bold text-3xl my-4 text-center text-blue-600">{month}</h1>
    <hr className="mb-4"/>
    <div>  
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Invoice</h1>
        <div className="text-gray-700 text-right">
          <div>Invoice #: INV12345</div>
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
          {orders?.map((x) => (
            <tr key={x.product.productname}>
              <td className="text-left text-gray-700">{x.product.productname}</td>
              <td className="text-right text-gray-700">{x.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        <hr className="mb-4"/>
          <tr>
            <td className="text-left font-bold text-gray-700 text-2xl">Total</td>
            <td className="text-right font-bold text-gray-700 text-2xl">{total}</td>
          </tr>
        </tfoot>
      </table>
      <div  className='flex justify-between'> 
        <div>
        <div className="text-gray-700 mb-2">Thank you for your business!</div>
        <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div>
        </div>
        <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Pay
         </button>
        </div>
      </div>
    
    </div>
  </div>
))}


    
     


    </div>
  )
}

export default PendingBills