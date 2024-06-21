import React, { useEffect, useState } from 'react'
import client from "../../assets/Supplier/Client.jpg";
import { FcGoogle } from "react-icons/fc";
// import { GoogleLogin } from 'react-google-login';
const clientId = "203212309830-4f9qm9lv8tdvi1uvs8em7vnl5f0jkt11.apps.googleusercontent.com";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useFormik,Formik,Form,Field} from 'formik'
import { registerValidation } from '../../components/supplier/registerValidation';
import Loader from '../../components/Loader';
import api from '../../axiosInterceptors';
import toast, { Toaster } from 'react-hot-toast';
const baseUrl = import.meta.env.VITE_BASE_URL;

const onSuccess = (res) => {
  console.log('LOGIN SUCCESS Current user:',res.profileObj);
}
const onFailure = (res) => {
  console.log('Login Failed! res :', res);
}
const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirmPassword: ''
}


const UserRegister = () => {
  const [loader,setLoading]=useState(false)
    const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
        initialValues: initialValues,
        validationSchema: registerValidation,
        onSubmit: async (values) => {
          setLoading(true)
          try {
            const formData = {
             first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword
            };
    
           
            const response = await api.post(`/users/register`, formData);
            console.log(response,"respoo");
            if(response.status===201){
              toast.success('Check Email');
              setLoading(false)
            }
            setLoading(false)
            setOpen(true);
            setTimeout(() => {
              navigate('/userlogin');
            }, 3000);
          } catch (error) {
            console.error('Error:', error);
            toast.error('Email already exists');
            setLoading(false)
          }
        }
      });
    
      
      const [open, setOpen] = useState(false);
      const navigate = useNavigate()
    
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderradius: "20px",
        p: 4,
      };
    
    
    
    
    
    
    
      const handleChangeLog = () => {
        navigate('/userlogin')
      }
  return (
    <div className="h-full bg-slate-300">
      {loader&&<Loader/>}
      <div className="mx-auto">
        <div className="flex justify-center px-6 py-6">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full h-auto bg-gray-400 dark:bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              style={{ backgroundImage: `url(${client})` }}></div>
            <div className="w-full lg:w-7/12 bg-white dark:bg-gray-700 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Create an Account!</h3>
              <Formik
              initialValues={initialValues}
              validationSchema={registerValidation}
              > 
              <form className="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded"
              onSubmit={handleSubmit}>
                <div className="mb-2 md:flex md:justify-between">
                  <div className="mb-2 md:mr-2 md:mb-0">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="first_name"
                      type="text"
                      placeholder="First Name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                   />
{errors.first_name && <small className="text-xs italic text-red-500">{errors.first_name}</small>}
                 </div>
                  <div className="md:ml-2">
                    <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-blackborder rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="last_name"
                      type="text"
                      placeholder="LastName"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
           
                   {errors.last_name && <small className="text-xs italic text-red-500">{errors.last_name}</small>}
            
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block mb-1 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 dark:text-black border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                  
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
            
                   {errors.email && <small className="text-xs italic text-red-500">{errors.email}</small>}
         
                </div>
                <div className="mb-2 md:flex md:justify-between">
                  <div className="mb-2 md:mr-2 md:mb-0">
                    <label className="block mb-1 text-sm font-bold text-gray-700 " htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="******************"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                
                   {errors.password && <small className="text-xs italic text-red-500">{errors.password}</small>}
                 
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-1 text-sm font-bold text-gray-700 " htmlFor="c_password">
                      Confirm Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-1 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="confirmPassword"
                      type="password"
                      placeholder="******************"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                     {errors.confirmPassword&& <small className="text-xs italic text-red-500">{errors.confirmPassword}</small>}
                  </div>
                </div>
                <div className="mb-4 text-center">
                  <button onClick={handleSubmit}
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Register Account
                  </button>
                </div>
                <hr className="mb-4 border-t" />
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a className="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
                    onClick={() => { navigate('/suplogin') }}>
                    Already have an account? Login!
                  </a>
                </div>
                <div className="mt-4 mb-6 text-center">

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500,
                      },
                    }}
                  >
                    <Fade in={open}>
                      <div>
                        <Box sx={style}>
                          <Typography id="transition-modal-title" variant="h6" component="h2">
                            Please Check Your Email
                          </Typography>
                          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Thank you for registering! An email has been sent to your inbox.
                            Please check your email and follow the instructions to verify your account.
                            If you don't see the email in your inbox, please check your spam folder.
                            If you need further assistance, please contact our support team.
                          </Typography>
                        </Box>
                        <button className='btn-success' onClick={handleChangeLog}>Done</button>
                      </div>
                    </Fade>
                  </Modal>


                 {/* <GoogleLogin
                    clientId={clientId}
                    buttonText='Continue with Google'
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}

                    render={renderProps => (
                      <div className="mb-4 text-center">
                        <button
                          className="group h-12 px-6 border-2 border-black rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                          <div className="relative flex items-center space-x-4 justify-center">
                            <FcGoogle />
                            <span
                              className="block w-max font-semibold tracking-wide text-gray-700  text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue
                              with Google
                            </span>
                          </div>
                        </button>   
                      </div>
                    )}
                  />
                  */}
                </div>


              </form>
              </Formik>
            </div>
          </div>
        </div>
        <Toaster
position="top-center"
reverseOrder={false}
/>
      </div>
    </div>
  )
}

export default UserRegister