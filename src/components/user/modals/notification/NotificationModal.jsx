import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import api from '../../../../axiosInterceptors';
import useConversation from '../../../../zustand/useConversation';
import useListenNotification from '../../../../hooks/useListenNotification';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const NotificationModal = ({ isOpen, setIsOpen }) => {
  const userId = localStorage.getItem("userId");
  const { notification, setNotification } = useConversation();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`, { params: { page } });
        if (response.status === 200) {
          setNotification(response.data.notification);
          markNotificationsAsSeen(response.data.notification);
          setTotalPage(response.data.totalpage);
        }
      } catch (error) {
        console.log('error in get notification', error);
      }
    };

    const markNotificationsAsSeen = async (notifications) => {
      try {
        const unseenNotifications = notifications.filter(n => !n.user_seen);
        if (unseenNotifications.length > 0) {
          await api.post(`/notifications/mark-seen/${userId}`, {
            notificationIds: unseenNotifications.map(n => n._id),
            userType: "user"
          });
        }
      } catch (error) {
        console.log('error in marking notifications as seen', error);
      }
    };

    if (userId) {
      fetchNotification();
    }
  }, [userId, setNotification, page]);

  useListenNotification();

  const handleChange = (e, value) => {
    setPage(value);
  };

  const getWidthClass = () => {
    if (screenSize > 768) {
      return 'relative ';
    } else {
      return `absolute z-20 w-56  `;
    }
  };

  return (
    <div className={` ${getWidthClass()} items-center inline-block text-left`}>
      <div
        className={`origin-top-right absolute w-96  right-0 mt-2 p-3  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className="flex justify-between m-2 ">
          <h3 className="mx-2 flex items-center">Notification</h3>
          <IoIosCloseCircle className="text-red-400" size={17} onClick={() => setIsOpen(false)} />
        </div>
        {totalPage > 1 && (
          <Stack className="flex justify-center items-center mb-3">
            <Pagination count={totalPage} onChange={handleChange} variant="outlined" color="primary" />
          </Stack>
        )}
        <div className="mb-4 max-h-96 overflow-y-auto border p-2 rounded">
          {notification.map((notification) => (
            <div key={notification._id} className="p-2 bg-white rounded-lg shadow-xl border-1 mb-2 border-blue-600">
              <p className="text-sm font-bold">{notification.productId.productname}</p>
              <p className="text-gray-600">{notification.notification}</p>
              <p className="text-sm text-gray-400 mt-2">{notification.createdAt.slice(0, 10)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
