import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import ad from '../../assets/Supplier/sup1.png';
import img from '../../assets/Supplier/uploadimage.jpg';
import { IoMdAdd } from "react-icons/io";
import { IoIosSave } from "react-icons/io";
import { useFormik } from 'formik';
import { addproductValidation } from '../../components/Admin/validation/addproductValidation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';

const baseUrl =import.meta.env.VITE_BASE_URL; 

const initialValues = {
  productname: '',
  productDescription: '',
  image: '',
  category: '',
  stock: '',
  price: ''
};

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()



  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Display image preview
      console.log(file.name, "dunkiiii"); // Log the file name
  
      formik.setFieldValue('image', file); // Store file object in formik values
    }
  };





  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addproductValidation,
    onSubmit: async (values,{ resetForm }) => {
      console.log('Formik onSubmit called'); // Log to check if onSubmit is triggered
      console.log(values,'hiiiiiiiiiiiiiiii')
      try {
        const formData = new FormData();
        formData.append('productname', values.productname);
        formData.append('productDescription', values.productDescription);
        formData.append('image', values.image); // Add the file object directly
        formData.append('category', values.category);
        formData.append('stock', values.stock);
        formData.append('price', values.price);
    
        console.log('Form data before sending:', formData); // Log form data
    
        // Debug: Check if file data is properly appended to formData
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }
    
        // const response = await axios.post(`${baseUrl}/admin/addProducts`, formData);
        setLoading(true)
        const response = await axios.post(`${baseUrl}/admin/products`, formData);
        setLoading(false)
        if(response.status===203){
          toast.error('Product already exist');
        }
        if(response.status===201){

          toast.success('Product Created Succesfully');
          navigate('/product')
         resetForm()
        }else{
          toast.error('Product Creation Failed');
        }
        console.log(response, "response");
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
  });

  const { values, handleBlur, handleChange, handleSubmit, errors } = formik;

  return (
    <div className='flex w-full h-screen overflow-hidden bg-white'>
      {loading&& <Loader/>}
      <div className='mt-2 min-h-screen'>
        <AdminSidebar />
      </div>

      <div className='mt-1 w-full overflow-scroll overscroll-none'>
        <div className='w-full h-1/4 flex border rounded-lg' style={{ background: 'linear-gradient(to right, #2D52E7, #ffffff)' }}>
          <div className='w-3/4'>
            <p className='text-white s:flex s:justify-center s:text-2xl s:items-center md:text-6xl font-bold md:pt-12 md:pl-'>Welcome To High Hydration</p>
          </div>
          <div className='s:p-1 md:p-5'>
            <img className='s:h-14 s:w-14 md:h-36 md:w-36 xl:h-40 xl:w-36' src={ad} alt="Advertisement" />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='w-full'>
            <div className='mt-2 w-full flex justify-between'>
              <div className='flex w-1/6 ml-2 items-center'>
                <button type='button' className='flex'>
                  <IoMdAdd className='w-6 h-6' />
                  <p className='font-semibold ml-2'>Add new Product</p>
                </button>
              </div>
              <button type='submit'>
                <div className='flex bg-[#6781E9] py-2 px-5 mr-3 border rounded-full items-center'>
                  <IoIosSave className='w-6 h-6 text-white' />
                  <p className='text-white font-semibold ml-2'>Save</p>
                </div>
              </button>
            </div>

            <div className='w-full flex mt-3 justify-around'>
              <div className='w-3/5 bg-[#f2f2f2] rounded-xl p-4'>
                <p className='font-semibold'>General information</p>
                <div className='mt-2'>
                  <label htmlFor="productname" className='font-semibold'>Product Name</label>
                  <input id="productname" name="productname" className="w-full h-10 mb-2 px-3 py-3 rounded-lg font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]" placeholder='Product Name'
                    value={values.productname} onChange={handleChange} onBlur={handleBlur} />
                </div>
                {errors.productname && <small className="text-xs italic text-red-500">{errors.productname}</small>}
                <div className='mt-2'>
                  <label htmlFor="productDescription" className='font-semibold'>Product Description</label>
                  <textarea id="productDescription" name="productDescription" className="w-full h-32 resize-none rounded-lg px-3 py-2.5 font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]" placeholder="Product description..." value={values.productDescription} onChange={handleChange} onBlur={handleBlur} />
                </div>
                {errors.productDescription && <small className="text-xs italic text-red-500">{errors.productDescription}</small>}
              </div>

              <label htmlFor="imageUpload" className="w-1/4 bg-[#f2f2f2] mr-3 border rounded-xl flex flex-col items-center justify-center">
                <p className="font-semibold text-center">Upload Image</p>
                <img className="h-64 rounded-lg mx-auto mt-2" src={selectedImage || img} alt="Product" />
                <input type="file" id="imageUpload" className="hidden" data-max-size="5120" accept=".jpg,.png,.jpeg" onChange={handleImageChange} />
              </label>
              {errors.image && <small className="text-xs italic text-red-500">{errors.image}</small>}
            </div>


            <div className='w-full flex mt-5 justify-around'>
              <div className='w-3/5 bg-[#f2f2f2] border rounded-xl p-4 flex'>
                <div className='w-1/2 mr-2'>
                  <p className='font-semibold'>Category</p>
                  <input name="category" className="w-full mb-2 px-2 py-3 rounded-lg font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]" placeholder='Category' value={values.category} onChange={handleChange} onBlur={handleBlur} />
                  {errors.category && <small className="text-xs italic text-red-500">{errors.category}</small>}
                </div>
                <div className='w-1/2 ml-2'>
                  <p className='font-semibold'>Stock</p>
                  <input name="stock" className="w-full mb-2 px-2 py-3 rounded-lg font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]" placeholder='Stock' value={values.stock} onChange={handleChange} onBlur={handleBlur} />
                  {errors.stock && <small className="text-xs italic text-red-500">{errors.stock}</small>}
                </div>
              </div>
              <div className='w-1/4 bg-[#f2f2f2] border rounded-xl p-4'>
                <p className='font-semibold'>Price</p>
                <input name="price" className="w-full mb-2 px-2 py-3 rounded-lg font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]" placeholder='Price' value={values.price} onChange={handleChange} onBlur={handleBlur} />
                {errors.price && <small className="text-xs italic text-red-500">{errors.price}</small>}
              </div>
            </div>

          </div>
  

        </form>
      </div>
      <Toaster
  position="top-left"
  reverseOrder={false}
/>
    </div>
  ); 
};

export default AddProduct;
