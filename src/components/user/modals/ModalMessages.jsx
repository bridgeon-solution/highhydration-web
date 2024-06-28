import {  useEffect } from 'react';
import useConversation from '../../../zustand/useConversation';
import api from '../../../axiosInterceptors';
let adminId = import.meta.env.VITE_ADMIN_ID;

const ModalMessages = () => {
    const userId = localStorage.getItem("userId");
    const { messages, setMessages,  } = useConversation();
    console.log(messages,'hiiii')
 

    useEffect(() => {
      const getMessages = async () => {
        try {
         
            const response = await api.post(`/messages/send/${adminId}`,{senderId:userId});
            if (response.status === 200) {
              setMessages(response.data.messages || []);
            }
            console.log(response.data.messages);
          
        } catch (error) {
          console.log(error.message, 'error in get messages');
        }
      };
  
      getMessages();
    }, [     setMessages]);

    return (
        <div className="mb-4 max-h-60 overflow-y-auto border p-2 rounded">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`mb-2 p-2 rounded ${
                        msg.senderId === userId ? 'bg-indigo-100 text-right' : 'bg-gray-100 text-left'
                    }`}
                >
                    <p className="text-sm text-gray-700">{msg.message}</p>
                </div>
            ))}
        </div>
    );
};

export default ModalMessages;
