import TradiyLogo from "../images/tradiy-hero-logo.png";
import ThankYou from "../images/ThankYou.png";
import { Link } from "react-router-dom";
import "../styles/SignUp.css";

export default function ThankYouForm() {
  return (
    <div className="email-verified-page">
      <div className="email-verified-container">
        <img
          src={TradiyLogo}
          alt="Tradiy Logo"
          className="email-verified-logo"
        />
        <img
          src={ThankYou}
          alt="Email Verified"
          className="email-verified-image"
        />
        <h1>Thank you for completing the form!</h1>
        <p>
          We’re thrilled to see your interest in joining our network of trusted
          tradespeople. Your application is now under review, and we’ll confirm
          within 1-2 business days whether you’ve been accepted.
        </p>
        <p>
          You’ll receive a notification once your profile is verified and
          published. We look forward to helping you grow your business with
          Tradiy!
        </p>

        {/* Continue button */}
        <button className="continue-button">
          <Link to="/">Continue</Link>
        </button>
      </div>
    </div>
  );
}
