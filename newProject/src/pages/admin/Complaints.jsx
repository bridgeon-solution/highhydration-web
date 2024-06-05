import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import api from '../../axiosInterceptors'


const Complaints = () => {
    const [data,setData]=useState(null)
    useEffect(()=>{
try {
   async function fetchData(){
        const response=await api.post('/users/feedbacks')
       setData(response.data.data)
       console.log(data,"respoooo");
    }
    fetchData()
} catch (error) {
    console.log(error);
}
    },[])
  return (
<div className='flex  bg-[#F8F8F8] p-4 w-full'>
  <div >
    <AdminSidebar />
  </div>

<div className='w-full flex  justify-evenly flex-wrap'>
{data?.map((x)=>(
    <div
  className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none ml-5">
  <div
    className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
    <img
      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
      alt="Tania Andrew"
      class="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h5
          className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
         {x.userId.first_name+x.userId.last_name}
        </h5>
 </div>
      <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
        {x.userId.email}
      </p>
    </div>
  </div>
  <div className="p-0 mb-6">
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
     {x.message}
    </p>
  </div>
</div>  

))}


  </div>


</div>

  )
}

export default Complaints