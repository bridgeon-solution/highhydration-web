import React from "react";
import "./aboutus.css";
import wavebg from "../../../assets/Users/wave.png";
import aboutbg from "../../../assets/Users/aboutbg.png";
import { FaHandHoldingWater } from "react-icons/fa";
import { GiWaterRecycling } from "react-icons/gi";
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { RiWaterFlashFill } from "react-icons/ri";
import { IoIosWater } from "react-icons/io";
import Footer from "../../../components/user/Footer";
const Aboutus = () => {
  return (
    <>
      <div
        className="w-full h-[89vh]  flex-col justify-center flex items-center relative"
        style={{
          backgroundImage: `url(${wavebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transform: "rotate(180deg)",
        }}
      >
        <div className="text-center w-1/3" style={{ marginTop: "5%" }}>
          <h1 className="rotate-180 text-5xl text-yellow-300">~</h1>
          <h1 className="rotate-180 text-5xl font-serif">
            A Trusted Name In Bottled Water Industry
          </h1>
        </div>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-7xl transform transition rotate-180 duration-500 ease-in-out hover:scale-110 motion-safe:animate-moveTopAndHide font-sans">
            About Us
          </h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row flex-wrap justify-center gap-5 mb-5 p-3">
        <div className="flex flex-col gap-3 items-center w-full md:w-1/4 p-3">
          <FaHandHoldingWater className="text-[#22B6FE]" size={90} />
          <h1 className="text-2xl text-[#22B6FE]">Maximum Purity</h1>
          <p className="text-center p-4 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio autem
            alias qui placeat temporibus, magnam itaque molestiae omnis,
            doloribus nobis aspernatur quod, quaerat fuga aliquam nostrum eius
            perferendis dolores natus.
          </p>
          <a className="text-yellow-300 underline" href="#">
            Learn More
          </a>
        </div>
        <div className="flex flex-col gap-3 items-center w-full md:w-1/4 p-3">
          <GiWaterRecycling className="text-[#22B6FE]" size={90} />
          <h1 className="text-2xl text-[#22B6FE]">5 Steps Filtration</h1>
          <p className="text-center p-4 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio autem
            alias qui placeat temporibus, magnam itaque molestiae omnis,
            doloribus nobis aspernatur quod, quaerat fuga aliquam nostrum eius
            perferendis dolores natus.
          </p>
          <a className="text-yellow-300 underline" href="#">
            Learn More
          </a>
        </div>
        <div className="flex flex-col gap-3 items-center w-full md:w-1/4 p-3">
          <RiWaterFlashFill className="text-[#22B6FE]" size={90} />
          <h1 className="text-2xl text-[#22B6FE]">Chlorine Free</h1>
          <p className="text-center p-4 leading-relaxed max-w-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio autem
            alias qui placeat temporibus, magnam itaque molestiae omnis,
            doloribus nobis aspernatur quod, quaerat fuga aliquam nostrum eius
            perferendis dolores natus.
          </p>
          <a className="text-yellow-300 underline" href="#">
            Learn More
          </a>
        </div>
        {/* <div className='flex flex-col gap-3 items-center w-full md:w-1/4 p-3'>
    <FaGlassWaterDroplet className='text-[#22B6FE]' size={90}/>
    <h1 className='text-2xl text-[#22B6FE]'>Quality Certified</h1>
    <p className='text-center p-4 leading-relaxed max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio autem alias qui placeat temporibus, magnam itaque molestiae omnis, doloribus nobis aspernatur quod, quaerat fuga aliquam nostrum eius perferendis dolores natus.</p>
    <a className='text-yellow-300 underline' href="#">Learn More</a>
  </div> */}
      </div>

      <div className="flex justify-center">
        <iframe
          className="mb-4"
          width="860"
          height="415"
          src="https://www.youtube.com/embed/v_8AcH7N98s?si=yUHR180kupEX-1Ce"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
      <div className="flex justify-center items-center mt-2 mb-2">
        <h1 className="text-5xl font-serif">Helping To Improve</h1>
        <p className=" w-72 border-l-2 border-black mx-2 pl-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, est
          animi quis officia nobis ducimus{" "}
        </p>
      </div>

      <div className="w-10/12 mt-3 m-auto">
        <div className="flex gap-9 mt-5">
          <img
            className="w-1/3"
            src="https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_733911_16711894528694581.jpg"
            alt=""
          />
          <img
            className="w-1/3"
            src="https://odishabytes.com/wp-content/uploads/2019/07/Mi-Water-Tester.jpg"
            alt=""
          />
          <img
            className="w-1/3"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEXvK2sXoSGHTfWYxykFPfQnEZZROSV2V3ag&s"
            alt=""
          />
        </div>
      </div>
      <div
        className=" mt-5 h-screen"
        style={{
          backgroundImage: `url(${aboutbg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-center items-center">
          <h1 className="text-5xl font-serif mt-52 text-white">
            Filtration Process
          </h1>
          <p className=" w-72 border-l-2 mt-52 border-white text-white mx-2 pl-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
            est animi quis officia nobis ducimus{" "}
          </p>
        </div>
        <div className=" w-9/12 m-auto flex justify-evenly  mt-5 p-1">
          <div className="flex flex-col items-center p-2">
            <div className="w-24 h-24 rounded-full bg-orange-400 flex justify-center items-center">
              <IoIosWater className="text-white" size={80} />
            </div>
            <h1 className="mt-2 text-white">
              Deep Cleanse & Chemiecal Removeal
            </h1>
            <h1 className="text-orange-400 text-2xl">~</h1>
            <p className="text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
              accusantium neque totam minima labore optio, soluta accusamus sunt
              praesentium animi{" "}
            </p>
          </div>
          <div className="flex flex-col items-center p-2">
            <div className="w-24 h-24 rounded-full bg-orange-400 flex justify-center items-center">
              <RiWaterFlashFill className="text-white" size={80} />
            </div>
            <h1 className="mt-2 text-white">Micro Extraction & Sterlisation</h1>
            <h1 className="text-orange-400 text-2xl">~</h1>
            <p className="text-white ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
              accusantium neque totam minima labore optio, soluta accusamus sunt
              praesentium animi{" "}
            </p>
          </div>
          <div className="flex flex-col items-center p-2">
            <div className="w-24 h-24 rounded-full bg-orange-400 justify-center items-center flex">
              <GiWaterRecycling className="text-white" size={80} />
            </div>
            <h1 className="mt-2 text-white">
              Chlorein Disinfeetion For Mineral Water
            </h1>
            <h1 className="text-orange-400 text-2xl">~</h1>
            <p className="text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
              accusantium neque totam minima labore optio, soluta accusamus sunt
              praesentium animi{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;
