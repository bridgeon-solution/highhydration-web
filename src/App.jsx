import React from 'react'
import SupLogin from './components/supplier/SupLogin'
import SupplierPro from './pages/supplier/SupplierPro'
import SupplyHome from './pages/supplier/SupplyHome'
import SupplierRegister from './components/supplier/SupplierRegister'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import AdminDashbord from './pages/Admin/AdminDashbord'
import AddProduct from './pages/Admin/AddProduct'
import SupplierMangement from './pages/Admin/SupplierMangement'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Location from './pages/Admin/Location'
import Navbar from './pages/common/Navbar'
import UserProfile from './components/user/UserProfile'
import UserRegister from './components/user/UserRegister'
import UserLogin from './components/user/UserLogin'
import EditProfile from './components/user/EditProfile'
import AllProducts from './pages/Admin/AllProducts'
import Products from './pages/users/Products'
import SingleProduct from './pages/users/SingleProduct'
import Order from './pages/users/Order'
import Home from './pages/common/home/Home'
import Wellcome from './pages/common/Wellcome'
import PaymentSuccess from './components/user/PaymentSuccess'
import PaymentCancel from './components/user/PaymentCancel'
import Contact from './pages/common/contactus/Contact'
import { Toaster } from 'react-hot-toast'
import Service from './pages/common/service/Service'
import { NavigationProvider } from './utils/NavigationContext'
import Aboutus from './pages/common/about/Aboutus'
import UserManagement from './pages/Admin/UserManagement'
import OrderDetails from './components/user/OrderDetails'
import PaymentSection from './components/Admin/PaymentSection'
import Pdffile from './components/user/Pdffile'
import OrderManagement from './pages/Admin/OrderManagement'
import Complaints from './pages/Admin/Complaints'
import api from './axiosInterceptors'
import RolesManagement from './components/Admin/RolesManagement'

import SupTable from './components/supplier/SupTable'
const clientId = "203212309830-4f9qm9lv8tdvi1uvs8em7vnl5f0jkt11.apps.googleusercontent.com";
const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email profile'
      })
    }
    gapi.load('client:auth2', start)
  });
  return (
    <>
    
      {/* <Navbar /> */}
      <Pdffile/>
      <NavigationProvider>
      <Routes>
    
        <Route path='/' element={<Wellcome />} />
        <Route path='/service' element={<Service />} />
        <Route path='/home' element={<Home />} />
        <Route path='/service' element={<Service />} />
        <Route path='/aboutus' element={<Aboutus/>} />
        <Route path='/contactus' element={<Contact/>} />
        <Route path='/supregistration' element={<SupplierRegister />} />
        <Route path='/suplogin' element={<SupLogin/>} />
        <Route path='/supprofile' element={<SupplierPro />} />
        <Route path='/supdashbord' element={<SupplyHome />} />
        <Route path='/admindashboard' element={<AdminDashbord />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/userRegistration' element={<UserRegister />} />
        <Route path='/userlogin' element={<UserLogin />} />        
         <Route path='/userpro' element={<UserProfile />} /> 
        <Route path='/editPro' element={<EditProfile />} />
        <Route path='/product' element={<AllProducts />} />
        <Route path='/suppliermanagement' element={<SupplierMangement />} />
        <Route path='/orderAllocation' element={<SupTable/>} />
        <Route path='/usermanagement' element={<UserManagement/>} />
        <Route path='/location' element={<Location />} />
        <Route path='/productList' element={<Products />} />
        <Route path='/productList/:productId' element={<SingleProduct />} />
        <Route path='/order' element={<Order />} />
        <Route path="payment/success" element={<PaymentSuccess />} /> 
        <Route path="payment/cancel" element={<PaymentCancel />} />
        <Route path='/orderdetails' element={<OrderDetails/>}/>
        <Route path='/payment' element={<PaymentSection/>}/>
        <Route path='/orders' element ={<OrderManagement />} />
        <Route path='/complaints' element ={<Complaints />} />
        <Route path='/usermanagement' element={<UserManagement/>} />
        <Route path='/rolemanagement' element={<RolesManagement/>}/>
      </Routes>
      </NavigationProvider>
      <Toaster
position="top-center"
reverseOrder={false}
/>
    </>
  )
}

export default App
