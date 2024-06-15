import React from 'react';
import { FaSearch } from 'react-icons/fa';
import AdminMessages from './AdminMessages';
import AdminInput from './AdminInput';
import useConversation from '../../../zustand/useConversation';

const AdminChatModal = ({  closeModal }) => {
  
   
 
    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="max-w-3xl w-full mx-auto flex flex-col h-full border rounded-lg bg-white overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Chat</h2>
                        <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="mb-5 leading-relaxed text-gray-600">Start a conversation with us!</div>

                    {/* Chat messages */}
                    <AdminMessages />
                </div>

                {/* Input area */}
               <AdminInput />
            </div>
        </div>
    );
};

export default AdminChatModal;
