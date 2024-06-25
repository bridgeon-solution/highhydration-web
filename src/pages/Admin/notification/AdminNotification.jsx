import  { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar'
import api from '../../../axiosInterceptors';

const AdminNotification = () => {
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const [notification , setNotification] = useState([])
    useEffect(()=>{
        const fetchNotification = async()=>{
            try {
                const response = await api.get(`/notifications/${adminId}`)
                console.log(response)
                if(response.status===200){
                    setNotification(response.data.notification)
                }

            } catch (error) {
                console.log('error in get notification')
            }
        }
        fetchNotification()
    },[adminId])
  return (
    <div className='flex h-screen'>
      <div>
        <AdminSidebar />
      </div>
      <div className="w-full p-4  overflow-scroll">
        <div className="max-w-4xl ">
          <h1 className="text-3xl font-semibold mb-6">Notifications</h1> <hr /><br />
          <div className="space-y-4">
            {/* Example Notification */}
            { 
            notification.map((notification)=>(
                <>
                <div className="p-4 bg-white rounded-lg shadow-xl border-1 border-blue-600 ">
              <h2 className="text-xl font-semibold">{`${notification?.senderId?.first_name} ${notification?.senderId?.last_name}`}</h2>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-2">{notification.createdAt.slice(0, 10)}</p>
            </div>
            </>
            ))
        }
     
            {/* Add more notifications here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNotification
