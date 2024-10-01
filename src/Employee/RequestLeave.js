import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './RequestLeave.css';

const RequestLeave = () => {
    // State for leave request form
    const [leaveRequest, setLeaveRequest] = useState({
        startDate: '',
        endDate: '',
        reason: '',
        employeeId: ''
    });

    // State for leave status retrieval
    const [employeeId, setEmployeeId] = useState('');
    const [leaveStatus, setLeaveStatus] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // State for tab management
    const [activeTab, setActiveTab] = useState('requestLeave');

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Handle change for leave request form
    const handleRequestChange = (e) => {
        const { name, value } = e.target;
        setLeaveRequest({ ...leaveRequest, [name]: value });
    };

    // Handle form submission for leave request
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/LeaveRequest/RequestLeave', leaveRequest, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setLeaveRequest({
                startDate: '',
                endDate: '',
                reason: '',
                employeeId: ''
            });
            alert('Leave request submitted successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit leave request');
        }
    };

    // Handle change for fetching leave status
    const handleStatusChange = (e) => {
        setEmployeeId(e.target.value);
    };

    // Handle submission to get leave status
    const handleStatusSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axiosInstance.get(`/LeaveRequest/Leave_Status${employeeId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setLeaveStatus(response.data);
        } catch (err) {
            setError('Unable to fetch leave status. Please try again later.');
        }
        setLoading(false);
    };

    // Function to render the appropriate tab content
    const renderTabContent = () => {
        if (activeTab === 'requestLeave') {
            return (
                <form className="leave-form" onSubmit={handleRequestSubmit}>
                    <h2>Request Leave</h2>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={leaveRequest.startDate}
                            onChange={handleRequestChange}
                            required
                            min={today} // Disable past dates
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={leaveRequest.endDate}
                            onChange={handleRequestChange}
                            required
                            min={today} // Disable past dates
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reason">Reason:</label>
                        <input
                            type="text"
                            name="reason"
                            value={leaveRequest.reason}
                            onChange={handleRequestChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee Id:</label>
                        <input
                            type="number"
                            name="employeeId"
                            value={leaveRequest.employeeId}
                            onChange={handleRequestChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit Leave Request</button>
                </form>
            );
        } else if (activeTab === 'getLeaveStatus') {
            return (
                <form className="status-form" onSubmit={handleStatusSubmit}>
                    <h2>Get Leave Status</h2>
                    <div className="form-group">
                        <label htmlFor="employeeId">Employee Id:</label>
                        <input
                            type="number"
                            name="employeeId"
                            value={employeeId}
                            onChange={handleStatusChange}
                            required
                        />
                    </div>
                    <button type="submit">Get Leave Status</button>

                    {loading && <p className="status-message">Loading...</p>}
                    {error && <p className="status-message" style={{ color: 'red' }}>{error}</p>}

                    {/* Display Leave Status */}
                    {leaveStatus.length > 0 && (
                            <div className="leave-status">
                                {/* Grid Headers */}
                                <div>Request ID</div>
                                <div>Start Date</div>
                                <div>End Date</div>
                                <div>Reason</div>
                                <div>Approved</div>

                                {/* Grid Data Rows */}
                                {leaveStatus.map((leave) => (
                                    <>
                                        <div key={`id-${leave.requestId}`}>{leave.requestId}</div>
                                        <div key={`start-${leave.requestId}`}>{new Date(leave.startDate).toLocaleDateString()}</div>
                                        <div key={`end-${leave.requestId}`}>{new Date(leave.endDate).toLocaleDateString()}</div>
                                        <div key={`reason-${leave.requestId}`}>{leave.reason}</div>
                                        <div key={`approved-${leave.requestId}`}>{leave.isApproved ? 'Yes' : 'No'}</div>
                                    </>
                                ))}
                            </div>
                        )}
                </form>
            );
        }
    };

    return (
        <div className="page-container">
            <div className="leave-container">
                {/* Tab Navigation */}
                <div className="tab-navigation">
                    <button onClick={() => setActiveTab('requestLeave')} className={activeTab === 'requestLeave' ? 'active' : ''}>
                        Request Leave
                    </button>
                    <button onClick={() => setActiveTab('getLeaveStatus')} className={activeTab === 'getLeaveStatus' ? 'active' : ''}>
                        Get Leave Status
                    </button>
                </div>

                {/* Render Active Tab Content */}
                {renderTabContent()}
            </div>
        </div>
    );
};

export default RequestLeave;
