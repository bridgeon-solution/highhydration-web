import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import image from '../../../assets/Home/image1.png'
import image1 from '../../../assets/Home/Image2.png'
import image2 from '../../../assets/Home/Image3.png'
const Home2 = () => {
  return (
    <div className=' mt-2 bg-[#fdfdfd] '>
        <div className='flex  flex-col items-center   md:flex-row justify-evenly h-1/2'>
<div className="relative flex flex-col mt-6 text-gray-700 bg-[#EFF0F3]shadow-md bg-clip-border rounded-xl w-96">
<div
  className="relative h-56 mx-4 -mt-6 overflow-hidden text-white  bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
  <img
    src={image}
    alt="card-image"
    className="max-w-full max-h-full" />
</div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center ">
     High Retension Rate
    </h5>
    <p className="block  text-base antialiased font-light leading-relaxed text-inherit">
      The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to "Naviglio" where you can enjoy the main night life in
      Barcelona.
    </p>
  </div>
  <div className="p-6 pt-0 flex justify-center">
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-3xl bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
      <FaArrowRight />
    </button>
  </div>
</div>  

 
<div className="relative flex flex-col mt-6 text-gray-700 bg-[#EFF0F3]shadow-md bg-clip-border rounded-xl w-96">
<div
  className="relative h-56 mx-4 -mt-6 overflow-hidden text-white  bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
  <img
    src={image1}
    alt="card-image"
    className="max-w-full max-h-full" />
</div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center ">
     High Retension Rate
    </h5>
    <p className="block  text-base antialiased font-light leading-relaxed text-inherit">
      The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to "Naviglio" where you can enjoy the main night life in
      Barcelona.
    </p>
  </div>
  <div className="p-6 pt-0 flex justify-center">
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-3xl bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
      <FaArrowRight />
    </button>
  </div>
</div>  
 


<div className="relative flex flex-col mt-6 text-gray-700 bg-[#EFF0F3]shadow-md bg-clip-border rounded-xl w-96">
<div
  className="relative h-56 mx-4 -mt-6 overflow-hidden text-white  bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40 flex items-center justify-center">
  <img
    src={image2}
    alt="card-image"
    className="max-w-full max-h-full" />
</div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center ">
     High Retension Rate
    </h5>
    <p className="block  text-base antialiased font-light leading-relaxed text-inherit">
      The place is close to Barceloneta Beach and bus stop just 2 min by walk
      and near to "Naviglio" where you can enjoy the main night life in
      Barcelona.
    </p>
  </div>
  <div className="p-6 pt-0 flex justify-center">
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-3xl bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
      <FaArrowRight />
    </button>
  </div>
</div>  


</div>



    </div>
  )
}

export default Home2

