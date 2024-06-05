import React from 'react'

const FeedbackModal = () => {
  return (
    <div 
    id="popup-modal"
    tabIndex="-1"
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
>
    <div className="bg-white p-6 rounded shadow-md">
        <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Feedback</h2>
        <p className="mb-5 leading-relaxed text-gray-600">If you had any issues or you liked our product, please share with us!</p>
        <div className="mb-4">
            <label htmlFor="message" className="text-sm leading-7 text-gray-600">Message</label>
            <textarea 
                id="message" 
                name="message" 
             className="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
        </div>
        <button
          className="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
        >
            Send
        </button>
        <button
            className="mt-2 rounded border-0 bg-gray-300 py-2 px-6 text-lg text-black hover:bg-gray-400 focus:outline-none"
            
        >
            Close
        </button>
        <p className="mt-3 text-xs text-gray-500">Feel free to connect with us on social media platforms.</p>
    </div>
</div>
  )
}

export default FeedbackModal