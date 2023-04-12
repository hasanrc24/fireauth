import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dash">
      <h3>Hello World</h3>
      <button className="btn btn-primary" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
