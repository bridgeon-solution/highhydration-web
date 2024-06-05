import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";

import {NavLink} from "react-router-dom";


const AdminSidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
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
            <NavLink  to="/suppliermanagement" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='user'>Supplier </CDBSidebarMenuItem>
            </NavLink>
            <NavLink   to={'/usermanagement'}  activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon='fas fa-bell'>Users</CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink to="/location"  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-map-marker-alt'>Location</CDBSidebarMenuItem>
            </NavLink>
            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-credit-card">Payment</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to={'/complaint'}         activeClassName="activeClicked">
    <CDBSidebarMenuItem icon="exclamation-circle">Complaints</CDBSidebarMenuItem>
           </NavLink>
 
           <div>
      <NavLink activeClassName="activeClicked" onClick={toggleModal}>
        <CDBSidebarMenuItem icon="ellipsis-h">Others</CDBSidebarMenuItem>
      </NavLink>
    </div>
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
