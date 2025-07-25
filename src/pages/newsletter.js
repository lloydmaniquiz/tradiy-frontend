import "../App.css";
import Footer from "../landing-page/footer";
import { Link } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import workerImage from "../images/Newsletter-cuate.png";
import workerImageMobile from "../images/newsletter-mobile.png";

const NewsletterPage = () => {
  const [selectedRole, setSelectedRole] = useState(null); // or any initial value like 'Homeowner' or 'Trader'
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const navigate = useNavigate();
  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
      <div className="newsletter-page">
        <div className="newsletter-container">
          {/* Left Side - Form */}
          <div className="newsletter-form-section">
            <h2 className="tagline">Join Our Newsletter</h2>

            {/* Role Selection */}
            <div className="newsletter-role-selection-container">
              <h4 className="newsletter-title">Join the newsletter as:</h4>
              <div className="newsletter-role-selection">
                {["Customer", "Trader"].map((role) => (
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
                      {role === "Customer"
                        ? "Newsletter for all customers"
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
                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
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
            <img
              src={isMobile ? workerImageMobile : workerImage}
              alt="Worker"
              className="newsletter-image"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsletterPage;
