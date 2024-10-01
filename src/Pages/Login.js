import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct the import statement

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7175/api/Auth', {
        email,
        password,
      });

      const token = response.data; 
      localStorage.setItem('token', token); // Store JWT token
      const decode = token ? jwtDecode(token) : null; // Use jwtDecode here
      const UserRole = decode?.role;

      // Log the entire decoded token for debugging
      console.log('Decoded Token:', decode);
      console.log('User Role:', UserRole);

      // Correct the role checks based on the value from decode
      if (UserRole === 'Admin') navigate('/admin');
      else if (UserRole === 'Employee') navigate('/employee');
      else if (UserRole === 'PayrollProcessor') navigate('/processor'); // Change from 'PayrollProcessor' to 'Processor'
      else if (UserRole === 'Manager') navigate('/manager');
      else setError('Invalid role or unauthorized access');

    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <a href="/EmailVerification" style={styles.forgotPassword}>
              Forgot Password?
            </a>
          </div>
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg, #f093fb, #f5576c)',
    color: '#fff',
  },
  loginBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '40px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    textAlign: 'left',
    display: 'block',
    marginBottom: '5px',
    fontSize: '1rem',
    color: '#fff',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '100%',
  },
  submitButton: {
    padding: '12px 30px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#24c6dc',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  forgotPassword: {
    color: '#fff',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default Login;
