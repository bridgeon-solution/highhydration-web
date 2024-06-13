import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ children, requiredPermissions }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/userlogin" />;
  }

  const hasPermission = requiredPermissions.every(permission =>
    user.permissions.includes(permission)
  );

  return hasPermission ? children : <Navigate to="/" />;
};

export default PrivateRoute;
