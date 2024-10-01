import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/login" />; // Redirect to login if no token found

  const decodedToken = jwtDecode(token);
  console.log("Decoded Token: ", decodedToken); // Check the decoded token structure

  // Debug the role being checked
  console.log("Expected Role: ", role);
  console.log("User Role: ", decodedToken.role);

  if (role && decodedToken.role !== role) {
    console.log("Unauthorized - Role Mismatch");
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page if roles don't match
  }

  return children; // Render the child component if everything is valid
};

export default ProtectedRoute;
