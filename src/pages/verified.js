import TradiyLogo from "../images/tradiy-hero-logo.png";
import VerifiedIllustration from "../images/verified.png";
import "../styles/SignUp.css";
import { useNavigate } from "react-router-dom";

export default function EmailVerified() {
  const navigate = useNavigate();
  return (
    <div className="email-verified-page">
      <div className="email-verified-container">
        <img
          src={TradiyLogo}
          alt="Tradiy Logo"
          className="email-verified-logo"
        />
        <img
          src={VerifiedIllustration}
          alt="Email Verified"
          className="email-verified-image"
        />
        <h2>Account Verified!</h2>
        <p>Your account has been successfully verified.</p>
        <p>
          You’re all set to access exclusive features, manage your profile, and
          enjoy everything we have to offer.
        </p>

        {/* Continue button */}
        <button
          className="verification-continue-button"
          onClick={() => navigate("/login")}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
