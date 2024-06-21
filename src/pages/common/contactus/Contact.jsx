import React from 'react';
import { FiPhoneCall, FiMail } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { BsWhatsapp } from "react-icons/bs";
import { LuInstagram } from "react-icons/lu";
import { CiTwitter } from "react-icons/ci";
import { LiaFacebookMessenger } from "react-icons/lia";
import Navbar from '../Navbar';

const Contact = () => {
  return (
    <div className='h-screen overflow-hidden'> 
      <Navbar/> 
   
    <div className='bg-[#EFF0F3] p-2 h-screen'>

      <p className='text-center text-3xl font-bold mt-3'>Contact us</p>
      <p className='text-center text-xl mt-2'>Any question or remarks? just write a message!</p>

      <div className='flex flex-col md:flex-row mt-5 m-2'>
        <div className='md:w-1/3 bg-[#22B6FE] p-6 rounded-lg text-white'>
          <p className='text-center text-3xl font-bold'>Contact Information</p>
          <p className='text-center text-xl mb-6'>Any question or remarks? just write a message!</p>

          <div className="flex items-center p-4 mb-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <FiPhoneCall className="mr-2 text-2xl" />
            <p className="text-lg font-semibold">+9596979894</p>
          </div>

          <div className="flex items-center p-4 mb-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <FiMail className="mr-2 text-2xl" />
            <p className="text-lg font-semibold">highhydration@gmail.com</p>
          </div>

          <div className="flex items-center p-4 mb-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out">
            <GoLocation className="mr-2 text-2xl" />
            <p className="text-lg font-semibold">132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
          </div>

          <div className='flex justify-around mt-6'>
            <BsWhatsapp className='text-2xl cursor-pointer' />
            <LuInstagram className='text-2xl cursor-pointer' />
            <CiTwitter className='text-2xl cursor-pointer' />
            <LiaFacebookMessenger className='text-2xl cursor-pointer' />
          </div>
        </div>

        <div className='md:w-2/3 bg-[#EFF0F3] p-6 rounded-lg'>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <input
                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-b border-gray-300"
                placeholder="First Name"
                name="first_name"
              />
              <input
                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-b border-gray-300"
                placeholder="Last Name"
                name="last_name"
              />
            </div>
            <div className="w-full md:w-1/2">
              <input
                className='w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-b border-gray-300'
                placeholder="Email Address"
                name="email_address"
              />
              <input
                className='w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border-b border-gray-300'
                placeholder="Phone Number"
                name="phone_number"
              />
            </div>
          </div>

          <div className='w-full flex flex-col items-center'>
            <p className='text-slate-300 text-center text-xl font-semibold'>Message</p>
            <textarea
              className='w-full md:w-2/3 mb-4 px-6 py-4 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 border-b border-gray-300'
              placeholder='Write your message'
            />
          </div>

          <div className="flex justify-center mt-4">
            <button type="submit" className="bg-[#22B6FE] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded border border-blue-700">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Contact;
