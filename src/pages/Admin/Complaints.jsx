import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import api from '../../axiosInterceptors';
import AdminChatModal from '../../components/Admin/modal/AdminChatModal';
import useConversation from '../../zustand/useConversation';


const Complaints = () => {
const [message, setMessage] = useState([]);
    const[modal,setModal]=useState(false)
const [conversations, setConversations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setSelectedConversation } = useConversation();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get('/messages/users');
                if (response.status === 200) {
                    setConversations(response.data.conversation);
                }
            } catch (error) {
                console.log(error, 'error the message fetch');
            }
        };
        fetchMessages();
    }, []);

    const handleCardClick = (conversation) => {
        setSelectedConversation(conversation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedConversation(null);
    };
    
    return (
        <div className='flex w-full h-screen overflow-hidden bg-[#F8F8F8]'>
            <div className='mt-2 min-h-screen'>
            {!isModalOpen &&  <AdminSidebar />}
            </div>
            <div className="relative flex flex-col gap-2 m-2 lg:w-1/2 w-full  overflow-scroll">
            <h3 className='mx-3 mt-2'>Chat</h3>
            <hr />
                {conversations.map((conversation) => (
                    <div
                        key={conversation._id}
                        className="cursor-pointer w-full sm:w-1/5 lg:w-full flex items-center s:rounded-3xl bg-white shadow-xl rounded-lg p-2  px-3 transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        onClick={() => handleCardClick(conversation?.participants)}
                    >
                        {conversation.participants.map((participant) => (
                            <div key={participant._id} className="relative flex items-center gap-4 w-full">
                                <img
                                    src={participant.image || "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
                                    alt={participant.first_name || "User Image"}
                                    className="inline-block h-16 w-16 rounded-full object-cover object-center border-2 border-gray-300"
                                />
                                <div className="flex-col flex">
                                    <h5 className="font-sans text-xl font-semibold text-gray-900">
                                        {participant.first_name || "Anonymous"}
                                    </h5>
                                    <p className="font-sans text-sm font-medium text-gray-600">
                                        {participant.email || "No email provided"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>


        <div className="relative  flex flex-wrap justify-evenly gap-4 lg:w-full lg:p-4 overflow-scroll ">
       
    {message.map((message) => (
        <div key={message._id} 
        className="w-full sm:w-1/2 lg:w-2/5 flex flex-col items-center bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out"
        onClick={()=>setModal(true)}>
            <div className="relative flex items-center gap-4 w-full">
                <img
                    src={message.userId?.image || "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
                    alt={message.userId?.first_name || "User Image"}
                    className="inline-block h-16 w-16 rounded-full object-cover object-center border-2 border-gray-300"
                />
                <div className="flex flex-col">
                    <h5 className="font-sans text-xl font-semibold text-gray-900">
                        {message.userId?.first_name || "Anonymous"}
                    </h5>
                    <p className="font-sans text-sm font-medium text-gray-600">
                        {message.userId?.email || "No email provided"}
                    </p>
                </div>
            </div>
            <div className="w-full mt-4">
                <p className="font-sans text-base font-light text-gray-700 leading-relaxed">
                    {message.message || "No message content"}
                </p>
            </div>
        </div>
    ))}
</div>
{isModalOpen && (
                <AdminChatModal
                   
                    closeModal={closeModal}
                />
            )}

{modal&&(
    <ChatModal setModal={{setModal}} />
)}

 

  

        

        </div>
    );
};

export default Complaints;
