import React from 'react'
import { Outlet, Navigate } from "react-router-dom";


const UserProtectRouter = () => {
 const user = localStorage.getItem("access_token") 
 const userRefresh = localStorage.getItem("refresh_token")
 return user || userRefresh ? <Outlet/> : <Navigate to="/userlogin"/>
}

export default UserProtectRouter
