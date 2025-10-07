// src/components/PrivateRoute.js
import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode; // 👈 Type children properly
}

const RedirectLogin: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token"); 

  if (!token) {
    return <Navigate to="/login" />; 
  }

  return <>{children}</>;
}

export default RedirectLogin;
