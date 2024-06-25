import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ved from '../../assets/waterfalls.mp4'
const Wellcome = () => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={ved}
        className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        loop
        autoPlay
        muted
      ></video>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">

        <h2
          className=" mb-4 text-6xl">Welcome to HighHydration
        </h2>
       
        <motion.button
          className="bg-[#22B6FE] rounded-xl px-4 py-2 text-sm sm:text-base md:px-6 md:py-3 md:text-lg lg:px-8 lg:py-4 lg:text-xl transition-all duration-300"
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
          }}

          onClick={() => navigate('/home')}
        >
          Click to continue
        </motion.button>

      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
    </div>
  );
};

export default Wellcome;
