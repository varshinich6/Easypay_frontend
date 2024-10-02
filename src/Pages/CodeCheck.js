import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CodeCheck = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const handleCode = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://localhost:7175/api/Auth/VerifyCode', {
          code,
          email,
        });
    if(response)
    {
        navigate("/changePassword");
       // localStorage.clear();
    }
    else
      setError('Incorrect Code');
       
    } catch (err) {
      setError('Incorrect Code');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>Enter Code</h2>
        <form onSubmit={handleCode} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Code:</label>
            <input
              type="number"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Continue
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
    background: 'navy',
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



export default CodeCheck;