import "../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import failedPrompt from "../images/failed-prompt.png";
import TradiyLogo from "../images/tradiy-hero-logo.png";

const FailedPrompt = () => {
  const navigate = useNavigate();
  return (
    <div className="reset-password-whole-page-container">
      <div className="reset-password-success-container">
        <div className="reset-password-image-wrapper">
          <img
            src={TradiyLogo}
            alt="Tradiy Logo"
            className="reset-password-reset-password-image-logo"
          />
          <img
            src={failedPrompt}
            alt="Failed Prompt"
            className="reset-password-reset-password-image"
          />
        </div>

        <h2>Oops, sorry!</h2>
        <p>Unable to process your request. </p>
        <p>
          Please double-check your password or contact support if you need
          further assistance.
        </p>
        <button
          type="button"
          className="button"
          onClick={() => navigate("/login")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default FailedPrompt;
