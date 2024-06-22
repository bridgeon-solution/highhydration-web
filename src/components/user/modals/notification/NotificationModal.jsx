import { useEffect } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import api from '../../../../axiosInterceptors';
import useConversation from '../../../../zustand/useConversation';
import useListenNotification from '../../../../hooks/useListenNotification';

const NotificationModal = ({ isOpen, setIsOpen }) => {
  const userId = localStorage.getItem("userId");
  const { notification, setNotification } = useConversation();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await api.get(`/notifications/${userId}`);
        console.log(response);
        if (response.status === 200) {
          setNotification(response.data.notification);
          markNotificationsAsSeen(response.data.notification);
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
            userType:"user"
          });
        }
      } catch (error) {
        console.log('error in marking notifications as seen', error);
      }
    };

    if (userId) {
      fetchNotification();
    }
  }, [userId, setNotification]);

  useListenNotification();

  return (
    <div className="relative inline-block text-left">
      <div
        className={`origin-top-right absolute right-0 mt-2 w-96 p-3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-transform transform ${
          isOpen ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className="flex justify-between m-2">
          <h3 className="mx-2 flex items-center">Notification</h3>
          <IoIosCloseCircle className="text-red-400" size={17} onClick={() => setIsOpen(false)} />
        </div>
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
