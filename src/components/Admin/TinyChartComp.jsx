import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data1 } from './Data';
import { data2 } from './Data';
import { data3 } from './Data';
import { data4 } from './Data';
import api from '../../axiosInterceptors';
const TinyChartComp = () => {
  const [data,setData]=useState([])


  async function fetchData(){
  try {
    const response=await api.get('role/adminData')
    
    setData(response.data.data)
  } catch (error) {
    console.log(console.error());
  }
  }

  useEffect(()=>{
   fetchData()
  },[])
  console.log(data,"huuhuuhaahaa");
  return (
    <div className='flex flex-wrap m-2 justify-between '>

<div className='w-52 border rounded-lg mr-2   flex  '>
<div className="py-4  w-2/3">
  <div >
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">Orders</h6>
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] text-lime-700 text-2xl  font-bold tracking-wide">{data?.orders}</h6>
  <p className='text-green-600  font-bold'>4.4%</p>
</div>
</div>
<div className='w-1/4 '>
<ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data1}>
        <Line type="monotone" dataKey="pv" stroke="green" strokeWidth={2}  dot={false}/>
      </LineChart>
    </ResponsiveContainer>
</div>
</div>


<div className='w-52 border rounded-lg  mr-2  flex '>
<div className="py-4  w-2/3">
  <div >
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">User</h6>
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-red-700 text-2xl  font-bold tracking-wide">{data?.users}</h6>
  <p className='text-red-600  font-bold'>4%</p>
</div>
</div>
<div className='w-1/3 '>
<ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data3}>
        <Line type="monotone" dataKey="pv" stroke="red" strokeWidth={2}  dot={false}/>
      </LineChart>
    </ResponsiveContainer>
</div>
</div>


<div className='w-52 border rounded-lg mr-2 flex   '>
<div className="py-4  w-2/3">
  <div >
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">Supplier</h6>
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-orange-500 text-2xl   font-bold tracking-wide">{data?.suppliers}</h6>
  <p className='text-orange-400  font-bold'>2.4%</p>
</div>
</div>
<div className='w-1/3 '>
<ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data4}>
        <Line type="monotone" dataKey="pv" stroke="orange" strokeWidth={2}  dot={false}/>
      </LineChart>
    </ResponsiveContainer>
</div>
</div>



<div className='w-52 border rounded-lg mr-2  flex   '>
<div className="py-4  w-2/3">
  <div >
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">Products</h6>
  <h6 className="mb-2 z-1 bg-clip-text bg-[#333333]  text-blue-700 text-2xl    font-bold tracking-wide">{data?.products}</h6>
  <p className='text-blue-600  font-bold'>6.4%</p>
</div>
</div>
<div className='w-1/3 '>
<ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data4}>
        <Line type="monotone" dataKey="pv" stroke="blue" strokeWidth={2}  dot={false}/>
      </LineChart>
    </ResponsiveContainer>
</div>
</div>










</div>
  )
}

export default TinyChartComp