import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Admin/Admin.css"; // You can style the navbar here
import RequestLeave from "./RequestLeave";
import ViewPaystubs from "./ViewPaystubs";
import Home from "./Home";
import Profile from "./Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Choose an appropriate icon


function Employee() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate=useNavigate();
  const handleLogout=()=>{
    console.log("hello");
   navigate('/');
   localStorage.clear();
  }

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home/>;
      case "Profile":
        return <Profile />;
      case "request":
        return <RequestLeave />;
      case "paystubs":
      return <ViewPaystubs/>;
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
            Employee Dashboard
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
          <li onClick={() => setActiveComponent("request")}>RequestLeave</li>
          <li onClick={() => setActiveComponent("paystubs")}>ViewPaystubs</li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="main-content">
        {renderComponent()}
      </div>
    </div>
    </>
  );
}

export default Employee;