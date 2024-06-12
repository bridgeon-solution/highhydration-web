import React, { useEffect, useState } from "react";
import Pro1 from "../../assets/Users/pro1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import Order from "./Order";
import Loader from "../../components/Loader";
import api from "../../axiosInterceptors";
import toast, { Toaster } from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BASE_URL;
const SingleProduct = () => {
  const {productId}=useParams()
  const [modalOpen, setModalOpen] = useState(false);
  const [loader,setLoading]=useState(false)
    const settings = {
        dots: true,
        infinite: true,
        speed: 2000, 
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
          {
            breakpoint: 1024, 
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 768, 
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480, 
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
      const [product,setProducts]=useState([])
      const [review,setReview]=useState([])
      useEffect(()=>{
        const  fetchDatas=async()=>{
          try {
              const response= await api.get(`/products/${productId}`)
              if(response.status===200){
              return  setProducts(response.data.product)
              }
             
              
          } catch (error) {
            if(error.response.status===403){
              toast.error('please login')
              
            }
              console.log(error)
          }
          }
          const fethcReviews=async()=>{
            try {
              const response= await api.get('reviews',{params:{
                value:productId
              }})
              console.log(response,'reviews');
              setReview(response?.data?.reviews)
            } catch (error) {
              console.error(error)
            }
            
          }
          fethcReviews()
          fetchDatas()


      },[])  

      const handeleChange=()=>{
        setLoading(true)
        setTimeout(() => {
          setModalOpen(true)
          setLoading(false)
        }, 2000);
      }
  return (
    <>
    {loader&&<Loader/>}
      {modalOpen?<Order product={product} setModalOpen={setModalOpen}/>:(
      <div className=" flex justify-center mt-20">
      <div className=" w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="md:w-1/3 s:w-full">
          <img
            src={product?.image}
            alt="..."
            className="object-cover w-full h-full "
          />
        </div>
        <div className="w-2/3 p-4">
          <h5 className="text-xl mt-3  font-bold">{product?.productname}</h5>
          <p className="mt-4 text-gray-600 s:w-full s:text-sm md:text-base">
            {product.productDescription}
          </p>
          <div className="flex gap-2 mt-3">
          {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                </div>
                <h5 className="text-xl mt-3  font-bold">${product?.price}</h5>
                <button 
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-xl mt-4 select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button" onClick={handeleChange}>
        Order Now<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg></button>
        </div>
      </div>
    </div>
      </div>

    )}
      <div className="bg-slate-100">
        <div className="w-3/4 m-auto ">
          <div className="slider-container">
            <Slider {...settings}>
              {review?.map((i) => (
                <div className="bg-white mb-2 h-[450px] text-black rounded-xls:h-[100px]">
                  <div className="h-48 sm:h-56 rounded-t-xl bg-blue-400 flex justify-center items-center">
                    <img
                      className="h-32 w-32 sm:h-44 sm:w-44 rounded-full"
                      src={i?.userId?.image}
                      alt={i?.userId?.first_name}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg sm:text-xl font-semibold">
                      {i?.username}
                    </p>
                    <p className="mt-2 text-sm sm:text-base">{i?.reviewText}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(5)].map((_, ind) => (
                        <FaStar
                          key={ind}
                          className={`${
                            i.rating < ind + 1
                              ? "text-[#EEEEEE]"
                              : "text-yellow-500"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
   
      </div>
    </>
  );
};

export default SingleProduct;
