import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 Basic validation first
    const allowedRoles = ["Homeowner", "Tradiy Trader"]; // only valid roles

    if (!role) {
      setErrorMessage("Please select a role.");
      return;
    }

    if (!allowedRoles.includes(role.toLowerCase())) {
      setErrorMessage("Invalid role selected.");
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

    try {
      // 🔹 Prepare form-data (FastAPI expects `username` instead of `email`)
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // 🔹 Save token for later requests
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      alert(`${role} login successful!`);
      setErrorMessage("");

      // 🔹 Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side: Login Form */}
        <div className="login-form-section">
          <img className="brand-title" src={TradiyLogo} alt="Tradiy Logo" />
          <h2 className="tagline">
            <span className="tagline-desktop">
              Find and connect with only vetted and qualified local
              tradespeople.
            </span>
            <span className="tagline-mobile">LOGIN</span>
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
            </button>
            <button className="social-button google">
              <img src={googleIcon} alt="google-icon" />
            </button>
            <button className="social-button apple">
              <img src={appleIcon} alt="apple-icon" />
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
