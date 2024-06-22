import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const SupplierProtectRoute = ()=>{
    const supplier = localStorage.getItem("supplier_token")
    return supplier ? <Outlet/> : <Navigate to="/suplogin"/>
}

export default SupplierProtectRoute