import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import api from '../../axiosInterceptors';

const Complaints = () => {
    const [message, setMessage] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.post('/users/feedbacks')
                if (response.status === 200) {
                    setMessage(response.data.data)
                }
            } catch (error) {
                console.log(error, 'error the message fetch')
            }
        }
        fetchMessages()
    }, [])
    
    return (
        <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]'>
            <div className='mt-2 min-h-screen'>
                <AdminSidebar />
            </div>
            <div className='mt-1 w-full flex flex-wrap p-3 gap-4 overflow-scroll overscroll-none'>
                {message.map((message) => (
                    <div key={message._id} className='w-56 flex items-center justify-center'>
                        <div className="flex flex-col items-center justify-center max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                            <img
                                src={message.userId?.image || "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
                                alt="Tania Andrew"
                                className="h-32 w-32 rounded-full object-cover object-center"
                            />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2 flex justify-center">{message.userId?.first_name}</div>
                                <p className="text-sm text-gray-700">{message.userId?.email}</p>
                            </div>
                            <div className="px-6 pb-4">
                                <span className="text-gray-700 ">
                                    {message.message}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Complaints;
