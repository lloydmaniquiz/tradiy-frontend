import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import Driller from "../images/login-img.png";
import TradiyLogo from "../images/tradiy-hero-logo.png";
import Divider from "../landing-page/divider";
import facebookIcon from "../images/fb-icon.png";
import googleIcon from "../images/google-icon.png";
import appleIcon from "../images/apple-icon.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation
    if (!role) {
      setErrorMessage("Please select a role.");
      return;
    }
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }
    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    // Simulated login logic
    if (email === "test-email@tradiy.com" && password === "Password123") {
      alert(`${role} login successful!`);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Login Form */}
        <div className="login-form-section">
          <img className="brand-title" src={TradiyLogo} alt="Tradiy Logo" />
          <h2 className="tagline">
            Find and connect with only vetted and qualified local tradespeople.
          </h2>

          {/* Role Selection */}
          <div className="role-selection-container">
            <h4 className="login-title">Login as:</h4>
            <div className="role-selection">
              <button
                className={`role-button ${
                  role === "Homeowner" ? "active" : ""
                }`}
                onClick={() => setRole("Homeowner")}
                type="button"
              >
                Customer
              </button>
              <button
                className={`role-button ${role === "Trader" ? "active" : ""}`}
                onClick={() => setRole("Trader")}
                type="button"
              >
                Tradiy Trader
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tradiy@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="form-group remember-forgot">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password
              </Link>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Login Button */}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {/* Signup and Social Login */}
          <p className="signup-text">
            Don’t have an account?{" "}
            <Link to="/sign-up" className="signup-link">
              Sign up here
            </Link>
          </p>
          <Divider />
          <p className="or-text">or login using</p>
          <div className="social-login">
            <button className="social-button facebook">
              <img src={facebookIcon} alt="fb-icon" />
              {/* Facebook Icon */}
            </button>
            <button className="social-button google">
              <img src={googleIcon} alt="fb-icon" />
              {/* Google Icon */}
            </button>
            <button className="social-button apple">
              <img src={appleIcon} alt="fb-icon" />
              {/* Apple Icon */}
            </button>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="login-image-section">
          <img src={Driller} alt="Worker drilling" className="login-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
