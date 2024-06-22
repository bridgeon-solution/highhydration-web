
import React, { useState } from 'react'

import { FaStar   } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
function  ProductCard({ product }) {
  const ratings = [4, 5, 3, 4, 5];
  const [loading,setLoading]=useState(false)
  const totalRatings = ratings.length;
  const navigate=useNavigate()
  const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const overallRating = totalRatings > 0 ? sumRatings / totalRatings : 0;
  const handlechane=(id)=>{

    setLoading(true)
    setTimeout(() => {
      navigate(`/productList/${id}`)
    }, 2000);
  }
  return (

    <div className="h-96 w-56 bg-white rounded-t-l rounded-b-3xl sm:mt-7 ">
      {loading&&<Loader/>}
        <div className='flex justify-center mt-1'>
            <img className='rounded-l h-56' src={product?.image} alt="productImage" />
        </div>
        <p className=' text-center mt-2'>{product?.productname}</p>
        <div className='flex mx-3 mt-3'>
        {[...Array(5)].map((i,ind)=>(
           <FaStar key={ind} className={`${overallRating<ind+1 ? 'text-[#EEEEEE]':'text-yellow-500'  } mt-1`} />
        ))}
        <p className='ml-5 font-light'>({ratings?.length}Reviews)</p>

        </div>
        <p className='text-center font-semibold  mt-3 text-l'><i class="fa fa-inr"></i> {product?.price}</p>
        <div className='flex justify-center mt-3'>
        <button onClick={()=>{handlechane(product?._id)}} className="text-white bg-blue-700 hover:bg-[#0B2C72] hover:text-[#8DEBFC] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Order Now</button>
        </div>
    </div>

  )
}

export default ProductCard