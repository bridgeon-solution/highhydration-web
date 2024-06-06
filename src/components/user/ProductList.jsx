import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const ProductList = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === products?.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products?.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [products]);

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }
  const handlechane=(id)=>{

    setLoading(true)
    setTimeout(() => {   
      navigate(`/productList/${id}`)
    }, 3000);
  }

  
    return (
      <>
      {/* Grid for larger screens */}

      {loading&& <Loader/>}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center" style={{ display: width < 640 ? 'none' : 'grid' }}>
        {products.map((product,i) => (
          <ProductCard key={product.id||i} product={product} />
        ))}
      </div>

      {/* Carousel for smaller screens */}
      <div className="carousel sm:hidden flex justify-between items-center">
        <FaArrowAltCircleLeft className="left-arrow" onClick={goToPrevSlide} />
        <div className="h-96 w-56 bg-white rounded-t-l rounded-b-3xl">
          <div className="flex justify-center mt-1">
            <img className="rounded-l h-56" src={products[currentIndex].image} alt="" />
          </div>
          <p className="text-center mt-2">{products[currentIndex].productname}</p>
          <div className="flex mx-3 mt-3"></div>
          <p className="text-center font-semibold mt-3 text-l">${products[currentIndex].price}</p>
          <div className="flex justify-center mt-3">
            <button onClick={()=>{handlechane(products[currentIndex]?._id)}} className="text-white bg-blue-700 hover:bg-[#0B2C72] hover:text-[#8DEBFC] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Order Now
            </button>
          </div>
        </div>
        <FaArrowAltCircleRight className="right-arrow" onClick={goToNextSlide} />
      </div>
    </>
      );
}

export default ProductList