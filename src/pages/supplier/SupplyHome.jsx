import React from 'react'
import ad from "../../assets/Supplier/sup1.png"
import SupTable from './SupTable'
import SideBar from '../../components/supplier/Sidebar'
import SupplierChart1 from '../../components/supplier/SupplierChart1'





const SupplyHome  = () => {
  return (

    <div className=' flex w-full h-screen overflow-hidden' >
      <div className=' mt-2 min-h-screen' >
      <SideBar/>
      </div>

      <div className='mt-2 w-full overflow-scroll   m-2 bg-[#e5e1e6]  '>

        <div className=' w-full h-90 flex border mt-2 rounded-lg bg-gradient-to-b from-blue-800 to-blue-200' >
          <div className='w-3/4'>
            <p className='text-white s:flex s:justify-center s:text-2xl s:items-center    md:text-6xl   font-bold md:pt-12 md:pl-'>Welcome To High Hydration</p>
          </div>
          <div className='s:p-1 md:p-5'>
            <img className=' s:h-14 s:w-14 md:h-36 md:w-36   xl:h-64 xl: w-64 ' src={ad} /> 
          </div>
        </div>

{/* orderList */}
        
<div className='flex justify-around flex-wrap m-5'>


        <div className="bg-gradient-to-b from-blue-200 to-blue-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Total Orders</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        10
    </p>
</div>


         

          <div className="bg-gradient-to-b from-green-200 to-green-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Completed</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        10
    </p>
</div>


<div className="bg-gradient-to-b from-red-200 to-red-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">pending</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        10
    </p>
</div>
</div>


{/* graph */}

<div className='w-full flex'>
<div className='w-1/2'> 
<SupplierChart1/>
</div>

<div className='w-1/2'> 
<SupplierChart1/>
</div>
</div>






    





  
</div>
</div>

  )
}

export default SupplyHome