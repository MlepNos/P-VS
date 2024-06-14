import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const ProtectedRoute = () => {
  const { authUser } = useAppContext();

  return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
