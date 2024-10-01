import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './ManageUser.css'; // Import CSS for styling

// User Form Component
const UserForm = ({ userToEdit, onSave }) => {
    const [user, setUser] = useState({
        userName: '',
        email: '',
        role: '',
        employeeId: '',
    });

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit);
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user.userId) {
                await axiosInstance.put(`/User/${user.userId}`, user, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
                await axiosInstance.post('/User', user, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }
            onSave();
            setUser({
                userName: '',
                email: '',
                role: '',
                employeeId: '',
            });
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{user.userId ? 'Edit User' : 'Add User'}</h2>
            <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                placeholder="User Name"
                required
            />
            <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                placeholder="Role"
                required
            />
            <input
                type="text"
                name="employeeId"
                value={user.employeeId}
                onChange={handleChange}
                placeholder="Employee ID"
                required
            />
            <button type="submit">{user.userId ? 'Update' : 'Add'}</button>
        </form>
    );
};

// User List Component with Table and Icons
const UserList = ({ onEdit, onDelete }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/User', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            setError('Failed to fetch users');
        }
    };

    return (
        <div className="user-list">
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Employee ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.employeeId}</td>
                            <td>
                                <button
                                    className="icon-btn edit-btn"
                                    onClick={() => onEdit(user)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="icon-btn delete-btn"
                                    onClick={() => onDelete(user.userId)}
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

// Main Manage User Component
const ManageUser = () => {
    const [userToEdit, setUserToEdit] = useState(null);
    const [activeTab, setActiveTab] = useState('create'); // State for active tab

    const handleEdit = (user) => {
        setUserToEdit(user);
        setActiveTab('create'); // Switch to create tab on edit
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/User/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSave = () => {
        setUserToEdit(null);
        setActiveTab('list'); // Switch to list tab after saving
        window.location.reload();
    };

    return (
        <div className="manage-user-container">
            <h1>Manage Users</h1>
            <div className="tab-navigation">
                <button
                    className={activeTab === 'create' ? 'active' : ''}
                    onClick={() => setActiveTab('create')}
                >
                    Create User
                </button>
                <button
                    className={activeTab === 'list' ? 'active' : ''}
                    onClick={() => setActiveTab('list')}
                >
                    User List
                </button>
            </div>

            {activeTab === 'create' && (
                <UserForm userToEdit={userToEdit} onSave={handleSave} />
            )}
            {activeTab === 'list' && (
                <UserList onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default ManageUser;
