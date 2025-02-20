import React, { useState } from 'react';
import "../styles/ForgotPassword.css";
import forgotPassword from "../images/reset-password/forgot-password.png";
import TradiyLogo from "../images/tradiy-navy-seal.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    if (email) {
      setIsEmailSent(true);
      console.log(`Sending reset password email to: ${email}`);
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="container">
        <img
          src={TradiyLogo}
          alt="Tradiy Logo"
          className="formImage"
        />
        <img
          src={forgotPassword}
          alt="Forgot Password"
          className="formImage"
        />
        <h2>Forgot your password?</h2>
        <p>
          No worries! Enter your email address below, and we’ll help you reset your password in no time.
        </p>
        {!isEmailSent ? (
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="input"
            />
            <button onClick={handleSendEmail} className="button">
              Send Email
            </button>
          </div>
        ) : (
          <p className="message">A reset password email has been sent!</p>
        )}
        <a href="/reset-password" className="backButton">
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
