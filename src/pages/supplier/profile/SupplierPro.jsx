
import React, { useEffect, useState } from 'react'
import client from "../../../assets/Supplier/Client.jpg"
import SupplyChart from '../SupplyChart'
import SideBar from '../../../components/supplier/sidebar/Sidebar'
import api from '../../../axiosInterceptors'
import SuplierEditProfile from '../../../components/supplier/SuplierEditProfile'



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
     

<div className=' flex   s:flex-col lg:flex-row lg:h-72  bg-[#EFF0F3] mt-3 ml-2 mr-2 shadow-md rounded-xl'>
    <div className='flex  s:flex-row sm:w-full sm:items-center sm:p-3  lg:w-1/2 b    lg:flex-row '> 
    <img className=' flex s:w-24 s:h-24 sm:w-36 sm:h-36    lg:h-52  lg:w-52  rounded-full lg:mt-10' src={data?.image} />
    <p className='text-slate-700 text-4xl  pt-10  pl-5 font-bold  font-serif s:text-xl sm:text-2xl lg:text-4xl lg:mb-36 lg:ml-16 lg:mt-9'>{data?.first_name+" "+data?.last_name}</p>
    </div>


<div className='  lg:w-1/2  flex s:w-full  s:p-2 s:justify-end sm:justify-end lg:justify-end items-end lg:mr-5  '> 
<button 
class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  lg:w-36 mb-4 mr-4 "
onClick={()=>setIsModal(true)}>
Edit Profile
</button>
<button class="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-full pl-3     lg:w-36 mb-4 border border-black">
More
</button>
</div>

</div>




{/* personal profile */}



<div class="flex flex-col md:flex-row justify-between items-center p-2 lg:mr-5">
  <div class="w-full bg-gray-200 lg:ml-2 lg:mr-0 rounded-lg shadow-md">
    <p class="text-2xl font-bold text-center mt-2 bg-gray-300 py-2 rounded-t-lg">Personal Details</p>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
      <div class="flex flex-col items-center lg:items-start space-y-2 bg-white rounded-lg p-4">
        <p class="text-lg font-semibold text-gray-700">First Name <span class="text-gray-500">{data?.first_name}</span></p>
        <p class="text-lg font-semibold text-gray-700">Last Name <span class="text-gray-500">{data?.last_name}</span></p>
      </div>

      <div class="flex flex-col items-center lg:items-start space-y-2 bg-white rounded-lg p-4">
        <p class="text-lg font-semibold text-gray-700">Email <span class="text-gray-500">{data?.email}</span></p>
        <p class="text-lg font-semibold text-gray-700">Phone <span class="text-gray-500">{data?.phone_number}</span></p>
      </div>
    </div>
  </div>
</div>


{/* personalprofile end */}


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

<div className='flex s:w-full overflow-scroll mt-5   lg:justify-center lg:mb-10'>
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