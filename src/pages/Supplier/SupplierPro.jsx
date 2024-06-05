import React from 'react'
import client from "../../assets/Supplier/Client.jpg"
import SupplyChart from '../supplier/SupplyChart'
import SideBar from '../../components/supplier/Sidebar'




const SupplierPro = () => {
  return (
    <div className='flex w-full h-screen overflow-hidden'> 
<div className='mt-2 min-h-screen'>
   <SideBar/>
</div>

<div className=' w-full s:p-0  overflow-scroll   '>
     

<div className=' flex   s:flex-col lg:flex-row lg:h-72 '>
    <div className='flex  s:flex-row sm:w-full sm:items-center sm:p-3  lg:w-1/2 lg:flex-row '> 
    <img className=' flex s:w-24 s:h-24 sm:w-36 sm:h-36    lg:h-52  lg:w-52  rounded-full lg:mt-10' src={client} />
    <p className='text-slate-700 text-4xl  pt-10  pl-5 font-bold  font-serif s:text-xl sm:text-2xl lg:text-4xl lg:mb-36 lg:ml-16 lg:mt-9'>John Samuel</p>
    </div>


<div className='  lg:w-1/2  flex s:w-full  s:p-2 s:justify-end sm:justify-end lg:justify-end items-end lg:mr-5 '> 
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  lg:w-36 mb-4 mr-4 ">
Edit Profile
</button>
<button class="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full pl-3     lg:w-36 mb-4 border border-black">
More
</button>
      </div>

</div>


<div  className='flex  s:justify-center   md:justify-around flex-wrap  s:mt-5 xl:mt-5 '> 

<div className="w-6/12 max-w-full px-3 text-center lg:w-3/12  s:mt-5    xl:mb-5 ">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
          <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500 text-lg font-semibold tracking-wide">present</h6>
            <div className="flex items-center justify-center">
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-bold tracking-wide"> 20</h6>
           </div>
           </div>
        </div>


        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12  s:mt-5    xl:mb-5 ">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
          <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500 text-lg font-semibold tracking-wide">Absent</h6>
            <div className="flex items-center justify-center">
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-bold tracking-wide"> 10</h6>
           </div>
           </div>
        </div>

        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12  s:mt-5    xl:mb-5 ">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
          <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-semibold tracking-wide">Attendence</h6>
            <div className="flex items-center justify-center">
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-bold  tracking-wide">10</h6>
            </div>

          </div>
        </div>

        <div className="w-6/12 max-w-full px-3 text-center lg:w-3/12  s:mt-5   xl:mb-5 ">
          <div className="py-4 border border-rounded-lg  bg-gray-200 shadow-xl">
          <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-semibold tracking-wide">Attendence</h6>
            <div className="flex items-center justify-center">
            <h6 className="relative mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-blue-700 to-blue-500  text-lg font-bold  tracking-wide">10</h6>
            </div>

          </div>
        </div>
</div>

<div className='flex s:w-full overflow-scroll    lg:justify-center lg:mb-10'>
  <SupplyChart/>

</div>

</div>


    </div>
  )
}

export default SupplierPro