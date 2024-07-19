import  { useEffect, useState } from 'react';
import logo from '../../assets/logorm.png';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosInterceptors';
import toast from 'react-hot-toast';
import { IoIosNotificationsOutline } from "react-icons/io";
import NotificationModal from '../../components/user/modals/notification/NotificationModal';
import useConversation from '../../zustand/useConversation';
import useListenNotification from '../../hooks/useListenNotification';

const Navbar = () => {

  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [shadow, setShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { notification, setNotification } = useConversation();
  const [unseenCount, setUnseenCount] = useState(0);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  async function logout() {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const response = await api.post("/users/logout", null, {
        headers: {
          refreshToken: refreshToken,
        },
      });
      if (response.status === 200) {
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/home');
        setUserData([]);
      }
      console.log(response);
    } catch (error) {
      console.log(error, "logout error");
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await api.get(`/users/${userId}`);
        setUserData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]);
 
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`);
        if (response.status === 200) {
          setNotification(response.data.notification);
          setUnseenCount(notification.filter(n => !n.user_seen).length);
        }
      } catch (error) {
        console.log('error in get notification', error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [notification.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    setIsOpen(true);
    markNotificationsAsSeen();
  };

  const markNotificationsAsSeen = async () => {
    try {
      const unseenNotifications = notification.filter(n => !n.user_seen);
      if (unseenNotifications.length > 0) {
        await api.post(`/notifications/mark-seen/${userId}`, {
          userType:'user',
          notificationIds: unseenNotifications.map(n => n._id),
        });
        // Update local state to mark notifications as seen
        const updatedNotifications = notification.map(n => ({
          ...n,
          user_seen: true
        }));
        setNotification(updatedNotifications);
        setUnseenCount(0);
      }
    } catch (error) {
      console.log('error in marking notifications as seen', error);
    }
  };
  useListenNotification()
  return (
    <>


      <nav className={`bg-[#EFF0F3]  fixed top-0 left-0 w-full z-50 transition-shadow duration-300 py-3 border-b-2 border-opacity-60   ${shadow ? 'shadow-md' : ''} `} >


        <div className="max-w-full flex flex-wrap items-center justify-between  p-1">
          <img src={logo} className="h-10" alt="Logo" onClick={() => navigate('/home')} />

          <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col  items-center md:p-0 mt-2 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
              <li>
                <p className="block  font-semibold  py-2 px-3 text-blue-700 rounded hover:bg-blue-900 md:hover:bg-transparent md:border-0 md:hover:text-blue-900 md:p-0 cursor-pointer"   aria-current="page" onClick={() => navigate("/home")}>Home</p>
              </li>
              <li>
                <p onClick={() => navigate('/aboutus')} className="block  font-semibold  py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-900  md:p-0 cursor-pointer ">About</p>
              </li>
              <li>
                <p onClick={() => navigate('/service')} className="block font-semibold  py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-900  md:p-0 cursor-pointer ">Services</p>
              </li>
              <li>
                <p onClick={() => navigate('/products')} className="block font-semibold   py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-900  md:p-0 cursor-pointer">Products</p>
              </li>
              <li>
                <p onClick={() => navigate('/contactus')} className="block font-semibold    py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-900  md:p-0 cursor-pointer ">Contact us</p>
              </li>
  
              <li className='relative'>
               <IoIosNotificationsOutline size={25} onClick={handleNotificationClick}   className="text-4xl mt-2 mx-2 text-blue-700  cursor-pointer hover:text-blue-900"/>
               {unseenCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {unseenCount}
                  </span>
                )}
               {isOpen&&<NotificationModal isOpen={isOpen} setIsOpen={setIsOpen}/>}
              </li>

              {userId ? (
                <button
                  className="relative"
                  onClick={handleDropdownToggle}
                >
<img src={userData.image||"https://i.pinimg.com/236x/c2/7e/b7/c27eb77c278f37d9a204bff5a661b83b.jpg"} className="w-14 h-14 border rounded-full ring-1 ring-blue-700" alt="Client" onClick={() => navigate('/home')} />

{isDropdownOpen && (
//                    <div className="absolute z-10 top-16 right-0 bg-slate-500 border rounded-md shadow-lg w-36">
//                    <ul className="py-2">
//                    <li>
//   <div className="flex items-center space-x-2 py-2  cursor-pointer rounded-lg">
//     <img src={userData.image||"https://i.pinimg.com/236x/c2/7e/b7/c27eb77c278f37d9a204bff5a661b83b.jpg"} className="w-10 h-10 rounded-full border" alt="User" />
//     <p className="text-white truncate">{userData?.first_name}</p>
//   </div>
// </li>
//  <li>
//                        <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => navigate('/orderdetails')}>Orders</p>
//                      </li>
//                      <li>
//                        <p className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => navigate("/userpro")}>Profile</p>
//                      </li>
//                      <li>
//                        <p onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</p>
//                      </li>
//                    </ul>
//                  </div>
<div className="absolute z-10 top-16 right-0 bg-[#EFF0F3] rounded-md shadow-xl w-36 sm:w-48 lg:w-48">
<ul className="py-2">
  <li>
    <div className="flex items-center space-x-2 py-2 cursor-pointer rounded-lg px-4 hover:bg-slate-600">
      <img 
        src={userData.image || "https://i.pinimg.com/236x/c2/7e/b7/c27eb77c278f37d9a204bff5a661b83b.jpg"} 
        className="w-14 h-14 rounded-full border" 
        alt="User" 
      />
      <p className="text-gray-950 truncate text-3xl italic font-semibold ">{userData?.first_name}</p>
    </div>
  </li>
  <li>
    <p 
      className="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer" 
      onClick={() => navigate('/orderdetails')}
    >
      Orders
    </p>
  </li>
  <li>
    <p 
      className="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer" 
      onClick={() => navigate("/userpro")}
    >
      Profile
    </p>
  </li>
  <li>
    <p 
      onClick={logout} 
      className="block px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer"
    >
      Logout
    </p>
  </li>
</ul>
</div>

                  )}
                </button>
              ) : (
                <li>
                  <a href="/userlogin" className="block  font-semibold py-2 px-3 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 "
                  >Login</a>
                </li>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-blue-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 "
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
