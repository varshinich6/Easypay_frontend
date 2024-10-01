import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Processor.css"; // Custom styles for the Processor component
import CalculatePayroll from "./CalculatePayroll";
import ManageBenefits from "./ManageBenefits";
import Home from "../Employee/Home";
import Profile from "../Employee/Profile"
import ViewPaystubs from "../Employee/ViewPaystubs";
import RequestLeave from "../Employee/RequestLeave";



function Processor() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate();

  // Handle logout and redirect to login page
  const handleLogout = () => {
    console.log("Logout");
    navigate("/");
    localStorage.clear();
  };

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "calculate":
        return <CalculatePayroll />;
      case "manage":
        return <ManageBenefits />;
      case "RequestLeave":
        return <RequestLeave />;
      case "ViewPaystubs":
        return <ViewPaystubs />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <>
      {/* Header with title and logout button */}
      <div className="head"style={{color:"white"}}>
        <div>
          <h1>Payroll Management</h1>
        </div>
        <div className="gap"></div>
        <div className="child2">
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main App Container */}
      <div className="app">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <ul>
            <li onClick={() => setActiveComponent("home")}>Home</li>
            <li onClick={() => setActiveComponent("Profile")}>Profile</li>
            <li onClick={() => setActiveComponent("calculate")}>Manage Payroll</li>
            <li onClick={() => setActiveComponent("manage")}>Manage Benefits</li>
            <li onClick={() => setActiveComponent("RequestLeave")}>RequestLeave</li>
            <li onClick={() => setActiveComponent("ViewPaystubs")}>ViewPaystubs</li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {renderComponent()}
        </div>
      </div>
    </>
  );
}

export default Processor;
