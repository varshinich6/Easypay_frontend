import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // You can style the navbar here
import ViewPaystubs from "../Employee/ViewPaystubs";
import Home from "../Employee/Home";
import ComplianceReports from "./ComplianceReports";
import ManageEmployee from "./ManageEmployee";
import ManageUser from "./ManageUser";
import PayrollPolicies from "./PayrollPolicies";
import Profile from "../Employee/Profile";
import RequestLeave from "../Employee/RequestLeave";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons'; // Choose an appropriate icon

function Admin() {
  // State to track the active component
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("hello");
    navigate('/');
    localStorage.clear();
  }

  // Function to render the selected component
  const renderComponent = () => {
    switch (activeComponent) {
      case "home":
        return <Home />;
      case "Profile":
        return <Profile />;
      case "RequestLeave":
        return <RequestLeave />;
      case "reports":
        return <ComplianceReports />;
      case "ViewPaystubs":
        return <ViewPaystubs />;
      case "manage_employee":
        return <ManageEmployee />;
      case "manage_user":
        return <ManageUser />;
      case "payroll_policies":
        return <PayrollPolicies />;
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
            Admin Dashboard
          </h2>
        </div>
        <div className="flexdcol">
          <div className="child2-admin">
            <button className="btn-admin" onClick={handleLogout}>Logout</button>
          </div>
          <label id="opensidebar" htmlFor="openslidebar">
            <div className="opensidebar">
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </label>
          <label id="closesidebar" htmlFor="openslidebar">
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
            <li onClick={() => setActiveComponent("RequestLeave")}>Request Leave</li>
            <li onClick={() => setActiveComponent("ViewPaystubs")}>View Paystubs</li>
            <li onClick={() => setActiveComponent("reports")}>Compliance Reports</li>
            <li onClick={() => setActiveComponent("manage_employee")}>Manage Employee</li>
            <li onClick={() => setActiveComponent("manage_user")}>Manage User</li>
            <li onClick={() => setActiveComponent("payroll_policies")}>Payroll Policies</li>
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

export default Admin;
