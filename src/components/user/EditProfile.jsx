import React, { useEffect, useState } from 'react';
import client from '../../assets/Supplier/uploadimage.jpg'
import { useFormik } from 'formik';
import { profileValidation } from './profileValidation';
import {useNavigate} from 'react-router-dom'
import api from '../../axiosInterceptors';
import Loader from '../Loader';
import toast from 'react-hot-toast';

const initialValues = {
  image: null,
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  address_line1: '',
  address_line2: '',
  city: '',
  pin_number: '',
};

const EditProfile = () => {
  const navigate = useNavigate()
  const [pincode, setPincode] = useState([]);
  const[selectedPincode,setSelectedPincode]=useState(null)
  const[userData,setUserData]=useState([])
  const [selectedImage, setSelectedImage] = useState(userData?.image || client);
  const userid = localStorage.getItem('userId');
  const [loading,setLoading]=useState(false)

  async function handlePincode(id) {
    try {
      const response = await api.get(`/pincodes/${id}`);
      if (response) {
       setSelectedPincode(response.data.pincode[0].PostOffice)
        console.log(response, "Pincode response");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      formik.setFieldValue('image', file);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema:profileValidation,
    onSubmit: async (values, { resetForm }) => {
      console.log('Formik onSubmit called');
      try {
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('phone_number', values.phone_number);
        formData.append('address_line1', values.address_line1);
        formData.append('address_line2', values.address_line2);
        formData.append('city', values.city);
        formData.append('pin_number', values.pin_number);

        console.log('Form data after appending:', formData);
        setLoading(true)
        const response = await api.put(`/users/${userid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setLoading(false)
        if(response.status===200){
          toast.success('Saved Details')
          navigate('/home')
        }

        console.log('Response from API:', response);
        resetForm();
      } catch (error) {
        toast.error('Somthing Proplem')
        setLoading(false)
        console.error('Error:', error);
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await api.get('/pincodes');
        console.log(response,'pincodesss')
        setPincode(response.data.pincodes);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const { values, handleBlur, handleChange, handleSubmit, errors } = formik;

  const handleFieldChange = (event) => {
    handleChange(event);
    if (event.target.name === 'pin_number') {
      const selectedPincodeObj = pincode.find(pin => pin.pincode === event.target.value);
      if (selectedPincodeObj) {
        handlePincode(selectedPincodeObj._id);
      }
    }
  };


console.log(selectedPincode,"pinkuu");

useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await api.get(`/users/${userid}`);
        if (response.status === 200) {
          setUserData(response.data.data);
          formik.setValues({
            ...initialValues,
            ...response.data.data,
          });
          if (response.data.data.image) {
            setSelectedImage(response.data.data.image);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [userid]);

console.log(userData,"usurrrrrrr");
  return (
    <div className="bg-[#EFF0F3] min-h-screen flex flex-col justify-center items-center">
      {loading&&<Loader/>}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-6xl w-full mx-4">
        <form onSubmit={handleSubmit}>
          <div className='flex justify-between'>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Complete Account Setup</h2>
            <label className="relative w-16 h-16 cursor-pointer">
              <input
                type="file"
                id="imageUpload"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                id="imagePreview"
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                src={selectedImage !== client ? selectedImage : client}
                alt="Client"
              />
              {errors.image && <small className="text-xs italic text-red-500">{errors.image}</small>}
            </label>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 p-4 rounded-lg">

            <input
      className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={userData.first_name}
        name="first_name" 
      value={values.first_name}
          onChange={handleFieldChange}
           onBlur={handleBlur}
            />
{errors.first_name && <small className="text-xs italic text-red-500">{errors.first_name}</small>}

              <input
                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={userData.last_name}
                name="last_name"
                value={values.last_name}
               onChange={handleFieldChange}
                onBlur={handleBlur}
              />
              {errors.last_name && <small className="text-xs italic text-red-500">{errors.last_name}</small>}
              <input
                className="w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                name={userData.email}
                value={values.email}
               onChange={handleFieldChange}
                onBlur={handleBlur}
              />
              {errors.email && <small className="text-xs italic text-red-500">{errors.email}</small>}
              <p>Phone Number</p>
              <input
                className={`w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone_number ? 'placeholder-red-500' : 'placeholder-black'}`}
                placeholder={userData.phone_number}
                name='phone_number'
                value={values.phone_number}
                onChange={handleFieldChange}
                onBlur={handleBlur}
              />
              {errors.phone_number && <small className="text-xs italic text-red-500">{errors.phone_number}</small>}
              <div className="flex justify-end mt-4">
                <button type="button" 
                onClick={()=>navigate('/userPro')}
                className="hover:bg-[#22B6FE] text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 rounded">
                  Cancel
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 p-4 rounded-lg">


         
            <select
  className="flex-grow mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mr-2"
  name='address_line1'
  value={values.address_line1}
  onChange={handleFieldChange}
  onBlur={handleBlur}
>
  
  <option value="">{values.address_line1?values.address_line1:"Select Address"}</option>
  {selectedPincode?.map((pin, i) => (
    <option key={i} value={pin.Name}>{pin.Name}</option>
  ))}
</select>

              
              <input
                className={`w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.address_line2 ? 'placeholder-red-500' : 'placeholder-black'}`}
                placeholder={errors.address_line2 ? errors.address_line2 : "Address Line 2"}
                name="address_line2"
                value={values.address_line2}
                onChange={handleFieldChange}
                onBlur={handleBlur}
              />
              <input
                className={`w-full mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'placeholder-red-500' : 'placeholder-black'}`}
               placeholder='city'
                name="city"
                Value={values.city}
                onChange={handleFieldChange}
                onBlur={handleBlur}
               
              />
              <p>Pin Number</p>
              <select
                className="flex-grow mb-4 px-4 py-3 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mr-2"
                name='pin_number'
              
                value={values.pin_number}
                onChange={handleFieldChange}
                onBlur={handleBlur}
              >
              <option value="">{values.pin_number?values.pin_number:"pin code"}</option>
                {pincode.map((pin) => (
                  <option key={pin._id} value={pin.pincode}>{pin.pincode}</option>
                ))}
              </select>
              <div className="flex justify-start mt-4">
                <button type="submit" className="flex bg-[#22B6FE] hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
