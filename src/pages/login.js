import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import "../styles/Login.css";
import Driller from "../images/driller.jpg";
import TradiyLogo from "../images/tradiy-navy-seal.png";
import Divider from "../landing-page/divider";

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
          <img className="brand-title" src={TradiyLogo} alt="Tradiy Logo"/>
          <h2 className="tagline">
            Find and connect with only vetted and qualified local tradespeople.
          </h2>

          {/* Role Selection */}
          <div className="role-selection-container">
            <h4 className="login-title">Login as:</h4>
            <div className="role-selection">
              <button
                className={`role-button ${role === "Homeowner" ? "active" : ""}`}
                onClick={() => setRole("Homeowner")}
                type="button"
              >
                Homeowner
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
              <a href="/forgot-password" className="forgot-password">
                Forgot Password
              </a>
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
            <a href="/sign-up" className="signup-link">
              Sign up here
            </a>
          </p>
          <Divider />
          <p className="or-text">or login using</p>
          <div className="social-login">
            <button className="social-button facebook">
              <FaFacebookF /> {/* Facebook Icon */}
            </button>
            <button className="social-button google">
              <FaGoogle /> {/* Google Icon */}
            </button>
            <button className="social-button apple">
              <FaApple /> {/* Apple Icon */}
            </button>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="login-image-section">
          <img
            src={Driller}
            alt="Worker drilling"
            className="login-image"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
