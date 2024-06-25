
import  { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import api from '../../../axiosInterceptors';
import useListenNotification from '../../../hooks/useListenNotification';
import useConversation from '../../../zustand/useConversation';

const AdminNotification = () => {
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const { notification, setNotification } = useConversation();

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await api.get(`/notifications/${adminId}`);
                if (response.status === 200) {
                    setNotification(response.data.notification);
                    markNotificationsAsSeen(response.data.notification);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        const markNotificationsAsSeen = async (notifications) => {
            try {
              const unseenNotifications = notifications.filter(n => !n.admin_seen);
              if (unseenNotifications.length > 0) {
                await api.post(`/notifications/mark-seen/${adminId}`, {
                  
                  notificationIds: unseenNotifications.map(n => n._id),
                  userType:"admin"
                });
              }
            } catch (error) {
              console.log('error in marking notifications as seen', error);
            }
          };
      
          if (adminId) {
            fetchNotification();
          }
    }, [setNotification,adminId]);

    useListenNotification();



    return (
        <div className='flex h-screen'>
            <div>
                <AdminSidebar />
            </div>
            <div className="w-full p-4 overflow-scroll">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
                    <hr /><br />
                    <div className="space-y-4">
                        {notification.map((notification) => (
                            <div key={notification._id} className="p-2 bg-white rounded-lg shadow-xl border-1 border-blue-600">
                                {notification?.senderId?.first_name && notification?.senderId?.first_name !== "undefined" ? (
                                    <h2 className="text-sm font-bold">
                                        {`${notification?.senderId?.first_name} ${notification?.senderId?.last_name}`}
                                    </h2>
                                ) : (
                                    <p className="text-sm font-bold">
                                        {notification?.productId?.productname}
                                    </p>
                                )}
                                <p className="text-gray-600">{notification.message}</p>
                                <p className="text-sm text-gray-400 mt-2">{notification.createdAt.slice(0, 10)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNotification;
