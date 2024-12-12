import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = Cookies.get('authToken'); 

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
