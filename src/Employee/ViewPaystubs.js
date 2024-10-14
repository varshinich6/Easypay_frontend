import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import {jwtDecode} from 'jwt-decode'; // Ensure this is the correct package or import statement for jwt decoding

const ViewPaystubs = () => {
    const [payStub, setPayStub] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPayStub();
    }, []);

    const fetchPayStub = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('User is not authenticated');
            return;
        }

        try {
            const decode = jwtDecode(token);
            const employeeId = decode.EmployeeId;
            const role = decode.role;

            console.log(`Employee ID: ${employeeId}, Role: ${role}`);

            const response = await axiosInstance.get('/Payment/view', {
                params: { employeeId: employeeId },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });

            if (response.data && response.data.length > 0) {
                setPayStub(response.data[0]);
            } else {
                setError('No pay stub available for this employee');
            }
        } catch (error) {
            setError('Failed to fetch pay stub details');
        }
    };

    const convertNumberToWords = (num) => {
        const a = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
            'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
            'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const b = [
            '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
        ];

        const f = (x) => {
            if (x < 20) return a[x];
            if (x < 100) return b[Math.floor(x / 10)] + (x % 10 ? ' ' + a[x % 10] : '');
            if (x < 1000) return a[Math.floor(x / 100)] + ' Hundred' + (x % 100 ? ' and ' + f(x % 100) : '');
            return f(Math.floor(x / 1000)) + ' Thousand' + (x % 1000 ? ' ' + f(x % 1000) : '');
        };

        const [integerPart, decimalPart] = num.toString().split('.');

        const integerWords = f(parseInt(integerPart)).trim();
        let decimalWords = '';
        if (decimalPart) {
            decimalWords = ` and ${f(parseInt(decimalPart))} Paise`;
        }

        return integerWords + decimalWords;
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Payslip</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h2, h3, p { text-align: center; }
                    .company-details, .payslip-heading { text-align: center; margin-bottom: 30px; }
                    .pay-details { text-align: left; margin-bottom: 20px; margin-left: 50px; }
                    table { width: 90%; margin-left: 50px; border-collapse: collapse; }
                    th, td { padding: 8px; border: 1px solid #000; text-align: left; }
                    .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #777; }
                </style>
            </head>
            <body>
                <!-- Centered Company Name and Address Section -->
                <div class="company-details">
                    <h2>Hexaware Technologies</h2>
                    <p>Bldg 1, Millennium Business Park</p>
                    <p>Navi Mumbai, Maharashtra</p>
                </div>

                <!-- Centered Payslip Title -->
                <div class="payslip-heading">
                    <h2>Payslip</h2>
                </div>

                <!-- Left-Aligned Employee and Pay Period Information -->
                <div class="pay-details">
                    
                        <p><strong>Date of Joining:</strong> ${payStub.employee?.dateOfJoining ? new Date(payStub.employee.dateOfJoining).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Pay Period:</strong> ${payStub.payDate ? new Date(payStub.payDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Bank Name:</strong> ${payStub.employee?.bankName || 'N/A'}</p>
                        <p><strong>Employee Name:</strong> ${payStub.employee?.employeeName || 'N/A'}</p>
                        <p><strong>Designation:</strong> ${payStub.employee?.designation || 'N/A'}</p>
                        <p><strong>Department:</strong> ${payStub.employee?.department || 'N/A'}</p>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Earnings</th>
                                <th>Amount</th>
                                <th>Deductions</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
    ${payStub.earnings.map((earning, index) => `
        <tr>
            <td>${earning.description}</td>
            <td style="text-align:right;">₹${earning.amount}</td>
            ${payStub.deductions[index] ? `
                <td>${payStub.deductions[index].description}</td>
                <td style="text-align:right;">₹${payStub.deductions[index].amount}</td>
            ` : `
                <td></td>
                <td style="text-align:right;"></td>
            `}
        </tr>
    `).join('')}

    ${payStub.deductions.length > payStub.earnings.length ? 
        payStub.deductions.slice(payStub.earnings.length).map((deduction, index) => `
            <tr>
                <td></td>
                <td style="text-align:right;"></td>
                <td>${deduction.description}</td>
                <td style="text-align:right;">₹${deduction.amount}</td>
            </tr>
        `).join('') 
        : ''
    }

                            <tr>
                                <td style="font-weight: bold;">Total Earnings</td>
                                <td style="font-weight: bold;">₹${payStub.grossSalary}</td>
                                <td style="font-weight: bold;">Total Deductions</td>
                                <td style="font-weight: bold;">₹${payStub.deductionAmount}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Net Pay: ₹${payStub.netPay}</h3>
                    <p>${convertNumberToWords(payStub.netPay)} Only</p>
                    <div class="footer">This is a system-generated payslip</div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!payStub) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: '15px', maxWidth: '1100px', margin: '0 auto', border: '1px solid #ddd', borderRadius: '10px', fontFamily: 'Arial, sans-serif' }}>
        {/* Add the Company Name and Address Here */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Hexaware Technologies</h2>
            <p>Bldg 1, Millennium Business Park</p>
            <p>Navi Mumbai, Maharashtra</p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2>Payslip</h2>
        </div>

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
                    {payStub.earnings.map((earning, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px' }}>{earning.description}</td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>₹{earning.amount}</td>
                            {payStub.deductions[index] ? (
                                <>
                                    <td style={{ padding: '8px' }}>{payStub.deductions[index].description}</td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}>₹{payStub.deductions[index].amount}</td>
                                </>
                            ) : (
                                <>
                                    <td style={{ padding: '8px' }}></td>
                                    <td style={{ padding: '8px', textAlign: 'right' }}></td>
                                </>
                            )}
                        </tr>
                    ))}

                    {payStub.deductions.length > payStub.earnings.length && payStub.deductions.slice(payStub.earnings.length).map((deduction, index) => (
                        <tr key={payStub.earnings.length + index}>
                            <td style={{ padding: '8px' }}></td>
                            <td style={{ padding: '8px', textAlign: 'right' }}></td>
                            <td style={{ padding: '8px' }}>{deduction.description}</td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>₹{deduction.amount}</td>
                        </tr>
                    ))}

                    <tr>
                        <td style={{ padding: '8px', fontWeight: 'bold' }}>Total Earnings</td>
                        <td style={{ padding: '8px', fontWeight: 'bold', textAlign: 'right' }}>₹{payStub.grossSalary}</td>
                        <td style={{ padding: '8px', fontWeight: 'bold' }}>Total Deductions</td>
                        <td style={{ padding: '8px', fontWeight: 'bold', textAlign: 'right' }}>₹{payStub.deductionAmount}</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
                Net Pay: ₹{payStub.netPay}
            </div>
            <p style={{ textAlign: 'center' }}>
                {convertNumberToWords(payStub.netPay)} Only
            </p>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button onClick={handlePrint} style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', cursor: 'pointer' }}>
                    Print Payslip
                </button>
            </div>
        </div>
    );
};

export default ViewPaystubs;
