
import TextInput from "./TextInput";
import ModalMessages from "./ModalMessages";
import useListenMessages from "../../../hooks/useListenMessages";

const ChatModal = ({ isModalOpen, toggleModal }) => {

   

   
useListenMessages()
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'}`}>
            <div className="max-w-xl mx-auto flex w-full flex-col border rounded-lg bg-white p-8">
                <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
                <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share with us!</p>
                <ModalMessages />
                <TextInput />
                <div className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</div>
                <button onClick={toggleModal} className="mt-2 border border-transparent rounded-md shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Close
                </button>
            </div>
        </div>
    )
}

export default ChatModal
