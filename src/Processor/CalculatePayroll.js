import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import './CalculatePayroll.css'; // Import the updated CSS

const CalculatePayroll = () => {
  const [payrollData, setPayrollData] = useState({ employeeId: '', payDate: '' });
  const [payrollId, setPayrollId] = useState('');
  const [netPay, setNetPay] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayrollData({ ...payrollData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/Payroll/generate', payrollData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setPayrollId(response.data.payrollId);
      alert('Payroll data submitted successfully!');
    } catch (err) {
      setError('Failed to submit payroll data.');
    }
    setLoading(false);
  };

  const fetchNetPay = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`/Payroll/netPay/${payrollId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setNetPay(response.data.netPay);
    } catch (err) {
      setError('Failed to fetch net pay.');
    }
    setLoading(false);
  };

  const verifyPayroll = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`/Payroll/verify/${payrollId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setIsValid(response.data.isValid);
    } catch (err) {
      setError('Failed to verify payroll.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {/* Payroll Submission Form */}
      <div className="grid-item form-section">
        <form onSubmit={handleSubmit}>
          <h2>Submit Payroll</h2>
          <div className="input-group">
            <label>Employee ID</label>
            <input
              type="number"
              name="employeeId"
              value={payrollData.employeeId}
              onChange={handleChange}
              placeholder="Employee Id"
              required
            />
          </div>
          <div className="input-group">
            <label>Pay Date</label>
            <input
              type="datetime-local"
              name="payDate"
              value={payrollData.payDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-primary">Submit Payroll</button>
        </form>
      </div>

      {/* Fetch Net Pay */}
      <div className="grid-item action-section">
        <h2>Fetch Net Pay</h2>
        <button onClick={fetchNetPay} disabled={!payrollId} className={payrollId ? 'btn-primary' : 'btn-disabled'}>
          Get Net Pay
        </button>
        {netPay !== null && <p>Net Pay: ${netPay}</p>}
      </div>

      {/* Verify Payroll */}
      <div className="grid-item action-section">
        <h2>Verify Payroll</h2>
        <button onClick={verifyPayroll} disabled={!payrollId} className={payrollId ? 'btn-primary' : 'btn-disabled'}>
          Verify Payroll
        </button>
        {isValid !== null && <p>Payroll is {isValid ? 'Valid' : 'Invalid'}</p>}
      </div>
    </div>
  );
};

export default CalculatePayroll;
