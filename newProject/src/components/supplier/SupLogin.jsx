import React, {useState } from 'react';
import logo from "../../assets/logo.png";
import client from "../../assets/supplierlog.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader';
const baseUrl = import.meta.env.VITE_BASE_URL;
const SupLogin = () => {
  
const navigate=useNavigate()
const [email,setEmail]=useState('');
const[password,setPassword]=useState('');
const [err,setErr]=useState()
const [loading,setLoading]=useState(false)

 async function handleSubmit(){
  setLoading(true)
  let url;
   
   if(email==='admin@123'){
     url='admin/login'    
   }else{
    url='suppliers/login'
   }
console.log(url)
 
try {

      const response=await axios.post(`${baseUrl}/${url}`,{email,password})
      console.log(response);
      setLoading(false)
   if(response.status===200){
    if(email=='admin@123'){
      navigate('/admindashboard')
    }else{
      navigate('/supdashbord')
      localStorage.setItem('token',response.data.token)
    }

   }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
 
        toast.error('invalid user or password');
        setErr('invalid user or password');
        setLoading(false)
      } else {
        setErr('An error occurred while logging in.');
      }
    }
  setEmail('')
  setPassword('')
}


return (

    <div className="min-h-screen bg-white text-gray-900 flex justify-center">
      {loading&&<Loader/>}
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">

        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-white">
          <div className='flex    justify-between items-center p-4 ' >
            <div className="text-center mr-6">
              <img src={logo} className="w-32 mx-auto mb-8" alt="Logo" />
            </div>
        </div>
        <Link to={'/userlogin'}>

<button className="md:w-[200px]   w-[150px] h-[50px] sm:px-8  rounded-lg font-medium bg-violet-500 text-white-500 hover:bg-violet-800 transition-all duration-300 ease-in-out focus:outline-none mb-6"   >
 Supplier Login
</button>
</Link>
          <div className=" flex flex-col items-center bg-white">
            <p className='text-black text-4xl font'>Login to your Account </p>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs">
                <input className="w-full mb-5  px-4 sm:px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200  text-black placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white " type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className="w-full mb-5   px-4 sm:px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 text-black placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white " type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="w-full px-4 sm:px-8 py-3 rounded-lg font-medium bg-violet-500 text-white-500 hover:bg-violet-800 transition-all duration-300 ease-in-out focus:outline-none mb-6"
                onClick={handleSubmit}>
                  Login In
                </button>
                
                <p className="text-xs text-gray-600 text-center font-bold">
                  Don’t have an account ?  <span className='text-orange-400'  onClick={()=>navigate('/proregistartion')}>Sign up</span>

                </p>
               
              </div>


              
            </div>
          </div>

        </div>


        <div className="flex-1 bg--100 lg:flex hidden  bg-white">
          <div className="  w-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${client})` }} />

        </div>
      </div>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  )
}

export default SupLogin