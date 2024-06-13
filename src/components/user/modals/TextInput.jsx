import  { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import api from '../../../axiosInterceptors';
import useConversation from '../../../zustand/useConversation';
import useListenMessages from '../../../hooks/useListenMessages';

const TextInput = () => {
    const [message, setMessage] = useState('')
    const { messages, setMessages } = useConversation();
    const [error, setError] = useState(null);


    const userId = localStorage.getItem("userId")
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (message.trim() === '') {
          setError("Message cannot be empty");
          return;
      }
  
      try {
          const response = await api.post(`/messages/${userId}`, { message });
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
    <>
    <div className="flex justify-between">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full resize-none rounded border border-gray-300 bg-white py-2 px-3 text-base leading-6 text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                    <button onClick={handleSubmit} className="bg-indigo-500 text-white rounded-full p-2 ml-2 hover:bg-indigo-600 focus:outline-none">
                    <IoMdSend />
                    </button>
                   
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                </>
  )
}

export default TextInput
