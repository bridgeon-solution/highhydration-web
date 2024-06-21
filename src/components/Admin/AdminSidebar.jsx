import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import {NavLink} from "react-router-dom";
import api from "../../axiosInterceptors";


const AdminSidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const supplierId=localStorage.getItem('role')
  const [supplierAuth,setSupplierAuth]=useState(['/payment', '/suppliermanagement','/usermanagement','/rolemanagement'])

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let user = localStorage.getItem('role');
        if (!user) {

        } else {
          const response = await api.get('/role', {
            params: {
              supplierId
            },
          });
          setSupplierAuth( response.data.roles[0].permissions || [])
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthentication();
  }, []);
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      
      <CDBSidebar textColor="000" backgroundColor="#fff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink
            
            className="text-decoration-none"
            style={{ color: "inherit" }}
           
          >
           High Hydration
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

          {showModal ?( <div>
        <NavLink activeClassName="activeClicked" onClick={toggleModal}>
        <CDBSidebarMenuItem icon="fa-solid fa-arrow-left">Back</CDBSidebarMenuItem>
      </NavLink>
      </div>):( 
        <>
            
            <NavLink to={"/admindashboard"}    activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-tachometer-alt'>Dashbord</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/product" activeClassName="activeClicked">

              <CDBSidebarMenuItem icon='fas fa-shopping-bag'>Products</CDBSidebarMenuItem>
            </NavLink>

            <NavLink   to={'/admin/notification'}  activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon='fas fa-bell'>Notification</CDBSidebarMenuItem>
            </NavLink>

            {supplierAuth.includes('/suppliermanagement') ?
            <NavLink  to="/suppliermanagement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-truck'>Supplier </CDBSidebarMenuItem>
            </NavLink>     :""}
  

            {supplierAuth.includes('/usermanagement') ?
            <NavLink to={'/usermanagement'} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-user'>Users</CDBSidebarMenuItem>
            </NavLink>    :""}
           
            <NavLink to="/location"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-map-marker-alt'>Location</CDBSidebarMenuItem>
            </NavLink>
            {supplierAuth.includes('/payment') ?
            <NavLink to='/payment' activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-credit-card">Payment</CDBSidebarMenuItem>
            </NavLink>:""}
            <NavLink to='/complaints' activeClassName="activeClicked">
    <CDBSidebarMenuItem icon="exclamation-circle">Complaints</CDBSidebarMenuItem>
           </NavLink>
 
           <div>
           <NavLink to='/orders' activeClassName="activeClicked">
      <CDBSidebarMenuItem icon="fas fa-box">Order</CDBSidebarMenuItem>
    </NavLink>
    </div>
    {supplierAuth.includes('/rolemanagement') ?
    <NavLink to='/rolemanagement' activeClassName="activeClicked">
    <CDBSidebarMenuItem icon="user fa-gear">Roles</CDBSidebarMenuItem>
           </NavLink>:""}
      </>
      )}

          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar ;
