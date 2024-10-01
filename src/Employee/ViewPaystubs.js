import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import {jwtDecode} from 'jwt-decode'; // Corrected the import

const ViewPaystubs = () => {
    const [payStub, setPayStub] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPayStub();
    }, []);

    const fetchPayStub = async () => {
        const token = localStorage.getItem('token');
        
        // Ensure token exists before decoding
        if (!token) {
            setError('User is not authenticated');
            return;
        }

        try {
            const decode = jwtDecode(token);
            const employeeId = decode.EmployeeId;
            const role = decode.role;

            console.log(`Employee ID: ₹{employeeId}, Role: ₹{role}`);

            const response = await axiosInstance.get('/Payment/view', {
                params: {
                    employeeId: employeeId // Pass the correct employeeId
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Corrected header format
                }
            });

            if (response.data && response.data.length > 0) {
                // Since it's an array, pick the first pay stub
                setPayStub(response.data[0]);
            } else {
                setError('No pay stub available for this employee');
            }
        } catch (error) {
            setError('Failed to fetch pay stub details');
        }
    };

    // Show error if there's an issue
    if (error) {
        return <p>{error}</p>;
    }

    // Show loading message if no pay stub is found yet
    if (!payStub) {
        return <p>Loading...</p>;
    }

    return (
      <div style={{ padding: '15px', maxWidth: '1100px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', fontFamily: 'Arial, sans-serif' }}>
          {/* Payslip Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2>Payslip</h2>
          </div>
  
          {/* Employee Details Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '10px' }}>
              <div>
                  <p><strong>Date of Joining:</strong> {payStub.employee?.dateOfJoining ? new Date(payStub.employee.dateOfJoining).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Pay Period:</strong> {payStub.payDate ? new Date(payStub.payDate).toLocaleDateString() : 'N/A'}</p>
                  <p><strong>Bank Name:</strong> {payStub.employee?.bankName || 'N/A'}</p>
              </div>
              <div>
                  <p><strong>Employee Name:</strong> {payStub.employee?.employeeName || 'N/A'}</p>
                  <p><strong>Designation:</strong> {payStub.employee?.designation || 'N/A'}</p>
                  <p><strong>Department:</strong> {payStub.employee?.department || 'N/A'}</p>
              </div>
          </div>
  
          {/* Earnings and Deductions Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
              <thead>
                  <tr>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #000', padding: '8px' }}>Earnings</th>
                      <th style={{ textAlign: 'right', borderBottom: '1px solid #000', padding: '8px' }}>Amount</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #000', padding: '8px' }}>Deductions</th>
                      <th style={{ textAlign: 'right', borderBottom: '1px solid #000', padding: '8px' }}>Amount</th>
                  </tr>
              </thead>
              <tbody>
                  {/* Dynamic rows for Earnings and Deductions */}
                  {payStub.earnings.map((earning, index) => (
                      <tr key={index}>
                          <td style={{ padding: '8px' }}>{earning.description}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>₹{earning.amount}</td>
                          <td style={{ padding: '8px' }}>{payStub.deductions[index]?.description || ''}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>₹{payStub.deductions[index]?.amount || ''}</td>
                      </tr>
                  ))}
                  {/* Total Earnings and Deductions Row */}
                  <tr>
                      <td style={{ padding: '8px', fontWeight: 'bold', borderTop: '1px solid #000' }}>Total Earnings</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', borderTop: '1px solid #000' }}>₹{payStub.grossSalary}</td>
                      <td style={{ padding: '8px', fontWeight: 'bold', borderTop: '1px solid #000' }}>Total Deductions</td>
                      <td style={{ padding: '8px', textAlign: 'right', fontWeight: 'bold', borderTop: '1px solid #000' }}>₹{payStub.deductionAmount}</td>
                  </tr>
              </tbody>
          </table>
  
          {/* Net Pay Section */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h3>Net Pay: ₹{payStub.netPay}</h3>
              <p>{convertNumberToWords(payStub.netPay)} Only</p>
          </div>
  
          {/* Signature Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', marginBottom: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                  <p>________________________</p>
                  <p>Employer Signature</p>
              </div>
          </div>
  
          {/* Footer Note */}
          <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '12px', color: '#777' }}>This is a system-generated payslip</p>
      </div>
  );};
  
  // Function to convert number to words
  const convertNumberToWords = (num) => {
      // Custom logic for converting numbers to words (simplified for demo)
      const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
      return numberWords[num] || num.toString();
  };
  
  export default ViewPaystubs;
  
