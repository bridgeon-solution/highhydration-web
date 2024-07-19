
import  { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import DatePicker from 'react-datepicker';
import { FaCheckCircle } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../../axiosInterceptors'
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import toast from 'react-hot-toast'; 
import useListenNotification from '../../../hooks/useListenNotification';
import useConversation from '../../../zustand/useConversation';
import OrderDetails from '../../../components/user/order/OrderDetails';
const Order = ({product,setModalOpen}) => {
const [count,setcound]=useState(1)
const steps = [
  'Product Details',
  'Shipping Details',
  'Done',
];
const [isToggled, setIsToggled] = useState(false);
const [price,setPrice]=useState(parseInt(product?.price))
const [selectedDate, setSelectedDate] = useState(null);
const [pageNum,setPageNum]=useState(0)
const [loader,setLoading]=useState(false)
const [buttonBg,setButtonBg]=useState(true)
const userid = localStorage.getItem('userId');
const navigate=useNavigate()
const[userData,setUserData]=useState([])
const [visible,setVisble]=useState(true)
const [modalVisible,setModalVisible]=useState(false)
const [orderDetails,setOrderDetails]=useState()
const {notification , setNotification} = useConversation()

useEffect(()=>{
async function fetchData(){
try {
const response=await api.get(`/users/${userid}`)
setUserData(response.data.data)
if(response.status===200){
  // toast.success(response?.data?.message)
}else{
  toast.error(response?.data?.message)
}
} catch (error) {
console.log(error);
}
}
fetchData()
},[])  
const handleDateChange = (date) => {
    setSelectedDate(date);
};
const handleToggle = () => {
  setIsToggled(!isToggled);
};
const handlechnge=(a)=>{
  if(a=="-"){
    if(count>1){
    setcound(count-1)
    setPrice(price-product?.price)
    }
  }else if(a=="+"){
    setcound(count+1)
    setPrice(price+parseInt(product?.price))
  }
}
const stepdata=(a)=>{
  if(a==="+"){
    if(isToggled){
  if (!selectedDate) {
      toast.error("Please select a date")
      return
}
    }
    if(pageNum===0){
    
      if (
        !userData.first_name || 
        !userData.last_name || 
        !userData.address_line1 || 
        !userData.address_line2 || 
        !userData.pin_number || 
        !userData.phone_number
      ) {
        toast.error('Fill the Details Properly');
       
        setButtonBg(false);
      }
    if(pageNum==1){
      setModalVisible(true)
    }
  }
}
  if(a==="+"){
    if(pageNum==1){
      if(selectedDate===null){
      const orderData={
        userId:userid,
        totalItems:count,
        deliveryStatus:"ordered",
        preOrder:true,
        amount:price,
        payed:"pending",
        address:{
          address_line1:userData.address_line1,
          address_line2:userData.address_line2,
          pincode:userData.pin_number,
          phone_number:userData.phone_number
        },
        product:product?._id,
        
      }
      
    
      const createOrder=async()=>{
        try {
          const response=await api.post('/orders/',orderData)
          setOrderDetails(response?.data?.savedOrder)
          console.log(response?.data?.savedNotification,'noti')
          if(response.status===201){
            const data = response?.data?.savedNotification;
            setNotification([...notification, data]);
            toast.success(response?.data?.message)
            const paymentData={
              userId:userid,
              orderId:response.data.savedOrder._id,
              status:"pending",
              amount:price ,
              type:'preorder'
            }
            const res=await api.post('/payments/',paymentData)
          
        
          }
        } catch (error) {
        
          toast.error(error?.message)
        }
      }
      createOrder()
    }
  }
 
    if(selectedDate!=null){
      setVisble(false)
      if(pageNum>=0){
       const queryParams={
        userid,
        product_Id:product?._id,
        quantity:count,
        selectedDate:selectedDate
       }

       const fetchData=async()=>{
        try {
          const response=await api.post(`/payment/payment`,queryParams)
          console.log(response,'response for payments');
          if(pageNum>=1){
            setLoading(true)
            if(response.status===200){
              const value=window.location.href=response.data.url
            }
          }
        } catch (error) {
          if(error.response.status===403){
            toast.error('please login')
            navigate('/userlogin')
          }
        }
       
       }
       fetchData()
      }
      
    }
  if(pageNum===3){
    setPageNum(0)
  }else{
    if(pageNum===2){
      
      setModalVisible(true)
    }
    setPageNum(pageNum+1)
  }
}
if(a==="-"){
  if(pageNum>0){
    setPageNum(pageNum-1)
  }else{
    setModalOpen(false)
    
  }
}
  }
  useListenNotification()
  return (
    <div className=' bg-opacity-5 justify-center flex'>
      {loader&&<Loader/>}
        <div className='shadow-[10px_35px_30px_10px_rgba(0,0,0,0.3)] mt-4 p-1  md:w-1/4 s:w-full rounded-xl '>
            <div className='mt-6'>
        <Box  sx={{ width: '100%' }}>
      <Stepper activeStep={pageNum} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </div>
    {pageNum===0&&<div>
    <div className='justify-center flex mt-5'>
        <img src={product?.image} alt="" />
    </div>
    <div>
    <h5 className="text-xl mt-3 text-center font-bold">${price}</h5>
    <div className='flex justify-center mt-5'>
    <button onClick={()=>{handlechnge('-')}}
  className="flex items-center justify-center bg-gray-800 text-white rounded-full w-8 h-8 text-lg font-bold transition-all duration-300 transform hover:bg-gray-900 hover:scale-105 active:bg-gray-700">
  -
</button>
        <p className='border p-1 flex justify-center items-center mx-2'>{count}</p>
        <button onClick={()=>{handlechnge('+')}}className="flex items-center justify-center bg-gray-800 text-white rounded-full w-8 h-8 text-lg font-bold transition-all duration-300 transform hover:bg-gray-900 hover:scale-105 active:bg-gray-700">+</button>
    </div>
    </div>
    <div className="flex justify-center mt-5 mb-5  items-center">
        <h1 className='mx-3'>BulK Order</h1>
      <button
        className={`relative inline-flex items-center h-6 rounded-full w-11 ${
          isToggled ? 'bg-green-400' : 'bg-gray-200'
        }`}
        onClick={handleToggle}
      >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
          isToggled ? 'translate-x-5' : 'translate-x-0'
        }`} />
      </button>
    </div>
    {isToggled&&
    <>
    <div className="flex items-center justify-center">
    <form  className="text-center mb-2">
            <label htmlFor="datepicker" className="block mb-4">Select a Date:</label>
            <DatePicker
                id="datepicker"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="border rounded-md px-3 py-2"
            />
        </form>
        </div>
    </>}
    </div>}
    {pageNum===1&&
    <div>
      <h6 className='font-light mx-6 mt-5 text-l'>Shipping Address</h6>
      <div className='mx-3 mt-3'>
      <img className='w-12 rounded-full ' src={userData?.image} alt="" />
      </div>
      <div className=' w-full mt-3 gap-2 flex flex-col'>
        <div className='m-2 flex gap-2'>
          <div className='w-1/2'>
          <label >First Name</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.first_name||"NO First Name"}</p>
      </div>
      <div className='w-1/2'>
          <label >Last Name</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.last_name||"No Last Name"}</p>
      </div>
        </div>
        <div className='flex m-2 gap-2'>
        <div className='w-1/2'>
          <label >Address Line1</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.address_line1||"No FirstLine Address"}</p>
      </div>
      <div className='w-1/2'>
          <label >Address Line2</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.address_line2||"No Address Line2"}</p>
      </div>
        </div>
        <div className='flex m-2 gap-2'>
        <div className='w-1/2'>
          <label >City</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.city||"No city"}</p>
      </div>
      <div className='w-1/2'>
          <label >Phone Number</label>
      <p className='border rounded-lg bg-[#efeded] p-2 w-full'>{userData?.phone_number||"NO Phone Number"}</p>
      </div>
        </div>
        <div className='mb-6 w-full p-2'>
          <label>Pin Code</label>
      <p className='border rounded-lg bg-[#efeded] p-2'>{userData?.pin_number||"Add Pin Code"}</p>
        </div>
        <div className=' flex justify-end mr-4 mb-5'>
        <IoAddCircle className='text-blue-500 mt-1'/>
        <p className='text-blue-500' onClick={()=>{navigate('/editPro')}}> Add New Address </p>
        </div>
      </div>
      </div>}
      {pageNum === 2 && visible &&(
    <div className="flex w-full h-4/5">
        <div className="justify-center w-full">
            <div className="flex items-center justify-center w-full mb-4 animate-zoom-in mt-24">
                <FaCheckCircle className="text-green-500 text-4xl mr-2" />
                <h1 className="text-2xl font-semibold">Order Successfully</h1>
            </div>
            <div className='mt-5'>
              <OrderDetails props={orderDetails}/>
            </div>
        </div>
    </div>
)}
      
    <div className='flex justify-around mr-5 mb-3'>
<button onClick={()=>{stepdata("-")}} className="bg-white hover:bg-black  text-black border-black border hover:text-white font-bold py-2 px-4 rounded">back</button>
{pageNum < 1 ? (
    <button onClick={() => { stepdata("+") }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
    </button>
) : (
    pageNum < 2 ? (
        buttonBg ? (
            <button onClick={() => { stepdata("+") }} className="bg-blue-500 ml-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Confirm
            </button>
        ) : (
            <button className='bg-gray-500 ml-3 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Confirm</button>
        )
    ) : (
        <button onClick={() => { setModalOpen(false) }} className="bg-blue-500 ml-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
        </button>
    )
)}


    </div>

    </div>

    {/* {modalVisible&&(
      <FeedbackModal/>
    )} */}
        </div>
    

  )
}

export default Order