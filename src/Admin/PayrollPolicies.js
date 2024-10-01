import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './PayrollPolicies.css';

// Payroll Policy Form Component
const PayrollPolicyForm = ({ policyToEdit, onSave }) => {
    const [policy, setPolicy] = useState({
        policyName: '',
        description: '',
        effectiveDate: '',
        epfPercentage: '',
        professionalTax: '',
        healthInsurance: '',
        taxPercentage: '',
        hraAllowancePercentage: '',
        bonusPercentage: ''
    });

    useEffect(() => {
        if (policyToEdit) {
            setPolicy(policyToEdit);
        }
    }, [policyToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPolicy({ ...policy, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (policy.payrollPolicyId) {
                await axiosInstance.put(`/PayrollPolicies/${policy.payrollPolicyId}`, policy, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            } else {
                await axiosInstance.post('/PayrollPolicies', policy, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            }
            onSave();
            setPolicy({
                policyName: '',
                description: '',
                effectiveDate: '',
                epfPercentage: '',
                professionalTax: '',
                healthInsurance: '',
                taxPercentage: '',
                hraAllowancePercentage: '',
                bonusPercentage: ''
            });
        } catch (error) {
            console.error('Error saving payroll policy:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{policy.payrollPolicyId ? 'Edit Payroll Policy' : 'Add Payroll Policy'}</h2>
            <input
                type="text"
                name="policyName"
                value={policy.policyName}
                onChange={handleChange}
                placeholder="Policy Name"
                required
            />
            <input
                type="text"
                name="description"
                value={policy.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="date"
                name="effectiveDate"
                value={policy.effectiveDate}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="epfPercentage"
                value={policy.epfPercentage}
                onChange={handleChange}
                placeholder="EPF Percentage"
                min="0"
                max="100"
                required
            />
            <input
                type="number"
                name="professionalTax"
                value={policy.professionalTax}
                onChange={handleChange}
                placeholder="Professional Tax"
                required
            />
            <input
                type="number"
                name="healthInsurance"
                value={policy.healthInsurance}
                onChange={handleChange}
                placeholder="Health Insurance"
                required
            />
            <input
                type="number"
                name="taxPercentage"
                value={policy.taxPercentage}
                onChange={handleChange}
                placeholder="Tax Percentage"
                min="0"
                max="100"
                required
            />
            <input
                type="number"
                name="hraAllowancePercentage"
                value={policy.hraAllowancePercentage}
                onChange={handleChange}
                placeholder="HRA Allowance Percentage"
                min="0"
                max="100"
                required
            />
            <input
                type="number"
                name="bonusPercentage"
                value={policy.bonusPercentage}
                onChange={handleChange}
                placeholder="Bonus Percentage"
                min="0"
                max="100"
                required
            />
            <button type="submit">{policy.payrollPolicyId ? 'Update' : 'Add'}</button>
        </form>
    );
};

// Payroll Policy List Component with Table and Icons
const PayrollPolicyList = ({ onEdit, onDelete }) => {
    const [policies, setPolicies] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            const response = await axiosInstance.get('/PayrollPolicies', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setPolicies(response.data);
        } catch (error) {
            setError('Failed to fetch payroll policies');
        }
    };

    return (
        <div className="payroll-policy-list">
            <h2>Payroll Policies List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Policy Name</th>
                        <th>Description</th>
                        <th>Effective Date</th>
                        <th>EPF (%)</th>
                        <th>Professional Tax</th>
                        <th>Health Insurance</th>
                        <th>Tax (%)</th>
                        <th>HRA (%)</th>
                        <th>Bonus (%)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.payrollPolicyId}>
                            <td>{policy.policyName}</td>
                            <td>{policy.description}</td>
                            <td>{new Date(policy.effectiveDate).toLocaleDateString()}</td>
                            <td>{policy.epfPercentage}</td>
                            <td>{policy.professionalTax}</td>
                            <td>{policy.healthInsurance}</td>
                            <td>{policy.taxPercentage}</td>
                            <td>{policy.hraAllowancePercentage}</td>
                            <td>{policy.bonusPercentage}</td>
                            <td>
                                <button
                                    className="icon-btn edit-btn"
                                    onClick={() => onEdit(policy)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    onClick={() => onDelete(policy.payrollPolicyId)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

// Payroll Policies Component (Main Container)
const PayrollPolicies = () => {
    const [policyToEdit, setPolicyToEdit] = useState(null);
    const [activeTab, setActiveTab] = useState('addPolicy');

    const handleEdit = (policy) => {
        setPolicyToEdit(policy);
        setActiveTab('addPolicy');
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/PayrollPolicies/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting payroll policy:', error);
        }
    };

    const handleSave = () => {
        setPolicyToEdit(null);
        setActiveTab('policyList');
        window.location.reload();
    };

    return (
        <div className="payroll-policy-container">
            <h1>Payroll Policies</h1>
            <div className="tab-navigation">
                <button
                    className={activeTab === 'addPolicy' ? 'active' : ''}
                    onClick={() => setActiveTab('addPolicy')}
                >
                    Add Payroll Policy
                </button>
                <button
                    className={activeTab === 'policyList' ? 'active' : ''}
                    onClick={() => setActiveTab('policyList')}
                >
                    List Payroll Policies
                </button>
            </div>

            {activeTab === 'addPolicy' && (
                <PayrollPolicyForm policyToEdit={policyToEdit} onSave={handleSave} />
            )}
            {activeTab === 'policyList' && (
                <PayrollPolicyList onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default PayrollPolicies;
