import React, { useEffect, useState } from 'react';
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
import api from '../../axiosInterceptors';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [categories, setCategories] = useState([]);
 


  const handleImageChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Display image preview
      console.log(file.name, "dunkiiii"); // Log the file name
  
      formik.setFieldValue('image', file); // Store file object in formik values
    }
  };

  const handleCategorySelection = (categoryName) => {
    formik.setFieldValue('category', categoryName);
    setShowMilestoneList(false); // Close the category list after selection
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

  const [showMilestoneList, setShowMilestoneList] = useState(false);
  const [open, setOpen] = useState(false);
  const [newCategory,setNewCategory]=useState('')
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editedValue, setEditedValue] = useState("");

  const fetchCategory = async () => {
    try {
      const response = await api.get('/admin/category');
      setCategories(response.data.category);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const toggleMilestoneList = () => {
    setShowMilestoneList(!showMilestoneList);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSave = async ()=>{
    try {
      const response = await api.post('/admin/category',{name:newCategory})
      console.log(response,'add new category')
      if(response.status===201){
        fetchCategory()
        setOpen(false)
      }
    } catch (error) {
      console.log(error, 'error in post category')
    }
  }

  const handleEditClick = (index, initialValue) => {
    setEditingIndex(index);
    setEditedValue(initialValue);
    setShowMilestoneList(true);
  };

  const handleSaveClick = async(id) => {
    try {
      const response = await api.put(`/admin/category/${id}` , { name: editedValue })
      if(response.status===200){
        fetchCategory()
      }
      setEditingIndex(null);
    } catch (error) {
      console.log(error.message,'error in update category')
    }
    
  };


const handleDeleteCategory = async(id)=>{
  try {
    const response = await api.delete(`/admin/category/${id}`)
    if(response.status===200){
      fetchCategory()
    }
  } catch (error) {
    console.log(error.message,'error in delete category')
  }
}
 


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
                  <input
  type="text"
  placeholder="Please Type"
  className="w-full mb-2 px-2 py-3 rounded-lg font-medium text-black placeholder-gray-500 text-sm bg-[#E6E6E6]"
  onClick={toggleMilestoneList}
  value={values.category}
  readOnly
/>
{showMilestoneList && (
  <div className="border border-gray-300 mt-2 p-2 bg-[#f8f8f8] text-start rounded-md">
    {categories.map((category, index) => (
      <div className="flex justify-between items-center border-b py-2" key={index}>
        <div onClick={() => handleCategorySelection(category.name)}>
          {editingIndex === index ? (
            <input
              type="text"
              className='p-1'
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              onClick={(e) => e.stopPropagation()} 
            />
          ) : (
            <b>{category.name}</b>
          )}
        </div>
        <div>
          {editingIndex === index ? (
            <button
              className="mr-2 text-blue-500"
              onClick={() => handleSaveClick(category._id)}
            >
              <MdOutlineSaveAlt />
            </button>
          ) : (
            <button
              className="mr-2 text-blue-500"
              onClick={() => handleEditClick(index, category.name)}
            >
              <FaEdit />
            </button>
          )}
          <button className="text-red-500" onClick={() => handleDeleteCategory(category._id)}>
            <MdDelete />
          </button>
        </div>
      </div>
    ))}
    <button
      onClick={handleOpen}
      className="bg-blue-600 flex p-2 text-white rounded-md mt-2"
    >
      <IoMdAddCircleOutline />
      <b> New Category</b>
    </button>
  </div>
)}

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Add New Category
              </Typography>
              <hr />
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
              >
                Category name
                <span className="text-[#FF0000]">*</span>
                <br />
                <input
                  className="w-full h-10 border-black border rounded-md p-1"
                  placeholder="Please type"
                  type="text"
                  onChange={(e)=>setNewCategory(e.target.value)}
                />
              </Typography>
              <div className="pt-3 mt-2 flex justify-between">
                <button
                  onClick={handleClose}
                  style={{ border: "1px solid #000080" }}
                  className="p-2 rounded-md text-[#000080] mr-2"
                >
                  Cancel
                </button>
                <button
                  style={{ border: "1px solid #000080" }}
                  className="p-2 rounded-md text-white bg-[#000080]"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </Box>
          </Fade>
        </Modal>
            
            

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
