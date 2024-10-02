import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Admin/Admin.css"; 
import CalculatePayroll from "./CalculatePayroll";
import ManageBenefits from "./ManageBenefits";
import Home from "../Employee/Home";
import Profile from "../Employee/Profile"
import ViewPaystubs from "../Employee/ViewPaystubs";
import RequestLeave from "../Employee/RequestLeave";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Choose an appropriate icon


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
      <input type="checkbox" id="openslidebar" />
      <div className="head-admin" style={{ color: "white" }}>
        <div>
          <h2>
            <FontAwesomeIcon icon={faUserShield} style={{ marginRight: '8px' }} />
            Payroll-Processor Dashboard
          </h2>
        </div>
      <div className="flexdcol">
        <div className="child2-admin">
            <button className="btn-admin" onClick={handleLogout}>Logout</button>
        </div>
        <label id="opensidebar" for="openslidebar">
          <div className="opensidebar">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </label>
        <label id="closesidebar" for="openslidebar">
          <div className="closesidebar">
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        </label>
      </div>
    </div>
   
    <div className="app-admin">
      {/* Sidebar Navbar */}
      <div className="sidebar-admin">
        <ul>            <li onClick={() => setActiveComponent("home")}>Home</li>
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
