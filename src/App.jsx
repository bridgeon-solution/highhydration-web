import React from "react";
import SupLogin from "./pages/supplier/auth/SupLogin";
import SupplierPro from "./pages/supplier/profile/SupplierPro";
import SupplyHome from "./pages/supplier/dashboard/SupplyHome";
import SupplierRegister from "./pages/supplier/auth/SupplierRegister";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import AdminDashbord from "./pages/Admin/dashboard/AdminDashbord";
import AddProduct from "./pages/Admin/products/AddProduct";
import SupplierMangement from "./pages/Admin/supplier/SupplierMangement";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Location from "./pages/Admin/location/Location";
import Navbar from "./pages/common/Navbar";
import UserProfile from "././pages/users/auth/UserProfile";
import UserRegister from "././pages/users/auth/UserRegister";
import UserLogin from "././pages/users/auth/UserLogin";
import EditProfile from "./components/user/auth/EditProfile";
import AllProducts from "./pages/Admin/products/AllProducts";
import SingleProduct from "././pages/users/products/SingleProduct";
import Order from "././pages/users/order/Order";
import Home from "./pages/common/home/Home";
import Wellcome from "./pages/common/Wellcome";
import PaymentSuccess from "./components/user/PaymentSection/PaymentSuccess";
import PaymentCancel from "./components/user/PaymentSection/PaymentCancel";
import Contact from "./pages/common/contactus/Contact";
import { Toaster } from "react-hot-toast";
import Service from "./pages/common/service/Service";
import { NavigationProvider } from "./utils/NavigationContext";
import Aboutus from "./pages/common/about/Aboutus";
import UserManagement from "./pages/Admin/users/UserManagement";
import OrderDetails from "./components/user/order/OrderDetails";
import PaymentSection from "./components/Admin/payments/PaymentSection";
import Pdffile from "./components/user/PaymentSection/Pdffile";
import OrderManagement from "./pages/Admin/order/OrderManagement";
import Complaints from "./pages/Admin/complaints/Complaints";
import api from "./axiosInterceptors";
import RolesManagement from "./pages/Admin/roles/RolesManagement";

import SupTable from "./pages/supplier/orders/SupTable";
import PaymentSuccesMontly from "./components/user/PaymentSection/PaymentSuccesMontly";
import PaymentCompleted2 from "./components/user/PaymentSection/PaymentCompleted2";
import Products from "./pages/common/products/Products";
import Notification from "./pages/supplier/notification/Notification";
import AdminProtectRouter from "./pages/Admin/utils/ProtectRouter";
import SupplierProtectRoute from "./pages/supplier/utils/ProtectRouter";
import UserProtectRouter from "./pages/users/utils/ProtectRouter";
import AdminNotification from './pages/Admin/notification/AdminNotification'
import Footer from "./components/user/footer/Footer";

const clientId =
  "203212309830-4f9qm9lv8tdvi1uvs8em7vnl5f0jkt11.apps.googleusercontent.com";
const baseUrl = import.meta.env.VITE_BASE_URL;

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email profile",
      });
    }
    gapi.load("client:auth2", start);
  });
  return (
    <>
     

      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Wellcome />} />
          <Route path="/service" element={<Service />} />
          <Route path="/home" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/userRegistration" element={<UserRegister />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/supregistration" element={<SupplierRegister />} />
          <Route path="/suplogin" element={<SupLogin />} />
          <Route path="/products" element={<Products />} />
          <Route element={<SupplierProtectRoute />}>
            <Route path="/supprofile" element={<SupplierPro />} />
            <Route path="/supdashbord" element={<SupplyHome />} />
            <Route path="/orderAllocation" element={<SupTable />} />
            <Route path="/suppliers/notification" element={<Notification />} />
          </Route>
          <Route element={<AdminProtectRouter />}>
            <Route path="/admindashboard" element={<AdminDashbord />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/product" element={<AllProducts />} />
            <Route path="/payment" element={<PaymentSection />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/location" element={<Location />} />
            <Route path="/suppliermanagement" element={<SupplierMangement />} />
            <Route path="/rolemanagement" element={<RolesManagement />} />
            <Route path='/admin/notification' element ={<AdminNotification />} />

          </Route>

          <Route element={<UserProtectRouter />}>
            <Route path="/userpro" element={<UserProfile />} />
            <Route path="/editPro" element={<EditProfile />} />
            <Route path="/productList/:productId" element={<SingleProduct />} />
            <Route path="/order" element={<Order />} />
            <Route path="payment/success" element={<PaymentSuccess />} />
            <Route path="payment/cancel" element={<PaymentCancel />} />
            <Route path="/orderdetails" element={<OrderDetails />} />
            <Route
              path="payment/success/monthly"
              element={<PaymentSuccesMontly />}
            />
          </Route>

          <Route path="/userRegistration" element={<UserRegister />} />
          <Route path="/userlogin" element={<UserLogin />} />
        </Routes>




      </NavigationProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
