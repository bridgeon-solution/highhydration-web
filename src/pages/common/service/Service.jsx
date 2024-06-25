import { MdWorkspacePremium } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { SlBasket } from "react-icons/sl";
import { GiNuclearWaste } from "react-icons/gi";
import { FaEarthAmericas } from "react-icons/fa6";
import { RiEmotionHappyLine } from "react-icons/ri";
import { motion } from 'framer-motion';
import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
import Footer from '../../../components/user/footer/Footer';
import Navbar from '../Navbar';
const Service = () => {
    const shimmerVariants = {
        initial: { backgroundPosition: '200% center' },
        animate: {
          backgroundPosition: '-200% center',
          transition: {
            duration:10,
            ease: 'linear',
            repeat: Infinity,
          },
        },
      };
    
      // const drippingVariants = {
      //   initial: { y: 0, opacity: 1 },
      //   animate: {
      //     y: [0, 100, 110, 100],
      //     opacity: [1, 1, 0, 0],
      //     transition: {
      //       duration:10,
      //       ease: 'easeInOut',
      //       repeat: Infinity,
      //       repeatDelay:10,

      //     },
      //   },
      // };
  return (
    <>
    <Navbar/>
   
    <div className="w-full bg-gradient-to-r bg-[#EFF0F3] flex flex-col justify-center items-center px-1">
<div>
<Navbar/>

<motion.h1
  className="text-5xl sm:text-5xl md:text-7xl text-center font-bold text-blue relative my-2 mt-2 mb-2"
  style={{
    backgroundImage: 'linear-gradient(120deg, rgba(0, 128, 255, 0.5) 0%, rgba(0, 128, 255, 0.8) 50%, rgba(0, 128, 255, 0.5) 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent', 
  }}
  variants={shimmerVariants}
  initial="initial"
  animate="animate"
>
  Our Services
</motion.h1>



    </div>
    
    <div className='w-full  mb-5 px-4'>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* First card */}
    <div className="flex justify-center  ">
      <Card className="w-full border-2  transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <MdWorkspacePremium className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Premium Quality Mineral Water
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            Enjoy our premium mineral water, sourced from pristine springs and rigorously filtered for unmatched purity and taste. Rich in essential minerals, it quenches thirst and replenishes vital nutrients.
          </Typography>
        </CardBody>
      </Card>
    </div>

    {/* Second card */}
    <div className="flex justify-center">
      <Card className="w-full border-2  transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <TbTruckDelivery className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Convenient Delivery Options
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            Our flexible delivery options ensure your orders arrive promptly and conveniently. Choose from one-time deliveries or regular schedules to fit your needs, guaranteeing fresh water whenever you need it.
          </Typography>
        </CardBody>
      </Card>
    </div>

    {/* Third card */}
    <div className="flex justify-center">
      <Card className="w-full border-2  transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <SlBasket className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Variety of Products
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            Select from a wide range of products tailored to meet your hydration needs. From standard bottles to mineral-enriched options, our diverse selection offers something for everyone, ensuring top quality and value.
          </Typography>
        </CardBody>
      </Card>
    </div>

    {/* Fourth card - shown on medium and larger screens */}
    <div className="flex justify-center  lg:flex">
      <Card className="w-full border-2  transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <GiNuclearWaste className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Hygiene and Safety Measures
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            We prioritize your health with stringent hygiene and safety measures. Our facilities are regularly cleaned, and staff follow best practices for hygiene, ensuring every bottle is pure and safely handled.
          </Typography>
        </CardBody>
      </Card>
    </div>

    {/* Fifth card - shown on medium and larger screens */}
    <div className="flex justify-center  lg:flex">
      <Card className="w-full border-2  transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <FaEarthAmericas className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Environmental Sustainability
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            Committed to sustainability, we source from ethical suppliers, use eco-friendly packaging, and implement energy-efficient processes. Enjoy pure water while supporting our mission to protect the environment.
          </Typography>
        </CardBody>
      </Card>
    </div>


    <div className="flex justify-center  lg:flex " >
      <Card className="w-full border-2 transition-transform transform hover:scale-105 hover:shadow-md bg-gradient-to-b from-blue-500 to-blue-300">
        <CardBody className="flex flex-col items-center">
          <RiEmotionHappyLine className="w-20 h-20 mb-2 text-white" />
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center text-white">
            Customer Satisfaction Guarantee
          </Typography>
          <Typography className="text-center p-4 leading-relaxed text-white">
            Your satisfaction is our priority. We offer a comprehensive guarantee, with our dedicated team ready to assist with exchanges, refunds, or replacements if you're not completely happy with your purchase.
          </Typography>
        </CardBody>
      </Card>
    </div>
  </div>
</div>





 <Footer/>
  </div>
  </>
  )
}

export default Service


