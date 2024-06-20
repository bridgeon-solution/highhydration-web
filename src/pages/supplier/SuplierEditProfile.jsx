import React from 'react'

const SuplierEditProfile = () => {
  return (
<div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 z-50">
    <div className="max-w-3xl w-full mx-4 md:mx-auto flex flex-col h-full border rounded-lg bg-white overflow-hidden z-60">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
                <button onClick={() => setIsModal(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full mx-auto">
                <form>
                    <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Complete Account Setup</h2>
                        <label className="relative w-16 h-16 cursor-pointer">
                            <input
                                type="file"
                                id="imageUpload"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                            <img
                                id="imagePreview"
                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                src='selectedImage !== client ? selectedImage : client'
                                alt="Client"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-1/2 p-4">
                            <input
                                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="first_name"
                                name="first_name"
                            />
                       
                            <input
                                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email Address"
                            />
                        
                         
                            <div className="flex mt-4  justify-end">
                                <button type="button" className="hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded transition-colors duration-300">
                                    Cancel
                                </button>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 p-4">
                        <input
                                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="last_name"
                            />

                            <input
                                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="phone_number"
                                name="phone_number"
                            />

                            <div className="flex justify-start mt-4 md:mt-0">
                                <button type="submit" className="flex bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded transition-colors duration-300">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div> 
        </div>
    </div>
</div>

  )
}

export default SuplierEditProfile