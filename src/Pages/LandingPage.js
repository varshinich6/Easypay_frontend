import React, { useState } from 'react';
import Login from './Login';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div style={styles.container}>
      {!showLogin ? (
        <div style={styles.landingPage}>
          <h1 style={styles.title}>Payroll Management System</h1>
          <p style={styles.subTitle}>Manage payrolls with ease and efficiency</p>
          <button onClick={handleLoginClick} style={styles.loginButton}>
            Login
          </button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
  },
  landingPage: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
  },
  loginButton: {
    padding: '12px 30px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#ff7e5f',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default LandingPage;
