import  { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import {  useParams } from "react-router-dom";
import Order from "./Order";
import Loader from "../../components/Loader";
import api from "../../axiosInterceptors";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const { productId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(0);
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
  const [product, setProducts] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        if (response.status === 200) {
          return setProducts(response.data.product);
        }
      } catch (error) {
        if (error.response.status === 403) {
          toast.error("please login");
        }
        console.log(error);
      }
    };
    const fethcReviews = async () => {
      try {
        const response = await api.get("reviews", {
          params: {
            value: productId,
          },
        });
        setReview(response?.data?.reviews);
      } catch (error) {
        console.error(error);
      }
    };
    fethcReviews();
    fetchDatas();
  }, []);

  const handeleChange = () => {
    setLoading(true);
    setTimeout(() => {
      setModalOpen(true);
      setLoading(false);
    }, 2000);
  };
  console.log();
  return (
    <>
      {loader && <Loader />}
      {modalOpen ? (
        <Order product={product} setModalOpen={setModalOpen} />
      ) : (
        <div className=" flex justify-center mt-20">
          <div className=" w-3/4 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="md:w-1/3 s:w-full">
                <img
                  src={product?.image}
                  alt="..."
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-2/3 p-4">
                <h5 className="text-xl mt-3  font-bold">
                  {product?.productname}
                </h5>
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
                  type="button"
                  onClick={handeleChange}
                >
                  Order Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {!modalOpen && (
          <div className="w-3/4 m-auto mt-5">
            <div className="slider-container">
              <Slider {...settings}>
                {review?.map((i,ind) => (
                  <div key={ind} className="bg-white mb-2  shadow text-black rounded-xls:h-[100px]">
                    <div className="h-40  sm:h-56 rounded-t-xl  flex justify-center items-center">
                      <img
                        className="h-20 w-20 sm:h-32 sm:w-32 rounded-full"
                        src={i?.userId?.image}
                        alt={i?.userId?.first_name}
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-lg sm:text-xl font-semibold">
                        {i?.username}
                      </p>
                      <p className="mt-2 text-sm sm:text-base text-center">
                        {i?.userId?.first_name}
                      </p>
                      {/* <p className="mt-2 text-sm sm:text-base text-center">{i?.reviewText}</p> */}
                      <p className="text-ascent-2">
                        {showAll === i?._id
                          ? i?.reviewText
                          : i?.reviewText?.slice(0, 140) || i?.reviewText}
                        {i?.reviewText?.length > 140 &&
                          (showAll === i?._id ? (
                            <span
                              className="text-blue ml-2 font-medium cursor-pointer text-blue-500"
                              onClick={() => setShowAll(0)}
                            >
                              Show Less
                            </span>
                          ) : (
                            <span
                              className="text-blue ml-2 font-medium cursor-pointer text-blue-500"
                              onClick={() => setShowAll(i?._id)}
                            >
                              Show More
                            </span>
                          ))}
                      </p>
                      <div className="flex gap-1 mt-2 justify-center">
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
        )}
      </div>
    </>
  );
};

export default SingleProduct;
