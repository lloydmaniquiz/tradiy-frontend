import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Check icon
import "../styles/ResetPassword.css";
import resetPassword from "../images/reset-password/reset-password.png";
import TradiyLogo from "../images/tradiy-navy-seal.png";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upperLower: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isTouched, setIsTouched] = useState(false); // Track if user has touched the confirm password field

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);

    // Validate password
    setPasswordValid({
      length: password.length >= 8,
      upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);
    setIsTouched(true); // Mark the field as touched when the user types

    // Check if passwords match only if both passwords are not empty
    setPasswordMatch(newPassword === confirmPasswordInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    if (Object.values(passwordValid).every(Boolean) && passwordMatch) {
      alert('Password reset successful!');
    } else {
      alert('Please ensure all conditions are met.');
    }
  };

  return (
    <div className="reset-password-whole-page-container">
      <div className="reset-password-container">
        {/* Wrapper for images */}
        <div className="reset-password-image-wrapper">
          <img 
            src={TradiyLogo} 
            alt="Tradiy Logo" 
            className="reset-password-reset-password-image" />
          <img 
            src={resetPassword} 
            alt="Reset Password" 
            className="reset-password-reset-password-image" />
        </div>

        <h2>Reset your password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          {/* New Password Form */}
          <div>
            <label htmlFor="newPassword" className="reset-password-label">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter new password"
              required
              className="reset-password-input"
            />
            <div className="reset-password-password-checker">
              <ul>
                <li className={passwordValid.length ? 'valid' : 'invalid'}>
                  <FaCheckCircle /> Password must be at least 8 characters
                </li>
                <li className={passwordValid.upperLower ? 'valid' : 'invalid'}>
                  <FaCheckCircle /> Include both uppercase and lowercase letters
                </li>
                <li className={passwordValid.specialChar ? 'valid' : 'invalid'}>
                  <FaCheckCircle /> Contain at least one special character (e.g., !, @, #, $, %)
                </li>
              </ul>
            </div>
          </div>

          {/* Confirm New Password Form */}
          <div>
            <label htmlFor="confirmPassword" className="reset-password-label">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm new password"
              required
              className="reset-password-input"
            />
            {/* Only show the match message if both passwords are not empty */}
            {isTouched && newPassword && confirmPassword && (
              <p style={{ color: passwordMatch ? 'green' : 'red' }} className="reset-password-password-match">
                {passwordMatch ? 'Passwords match!' : 'Passwords do not match!'}
              </p>
            )}
          </div>

          {/* Reset Password Button */}
          <div className="reset-password-form-container">
            <button 
              type="submit" 
              disabled={!Object.values(passwordValid).every(Boolean) || !passwordMatch} 
              className="reset-password-button"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
