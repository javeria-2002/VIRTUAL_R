import React, { useState } from 'react';
import './Login.css';  // Import the login-specific styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;

    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Check if email is empty
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    // Check if password is empty
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (!valid) {
      return; // Stop further execution if there are empty fields
    }

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      if (storedUser.email === email && storedUser.password === password) {
        alert('Login Successful!');
      } else {
        setGeneralError('Invalid email or password');
      }
    } else {
      setGeneralError('No user found. Please sign up first.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        {generalError && <p className="error-message">{generalError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
