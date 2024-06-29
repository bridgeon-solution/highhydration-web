import React from 'react'

function OrderDetails({props}) {
    console.log(props,'orderDetails');
  return (
    <>
    <div className='items-center m-auto w-full rounded-xl  p-2 '>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center text-xl font-bold mt-2 mb-2'>
            <h1>Order Details</h1>
            </div>
            <div className='text-center'>
            <p className='text-lg mb-2 mt-1'>Order Number :#{props?._id}</p>
            <p className='text-lg mb-2 mt-1'>Order Create At :{props?.purchaseDate}</p>
            <p className='text-lg mb-2 mt-1'k>Total :₹{props?.amount}</p>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <div className='flex justify-center text-xl font-bold mt-2 mb-2'>
            <h1>Shipping Address</h1>
            </div>
            <div>
            <p className='text-lg mb-2 mt-1'>{props?.address?.address_line1}</p>
            <p className='text-lg mb-2 mt-1'>{props?.address?.address_line2}</p>
            <p className='text-lg mb-2 mt-1'>{props?.address?.pincode}</p>
            <p className='text-blue-400 mb-2 mt-1'>{props?.address?.phone_number}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default OrderDetails