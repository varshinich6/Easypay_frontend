import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Employee.css"; // You can style the navbar here
import RequestLeave from "./RequestLeave";
import ViewPaystubs from "./ViewPaystubs";
import Home from "./Home";
import Profile from "./Profile";
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
    <div className="head"style={{color:"white"}}> 
      <div><h1>Employee Management</h1></div>
      <div className="gap"></div>
    <div className="child2"><button className="btn" onClick={handleLogout}>Logout</button></div>
    </div>
   
    <div className="app">
      {/* Sidebar Navbar */}
      <div className="sidebar">
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