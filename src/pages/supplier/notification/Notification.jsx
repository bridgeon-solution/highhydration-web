import { useEffect } from "react";
import SideBar from "../../../components/supplier/sidebar/Sidebar";
import api from "../../../axiosInterceptors";

// useEffect(()=>{
//     // const fetchNotification = async()=>{
//     //     try {
//     //         const response = await a
//     //     } catch (error) {
//     //         console.log('error in fetch notification')
//     //     }
//     // }
// },[])

const Notification = () => {
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
            [...Array(6)].map((x)=>(
                <>
                <div className="p-4 bg-white rounded-lg shadow-xl border-1 border-blue-600 ">
              <h2 className="text-xl font-semibold">Notification Title 1</h2>
              <p className="text-gray-600">This is a brief description of the notification.</p>
              <p className="text-sm text-gray-400 mt-2">Date and Time</p>
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
