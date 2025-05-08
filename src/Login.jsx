import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginRegister = () => {
  const [registerData, setRegisterData] = useState({ fullName: '', email: '',address : '' , password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Initialize navigate

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', registerData);
      alert(response.data.message);
      window.location.reload(); // Reload the page after registration
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      alert('Login successful!');
      localStorage.setItem('token', response.data.token); // Store token
      navigate('/'); // Redirect to homepage after login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  // Define missing style objects
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    margin: '50px auto',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const formSectionStyle = {
    width: '45%',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#f0f3f8',
  };

  const inputStyle = {
    width: '80%',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '85%',
    padding: '12px',
    backgroundColor: '#249beb',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const dividerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    padding: '20px',
    color: '#999',
  };

  return (
    <div style={containerStyle}>
      <div style={formSectionStyle}>
        <h1>
          Welcome to <span style={{ color: '#249beb' }}>Sportify</span>
        </h1>
        <h2>Create your account</h2>
        <form className="register-form" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={registerData.fullName}
            onChange={handleRegisterChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={registerData.address}
            onChange={handleRegisterChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Create My Account
          </button>
        </form>
      </div>
      <div style={dividerStyle}>or</div>
      <div style={formSectionStyle}>
        <h2>Login to your account</h2>
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
