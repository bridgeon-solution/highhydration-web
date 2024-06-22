

import React, { useEffect, useState } from 'react'
import client from "../../../assets/Supplier/Client.jpg"
import { useNavigate } from 'react-router-dom'
import api from '../../../axiosInterceptors'
import Loader from '../../../components/Loader'
import OrdersList from '../../../components/user/order/OrdersList'
import PyamentCompleted from '../../../components/user/PaymentSection/PyamentCompleted'
import PendingBills from '../../../components/user/PaymentSection/PendingBills'
import ChatModal from '../../../components/user/modals/ChatModal'
import Navbar from '../../../pages/common/Navbar'

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(null)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const[cardData,setCardData]=useState([])
  const[role,setRole]=useState('orders')

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await api.get(`/users/${userId}`)
        const response2 = await api.get(`/users/profileData/${userId}`)
        setUserData(response.data.data)
       setCardData(response2.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }



  return (
    <> 
    <Navbar/>
    <div className='w-full h-screen'>
    
      {loading && <Loader />}

      {/* <div className='w-full flex flex-col  md:flex-row h-1/3 bg-gradient-to-b from-blue-200 to-blue-100 rounded-bl-2xl rounded-br-2xl justify-between'>

        <div className='w-full md:w-1/3  flex items-center justify-center'>
          <img className='h-56 w-56 border rounded-full' src={userData?.image} alt="User" />
        </div>
        <div class="flex flex-col md:flex-row justify-between items-center p-2 lg:mr-5 mx-5">

  <div class="w-full bg-gradient-to-b from-blue-200 to-blue-100 lg:ml-2 lg:mr-0 rounded-lg ">
    <p class="text-2xl font-bold text-center mt-2 bg-gradient-to-b from-blue-200 to-blue-200 py-2 rounded-t-lg">Personal Details</p>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 p-4">
      <div class="flex flex-col items-center lg:items-start space-y-2 bg-gradient-to-b from-blue-200 to-blue-100 shadow-xl rounded-lg p-4">
        <p class="text-lg font-semibold text-gray-700">First Name <span class="text-gray-500">{userData?.first_name}</span></p>
        <p class="text-lg font-semibold text-gray-700">Last Name <span class="text-gray-500">{userData?.last_name}</span></p>
      </div>

      <div class="flex flex-col items-center lg:items-start space-y-2 bg-gradient-to-b from-blue-200 to-blue-100 shadow-xl rounded-lg p-4">
        <p class="text-lg font-semibold text-gray-700">Email <span class="text-gray-500">{userData?.email}</span></p>
        <p class="text-lg font-semibold text-gray-700">Phone <span class="text-gray-500">{userData?.phone_number}</span></p>
      </div>
    </div>
  </div>

</div>
</div> */}

<div className="w-full flex flex-col md:flex-row h-auto bg-gradient-to-b from-blue-500 to-blue-200 rounded-bl-2xl rounded-br-2xl justify-between p-4 md:p-0">
  <div className="w-full md:w-1/3 flex items-center justify-center p-4 md:p-0">
    <img className="h-56 w-56 border rounded-full" src={userData?.image} alt="User" />
  </div>
  <div className="w-full md:w-2/3 flex flex-col justify-center p-4">
    <div className="w-full bg-gradient-to-b from-blue-500 to-blue-200 rounded-lg shadow-lg">
      <p className="text-2xl font-bold text-center mt-2 bg-gradient-to-b from-blue-500 to-blue-200 py-2 rounded-t-lg">Personal Details</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col items-center md:items-start space-y-2 bg-gradient-to-b from-blue-400 to-blue-100 shadow-xl rounded-lg p-4">
          <p className="text-lg font-semibold text-gray-700">First Name: <span className="text-gray-500">{userData?.first_name}</span></p>
          <p className="text-lg font-semibold text-gray-700">Last Name: <span className="text-gray-500">{userData?.last_name}</span></p>
        </div>
        <div className="flex flex-col items-center md:items-start space-y-2 bg-gradient-to-b from-blue-400 to-blue-100 shadow-xl rounded-lg p-4">
          <p className="text-lg font-semibold text-gray-700">Email: <span className="text-gray-500">{userData?.email}</span></p>
          <p className="text-lg font-semibold text-gray-700">Phone: <span className="text-gray-500">{userData?.phone_number}</span></p>
        </div>
      </div>
    </div>
  </div>
</div>



      <div className='w-full font-bold flex items-center mt-5'>
        <p className='ml-8 text-3xl text-slate-600'>{userData?.first_name} {userData?.last_name}</p>
      </div>
      <div>
        <p className='ml-8 text-2xl mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>

      <div className="ml-2 mt-3 md:ml-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
        <button className="bg-[#3751FE] text-white rounded-2xl px-5 py-2">
          Notification
        </button>
        <button className="bg-[#D9D9D9] text-[#3751FE] rounded-2xl px-5 py-2"
         onClick={() => navigate('/editPro')}
       
         >
          Add Profile Section
        </button>
        <button className="bg-[#3751FE] text-white rounded-2xl px-5 py-2" onClick={toggleModal}>
          Complaints
        </button>
      </div>

      <div className='flex justify-around flex-wrap m-5'  >

      <div className='flex justify-around flex-wrap m-5'>
</div>






<div onClick={()=>setRole('orders')} 
className="bg-gradient-to-b from-red-200 to-red-100 w-80 h-40 rounded-lg p-6 flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300">
  <p className="text-gray-500 font-light text-lg mb-1">Total Orders</p>
  <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
    {cardData?.orders}
  </p>
  <h6 className="mt-2 text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-800 text-sm font-thin tracking-wide">
    Last updated at {cardData?.formattedDate}
  </h6>
</div>


<div  onClick={()=>setRole('payments')}
className="bg-gradient-to-b from-green-200 to-green-100 w-80 h-40 rounded-lg p-6 flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300">
  <p className="text-gray-500 font-light text-lg mb-1">Last Payments</p>
  <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
    {cardData?.payment}
  </p>
  <h6 className="mt-2 text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-800 text-sm font-thin tracking-wide">
    Last updated at {cardData?.formattedDate}
  </h6>
</div>


<div  onClick={()=>setRole('pending')}
className="bg-gradient-to-b from-red-200 to-red-100 w-80 h-40 rounded-lg p-6 flex flex-col justify-center items-center shadow-lg transform hover:scale-105 transition-transform duration-300">
  <p className="text-gray-500 font-light text-lg mb-1">Last Payments</p>
  <p className="text-4xl md:text-5xl font-semibold text-transparent bg-gradient-to-b from-blue-500 to-blue-300 bg-clip-text">
    3
  </p>
  <h6 className="mt-2 text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-800 text-sm font-thin tracking-wide">
    Last updated at {cardData?.formattedDate}
  </h6>
</div>
   



   
  
    
      
      

      </div>

      {role==='orders' &&
     <OrdersList setLoading={setLoading}/>
      }

     {role==='payments' &&
     <PyamentCompleted name={`${userData?.first_name} ${userData?.last_name}`} userData={userData} />
      }
 

 {role==='pending' &&
     <PendingBills/>
      }
      {/* {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-xl mx-auto flex w-full flex-col border rounded-lg bg-white p-8">
            <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
            <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share with us!</p>
            <div className="mb-4">
              <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
              <textarea id="message" name="message" onChange={(e)=>setMessage(e.target.value)} className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
            </div>
            <div className='flex justify-evenly'>
        <button onClick={handleSave} className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none">Send</button>
        <button onClick={toggleModal} className="rounded border-0 bg-red-500 py-2 px-6 text-lg text-white hover:bg-red-600 focus:outline-none">Close</button>
    </div>
           
            <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
          </div>
        </div>
      )} */}

 {isModalOpen && <ChatModal isModalOpen={isModalOpen} toggleModal={toggleModal} />}

    </div>
    </>
  )
}

export default UserProfile;


