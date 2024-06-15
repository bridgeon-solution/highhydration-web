import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInterceptors';
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
const PaymentSuccesMontly = () => {
    const navigate = useNavigate();
    useEffect(()=>{
      let isSuccess=true
      const fetchData=async()=>{
        try {
          const response=await api.get('/payment/monthlypaymentSuccess')
          if(response.status===200&& isSuccess)
        navigate('/')
        } catch (error) {
          navigate('/home')
          
        }
      };
      const timeoutId=setTimeout(fetchData,3000);
      return ()=>{
        isSuccess=false
        clearTimeout(timeoutId)
      }
    },[])
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
       <motion.div
      className="w-200 h-200 rounded-full bg-green-400 flex items-center justify-center"
      initial={{ y: -250, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: 'spring', duration: 1, stiffness: 120, damping: 10 }}
       
    >
      <GiCheckMark size={200} className='text-white' />
    </motion.div>


      <div className='mt-5' style={{ textAlign: 'center' }}>
        <h1 className='text-3xl'>Payment Successful</h1>
        <p>Thank you for your payment. Your order has been successfully processed.</p>  
      </div>
    </div>
  )
}

export default PaymentSuccesMontly