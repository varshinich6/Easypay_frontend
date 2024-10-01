import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './ComplianceReport.css';

// Compliance Report Form Component
const ComplianceReportForm = ({ reportToEdit, onSave }) => {
    const [report, setReport] = useState({
        reportName: '',
        description: '',
        createdDate: '',
    });

    useEffect(() => {
        if (reportToEdit) {
            setReport(reportToEdit);
        }
    }, [reportToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReport({ ...report, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (report.crId) {
                await axiosInstance.put(`/ComplianceReports/${report.crId}`, report, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            } else {
                await axiosInstance.post('/ComplianceReports', report, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            }
            onSave();
            setReport({
                reportName: '',
                description: '',
                createdDate: '',
            });
        } catch (error) {
            console.error('Error saving compliance report:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{report.crId ? 'Edit Compliance Report' : 'Add Compliance Report'}</h2>
            <input
                type="text"
                name="reportName"
                value={report.reportName}
                onChange={handleChange}
                placeholder="Report Name"
                required
            />
            <input
                type="text"
                name="description"
                value={report.description}
                onChange={handleChange}
                placeholder="Description"
            />
            <input
                type="date"
                name="createdDate"
                value={report.createdDate}
                onChange={handleChange}
                placeholder="Created Date"
                required
            />
            <button type="submit">{report.crId ? 'Update' : 'Add'}</button>
        </form>
    );
};

// Compliance Report List Component with Table and Icons
const ComplianceReportList = ({ onEdit, onDelete }) => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axiosInstance.get('/ComplianceReports', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setReports(response.data);
        } catch (error) {
            setError('Failed to fetch compliance reports');
        }
    };

    return (
        <div className="compliance-report-list">
            <h2>Compliance Reports List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Report Name</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.crId}>
                            <td>{report.reportName}</td>
                            <td>{report.description}</td>
                            <td>{new Date(report.createdDate).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="icon-btn edit-btn"
                                    onClick={() => onEdit(report)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    onClick={() => onDelete(report.crId)}
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

// Compliance Reports Component (Main Container)
const ComplianceReports = () => {
    const [reportToEdit, setReportToEdit] = useState(null);
    const [activeTab, setActiveTab] = useState('addReport'); // State for active tab

    const handleEdit = (report) => {
        setReportToEdit(report);
        setActiveTab('addReport'); // Switch to add report tab on edit
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/ComplianceReports/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting compliance report:', error);
        }
    };

    const handleSave = () => {
        setReportToEdit(null);
        setActiveTab('reportList'); // Switch to report list tab after saving
        window.location.reload();
    };

    return (
        <div className="compliance-report-container">
            <h1>Compliance Reports</h1>
            <div className="tab-navigation">
                <button
                    className={activeTab === 'addReport' ? 'active' : ''}
                    onClick={() => setActiveTab('addReport')}
                >
                    Add Compliance Report
                </button>
                <button
                    className={activeTab === 'reportList' ? 'active' : ''}
                    onClick={() => setActiveTab('reportList')}
                >
                    List Compliance Reports
                </button>
            </div>

            {activeTab === 'addReport' && (
                <ComplianceReportForm reportToEdit={reportToEdit} onSave={handleSave} />
            )}
            {activeTab === 'reportList' && (
                <ComplianceReportList onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default ComplianceReports;
