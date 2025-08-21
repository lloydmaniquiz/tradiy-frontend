import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/SignUp.css";
import SignUpImg from "../images/sign-up-img.png";
import TradiyLogo from "../images/Tradiy-Hero-NewLogo.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [role, setRole] = useState("null");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upperLower: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  // State for tracking field focus
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordTouched(true);

    const valid = {
      length: password.length >= 8,
      upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordValid(valid);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordInput = e.target.value;
    setConfirmPassword(confirmPasswordInput);
    setConfirmPasswordTouched(true);
    setPasswordMatch(newPassword === confirmPasswordInput);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      Object.values(passwordValid).every(Boolean) &&
      passwordMatch &&
      email.trim() !== "" &&
      role !== "null"
    ) {
      // Prepare the form data
      const roleMap = {
        Homeowner: "homeowner",
        "Tradiy Trader": "trader",
      };

      // Prepare form data
      const formData = {
        email: email.trim(),
        password: newPassword,
        role: roleMap[role] || "", // defaults to empty string if role is invalid
      };

      try {
        // Send POST request to your backend API
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/signup`, // replace with your Azure backend endpoint
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Redirect based on role
          if (role === "Homeowner") {
            navigate("/email-verification", { state: { email: email.trim() } });
          } else {
            navigate("/tradiy-registration-form");
          }
        } else {
          // Show backend error
          alert(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred while signing up. Please try again.");
      }
    } else {
      alert("Please fill all fields correctly before signing up.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-wrapper">
          <div className="signup-image-section">
            <img
              src={SignUpImg}
              alt="work-in-progress"
              className="signup-image"
            />
          </div>

          <div className="signup-form-section">
            <img className="brand-title" src={TradiyLogo} alt="Tradiy Logo" />
            <span className="sign-up-tagline-desktop">
              Welcome to Tradiy, your easy solution for finding trusted
              tradespeople and managing home projects.
            </span>

            <span className="sign-up-tagline-mobile">SIGN UP</span>

            <p className="signup-role-header">Sign Up as:</p>
            <div className="signup-role-selection">
              <button
                className={role === "Homeowner" ? "signup-active" : ""}
                onClick={() => setRole("Homeowner")}
              >
                Homeowner
              </button>
              <button
                className={role === "Tradiy Trader" ? "signup-active" : ""}
                onClick={() => setRole("Tradiy Trader")}
              >
                Tradiy Trader
              </button>
            </div>

            <div className="signup-input-group">
              <label htmlFor="email-input">Email</label>
              <input
                type="email"
                id="email-input"
                placeholder="tradiy@email.com"
                className="signup-input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
              />
              {emailTouched && email.trim() === "" && (
                <p className="error-message">Email should not be blank.</p>
              )}
            </div>

            <div className="signup-input-group">
              <label htmlFor="password-input">Password</label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password-input"
                placeholder="Password"
                className="signup-input-field"
                value={newPassword}
                onChange={handleNewPasswordChange}
                onBlur={() => setPasswordTouched(true)}
              />
              <button
                type="button"
                className="signup-icon-button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              ></button>
              {passwordTouched && newPassword.trim() === "" && (
                <p className="error-message">Password should not be blank.</p>
              )}
            </div>

            <div className="signup-password-checker">
              <ul>
                <li className={passwordValid.length ? "valid" : "invalid"}>
                  <FaCheckCircle /> Password must be at least 8 characters
                </li>
                <li className={passwordValid.upperLower ? "valid" : "invalid"}>
                  <FaCheckCircle /> Include both uppercase and lowercase letters
                </li>
                <li className={passwordValid.specialChar ? "valid" : "invalid"}>
                  <FaCheckCircle /> Contain at least one special character
                  (e.g., !, @, #, $, %)
                </li>
              </ul>
            </div>

            <div className="signup-input-group">
              <label htmlFor="confirm-password-input">Confirm Password</label>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirm-password-input"
                placeholder="Confirm Password"
                className="signup-input-field"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={() => setConfirmPasswordTouched(true)}
              />
              <button
                type="button"
                className="signup-icon-button"
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              ></button>
              {confirmPasswordTouched && confirmPassword.trim() === "" && (
                <p className="error-message">
                  Confirm Password should not be blank.
                </p>
              )}
            </div>

            {confirmPasswordTouched && newPassword && confirmPassword && (
              <p
                style={{
                  color: passwordMatch ? "green" : "red",
                  fontWeight: "bold",
                  fontFamily: "Hanken Grotesk",
                }}
                className="signup-password-match"
              >
                {passwordMatch ? "Passwords match!" : "Passwords do not match!"}
              </p>
            )}

            <button
              className="signup-button"
              disabled={
                !Object.values(passwordValid).every(Boolean) ||
                !passwordMatch ||
                email.trim() === ""
              }
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            <p className="signup-login-text">
              Already have an account?{" "}
              <Link to="/login" className="signup-login-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
