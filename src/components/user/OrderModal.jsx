import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Loader from '../Loader'
import api from '../../axiosInterceptors'

const OrderModal = ({props,setModal,orderfetch}) => {
  const [deteteModal,setDeleteModal]=useState(false)
  const [loading,setLoading]=useState(false)
 
    const handleClose=()=>{
        setModal(false)
    }
    const handleClancle=()=>{
      setDeleteModal(true)
    }
    const handleOrderCancel=()=>{
      try {
        setLoading(true)
        const deleteOrdre=async()=>{
          const data={
            orderId:props?._id,
            status:"cancelled"
          }
          const response=await api.patch(`/orders/`,{data})
          setLoading(false)
          setModal(false)
          if(response.status===204){
            toast.error('This Order Not Cancel Is Shipped')
          }
          if(response.status===200){
            orderfetch()
            toast.error('Order canceled')
          }
        }
        deleteOrdre()
      } catch (error) {
        console.log(error);
        toast.error(error?.message)
      }
    }
    const handleDelete=async()=>{
      try {
        const response=await api.delete(`/orders/${props?._id}`)
        setLoading(false)
          setModal(false)
          if(response.status===200){
            orderfetch()
            toast.error('Order Delete')
          }
      } catch (error) {
        console.log(error);
        toast.error(error?.message)
      }
    }
  return (
    <>
    <Loader/>
    <div>
      <button  className="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
      </button>
        <div  tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75 h-full">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-700">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              </h3>
              <button onClick={()=>{handleClose()}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
           {deteteModal?(<>
            <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="relative w-auto max-w-lg mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border border-gray-300 rounded-lg shadow-lg outline-none">
              <div className="flex items-start justify-between p-5 border-b border-gray-300 rounded-t">
                <h2 className="text-lg font-semibold">Warning : Are you sure you want to  {props?.deliveryStatus=="cancelled"?<span>Delete Order?</span>:<span>Cancel Order?</span>} </h2>
              </div>
              <div className="flex items-center justify-end px-6 py-4 bg-gray-50">
                {props?.deliveryStatus=="cancelled"?<button
                onClick={()=>{handleDelete()}}
                  className="px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                >
                  Delete Order
                </button>:
                <button
                onClick={()=>{handleOrderCancel()}}
                  className="px-4 py-2 mr-4 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none"
                >
                  Order Cancel
                </button>
}
                <button onClick={()=>{handleClose()}}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
           </>):(
            <>
            <div>
            <div className='items-center m-auto w-full rounded-xl  p-2 '>
        <div className='flex flex-col justify-center items-center'>
            <div className='flex justify-center text-xl font-bold mt-2 mb-2'>
            <h1>Order Details</h1>
            </div>
            <div className='text-center'>
            <p className='text-lg mb-2 mt-1'>Order Number :#{props?._id.slice(0,6)}</p>
            <p className='text-lg mb-2 mt-1'>Order Create At :{new Date(props?.purchaseDate).toISOString().split('T')[0]}</p>
            <p className='text-lg mb-2 mt-1'k>Total :${props?.amount}</p>
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
            </div>
            <div className="flex items-center justify-end p-4 ">
              <button onClick={()=>{handleClose()}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                OK
              </button>
              {props?.deliveryStatus==="cancelled"?<button onClick={()=>{handleClancle()}}  type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Delete Order
              </button>:props?.deliveryStatus=="delivered"?(
              ""):(
              <button onClick={()=>{handleClancle()}}  type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-red-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700   dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancel Order
              </button>
           )}
            </div>
            </>
        )}
          </div>
          </div>
    </div>
    </>
  )
}

export default OrderModal