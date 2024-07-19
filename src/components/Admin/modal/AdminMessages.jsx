import React, { useEffect } from 'react';
import useConversation from '../../../zustand/useConversation';
import api from '../../../axiosInterceptors';

const adminId = import.meta.env.VITE_ADMIN_ID;

const AdminMessages = () => {
    const { messages, setMessages, selectedConversation } = useConversation();
    const id = selectedConversation[0]._id;

    useEffect(() => {
        const getMessages = async () => {
            try {
                if (selectedConversation) {
                    const response = await api.post(`/messages/send/${id}`, { senderId: adminId });
                    console.log(response);
                    if (response.status === 200) {
                        setMessages(response.data.messages || []);
                    }
                    console.log(response.data.messages);
                }
            } catch (error) {
                console.log(error.message, 'error in get messages');
            }
        };

        getMessages();
    }, [selectedConversation, setMessages]);

    return (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex ${adminId === message.senderId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 ${adminId === message.senderId ? 'ml-2' : 'mr-2'}`}></div>
                    <div className={`flex flex-col max-w-xs p-2 rounded-lg ${adminId === message.senderId ? 'bg-indigo-500 text-white self-end' : 'bg-gray-100 text-gray-900 self-start'}`}>
                        <div className="text-sm text-gray-600">{message.email}</div>
                        <div className="text-base">{message.message}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminMessages;
