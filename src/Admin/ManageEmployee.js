import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ManageEmployee.css'; // Importing the CSS file

const ManageEmployee = () => {
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [employeeList, setEmployeeList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [activeTab, setActiveTab] = useState('addEmployee'); // State for active tab
    const [employee, setEmployee] = useState({
        employeeName: '',
        designation: '',
        email: '',
        dateOfJoining: '',
        department: '',
        basicSalary: '',
        bankName: '',
        accountNumber: '',
        gradeId: ''
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get('/Employee', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, // Fixed string interpolation
            });
            setEmployeeList(response.data);
        } catch (error) {
            console.error('Failed to fetch employees:', error);
        }
    };

    const handleEdit = (employee) => {
        setEmployeeToEdit(employee);
        setEmployee(employee); // Set employee to edit values
        setActiveTab('addEmployee'); // Switch to add employee tab
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/Employee/${id}`, { // Fixed string interpolation
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }, // Fixed string interpolation
            });
            setEmployeeList(employeeList.filter((emp) => emp.employeeId !== id));
            setSuccessMessage('Employee deleted successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (employee.employeeId) {
                await axiosInstance.put(`/Employee/${employee.employeeId}`, employee, { // Fixed string interpolation
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Fixed string interpolation
                    }
                });
            } else {
                await axiosInstance.post('/Employee', employee, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Fixed string interpolation
                    }
                });
            }
            // Reset form after save
            setEmployee({
                employeeName: '',
                designation: '',
                email: '',
                dateOfJoining: '',
                department: '',
                basicSalary: '',
                bankName: '',
                accountNumber: '',
                gradeId: ''
            });
            setEmployeeToEdit(null);
            fetchEmployees();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    return (
        <div className="employee-container">
            <h1>Manage Employee</h1>
            {successMessage && <div className="status-message">{successMessage}</div>}
            <div className="tab-navigation">
                <button
                    onClick={() => setActiveTab('addEmployee')}
                    className={activeTab === 'addEmployee' ? 'active' : ''}
                >
                    Add Employee
                </button>
                <button
                    onClick={() => setActiveTab('employeeList')}
                    className={activeTab === 'employeeList' ? 'active' : ''}
                >
                    Get List of All Employees
                </button>
            </div>

            {activeTab === 'addEmployee' && (
                <form onSubmit={handleSave}>
                    <h2>{employee.employeeId ? 'Edit Employee' : 'Add Employee'}</h2>
                    <div className="form-group">
                        <label>Employee Name</label>
                        <input type="text" name="employeeName" value={employee.employeeName} onChange={handleChange} required />
                        <label>Designation</label>
                        <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
                        <label>Email</label>
                        <input type="email" name="email" value={employee.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date of Joining</label>
                        <input type="date" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange} required />
                        <label>Department</label>
                        <input type="text" name="department" value={employee.department} onChange={handleChange} required />
                        <label>Basic Salary</label>
                        <input type="number" name="basicSalary" value={employee.basicSalary} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Bank Name</label>
                        <input type="text" name="bankName" value={employee.bankName} onChange={handleChange} required />
                        <label>Account Number</label>
                        <input type="text" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />
                        <label>Grade ID</label>
                        <input type="number" name="gradeId" value={employee.gradeId} onChange={handleChange} required />
                    </div>
                        <button type="submit">{employee.employeeId ? 'Update' : 'Add'}</button>
                    
                </form>
            )}

            {activeTab === 'employeeList' && (
                <div>
                    <h2>Employee List</h2>
                    <div className="employee-grid">
                    <div className="grid-header">EmployeeId</div>
                        <div className="grid-header">Employee Name</div>
                        <div className="grid-header">Designation</div>
                        <div className="grid-header">Email</div>
                        <div className="grid-header">Date of Joining</div>
                        <div className="grid-header">Basic Salary</div>
                        <div className="grid-header">Bank Name</div>
                        <div className="grid-header">Account Number</div>
                        <div className="grid-header">Grade ID</div>
                        <div className="grid-header">Actions</div> {/* Actions Header */}

                        {employeeList.map((emp) => (
                            <React.Fragment key={emp.employeeId}>
                                <div className="grid-cell">{emp.employeeId}</div>
                                <div className="grid-cell">{emp.employeeName}</div>
                                <div className="grid-cell">{emp.designation}</div>
                                <div className="grid-cell">{emp.email}</div>
                                <div className="grid-cell">{new Date(emp.dateOfJoining).toLocaleDateString()}</div>
                                <div className="grid-cell">{emp.basicSalary}</div>
                                <div className="grid-cell">{emp.bankName}</div>
                                <div className="grid-cell">{emp.accountNumber}</div>
                                <div className="grid-cell">{emp.gradeId}</div>
                                <div className="grid-cell">
                                    {/* Edit and Delete buttons */}
                                    <button onClick={() => handleEdit(emp)} className="btn-edit">
                                        <i className="fa fa-pencil"></i> {/* Brush Icon */}
                                    </button>
                                    <button onClick={() => handleDelete(emp.employeeId)} className="btn-delete">
                                        <i className="fa fa-trash"></i> {/* Dustbin Icon */}
                                    </button>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEmployee;
