import React from 'react'

const OrderAllocation = () => {
  return (
    <div>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span class="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                   Address
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
{[...Array(10)].map((x)=>(
 <tbody>
 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
     <td className="p-4">
         <img src="https://rukminim2.flixcart.com/image/850/1000/l1l1rww0/watch/5/w/u/1-black-dial-digital-watch-for-boys-black-sports-watch-men-original-imagd4yzszbgba39.jpeg?q=20&crop=false" class="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch"/>
     </td>
     <td className="px-6 py-4 font-semibold text-gray-900 ">
         Apple Watch
     </td>

     <td className="px-6 py-4 font-semibold text-gray-900 ">
     <h6>6</h6>
     </td>
     <td className="px-6 py-4 font-semibold text-gray-900 ">
        <h6>address_line1:Kolakkattuchali</h6>
        <h6>address_line2:vengalithodyi</h6>
        <h6>pincode:673634</h6>
        <h6>phone_number:1234567998</h6>
       </td>
     <td className="px-6 py-4 font-semibold text-gray-900 ">
         $599
     </td>

     <td className="px-6 py-4">
<select
   className="block p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      >
       <option value="">Delay</option>
        <option value="">Delivered</option>
    </select>
 
     </td>
 </tr>
</tbody>
))}
       
    </table>
</div>

    </div>
  )
}

export default OrderAllocation