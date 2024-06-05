import React from 'react'
import SupLogin from './components/Supplier/SupLogin'
import SupplierPro from './pages/Supplier/SupplierPro'
import SupplyHome from './pages/Supplier/SupplyHome'
import SupplierRegister from './components/Supplier/SupplierRegister'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import AdminDashbord from './pages/Admin/AdminDashbord'
import AddProduct from './pages/Admin/AddProduct'
import SupplierMangement from './pages/Admin/SupplierMangement'
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Location from './pages/Admin/Location'
import Navbar from './pages/common/Navbar'
import UserProfile from './components/User/UserProfile'
import UserRegister from './components/User/UserRegister'
import UserLogin from './components/User/UserLogin'
import EditProfile from './components/User/EditProfile'
import AllProducts from './pages/Admin/AllProducts'
import Products from './pages/Users/Products'
import SingleProduct from './pages/Users/SingleProduct'
import Order from './pages/Users/Order'
import Home1 from './pages/common/home/Home1'
import HomeCorousel from './components/User/HomeCorousel'
import Home2 from './pages/common/home/Home2'
import Home from './pages/common/home/Home'
import Wellcome from './pages/common/Wellcome'
import PaymentSuccess from './components/User/PaymentSuccess'
import PaymentCancel from './components/User/PaymentCancel'
import Contact from './pages/common/contactus/Contact'
import { Toaster } from 'react-hot-toast'
import Service from './pages/common/service/Service'
import { NavigationProvider } from './utils/NavigationContext'
import Aboutus from './pages/common/about/Aboutus'
import UserManagement from './pages/Admin/UserManagement'
import Complaints from './pages/Admin/Complaints'
import OrderDetails from './components/User/OrderDetails'



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
    
      <Navbar />
      <NavigationProvider>
      <Routes>
    
        <Route path='/' element={<Wellcome />} />
        <Route path='/service' element={<Service />} />
        <Route path='/home' element={<Home />} />
        <Route path='/service' element={<Service />} />
        <Route path='/aboutus' element={<Aboutus/>} />
        <Route path='/contactus' element={<Contact/>} />
        <Route path='/supregistration' element={<SupplierRegister />} />
        <Route path='/suplogin' element={<SupLogin />} />
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
        <Route path='/usermanagement' element={<UserManagement/>} />
        <Route path='/location' element={<Location />} />
        <Route path='/productList' element={<Products />} />
        <Route path='/productList/:productId' element={<SingleProduct />} />
        <Route path='/order' element={<Order />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        <Route path="payment/cancel" element={<PaymentCancel />} />

        <Route path="/complaint" element={<Complaints/>} />

        <Route path='/orderdetails' element={<OrderDetails/>}/>

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
