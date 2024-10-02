import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Admin/Admin.css"; 
import LeaveRequest from "./LeaveRequest";
import Home from "../Employee/Home";
import ViewPaystubs from "../Employee/ViewPaystubs";
import Profile from "../Employee/Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Choose an appropriate icon

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
      <input type="checkbox" id="openslidebar" />
      <div className="head-admin" style={{ color: "white" }}>
        <div>
          <h2>
            <FontAwesomeIcon icon={faUserShield} style={{ marginRight: '8px' }} />
            Manager Dashboard
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
