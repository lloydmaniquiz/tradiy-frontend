import "../styles/ResetPassword.css";
import { useNavigate } from "react-router-dom";
import resetPasswordSuccess from "../images/reset-password-success.png";
import TradiyLogo from "../images/tradiy-hero-logo.png";

const ResetPWSuccess = () => {
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
            src={resetPasswordSuccess}
            alt="Reset Password Success"
            className="reset-password-reset-password-image"
          />
        </div>

        <h2>Success!</h2>
        <p>Your password has been changed successfully.</p>
        <p>
          You can now log in with your new password and continue where you left
          off.
        </p>
        <button
          type="button"
          className="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ResetPWSuccess;
