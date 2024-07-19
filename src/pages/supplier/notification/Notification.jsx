
import SideBar from "../../../components/supplier/sidebar/Sidebar";
import api from "../../../axiosInterceptors";
import { useEffect, useState } from "react";
import useConversation from "../../../zustand/useConversation";
import useListenNotification from "../../../hooks/useListenNotification";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Notification = () => {  
    const supplierid = localStorage.getItem("supplierid")
    const { notification, setNotification } = useConversation();
    const [page,setPage]=useState(1)
    const [totalPage,setTotalPage]=useState(1)
    useEffect(()=>{
        const fetchNotification = async()=>{
            try {
                const response = await api.get(`/notifications/${supplierid}`,{params:{page}})
                console.log(response)
                if(response.status===200){
                    setNotification(response.data.notification)
                    setTotalPage(response.data.totalpage)
                }

            } catch (error) {
                console.log('error in get notification')
            }
        }
        fetchNotification()
    },[setNotification,supplierid,page])
    useListenNotification()
    const handleChange=(event,value)=>{
      setPage(value)
    }
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
                <div className="p-2 bg-white rounded-lg shadow-xl border-1 border-blue-600 ">
              <h2 className="text-lg font-semibold">{`${notification?.senderId?.first_name} ${notification?.senderId?.last_name}`}</h2>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-2">{notification.createdAt.slice(0, 10)}</p>
            </div>
            </>
            ))
        }
            {/* Add more notifications here */}
          </div>
          <div className='mt-3'> 
        {totalPage>1&&
        <Stack className='flex justify-center items-center mb-3'>
        <Pagination count={totalPage} onChange={handleChange} variant="outlined" color="primary" />
        </Stack>
}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
