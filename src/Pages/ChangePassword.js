import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (password === confirm_password) {
      try {
        const response = await axios.post('https://localhost:7175/api/Auth/UpdatePassword', {
          email,
          password,
        });

        if (response) {
          // Show success toast message
          toast.success("Password updated successfully!", {
            position: "top-center",
            autoClose: 3000, // The toast will close after 3 seconds
            onClose: () => {
              navigate("/login");  // Navigate after the toast disappears
              localStorage.clear();
            }
          });
        } else {
          setError("Unable to change password");
        }

      } catch (err) {
        setError("Unable to change password");
      }
    } else {
      setError('Password Mismatch');
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer /> {/* Add ToastContainer to display the toast */}
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Change Password</h2>
        <form onSubmit={handleChangePassword} style={styles.form}>
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
            <label style={styles.label}>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Change Password
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

export default ChangePassword;
