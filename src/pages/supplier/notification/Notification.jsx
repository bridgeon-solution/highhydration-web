import SideBar from "../../../components/supplier/Sidebar";
import api from "../../../axiosInterceptors";
import { useEffect } from "react";
import useConversation from "../../../zustand/useConversation";
import useListenNotification from "../../../hooks/useListenNotification";


const Notification = () => {  
    const supplierid = localStorage.getItem("supplierid")
    const { notification, setNotification } = useConversation();
    useEffect(()=>{
        const fetchNotification = async()=>{
            try {
                const response = await api.get(`/notifications/${supplierid}`)
                console.log(response)
                if(response.status===200){
                    setNotification(response.data.notification)
                }

            } catch (error) {
                console.log('error in get notification')
            }
        }
        fetchNotification()
    },[setNotification,supplierid])
    useListenNotification()
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <div className="mt-2 min-h-screen w-1/4shadow-lg">
        <SideBar />
      </div>
      <div className="w-full pt-5 overflow-scroll">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
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
  );
};

export default Notification;
