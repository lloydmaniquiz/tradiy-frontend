import TradiyLogo from "../images/tradiy-navy-seal.png";
import VerificationIllustration from "../images/verification.png";
import "../styles/SignUp.css";

export default function EmailVerification() {
  return (
    <div className="email-verification-page">
      <div className="email-verification-header">
        Verify your email to activate your account.
      </div>
      <div className="email-verification-container">
        <img src={TradiyLogo} alt="Tradiy Logo" className="email-verification-logo" />
        <img src={VerificationIllustration} alt="Email Sent" className="email-verification-image" />
        <h2>Great! We’ve sent you a verification email.</h2>
        <p>
          An email has been sent to <strong>(email)</strong> with your account verification link.
        </p>
        <p>The link remains valid for 24 hours and can be accessed only once.</p>
        <p>Make sure to check your spam or junk folder if you don’t see it in your inbox.</p>
      </div>
    </div>
  );
}
