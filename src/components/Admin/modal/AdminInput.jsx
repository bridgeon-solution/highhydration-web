import React, { useState } from 'react';
import useConversation from '../../../zustand/useConversation';
import api from '../../../axiosInterceptors';
import useListenMessages from '../../../hooks/useListenMessages';

const AdminInput = () => {
    const [message, setMessage] = useState('');
    const { messages, setMessages, selectedConversation } = useConversation();
    const [error, setError] = useState(null);
    const adminId = import.meta.env.VITE_ADMIN_ID;
    const id = selectedConversation[0]._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (message.trim() === '') {
            setError("Message cannot be empty");
            return;
        }
    
        try {
            const response = await api.post(`/messages/${adminId}`, { receiver: id, message });
            if (response.status === 201) {
                const data = response.data.newMessage;
                setMessages([...messages, data]);
                setMessage('');
                setError(null); // Reset error state
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
            setError("Failed to send message. Please try again.");
        }
    };
    
    useListenMessages()

    return (
        <div className="border-t p-4">
            <div className="mb-4">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                    id="message"
                    name="message"
                    className="h-24 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="w-full rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
                onClick={handleSubmit}
            >
                Send
            </button>
        </div>
    );
};

export default AdminInput;
