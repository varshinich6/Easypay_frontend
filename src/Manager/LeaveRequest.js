import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import "./LeaveRequest.css";

const LeaveRequest = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch all pending leave requests for the manager to review
    useEffect(() => {
        const fetchLeaveRequests = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axiosInstance.get('/LeaveRequest', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setLeaveRequests(response.data);
            } catch (err) {
                setError('Failed to fetch leave requests.');
            }
            setLoading(false);
        };
        fetchLeaveRequests();
    }, []);

    // Handle leave approval
    const handleApprove = async (requestId) => {
        try {
            await axiosInstance.post(`/LeaveRequest/${requestId}/approve`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            // Remove the approved request from the state
            setLeaveRequests(leaveRequests.filter(leave => leave.requestId !== requestId));
            alert('Leave request approved successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to approve leave request.');
        }
    };

    return (
        <div className="leave-container">
            <h2>Manager Leave Approval</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {leaveRequests.length > 0 ? (
                <div className="leave-cards">
                    {leaveRequests.map((leave) => (
                        <div className="leave-card" key={leave.requestId}>
                            <h3>Leave Request #{leave.requestId}</h3>
                            <p><strong>Employee ID:</strong> {leave.employeeId}</p>
                            <p><strong>Start Date:</strong> {new Date(leave.startDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(leave.endDate).toLocaleDateString()}</p>
                            <p><strong>Reason:</strong> {leave.reason}</p>
                            <p><strong>Approved:</strong> {leave.isApproved ? 'Yes' : 'No'}</p>
                            {/* Render the "Approve" button only if not approved */}
                            {!leave.isApproved && (
                                <button className="approve-btn" onClick={() => handleApprove(leave.requestId)}>
                                    Approve
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No leave requests found.</p>
            )}
        </div>
    );
};

export default LeaveRequest;
