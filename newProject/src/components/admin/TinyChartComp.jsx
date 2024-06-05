import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data1 } from './Data';
import { data2 } from './Data';
import { data3 } from './Data';
import { data4 } from './Data';
const TinyChartComp = () => {
  return (
    <div className='flex flex-wrap m-2 justify-between '>

<div className='w-52 border rounded-lg mr-2   flex  '>
<div className="py-4  w-2/3">
  <div >
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">Orders</h6>
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-l  font-bold tracking-wide">21000</h6>
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
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-l  font-bold tracking-wide">21000</h6>
  <p className='text-red-600  font-bold'>4.4%</p>
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
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-l  font-bold tracking-wide">21000</h6>
  <p className='text-orange-400  font-bold'>4.4%</p>
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
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333] font-semibold tracking-wide ">Stock</h6>
  <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-[#333333]  text-l  font-bold tracking-wide">21000</h6>
  <p className='text-blue-600  font-bold'>4.4%</p>
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