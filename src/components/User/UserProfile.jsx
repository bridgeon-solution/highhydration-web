import React, { useEffect, useState } from 'react'
import client from "../../assets/Supplier/Client.jpg"
import { useNavigate } from 'react-router-dom'
import api from '../../axiosInterceptors'
import Loader from '../Loader'
import OrdersList from './OrdersList'

const UserProfile = () => {
  const userid = localStorage.getItem('userId');
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState(null)
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await api.get(`/users/${userid}`)
        setUserData(response.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])

  return (
    <div className='w-full h-screen mt-2'>
      {loading && <Loader />}

      <div className='w-full flex flex-col md:flex-row h-1/3 bg-blue-800 '>
  <div className='w-full md:w-1/3  flex items-center justify-center'>
    <img className='h-56 w-56 border rounded-full' src={userData?.image} alt="User" />
  </div>
  <div className='w-full md:w-1/3 h-3/5  flex items-center justify-center mt-5 md:mt-0'>
    <div>
      <p className='text-white text-2xl'>Email: {userData?.email}</p>
      <p className='mt-10 text-white text-2xl'>Phone: {userData?.phone_number}</p>
    </div>
  </div>
  <div className='w-full md:w-1/3 h-3/5 bg-gradient-to-r  flex items-center justify-center mt-5 md:mt-0'>
    <div>
      <p className='text-white text-2xl'>Address: {userData?.address_line1}</p>
      <p className='mt-10 text-white text-2xl'>Landmark: {userData?.address_line2}</p>
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
          Open to
        </button>
        <button className="bg-[#D9D9D9] text-[#3751FE] rounded-2xl px-5 py-2" onClick={() => navigate('/editPro')}>
          Add Profile Section
        </button>
        <button className="bg-[#F2F3F9] text-black rounded-2xl px-5 py-2">
          More
        </button>
      </div>

      <div className='flex justify-around flex-wrap m-5'>
        <div className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12 px-3 text-center mb-5">
          <div className="py-4 border rounded-lg bg-gray-200 shadow-xl">
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-black text-lg font-bold tracking-wide">Total Orders</h6>
            <div className="flex items-center justify-center">
              <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-black text-lg font-bold tracking-wide">20</h6>
            </div>
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-black text-lg font-thin tracking-wide">last updated at 23/04/200</h6>
          </div>
        </div>
        <div className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12 px-3 text-center mb-5">
          <div className="py-4 border rounded-lg bg-gray-200 shadow-xl">
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-green-700 to-green-500 text-lg font-bold tracking-wide">Last Payments</h6>
            <div className="flex items-center justify-center">
              <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-green-700 to-green-500 text-lg font-bold tracking-wide">10</h6>
            </div>
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-black text-lg font-thin tracking-wide">last updated at 23/04/200</h6>
          </div>
        </div>
        <div className="w-full sm:w-6/12 md:w-6/12 lg:w-3/12 px-3 text-center mb-5">
          <div className="py-4 border rounded-lg bg-gray-200 shadow-xl">
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-red-700 to-red-500 text-lg font-bold tracking-wide">Pending</h6>
            <div className="flex items-center justify-center">
              <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-gradient-to-tl from-red-700 to-red-500 text-lg font-bold tracking-wide">10</h6>
            </div>
            <h6 className="mb-2 text-transparent z-1 bg-clip-text bg-black text-lg font-thin tracking-wide">last updated at 23/04/200</h6>
          </div>
        </div>
      </div>
      <OrdersList/>
    </div>
  )
}

export default UserProfile;
