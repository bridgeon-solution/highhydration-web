import React, { useState } from 'react';
import logo from '../../assets/logorm.png'

import client from '../../assets/Clientimage.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../../axiosInterceptors';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  async function logout(){
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const response = await api.post("/users/logout", null, {
        headers: {
          refreshToken: refreshToken,
        },
      });
      if (response.status === 200) {
        localStorage.clear();
        toast.success(response.data.message)
        navigate('/home')
      }
      console.log(response);
    } catch (error) {
      console.log(error, "logout error");
    }

   
  }


  return (
    <>

      <nav className="bg-[#0E2C72] border-gray-200 fixed top-0 left-0 w-full z-50" >
        <div className="max-w-full flex flex-wrap items-center justify-between  p-1">
       <img src={logo} className="h-10" alt="Logo"  onClick={()=>navigate('/home')}/>
         <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col md:p-0 mt-2 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 " aria-current="page" onClick={() => navigate("/home")}>Home</p>
              </li>
              <li>
                <p  onClick={()=>navigate('/aboutus')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</p>
              </li>
              <li>
                <p onClick={()=>navigate('/service')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</p>
              </li>
              <li>
                <p  onClick={()=>navigate('/productList')} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</p>
              </li>
              <li>
                <p    onClick={()=>navigate('/contactus')}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact us</p>
              </li>
              {userId ? (
                <button
                  className="relative"
                  onClick={handleDropdownToggle}
                >
                  <img className="w-14 h-14 border rounded-full" src={client} alt="Client" />
                  {isDropdownOpen && (
                    <div className="absolute z-10 top-16 right-0 bg-slate-500 border rounded-md shadow-lg"> {/* Changed mt-16 to top-16 */}
                      <ul className="py-2">
                        <li >
                          <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => navigate()}>Account</p>
                        </li>
                        <li>
                          <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => navigate("/userpro")}>Profile</p>
                        </li>
                        <li>
                          <p onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </button>
              ) : (
                <li>
                  <a href="/userlogin" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >Login</a>
                </li>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
            onClick={handleMenuToggle}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </nav>
      <main className="pt-16"> {/* Adjust this padding as needed */}
        {/* Your main content here */}
      </main>
    </>
  );
};

export default Navbar;
