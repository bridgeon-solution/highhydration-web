import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Home1 from './Home1';
import Home2 from './Home2';
import Countup from '../../../components/User/Countup';
import Footer from '../../../components/User/Footer';
import Products from '../../users/Products'
import ProductList from '../../../components/User/ProductList';
function App() {
  const motionDivRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (motionDivRef.current) {
        const { top } = motionDivRef.current.getBoundingClientRect();
        const threshold = window.innerHeight * 0.9; // Adjust as needed
        setIsVisible(top < threshold);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='bg-[#fdfdfd]'>
    
      <Home1 />
      <motion.div
        ref={motionDivRef}
        initial={{ x: -100 }} // Start from the left (-100px)
        animate={{ x: isVisible ? 0 : -100 }} // Animate when isVisible is true
        dragConstraints={{ left: -100, right: 100 }}
         transition={{type:'spring'}}>
        <Home2 />
      </motion.div>
       <Countup />
       <Products/>
      <Footer />
    </div>
  );
}

export default App;
