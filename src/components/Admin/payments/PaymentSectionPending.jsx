import React, { useEffect, useState } from 'react'
import api from '../../../axiosInterceptors'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import adminApi from '../../../pages/Admin/utils/axiosInterceptors'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const PaymentSectionPending = ({filter,setLoading}) => {
  const [data,setData]=useState([])
  const [page,setPage]=useState(1)
  const [toatalpage,setTotalaPage]=useState(0)
  const [totalLength,setTotalLength]=useState(0)
  useEffect(()=>{
    
      const fetchData=async()=>{
        setLoading(true)
        try {
        const response=await adminApi.get('/payments/',{
            params: {
              value: "pending",
              page:page,
              filter
            }})
        console.log(response);
        setData(response?.data?.payment)
        setTotalaPage(response?.data?.totalpage)
        setLoading(false)
        
      } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  fetchData()
  
  },[page,filter])
  const handleChange=(event,value)=>{
    setPage(value)
  }

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
        <div className='mt-2 mb-5 p-2  border-t-2'>
        {toatalpage>1&&
        <Stack className='flex justify-center items-center mb-3'>
        <Pagination count={toatalpage} onChange={handleChange} variant="outlined" color="primary" />
        </Stack>
        } 
        </div>
      </div>
    </div>
  )
}

export default PaymentSectionPending