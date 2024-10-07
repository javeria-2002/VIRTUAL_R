import React, { useState } from 'react';
import './Signup.css';  // Import the signup-specific styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    let valid = true;

    // Reset previous errors
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
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

    // Check if confirm password is empty
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      valid = false;
    }

    if (!valid) {
      return; // Stop further execution if there are empty fields
    }

    if (password !== confirmPassword) {
      setGeneralError('Passwords do not match');
      return;
    }

    // Save the user data in localStorage
    const userData = { email, password };
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Signup Successful!');

    // Clear the form
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <div>
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
        </div>
        {generalError && <p className="error-message">{generalError}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
