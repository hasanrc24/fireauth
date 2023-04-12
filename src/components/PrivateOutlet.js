import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = ({ user }) => {
  // const auth = localStorage.getItem("UserIn");
  return user ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateOutlet;
