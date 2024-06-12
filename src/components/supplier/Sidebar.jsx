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

const SideBar = () => {
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
            <NavLink to={"/supdashbord"}    activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-tachometer-alt'>Dashbord</CDBSidebarMenuItem>
            </NavLink>
            <NavLink  to="/supprofile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='user'>Profile </CDBSidebarMenuItem>
            </NavLink>
            <NavLink  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-bell'>Notification</CDBSidebarMenuItem>
            </NavLink>
           
            <NavLink  to={'/orderAllocation/'}  activeClassName="activeClicked">
              <CDBSidebarMenuItem icon='fas fa-shopping-cart'> Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="sign-out-alt">LogOut</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;