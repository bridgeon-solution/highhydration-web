import React from 'react'
import { Outlet, Navigate } from "react-router-dom";


const ProtectRouter = () => {
 const user = true
 return user ? <Outlet/> : <Navigate to="/userlogin"/>
}

export default ProtectRouter
