import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Manager.css"; // Custom CSS for styling the Manager component
import LeaveRequest from "./LeaveRequest";
import Home from "../Employee/Home";
import ViewPaystubs from "../Employee/ViewPaystubs";
import Profile from "../Employee/Profile";

function Manager() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate();

  // Handle logout and navigate back to login
  const handleLogout = () => {
    console.log("Logout Successful");
    navigate('/');
    localStorage.clear();
  };

  // Function to render the selected component based on the active state
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "leaveRequest":
        return <LeaveRequest />;
      case "ViewPaystubs":
        return <ViewPaystubs />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <>
      {/* Header Section with Title and Logout Button */}
      <div className="head" style={{ color: "white" }}>
        <div>
          <h1>Manager Dashboard</h1>
        </div>
        <div className="gap"></div>
        <div className="child2">
          <button className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <div className="app">
        {/* Sidebar Navbar */}
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveComponent("home")}>Home</li>
            <li onClick={() => setActiveComponent("Profile")}>Profile</li>
            <li onClick={() => setActiveComponent("leaveRequest")}>
              Leave Requests
            </li>
            <li onClick={() => setActiveComponent("ViewPaystubs")}>
              ViewPaystubs
            </li>
          </ul>
        </div>

        {/* Main content area to display the selected component */}
        <div className="main-content">{renderComponent()}</div>
      </div>
    </>
  );
}

export default Manager;
