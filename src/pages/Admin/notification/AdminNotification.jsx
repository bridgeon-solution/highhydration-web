
import  { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import api from '../../../axiosInterceptors';
import useListenNotification from '../../../hooks/useListenNotification';
import useConversation from '../../../zustand/useConversation';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const AdminNotification = () => {
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const { notification, setNotification } = useConversation();
    const [page,setPage]=useState(1)
    const [toatalPage,setTotalPage]=useState(0)

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await api.get(`/notifications/${adminId}`,{params:{page}});
                if (response.status === 200) {
                    setNotification(response.data.notification);
                    markNotificationsAsSeen(response.data.notification);
                    setTotalPage(response.data.totalpage)
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
    }, [setNotification,adminId,page]);

    useListenNotification();

    const handleChange=(event,value)=>{
        setPage(value)
    }

    return (
        <div className='flex h-screen'>
            <div>
                <AdminSidebar />
            </div>
            <div className="w-full p-4 overflow-scroll bg-[#f8f8f8]">
                <div className="max-w-4xl">
                    <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
                    <hr /><br />
                    
                    <div className="space-y-4">
                        {notification.map((notification) => (
                            <div key={notification._id} className="p-2 bg-white  shadow-xl border-1  rounded-2xl">
                                {notification?.senderId?.first_name && notification?.senderId?.first_name !== "undefined" ? (
                                    <h2 className="text-sm font-bold text-blue-600">
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
                    <div className='m-3 flex justify-center mt-4'>
                    <Stack spacing={2} >
                    <Pagination  count={toatalPage} onChange={handleChange} color="primary" />
                    </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminNotification;
