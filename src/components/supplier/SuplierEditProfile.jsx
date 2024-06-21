import React, { useEffect, useState } from 'react'
import client from "../../assets/Supplier/Client.jpg"
import api from '../../axiosInterceptors'
import {SupplierValidation} from '../supplier/SupplierValidation'
import { Formik, useFormik } from 'formik'
const SuplierEditProfile = ({setIsModal}) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const[data,setData]=useState(null)
const supplierId=localStorage.getItem('supplierid')
  async function fetchData(){
   const response=await api.get(`suppliers/supplierById/${supplierId}`)
   setData(response.data.supplier[0])
   setImagePreview(response?.data.supplier[0].image)
  
  }

useEffect(()=>{
fetchData()
},[])

const formik=useFormik({
    initialValues:{
        first_name:'',
        email:'',
        last_name:'',
        phone_number:'',
        image:''
    },
validationSchema:SupplierValidation,
  onSubmit:async (values)=>{

console.log(values,"rdrdrrd");
const formData = new FormData();
formData.append('first_name', values.first_name);
formData.append('email', values.email);
formData.append('last_name', values.last_name);
formData.append('phone_number',values.phone_number);
if (values.image) {
    formData.append('image', values.image);
}

for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`,"formikk");
  }
    try {
        const response=await api.patch(`suppliers/supplier/${supplierId}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
        if(response.status===200){
            setIsModal(false)
        }
        console.log(response,"repoo");
    } catch (error) {
        console.log(error);
    }



    }

});


    useEffect(() => {
        if (data) {
            formik.setFieldValue('first_name', data.first_name || '');
            formik.setFieldValue('email', data.email || '');
            formik.setFieldValue('last_name', data.last_name || '');
            formik.setFieldValue('phone_number', data.phone_number || '');
            formik.setFieldValue('image', data.image|| '');
           
        }
    }, [data]);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        formik.setFieldValue('image', file);
    
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      };






  return (


<div className="fixed inset-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 z-50">
<div className="max-w-3xl w-full mx-4 md:mx-auto flex flex-col border rounded-lg bg-white shadow-xl overflow-hidden z-60">
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Edit Profile</h2>
            <button onClick={() => setIsModal(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 mx-auto">
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col md:flex-row items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-0">Complete Account Setup</h2>
                    <label className="relative w-16 h-16 cursor-pointer ml-auto">
                        <input
                            type="file"
                            id="imageUpload"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                        />
                        <img
                            id="imagePreview"
                            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                            src={imagePreview}
                            alt="Client"
                        />
                    </label>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                        <input
                            className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            placeholder="First Name"
                            name="first_name"
                            onChange={formik.handleChange}
                            value={formik.values.first_name}
                        />
                        {formik.touched.first_name && formik.errors.first_name ? (
                            <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
                        ) : <p className="text-transparent">Validation message placeholder</p>}
                        <input
                            className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            placeholder="Email Address"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        ) : <p className="text-transparent">Validation message placeholder</p>}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="hover:bg-blue-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded transition-colors duration-300"
                                onClick={() => setIsModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-2 md:p-4">
                        <input
                            className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={formik.handleChange}
                            value={formik.values.last_name}
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                            <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
                        ) : <p className="text-transparent">Validation message placeholder</p>}
                        <input
                            className="w-full mb-3 md:mb-4 px-3 md:px-4 py-2 md:py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                            name="phone_number"
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                        />
                        {formik.touched.phone_number && formik.errors.phone_number ? (
                            <p className="text-red-500 text-sm">{formik.errors.phone_number}</p>
                        ) : <p className="text-transparent">Validation message placeholder</p>}
                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="flex bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded transition-colors duration-300"
                            >
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