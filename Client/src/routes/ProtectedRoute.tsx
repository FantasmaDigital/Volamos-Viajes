import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {token} = useAuth()

  if (token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
