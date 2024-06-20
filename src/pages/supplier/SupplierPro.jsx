import React, { useEffect, useState } from 'react'
import client from "../../assets/Supplier/Client.jpg"
import SupplyChart from './SupplyChart'
import SideBar from '../../components/supplier/Sidebar'
import api from '../../axiosInterceptors'
import SuplierEditProfile from './SuplierEditProfile'




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
  },[])

  console.log(data,"respoo");
  return (
    <div className='flex w-full h-screen overflow-hidden'> 
<div className='mt-2 min-h-screen'>
   <SideBar/>
</div>

<div className=' w-full s:p-0  overflow-scroll   '>
     

<div className=' flex   s:flex-col lg:flex-row lg:h-72 '>
    <div className='flex  s:flex-row sm:w-full sm:items-center sm:p-3  lg:w-1/2 lg:flex-row '> 
    <img className=' flex s:w-24 s:h-24 sm:w-36 sm:h-36    lg:h-52  lg:w-52  rounded-full lg:mt-10' src={client} />
    <p className='text-slate-700 text-4xl  pt-10  pl-5 font-bold  font-serif s:text-xl sm:text-2xl lg:text-4xl lg:mb-36 lg:ml-16 lg:mt-9'>{data?.first_name+""+data?.last_name}</p>
    </div>


<div className='  lg:w-1/2  flex s:w-full  s:p-2 s:justify-end sm:justify-end lg:justify-end items-end lg:mr-5 '> 
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

{isModal&&( 
 <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 z-50">
 <div className="max-w-3xl w-full mx-4 md:mx-auto flex flex-col border rounded-lg bg-white shadow-xl overflow-hidden z-60">
     <div className="flex-1 overflow-y-auto p-6 md:p-8">
         <div className="flex items-center justify-between mb-4">
             <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
             <button onClick={() => setIsModal(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                 </svg>
             </button>
         </div>
         <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto">
             <form>
                 <div className="flex flex-col md:flex-row items-center mb-4">
                     <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-0">Complete Account Setup</h2>
                     <label className="relative w-16 h-16 cursor-pointer ml-auto">
                         <input
                             type="file"
                             id="imageUpload"
                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                             accept="image/*"
                         />
                         <img
                             id="imagePreview"
                             className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                             src={client}
                             alt="Client"
                         />
                     </label>
                 </div>
                 <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                     <div className="w-full md:w-1/2 p-2 md:p-4">
                         <input
                             className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                             placeholder="First Name"
                             name="first_name"
                         />
                         <input
                             className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                             placeholder="Email Address"
                         />
                         <div className="flex justify-end">
                             <button type="button" 
                             className="hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
                             onClick={() => setIsModal(false)} >
                                 Cancel
                             </button>
                         </div>
                     </div>
                     <div className="w-full md:w-1/2 p-2 md:p-4">
                         <input
                             className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                             placeholder="Last Name"
                         />
                         <input
                             className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                             placeholder="Phone Number"
                             name="phone_number"
                         />
                         <div className="flex justify-start">
                             <button type="submit" className="flex bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded transition-colors duration-300">
                                 Submit
                             </button>
                         </div>
                     </div>
                 </div>
             </form>
         </div> 
     </div>
 </div>
</div>


 )}
    </div>
  )
}

export default SupplierPro