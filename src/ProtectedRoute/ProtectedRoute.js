import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />; 

  const decodedToken = jwtDecode(token);
  
  if (role && decodedToken.role !== role) {
    console.log("Unauthorized - Role Mismatch");
    return <Navigate to="/" />; 
  }

  return children; 
};

export default ProtectedRoute;
