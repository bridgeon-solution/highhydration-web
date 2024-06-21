import React, { useEffect, useState } from 'react'
import client from "../../assets/Supplier/Client.jpg"
import SupplyChart from './SupplyChart'
import SideBar from '../../components/supplier/Sidebar'
import api from '../../axiosInterceptors'
import SuplierEditProfile from '../../components/supplier/SuplierEditProfile'




const SupplierPro = () => {
const[data,setData]=useState(null)
  const[isModal,setIsModal]=useState(false)
const supplierId=localStorage.getItem('supplierid')
  async function fetchData(){
   const response=await api.get(`suppliers/supplierById/${supplierId}`)
   setData(response.data.supplier[0])
  
  }
useEffect(()=>{
fetchData()
  },[isModal])

 
return (
    <div className='flex w-full h-screen overflow-hidden'> 
<div className='mt-2 min-h-screen'>
   <SideBar/>
</div>

<div className=' w-full s:p-0  overflow-scroll  bg-[#e5e1e6]  '>
     

<div className=' flex   s:flex-col lg:flex-row lg:h-72  mt-3 ml-2 mr-2 shadow-md rounded-xl'>
    <div className='flex  s:flex-row sm:w-full sm:items-center sm:p-3  lg:w-1/3     lg:flex-row '> 
    <img className=' flex s:w-24 s:h-24 sm:w-36 sm:h-36    lg:h-52  lg:w-52  rounded-full lg:mt-10' src={data?.image} />
    <p className='text-slate-700 text-4xl  pt-10  pl-5 font-bold  font-serif s:text-xl sm:text-2xl lg:text-4xl lg:mb-36 lg:ml-16 lg:mt-9'>{data?.first_name+" "+data?.last_name}</p>
    </div>


    <div className="lg:w-2/3 flex flex-col md:flex-row justify-between   lg:flex-row xl:flex-row w-full p-2 lg:mr-5">

  <div className="w-full lg:w-1/2 bg-[#e5e1e6]  ">
    <p className='text-2xl font-bold text-center mt-2'>Personal Details</p>

    <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8 p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
    <p className="text-lg font-semibold text-gray-700">First Name</p>
    <p className="text-xl font-bold text-gray-900">Vyshnav</p>
  </div>
  
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
    <p className="text-lg font-semibold text-gray-700">Last Name</p>
    <p className="text-xl font-bold text-gray-900">Doe</p>
  </div>
  
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
    <p className="text-lg font-semibold text-gray-700">Email</p>
    <p className="text-xl font-bold text-gray-900">vyshnav@example.com</p>
  </div>
  
  <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
    <p className="text-lg font-semibold text-gray-700">Phone</p>
    <p className="text-xl font-bold text-gray-900">123-456-7890</p>
  </div>
</div>



</div>



  <div className="flex justify-end items-end mt-4 md:mt-0 lg:mt-0">
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full md:w-auto lg:w-36 mb-4 mr-4"
      onClick={() => setIsModal(true)}>
      Edit Profile
    </button>
    <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full w-full md:w-auto lg:w-36 mb-4 border border-black">
      More
    </button>
  </div>
</div>



</div>


<div  className='flex  s:justify-center   md:justify-around flex-wrap  s:mt-5 xl:mt-5 '> 

<div className="bg-gradient-to-b from-blue-200 to-blue-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Attendence</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        10
    </p>
</div>

<div className="bg-gradient-to-b from-green-200 to-green-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Present</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        4
    </p>
</div>

<div className="bg-gradient-to-b from-red-200 to-red-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Absent</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        2
    </p>
</div>

<div className="bg-gradient-to-b from-orange-200 to-orange-100 w-80 h-32 rounded-lg p-4 flex flex-col justify-center items-center shadow-lg">
    <p className="text-gray-500 font-light text-lg">Badges</p>
    <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
        4
    </p>
</div>

      

   
</div>

<div className='flex s:w-full overflow-scroll    lg:justify-center lg:mb-10'>
  <SupplyChart/>

</div>

</div>

{isModal&&( 
<SuplierEditProfile setIsModal={setIsModal}/>
 )}
    </div>
  )
}

export default SupplierPro