import "../App.css";
import Footer from "../landing-page/footer";
import StickyHeader from "../landing-page/sticky-header";
import { useState } from "react";
import workerImage from "../images/workerImage.png";
import TradiyLogo from "../images/tradiy-navy-seal.png";

const NewsletterPage = () => {
  const [selectedRole, setSelectedRole] = useState(null); // or any initial value like 'Homeowner' or 'Trader'

  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    email: "",
    agreedToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
  };

  return (
    <>
      <StickyHeader />
      <div className="newsletter-page">
        <div className="newsletter-container">
          {/* Left Side - Form */}
          <div className="newsletter-form-section">
            <img className="brand-title" src={TradiyLogo} alt="Tradiy Logo" />
            <h2 className="tagline">Join Our Newsletter</h2>

            {/* Role Selection */}
            <div className="newsletter-role-selection-container">
              <h4 className="newsletter-title">Join the newsletter as:</h4>
              <div className="newsletter-role-selection">
                {["Homeowner", "Trader"].map((role) => (
                  <button
                    key={role}
                    className={`newsletter-role-button ${
                      selectedRole === role ? "active" : ""
                    }`}
                    onClick={() => setSelectedRole(role)}
                    type="button"
                  >
                    <h1>{role}</h1>
                    <p>
                      {role === "Homeowner"
                        ? "Newsletter for all homeowners and customers"
                        : "Newsletter for all traders"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {["forename", "surname", "email"].map((field) => (
                <div key={field} className="form-group">
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    className="newsletter-input"
                    placeholder={
                      field === "forename"
                        ? "e.g., Edd"
                        : field === "surname"
                        ? "e.g., Fisher"
                        : "info@tradiy.com"
                    }
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              ))}

              {/* Terms Agreement */}
              <div className="newsletter-agreement">
                <div className="newsletter-agreement">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    name="agreedToTerms"
                    checked={formData.agreedToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="agreedToTerms">
                    I have read and agree to the Tradiy{" "}
                    <a href="/terms-and-conditions">Terms & Conditions</a>
                  </label>
                </div>
              </div>

              <button type="submit" className="newsletter-button">
                Keep me Updated
              </button>
            </form>

            <h1 className="disclaimer-header">Disclaimer</h1>
            <p className="disclaimer-content">
              Your information will only be used by Tradiy to send you updates,
              which may include new blogs, new sections, news and other
              features. Tradiy will not share this information with any other
              organisation or use it for any other purpose. You may unsubscribe
              from this list at anytime.
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="newsletter-image-section">
            <img src={workerImage} alt="Worker" className="login-image" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsletterPage;
