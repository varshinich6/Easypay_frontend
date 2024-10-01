import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'; // Import your ProtectedRoute component
import Login from './Pages/Login';
import LandingPage from './Pages/LandingPage';
import Admin from './Admin/Admin';
import ManageUser from './Admin/ManageUser';
import PayrollPolicies from './Admin/PayrollPolicies';
import ComplianceReports from './Admin/ComplianceReports';
import ManageEmployee from './Admin/ManageEmployee';
import Employee from './Employee/Employee';
import Home from './Employee/Home';
import Profile from './Employee/Profile';
import RequestLeave from './Employee/RequestLeave';
import ViewPaystubs from './Employee/ViewPaystubs';
import Processor from './Processor/Processor';
import CalculatePayroll from './Processor/CalculatePayroll';
import ManageBenefits from './Processor/ManageBenefits';
import Manager from './Manager/Manager';
import LeaveRequest from './Manager/LeaveRequest';
import EmailVerification from './Pages/EmailVerification';
import CodeCheck from './Pages/CodeCheck';
import ChangePassword from './Pages/ChangePassword';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/EmailVerification" element={<EmailVerification/>}/>
            <Route path="/codecheck" element={<CodeCheck/>}/>
            <Route path="/changePassword" element={<ChangePassword/>}/>

            {/* Admin Routes - Only accessible to Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="Admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="Admin">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="Profile"
              element={
                <ProtectedRoute role="Admin">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-user"
              element={
                <ProtectedRoute role="Admin">
                  <ManageUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payroll-policies"
              element={
                <ProtectedRoute role="Admin">
                  <PayrollPolicies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/compliance-reports"
              element={
                <ProtectedRoute role="Admin">
                  <ComplianceReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-employee"
              element={
                <ProtectedRoute role="Admin">
                  <ManageEmployee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewPaystubs"
              element={
                <ProtectedRoute role="Admin">
                  <ViewPaystubs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RequestLeave"
              element={
                <ProtectedRoute role="Admin">
                  <RequestLeave />
                </ProtectedRoute>
              }
            />

            {/* Employee Routes - Only accessible to Employee */}
            <Route
              path="/employee"
              element={
                <ProtectedRoute role="Employee">
                  <Employee />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="Employee">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="Employee">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-leave"
              element={
                <ProtectedRoute role="Employee">
                  <RequestLeave />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-paystubs"
              element={
                <ProtectedRoute role="Employee">
                  <ViewPaystubs />
                </ProtectedRoute>
              }
            />

            {/* Processor Routes - Only accessible to Payroll Processor */}
            <Route
              path="/processor"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <Processor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calculate-payroll"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <CalculatePayroll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-benefits"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <ManageBenefits />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewPaystubs"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <ViewPaystubs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RequestLeave"
              element={
                <ProtectedRoute role="PayrollProcessor">
                  <RequestLeave />
                </ProtectedRoute>
              }
            />

            {/* Manager Routes - Only accessible to Manager */}
            <Route
              path="/manager"
              element={
                <ProtectedRoute role="Manager">
                  <Manager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="Manager">
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="Profile"
              element={
                <ProtectedRoute role="Manager">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manager-leave"
              element={
                <ProtectedRoute role="Manager">
                  <LeaveRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ViewPaystubs"
              element={
                <ProtectedRoute role="Manager">
                  <ViewPaystubs />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect any unknown route to the landing page */}
            <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
