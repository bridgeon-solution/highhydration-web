import React, { useEffect, useState } from "react";
import ProductList from "../../../components/user/products/ProductList";
import backgroundImg from "../../../assets/Users/paint3.png";
import { MdWater } from "react-icons/md";
import Pro1 from "../../../assets/Users/pro1.png";
import Pro2 from "../../../assets/Users/pro2.png";
import Pro3 from "../../../assets/Users/pro3.png";
import Pro4 from "../../../assets/Users/pro5.png";

import Loader from "../../../components/Loader";
import api from "../../../axiosInterceptors";
import Navbar from "../../common/Navbar";
const baseUrl = import.meta.env.VITE_BASE_URL;
const Products = () => {
  const [productss, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDatas = async () => {
      setLoading(true);
      try {

          const response= await api.get(`/products`)
          setProduct(response.data.products)
          setLoading(false)

      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loader />}

      <div className="text-center mt-10 flex flex-col items-center">
        <h2 className="text-4xl text-[#2D416E] font-semibold mb-8">
          Our Products
        </h2>
        <p className=" w-full sm:w-2/5 ">
          Explore our diverse range of premium products designed to meet your
          unique needs. Each item is crafted with precision and attention to
          detail, ensuring top-notch quality and performance. Discover the
          perfect solution for you among our offerings
        </p>
        <MdWater className="mt-1 text-[#34A2DB]" size={35} />
      </div>
      <div
        className="container mx-auto px-4 py-16 mt-3"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ProductList products={productss} />
      </div>
    </>
  );
};

export default Products;
