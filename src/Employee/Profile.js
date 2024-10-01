import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import './EmployeeProfile.css';

const Profile = () => {
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    mobileNo: '',
    bloodGroup: '',
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axiosInstance.get('/EmployeeDetails');
        setEmployeeDetails(response.data);
        setFormData({
          address: response.data.address,
          mobileNo: response.data.mobileNo,
          bloodGroup: response.data.bloodGroup,
        });
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };
    fetchEmployeeDetails();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(true); // Switch to editing mode
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing
    setFormData({
      address: employeeDetails.address,
      mobileNo: employeeDetails.mobileNo,
      bloodGroup: employeeDetails.bloodGroup,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put('/EmployeeDetails', {
        ...formData,
        employeeId: employeeDetails.employeeId,
      });
      const response = await axiosInstance.get('/EmployeeDetails');
      setEmployeeDetails(response.data);
      setIsEditing(false); // Exit editing mode after successful submission
    } catch (error) {
      console.error('Error updating employee details:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Employee Profile</h2>
      {employeeDetails ? (
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="profile-details">
            <div className="detail">
              <strong>Employee Name:</strong>
              <span className="value-box">{employeeDetails.employeeName}</span>
            </div>
            <div className="detail">
              <strong>Designation:</strong>
              <span className="value-box">{employeeDetails.designation}</span>
            </div>
            <div className="detail">
              <strong>Email:</strong>
              <span className="value-box">{employeeDetails.email}</span>
            </div>
            <div className="detail">
              <strong>Department:</strong>
              <span className="value-box">{employeeDetails.department}</span>
            </div>
            <div className="detail">
              <strong>Address:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-box"
                />
              ) : (
                <span className="value-box">{employeeDetails.address}</span>
              )}
            </div>
            <div className="detail">
              <strong>Mobile No:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className="input-box"
                />
              ) : (
                <span className="value-box">{employeeDetails.mobileNo}</span>
              )}
            </div>
            <div className="detail">
              <strong>Blood Group:</strong>
              {isEditing ? (
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="input-box"
                />
              ) : (
                <span className="value-box">{employeeDetails.bloodGroup}</span>
              )}
            </div>
          </div>

          {isEditing ? (
            <div>
              <button type="submit" className="edit-button">
                Save Changes
              </button>
              <button type="button" className="edit-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button type="button" className="edit-button" onClick={handleEditToggle}>
              Edit Profile
            </button>
          )}
        </form>
      ) : (
        <p>No employee details found.</p>
      )}
    </div>
  );
};

export default Profile;
