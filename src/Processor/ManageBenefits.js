import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import './ManageBenifits.css'; // Import your CSS file

const ManageBenefits = () => {
    const [benefits, setBenefits] = useState([]);
    const [benefitToEdit, setBenefitToEdit] = useState(null);
    const [error, setError] = useState('');
    const [benefit, setBenefit] = useState({
        benefitName: '',
        employeeName: '',
        amount: '',
        employeeId:'',
    });
    const [activeTab, setActiveTab] = useState('add');

    useEffect(() => {
        fetchBenefits();
    }, []);

    const fetchBenefits = async () => {
        try {
            const response = await axiosInstance.get('/Benefits', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBenefits(response.data);
            console.log(response.data);
        } catch (err) {
            setError('Failed to fetch benefits');
            console.error('Error fetching benefits:', err);
        }
    };

    useEffect(() => {
        if (benefitToEdit) {
            setBenefit(benefitToEdit);
        }
    }, [benefitToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBenefit({ ...benefit, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (benefit.benefitId) {
                await axiosInstance.put(
                    `/Benefits/${benefit.benefitId}`,
                    benefit,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
            } else {
                await axiosInstance.post(
                    '/Benefits',
                    benefit,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
            }
            handleSave();
        } catch (error) {
            console.error('Error saving benefit:', error);
        }
    };

    const handleEdit = (benefit) => {
        setBenefitToEdit(benefit);
        setActiveTab('add');
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/Benefits/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchBenefits();
        } catch (error) {
            console.error('Error deleting benefits data:', error);
        }
    };

    const handleSave = () => {
        setBenefitToEdit(null);
        setBenefit({
            benefitName: '',
            employeeId: '',
            amount: '',
        });
        fetchBenefits();
    };

    const renderAddForm = () => (
        <form onSubmit={handleSubmit}>
            <h2>{benefit.benefitId ? 'Edit Benefit' : 'Add Benefit'}</h2>
            <input
                type="text"
                name="benefitName"
                value={benefit.benefitName}
                onChange={handleChange}
                placeholder="Benefit name"
                required
            />
            <input
                type="number"
                name="employeeId"
                value={benefit.employeeId}
                onChange={handleChange}
                placeholder="Employee Id"
                required
            />
            <button type="submit">{benefit.benefitId ? 'Update' : 'Add'}</button>
        </form>
    );

    const renderBenefitList = () => (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h2>Benefit List</h2>
            <table className="benefit-table">
                <thead>
                    <tr>
                        <th>Benefit Name</th>
                        <th>EmployeeID</th>
                        <th>Employee Name</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {benefits.map((benefit) => (
                        <tr key={benefit.benefitId}>
                            <td>{benefit.benefitName}</td>
                            <td>{benefit.employeeId}</td>
                            <td>{benefit.employeeName}</td>
                            <td>{benefit.amount}</td>
                           
                           
                            <td>
                                
                                <button className="delete-btn" onClick={() => handleDelete(benefit.benefitId)}>
                                    <i className="fas fa-trash-alt"></i> {/* Dustbin icon */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="manage-benefits-container"> {/* Centered container */}
            <h1>Manage Benefits</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'add' ? 'active' : ''}
                    onClick={() => setActiveTab('add')}
                >
                    Add Benefit
                </button>
                <button
                    className={activeTab === 'list' ? 'active' : ''}
                    onClick={() => setActiveTab('list')}
                >
                    Benefit List
                </button>
            </div>
            {activeTab === 'add' && renderAddForm()}
            {activeTab === 'list' && renderBenefitList()}
        </div>
    );
};

export default ManageBenefits;
