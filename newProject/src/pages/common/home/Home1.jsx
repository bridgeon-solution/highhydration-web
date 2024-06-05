import React from 'react';

import { motion } from 'framer-motion';
import HomeCarousel from '../../../components/User/HomeCorousel';
import {useNavigate } from 'react-router-dom';


const Home1 = () => {
  const navigate=useNavigate()
  return (
    <div className='w-full bg-[#EFF0F3] flex flex-col md:flex-row'>
      <motion.div
        className='md:w-2/3 w-full h-screen flex flex-col justify-center items-start'
        initial={{ x: -250 }}
        animate={{ x: 0 }} 
        transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Adjusted transition
      >
        <div className='md:ml-14 ml-6 mt-36 md:mt-0'>
          <motion.p
            className='text-4xl md:text-6xl'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Natural Mineral Water,
          </motion.p>
          <motion.p
            className='text-4xl md:text-6xl mt-2' 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Source Of Life
          </motion.p>
        </div>
        <div className='ml-8 md:ml-16 mt-5 text-lg md:text-2xl'>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Flowing like a river, water carries the whispers of ancient wisdom
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            and the promise of renewal
          </motion.p>
        </div>

        <div className='ml-8 md:ml-16 mt-5 text-lg md:text-2xl text-center'>
          <motion.button 
            className='bg-[#22B6FE] rounded-3xl px-4 py-2 md:px-5 md:py-2 text-sm md:text-lg lg:text-xl' 
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(255, 255, 255, 1)", textShadow: "0px 0px 8px rgba(255, 255, 255, 1)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{  duration: 0.5 }}
            onClick={()=>navigate('/productList')}
          >
            Buy
          </motion.button>

          <motion.button 
            className='ml-4 md:ml-8 bg-[#EFF0F3] border-2 border-[#22B6FE] rounded-3xl px-4 py-2 md:px-3 md:py-2 text-sm md:text-lg lg:text-xl' 
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 8px rgba(255, 255, 255, 1)", textShadow: "0px 0px 8px rgba(255, 255, 255, 1)" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={()=>navigate('/contactus')}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
      <div className='hidden md:w-1/3 w-full mt-10 md:mt-0 md:flex md:justify-center md:items-center'>
        <HomeCarousel />
      </div>
    </div>

  );
}

export default Home1;
