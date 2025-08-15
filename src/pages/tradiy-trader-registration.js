import React, { useState, useEffect } from "react";
import "../styles/RegForm.css";
import { useNavigate } from "react-router-dom";
import TradiyLogo from "../images/Tradiy-Hero-NewLogo.png";
import Drilling from "../images/sign-up-img.png";
import { FaTimes } from "react-icons/fa"; // Import the FaTimes icon
import UploadModal from "../components/UploadModal";
import workerSignup from "../images/sign-up-banner.png";
import workerSignupMobile from "../images/final-header-mobile.png";
import Select from "react-select";
import TimeSelector from "../components/TimeSelector";
import { traderCategoryOptions } from "../constants/traderCategories";
import SignUpBack from "../images/sign-up-back.png";

// Main Registration Form component
const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can do any other logic here before navigating
    // Then navigate:
    navigate("/thank-you");
  };

  useEffect(() => {
    // Load saved data from sessionStorage when the component mounts
    const savedData = JSON.parse(sessionStorage.getItem("registrationForm"));
    if (savedData) {
      setFormData(savedData);
    } else {
      setFormData({}); // Initialize with empty data if nothing is saved
    }
  }, []); // Runs once on mount

  // Save data to sessionStorage
  const saveFormData = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    sessionStorage.setItem("registrationForm", JSON.stringify(updatedData));
  };

  // Navigate to the next step
  const goNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 11));
  };

  // Navigate to the previous step
  const goBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  // Go to specific step when "Edit" is clicked
  const goToStep = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <div className="form-container">
      {/* Form steps */}
      {step === 1 && (
        <Step1
          formData={formData}
          onSave={saveFormData}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={1}
          totalSteps={9}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={2}
          totalSteps={9}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={3}
          totalSteps={9}
        />
      )}
      {step === 4 && (
        <Step4
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={4}
          totalSteps={9}
        />
      )}
      {step === 5 && (
        <Step5
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={6}
          totalSteps={9}
        />
      )}
      {step === 6 && (
        <Step6
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={7}
          totalSteps={9}
        />
      )}
      {step === 7 && (
        <Step7
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={8}
          totalSteps={9}
        />
      )}
      {step === 8 && (
        <Step8
          formData={formData}
          onSave={saveFormData}
          onBack={goBack}
          onNext={goNext}
          onEdit={goToStep}
          currentStep={9}
          totalSteps={9}
        />
      )}
      {step === 9 && <Step9 onBack={goBack} onNext={goNext} />}
      {step === 10 && (
        <Step10
          formData={formData}
          onBack={goBack}
          onEdit={goToStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

// Step 1 Business Details
const Step1 = ({
  formData,
  onSave,
  onNext,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2>Business Basics</h2>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="businessName" className="regForm-label">
                Business Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="businessName"
                type="text"
                placeholder="Your business name as registered."
                value={formData.businessName || ""}
                onChange={(e) => onSave("businessName", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessOwner" className="regForm-label">
                Owner Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="businessOwner"
                type="text"
                placeholder="Enter the business owner's name."
                value={formData.businessOwner || ""}
                onChange={(e) => onSave("businessOwner", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessAddress" className="regForm-label">
                Business Address <span style={{ color: "red" }}>*</span>
              </label>
              <div
                style={{
                  color: "#BBBCC0",
                  fontStyle: "italic",
                  marginBottom: "10px",
                  marginTop: "-5px",
                }}
              >
                <small>Enter your full registered business address.</small>
              </div>

              {/* Full address input */}
              <input
                id="businessAddress"
                type="text"
                placeholder="House Number, Street Name, Locality Name"
                value={formData.businessAddress || ""}
                onChange={(e) => onSave("businessAddress", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />

              {/* Grid layout for city, region, state, postcode */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="City"
                  value={formData.city || ""}
                  onChange={(e) => onSave("city", e.target.value)}
                  className="regForm-input"
                  style={{ flex: "1 1 45%" }}
                />
                <input
                  type="text"
                  placeholder="Region"
                  value={formData.region || ""}
                  onChange={(e) => onSave("region", e.target.value)}
                  className="regForm-input"
                  style={{ flex: "1 1 45%" }}
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.state || ""}
                  onChange={(e) => onSave("state", e.target.value)}
                  className="regForm-input"
                  style={{ flex: "1 1 45%" }}
                />
                <input
                  type="text"
                  placeholder="Postcode"
                  value={formData.postcode || ""}
                  onChange={(e) => onSave("postcode", e.target.value)}
                  className="regForm-input"
                  style={{ flex: "1 1 45%" }}
                />
              </div>
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessNumber" className="regForm-label">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                id="businessNumber"
                type="text"
                placeholder="Enter the business' phone number."
                value={formData.businessNumber || ""}
                onChange={(e) => onSave("businessNumber", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={saveForLater} className="regForm-button save">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button next">
              Next
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 2 Business Information
const Step2 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const [errors, setErrors] = useState({});

  const handleChange = (selectedOptions) => {
    // Ensure selectedOptions is always an array
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    onSave("traderCategory", selectedValues);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Save to parent form data
    onSave(name, value);

    // Basic inline validation
    if (name === "businessYears") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          businessYears: "This field is required.",
        }));
      } else if (isNaN(value) || Number(value) < 0) {
        setErrors((prev) => ({
          ...prev,
          businessYears: "Please enter a valid non-negative number.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          businessYears: "",
        }));
      }
    }
  };

  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [uploadedFiles, setUploadedFiles] = useState({
    "Business Logo": [],
  });
  const [workRadius, setWorkRadius] = useState(formData.workRadius || 0);

  const handleWorkRadiusChange = (e) => {
    const value = Number(e.target.value);
    setWorkRadius(value);
    onSave("workRadius", value);
  };

  // Load files from localStorage on initial load
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    console.log("Loaded files from localStorage:", savedFiles);
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, []); // Only run on initial load when component is mounted

  // Save files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    console.log("Saving uploaded files to localStorage:", uploadedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]); // This ensures it triggers every time uploadedFiles changes

  const handleDrop = (event, type) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFileUploadLogic(files, type);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    handleFileUploadLogic(files, modalType);
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = [];
    let hasLargeFile = false;

    validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        hasLargeFile = true;
        return false;
      }
      return true;
    });

    if (hasLargeFile) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    } else {
      setErrorMessage("");
    }

    if (type === "Business Logo") {
      validFiles = validFiles.filter((file) => file.type.startsWith("image/"));
      const updatedFiles = validFiles.slice(0, 1); // Only 1 logo allowed
      setUploadedFiles({ "Business Logo": updatedFiles });
      onSave("businessLogo", updatedFiles[0] || null);
    }
  };

  const handleDelete = (fileIndex) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [modalType]: prev[modalType].filter((_, index) => index !== fileIndex),
    }));
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2>Business Basics</h2>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="traderCategory" className="regForm-label">
                Trader Categories <span style={{ color: "red" }}>*</span>
              </label>
              <div className="regForm-select-wrapper">
                <Select
                  id="traderCategory"
                  value={traderCategoryOptions.filter((option) =>
                    (formData.traderCategory || []).includes(option.value)
                  )}
                  onChange={handleChange}
                  options={traderCategoryOptions}
                  isMulti // Enable multiple selection
                  className="regForm-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                      border: "none",
                      boxShadow: "none",
                      borderColor: state.isFocused ? "transparent" : "none",
                    }),
                    multiValue: (base) => ({
                      ...base,
                      borderRadius: "5px",
                      backgroundColor: "#ECEDF2",
                      padding: "5px 10px",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "#000839",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "#000839",
                      ":hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }),
                  }}
                  placeholder="Pick all the types of work you offer."
                />
              </div>
              <div className="regForm-input-group">
                <label>
                  Years in Business <span style={{ color: "red" }}>*</span>
                </label>
                <div className="number-input-container">
                  <input
                    type="number"
                    name="businessYears"
                    className="businessYearsInput"
                    value={formData.businessYears || ""}
                    onChange={handleInputChange}
                    placeholder="Let customers know how experienced they are."
                    min="0"
                  />
                </div>
                {errors.businessYears && (
                  <p className="error-message">{errors.businessYears}</p>
                )}
              </div>
            </div>
          </div>
          <div className="regForm-file-upload-buttons">
            <div className="regForm-input-group">
              <p className="regForm-label">Business Logo</p>
              <div
                style={{
                  color: "#BBBCC0",
                  fontStyle: "italic",
                  marginBottom: "10px",
                  marginTop: "-5px",
                }}
              >
                <small>Trades with logos get 24% more profile views.</small>
              </div>
              <button
                onClick={() => setModalType("Business Logo")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">
                Upload your business logo (only 1 image, max 5MB).
              </p>
            </div>
          </div>

          <div className="regForm-input-group" style={{ marginTop: "20px" }}>
            <label htmlFor="workRadius" className="regForm-label">
              Work Radius <span style={{ color: "red" }}>*</span>
            </label>
            <div
              style={{
                color: "#BBBCC0",
                fontStyle: "italic",
                marginBottom: "10px",
                marginTop: "-5px",
              }}
            >
              <p style={{ fontSize: "0.85rem", color: "#bbbcc0" }}>
                How far (in miles) are you willing to travel for jobs?
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="range"
                id="workRadius"
                min="0"
                max="50"
                step="1"
                value={workRadius}
                onChange={handleWorkRadiusChange}
                style={{ flex: 1 }}
              />
              <span>{workRadius} mi</span>
            </div>
          </div>

          <UploadModal
            modalType={modalType}
            setModalType={setModalType}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            handleDrop={handleDrop}
            handleDelete={handleDelete}
            errorMessage={errorMessage} // Pass error message
          />

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Information Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 3 Business Information
const Step3 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  // Ensure formData.services is initialized with one empty string if it's empty

  const [isVatRegistered, setIsVatRegistered] = useState(
    formData.isVatRegistered || false
  );

  const handleVatChange = (e) => {
    const value = e.target.value === "yes";
    setIsVatRegistered(value);
    onSave("isVatRegistered", value);
  };

  const [callOutFee, setCallOutFee] = useState(formData.callOutFee || false);

  const handleCallOutFeeChange = (e) => {
    const value = e.target.value === "yes";
    setCallOutFee(value);
    onSave("callOutFee", value);
  };

  console.log("formData.callOutFee:", formData.callOutFee); // ← Put it here

  const [acceptCards, setAcceptCards] = useState(formData.acceptCards || false);

  const handleAcceptCardsChange = (e) => {
    const value = e.target.value === "yes";
    setAcceptCards(value);
    onSave("acceptCards", value);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>More About Your Business</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{
                  cursor: "pointer",
                  color: "#000839",
                  textDecoration: "underline",
                }}
              >
                Skip for now
              </p>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="companyType" className="regForm-label">
                Company Type <span style={{ color: "red" }}>*</span>
              </label>
              <div className="regForm-select-wrapper">
                <select
                  id="companyType"
                  value={formData.companyType || ""}
                  onChange={(e) => onSave("companyType", e.target.value)}
                  className="regForm-select"
                  style={{
                    fontFamily: '"Hanken Grotesk", "Arial"',
                    color: "#000839",
                  }}
                >
                  <option value="">Choose your company type</option>
                  <option value="Option 1">Sole Trader</option>
                  <option value="Option 2">Ltd Company</option>
                </select>
              </div>
            </div>

            {formData.companyType === "Option 2" && (
              <div className="regForm-input-group">
                <label
                  htmlFor="companyRegistrationNumber"
                  className="regForm-label"
                >
                  Company Registration Number{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="companyRegistrationNumber"
                  type="text"
                  placeholder="Enter your Company Registration Number"
                  value={formData.companyRegistrationNumber || ""}
                  onChange={(e) =>
                    onSave("companyRegistrationNumber", e.target.value)
                  }
                  className="regForm-input"
                  style={{
                    fontFamily: '"Hanken Grotesk", "Arial"',
                    color: "#000839",
                  }}
                />
              </div>
            )}
            <div className="regForm-input-group">
              <label htmlFor="websiteURL" className="regForm-label">
                Website URL
              </label>
              <input
                id="websiteURL"
                type="text"
                placeholder="e.g., www.fishersplumbing.com"
                value={formData.websiteURL || ""}
                onChange={(e) => onSave("websiteURL", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />
            </div>

            <div className="regForm-input-group">
              <p className="regForm-label">Call-Out Fee</p>
              <div className="regForm-radio-group">
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="callOutFee"
                    value="yes"
                    checked={callOutFee === true}
                    onChange={handleCallOutFeeChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  Yes
                </label>
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="callOutFee"
                    value="no"
                    checked={callOutFee === false}
                    onChange={handleCallOutFeeChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="regForm-input-group">
              <p className="regForm-label">Are you VAT Registered?</p>
              <div className="regForm-radio-group">
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="vatRegistered"
                    value="yes"
                    checked={isVatRegistered === true}
                    onChange={handleVatChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  Yes
                </label>
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="vatRegistered"
                    value="no"
                    checked={isVatRegistered === false}
                    onChange={handleVatChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  No
                </label>
              </div>
            </div>

            {isVatRegistered && (
              <div className="regForm-input-group">
                <label htmlFor="vatNumber" className="regForm-label">
                  VAT Number
                </label>
                <input
                  id="vatNumber"
                  type="text"
                  placeholder="Enter your VAT Number"
                  value={formData.vatNumber || ""}
                  onChange={(e) => onSave("vatNumber", e.target.value)}
                  className="regForm-input"
                  style={{
                    fontFamily: '"Hanken Grotesk", "Arial"',
                    color: "#000839",
                  }}
                />
              </div>
            )}

            <div className="regForm-input-group">
              <p className="regForm-label">Accept Cards</p>
              <div className="regForm-radio-group">
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="acceptCards"
                    value="yes"
                    checked={acceptCards === true}
                    onChange={handleAcceptCardsChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  Yes
                </label>
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="acceptCards"
                    value="no"
                    checked={acceptCards === false}
                    onChange={handleAcceptCardsChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="regForm-image-container">
          <img src={Drilling} alt="Services Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 4 List Your Business
const Step4 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [uploadedFiles, setUploadedFiles] = useState({
    "Photos of Your Work": [],
  });

  // Load files from localStorage on initial load
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    console.log("Loaded files from localStorage:", savedFiles);
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, []); // Only run on initial load when component is mounted

  // Save files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    console.log("Saving uploaded files to localStorage:", uploadedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]); // This ensures it triggers every time uploadedFiles changes

  const handleDrop = (event, type) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFileUploadLogic(files, type);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    handleFileUploadLogic(files, modalType);
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = [];
    let hasLargeFile = false;

    validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        hasLargeFile = true;
        return false;
      }
      return true;
    });

    if (hasLargeFile) {
      setErrorMessage("File size must not exceed 5MB.");
      return; // Stop processing files
    } else {
      setErrorMessage(""); // Clear error if no large files
    }

    setUploadedFiles((prev) => {
      let updatedFiles = [];

      if (type === "Photos of Your Work") {
        validFiles = validFiles.filter((file) =>
          file.type.startsWith("image/")
        );
        updatedFiles = [...prev[type], ...validFiles].slice(0, 10);
        onSave("workImages", updatedFiles);
      }

      return { ...prev, [type]: updatedFiles };
    });
  };

  const handleDelete = (fileIndex) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [modalType]: prev[modalType].filter((_, index) => index !== fileIndex),
    }));
  };

  const [services, setServices] = useState(
    formData?.services?.length > 0 ? formData.services : [""]
  );

  const maxServices = 10; // Define the maximum limit for services
  const handleAddService = () => {
    if (services.length < maxServices) {
      setServices([...services, ""]); // Add a new empty input field
    }
  };

  const handleChangeService = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index] = value;
    setServices(updatedServices);
    onSave("services", updatedServices); // Save updated services data
  };

  const handleDeleteService = (index) => {
    const updatedServices = services.filter((_, idx) => idx !== index); // Remove the selected input field
    setServices(updatedServices);
    onSave("services", updatedServices); // Save updated services data after deletion
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        <div className="regForm-form-container">
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>

            <div className="h2-skip-wrapper">
              <h2>More About Your Business</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-input-group">
            <p className="regForm-label">
              Services Provided <span style={{ color: "red" }}>*</span>
            </p>
            <p className="regForm-description">
              List the services you provide. Add one service per line for
              clarity.
            </p>

            {services.map((service, index) => (
              <div
                key={index}
                className="regForm-input-group-services"
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="text"
                  placeholder={`Service ${index + 1}`}
                  value={service}
                  onChange={(e) => handleChangeService(index, e.target.value)}
                  className="regForm-input"
                  style={{
                    fontFamily: '"Hanken Grotesk", "Arial"',
                    color: "#000839",
                    flex: 1,
                  }}
                />

                {/* Delete Button */}
                {index > 0 && (
                  <button
                    onClick={() => handleDeleteService(index)}
                    className="regForm-x-button"
                    style={{
                      marginLeft: "8px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      ...(index === services.length - 1
                        ? { right: "60px" }
                        : {}),
                    }}
                  >
                    <FaTimes />
                  </button>
                )}

                {/* Add Button beside last input */}
                {index === services.length - 1 &&
                  services.length < maxServices && (
                    <button
                      onClick={handleAddService}
                      className="regForm-button-add-service"
                      style={{
                        marginLeft: "8px",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        fontSize: "20px",
                        lineHeight: "1",
                        padding: "0",
                        border: "1px solid #ccc",
                        background: "#fff",
                        color: "#000839",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: '"Hanken Grotesk", "Arial"',
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  )}
              </div>
            ))}

            {/* Max limit message below */}
            {services.length >= maxServices && (
              <p
                className="max-limit-message"
                style={{ color: "red", marginTop: "4px" }}
              >
                Maximum input limit reached
              </p>
            )}
          </div>

          <div className="regForm-file-upload-buttons">
            {Object.keys(uploadedFiles).map((type) => (
              <div key={type} className="regForm-input-group">
                <p className="regForm-label">{type}</p>
                {type === "Photos of Your Work" && (
                  <p className="regForm-description">
                    Profiles with photos get 3x more enquiries.
                  </p>
                )}
                <button
                  onClick={() => setModalType(type)}
                  className="regForm-button"
                >
                  + Upload
                </button>
              </div>
            ))}
          </div>

          {/* Upload Modal Component */}
          <UploadModal
            modalType={modalType}
            setModalType={setModalType}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            handleDrop={handleDrop}
            handleDelete={handleDelete}
            errorMessage={errorMessage} // Pass error message
          />

          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">
                Business Description <span style={{ color: "red" }}>*</span>
              </p>
              <textarea
                placeholder="Tell customers why they should pick you – keep it short and sharp."
                onChange={(e) => onSave("businessDescription", e.target.value)}
                className="regForm-input-desc"
                value={formData.businessDescription || ""}
              ></textarea>
            </div>
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>

        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 5 Business Opening Hours
const Step5 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  const [businessAvailability, setbusinessAvailability] = useState(() => {
    const savedAvailability = sessionStorage.getItem("businessAvailability");
    return savedAvailability
      ? JSON.parse(savedAvailability)
      : {
          Monday: { available: false, startTime: "", endTime: "" },
          Tuesday: { available: false, startTime: "", endTime: "" },
          Wednesday: { available: false, startTime: "", endTime: "" },
          Thursday: { available: false, startTime: "", endTime: "" },
          Friday: { available: false, startTime: "", endTime: "" },
          Saturday: { available: false, startTime: "", endTime: "" },
          Sunday: { available: false, startTime: "", endTime: "" },
        };
  });

  useEffect(() => {
    sessionStorage.setItem(
      "businessAvailability",
      JSON.stringify(businessAvailability)
    );
  }, [businessAvailability]);

  const handleCheckboxChange = (day) => {
    setbusinessAvailability((prev) => {
      const newAvailability = { ...prev };
      const newDay = { ...newAvailability[day] };

      if (!newDay.available) {
        newDay.startTime = "";
        newDay.endTime = "";
      }

      newDay.available = !newDay.available;
      newAvailability[day] = newDay;

      onSave("businessAvailability", newAvailability); // Save to parent formData
      return newAvailability;
    });
  };

  const handleTimeChange = (day, field, time) => {
    setbusinessAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [day]: { ...prev[day], [field]: time },
      };

      // Validation: Prevent endTime from being earlier than startTime
      if (field === "endTime" && time < prev[day].startTime) {
        alert("End time cannot be earlier than start time!");
        return prev; // Prevent update
      }

      // Auto-adjust endTime if startTime is changed to be later than endTime
      if (
        field === "startTime" &&
        newAvailability[day].endTime &&
        time > prev[day].endTime
      ) {
        newAvailability[day].endTime = time;
      }

      onSave("businessAvailability", newAvailability); // Save to parent formData
      return newAvailability;
    });
  };

  const [emergencyHours, setEmergencyHours] = useState(
    formData.emergencyHours === "Yes"
  );

  const handleEmergencyChange = (e) => {
    const value = e.target.value === "yes";
    setEmergencyHours(value);
    onSave("emergencyHours", value ? "Yes" : "No");
  };

  const handleNext = () => {
    // Check if any day has the checkbox selected but no time is entered
    for (const day of [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]) {
      if (
        businessAvailability[day].available &&
        (!businessAvailability[day].startTime ||
          !businessAvailability[day].endTime)
      ) {
        alert(`Please fill in the time for ${day}`);
        return; // Prevent moving to the next step if time is missing
      }
    }
    onNext(); // Proceed to the next step if all time inputs are filled
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        <div className="regForm-form-container">
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Opening Hours</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{
                  cursor: "pointer",
                  color: "#000839",
                  textDecoration: "underline",
                }}
              >
                Skip for now
              </p>
            </div>
          </div>
          <p className="regForm-label">
            Business Hours <span style={{ color: "red" }}>*</span>
          </p>
          <p className="regForm-description">
            What days are you usually available?
          </p>

          <div className="regForm-input-wrapper">
            {/* Day of the Week Checkboxes */}
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div
                key={day}
                className="regForm-input-group-checkbox"
                style={{
                  opacity: businessAvailability[day].available ? 1 : 0.5,
                  transition: "opacity 0.3s ease",
                }}
              >
                <div className="checkbox-input-wrapper">
                  <div className="regForm-flex-container">
                    <input
                      type="checkbox"
                      id={day}
                      checked={businessAvailability[day].available}
                      onChange={() => handleCheckboxChange(day)}
                      className="regForm-checkbox"
                    />
                    <label htmlFor={day} className="regForm-label">
                      {day}
                    </label>
                  </div>

                  {/* Time Inputs */}
                  <div
                    className="regForm-time-inputs"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <TimeSelector
                      value={businessAvailability[day].startTime}
                      onChange={(newTime) =>
                        handleTimeChange(day, "startTime", newTime)
                      }
                      disabled={!businessAvailability[day].available}
                    />
                    <span>-</span>
                    <TimeSelector
                      value={businessAvailability[day].endTime}
                      onChange={(newTime) =>
                        handleTimeChange(day, "endTime", newTime)
                      }
                      disabled={!businessAvailability[day].available}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div
              className="regForm-input-group"
              style={{ marginTop: "15px", marginBottom: "20px" }}
            >
              <p className="regForm-label">Emergency Cover</p>
              <p className="regForm-description">
                Do you take on emergency or weekend jobs?
              </p>

              <div className="regForm-radio-group">
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="emergencyHours"
                    value="yes"
                    checked={emergencyHours === true}
                    onChange={handleEmergencyChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  Yes
                </label>
                <label className="regForm-radio-label">
                  <input
                    type="radio"
                    name="emergencyHours"
                    value="no"
                    checked={emergencyHours === false}
                    onChange={handleEmergencyChange}
                    className="regForm-radio"
                    style={{
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: "#000839",
                    }}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={handleNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>

        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Opening Hours Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 6 Tell Us About Yourself
const Step6 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({ "Profile Picture": [] });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    handleFileUploadLogic(files, modalType);
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = files.filter((file) => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    }
    setErrorMessage("");

    setUploadedFiles((prev) => {
      let updatedFiles =
        type === "Profile Picture" ? validFiles.slice(0, 1) : validFiles;
      onSave("profilePicture", updatedFiles[0]); // Save to formData
      return { ...prev, [type]: updatedFiles };
    });
  };

  const handleDelete = () => {
    setUploadedFiles({ "Profile Picture": [] });
    onSave("profilePicture", null);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        <div className="regForm-form-container">
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="h2-skip-wrapper">
              <h2>About You</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-file-upload-buttons">
            <div className="regForm-input-group">
              <p className="regForm-label">Profile Picture / Selfie</p>
              <p className="regForm-description">
                Let the customers know who they are working with. Profiles with
                a face get 60% more trust.
              </p>
              <button
                onClick={() => setModalType("Profile Picture")}
                className="regForm-button"
              >
                + Upload
              </button>
            </div>
          </div>

          <UploadModal
            modalType={modalType}
            setModalType={setModalType}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            handleDelete={handleDelete}
            errorMessage={errorMessage}
          />

          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">
                Short Bio <span style={{ color: "red" }}>*</span>
              </p>
              <textarea
                placeholder="Introduce yourself to build trust. (e.g., “Hi, I’m Edward, with 15 years of plumbing experience.”)"
                value={formData.shortBio || ""}
                onChange={(e) => onSave("shortBio", e.target.value)}
                className="regForm-input-desc"
              ></textarea>
            </div>
          </div>

          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">
                Date of Birth <span style={{ color: "red" }}>*</span>
              </p>
              <input
                type="date"
                value={formData.birthday || ""}
                onChange={(e) => onSave("birthday", e.target.value)}
                className="regForm-input"
                style={{
                  fontFamily: '"Hanken Grotesk", "Arial"',
                  color: "#000839",
                }}
              />
            </div>
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 7 Trader Verification
const Step7 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({
    insuranceCertificate: null,
    photoId: null,
    businessAddressProof: null,
    certificates: null,
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      handleFileUploadLogic(files, modalType);
    }
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = files.filter((file) => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    }
    setErrorMessage("");

    const typeMapping = {
      "Insurance Certificate": "insuranceCertificate",
      "Photo ID": "photoId",
      "Proof of Business Address": "businessAddressProof",
      Certificates: "certificates",
    };

    setUploadedFiles((prev) => {
      let updatedFiles = validFiles[0];
      const formDataKey = typeMapping[type]; // Get the corresponding key for the type
      onSave(formDataKey, updatedFiles); // Save to formData with the mapped key
      return { ...prev, [type]: updatedFiles };
    });
  };

  const handleDelete = (fileType) => {
    setUploadedFiles((prev) => ({ ...prev, [fileType]: null }));
    onSave(fileType, null);
  };

  const progress = (currentStep / totalSteps) * 100; // Calculate progress percentage

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        <div className="regForm-form-container">
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Get Verified</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{
                  cursor: "pointer",
                  color: "#000839",
                  textDecoration: "underline",
                }}
              >
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-file-upload-buttons">
            {/* Insurance Certificate Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>
                Public Liability Insurance Certificate{" "}
                <span style={{ color: "red" }}>*</span>
              </p>
              <button
                onClick={() => setModalType("Insurance Certificate")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">
                Upload your insurance – verified traders get 3x more leads.
              </p>
            </div>

            {/* Photo ID Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>
                Photo ID <span style={{ color: "red" }}>*</span>
              </p>
              <button
                onClick={() => setModalType("Photo ID")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">
                Upload your driving license or passport to confirm their
                identity.
              </p>
            </div>

            {/* Proof of Business Address Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>
                Proof of Business Address
              </p>
              <button
                onClick={() => setModalType("Proof of Business Address")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">
                As part of our verfiication process, we need proof of address.
              </p>
            </div>

            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>
                Certificates
              </p>
              <p className="regForm-description">
                Share any trade qualifications, training, or safety certs you
                hold.
              </p>
              <button
                onClick={() => setModalType("Certificates")}
                className="regForm-button"
              >
                + Upload
              </button>
            </div>
          </div>

          {/* Upload Modal */}
          <UploadModal
            modalType={modalType}
            setModalType={setModalType}
            uploadedFiles={uploadedFiles}
            handleFileUpload={handleFileUpload}
            handleDelete={handleDelete}
            errorMessage={errorMessage}
          />

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Next
            </button>
          </div>
        </div>
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 8 Social Media
const Step8 = ({
  onNext,
  onBack,
  formData,
  onSave,
  saveForLater,
  currentStep,
  totalSteps,
}) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
  });

  // Initialize socialMediaLinks state from formData if available
  useEffect(() => {
    if (formData && formData.socialMediaLinks) {
      setSocialMediaLinks(formData.socialMediaLinks);
    }
  }, [formData]);

  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the local state
    setSocialMediaLinks((prev) => {
      const updatedLinks = { ...prev, [name]: value };
      // Call the onSave function to update formData in parent
      onSave("socialMediaLinks", updatedLinks);
      return updatedLinks;
    });
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <h2>Social Media</h2>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            {["facebook", "instagram", "linkedin", "tiktok"].map((platform) => (
              <div className="regForm-input-group" key={platform}>
                <label htmlFor={platform} className="regForm-label">
                  {platform.charAt(0).toUpperCase() +
                    platform.slice(1) +
                    " Page"}
                </label>
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  value={socialMediaLinks[platform]} // Bind to local state
                  onChange={handleInputChange}
                  placeholder={`Enter ${platform} username`}
                  className="regForm-input"
                  style={{
                    fontFamily: '"Hanken Grotesk", "Arial"',
                    color: "#000839",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">
              Back
            </button>
            <button onClick={saveForLater} className="regForm-button">
              Save and Continue for Later
            </button>
            <button onClick={onNext} className="regForm-button">
              Finish
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

//Step9 Code of Conduct
const Step9 = ({ onBack, onNext }) => (
  <>
    <div className="worker-signup-wrapper">
      <picture>
        <img
          src={workerSignupMobile}
          alt="worker cleaning"
          className="worker-signup-img-mobile"
        />
        <img
          src={workerSignup}
          alt="worker cleaning"
          className="worker-signup-img-desktop"
        />
      </picture>
    </div>

    <div className="form-container">
      <div className="regForm-final-header">
        <div className="regForm-header-p">
          {/* Back button (visible only on mobile) */}
          <button
            className="regForm-back-button"
            onClick={onBack}
            aria-label="Go back"
          >
            <img src={SignUpBack} alt="Back" />
          </button>

          <h2>Code of Conduct</h2>
        </div>
        <button onClick={onBack} type="button" className="regForm-button final">
          <i className="fas fa-chevron-left"></i>
          Back
        </button>
      </div>
      <p className="section-text">
        Before completing your sign-up, please take a moment to review the
        information you’ve entered and read through the Code of Conduct.
      </p>

      <div className="section">
        <p className="section-title">Members Pledge to Tradiy.com Customers</p>
        <ol>
          <li>
            Honesty and Realism: Be honest in all dealings with customers,
            providing realistic estimates for work duration and dates.
          </li>
          <li>
            Communication and Respect: Keep customers informed about any changes
            or delays, respecting their time and property.
          </li>
          <li>
            Appointment Integrity: Honour all appointments and agreed-upon
            timings. If unable to meet the original schedule, promptly inform
            the customer and attempt to reschedule.
          </li>
          <li>
            Customer Satisfaction: Prioritise customer satisfaction above all
            else, promptly addressing any complaints or concerns without
            confrontation or abuse.
          </li>
          <li>
            Financial Transparency: Never demand cash and inform customers of
            any call-out fees before commencing work.
          </li>
          <li>
            Quality Assurance: Deliver quality workmanship and notify customers
            of any additional costs before starting extra work. Obtain customer
            agreement for any variations to the original contract.
          </li>
          <li>
            Safety and Professionalism: Maintain professionalism at all times,
            ensuring compliance with safety regulations and standards.
          </li>
          <li>
            Feedback Responsibility: Encourage customers to leave reviews and
            feedback, providing them with a platform to share their experiences.
          </li>
        </ol>
      </div>

      <div className="section">
        <p className="section-title">Members Pledge to Tradiy.com</p>
        <ol>
          <li>
            Documentation and Communication: Supply Tradiy.com with necessary
            documentation promptly, including insurance schedules and
            accreditations. Respond promptly to messages from both customers and
            Tradiy.com.
          </li>
          <li>
            Sub-Contracting Compliance: Ensure compliance with all regulations
            when subcontracting work, including providing necessary
            qualifications and certifications for subcontractors.
          </li>
          <li>
            Professional Conduct: Maintain courteous and respectful
            communication with both customers and Tradiy.com staff, adhering to
            the highest standards of professionalism.
          </li>
          <li>
            Respect for All: Treat everyone with respect and courtesy,
            regardless of differences or disagreements.
          </li>
          <li>
            Clear Communication: Keep communication clear and timely, responding
            promptly to customer inquiries and feedback.
          </li>
          <li>
            Prioritise Safety: Make safety a top priority in all tasks, adhering
            to relevant regulations and standards.
          </li>
          <li>
            Maintain Professionalism: Present yourself professionally at all
            times, both online and in-person, as a proud representative of
            Tradiy.com.
          </li>
          <li>
            Embrace Learning: Continuously seek opportunities for learning and
            improvement, aiming to enhance skills and knowledge.
          </li>
          <li>
            Work Together: Collaborate with fellow members, supporting each
            other to achieve shared goals and objectives.
          </li>
          <li>
            Take Responsibility: Hold yourself accountable for your actions and
            decisions, demonstrating integrity and reliability.
          </li>
        </ol>
      </div>
      <hr className="custom-divider" />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <form className="section-text-checkbox">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">
            I agree to the Tradiy Code of Conduct{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
        </form>
      </div>

      <button
        onClick={onNext}
        type="submit"
        className="regForm-button custom-next-btn"
      >
        Finish Sign Up
      </button>
    </div>
  </>
);

// Step10
const Step10 = ({ formData, onBack, onEdit, handleSubmit }) => (
  <>
    <div className="worker-signup-wrapper">
      <picture>
        <img
          src={workerSignupMobile}
          alt="worker cleaning"
          className="worker-signup-img-mobile"
        />
        <img
          src={workerSignup}
          alt="worker cleaning"
          className="worker-signup-img-desktop"
        />
      </picture>
    </div>
    <div className="step-container">
      <div className="regForm-final-header">
        <div className="regForm-header-p">
          <h2>Review & Submit</h2>
          <p>
            Please take a moment to review the information you've entered before
            submitting your form.
          </p>
        </div>
        <button onClick={onBack} className="regForm-button final">
          Back
        </button>
      </div>
      <div className="business-container">
        <div className="header-block">
          <span className="title">Business Basics</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(1)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Business Name</div>
            <div className="value">
              {formData.businessName || "No business name provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Owner Name</div>
            <div className="value">
              {formData.businessOwner || "No business owner provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Business Address</div>
            <div className="value">
              {formData.businessAddress || "No registered address provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Phone Number</div>
            <div className="value">
              {formData.businessNumber || "No phone number provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Trade Category </div>
            <div className="value">
              {(formData.traderCategory || []).length > 0 ? (
                <div>
                  {formData.traderCategory
                    .map(
                      (value) =>
                        traderCategoryOptions.find((opt) => opt.value === value)
                          ?.label
                    )
                    .filter(Boolean)
                    .map((label, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        {label}
                      </div>
                    ))}
                </div>
              ) : (
                "No trade category provided"
              )}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Years in Business </div>
            <div className="value">
              {formData.businessYears || "No years in business provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Business Logo</div>
            <div className="value">
              {formData.businessLogo &&
              (typeof formData.businessLogo === "string" ||
                formData.businessLogo instanceof Blob ||
                formData.businessLogo instanceof File) ? (
                <a
                  href={
                    typeof formData.businessLogo === "string"
                      ? formData.businessLogo
                      : URL.createObjectURL(formData.businessLogo)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Business Logo
                </a>
              ) : (
                "No business logo uploaded"
              )}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Work Radius </div>
            <div className="value">
              {formData.workRadius || "No Work Radius provided"}
              {"miles"}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">More About Your Business</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(3)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Company Type</div>
            <div className="value">
              {formData.companyType || "No company type provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Company Registration Number</div>
            <div className="value">
              {formData.companyRegistrationNumber ||
                "No Company Registration Number Provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Website URL</div>
            <div className="value">
              {formData.websiteURL || "No website URL provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Call-Out Fee</div>
            <div className="value">
              {formData.callOutFee === true
                ? "Yes"
                : formData.callOutFee === false
                ? "No"
                : "No Call-Out Fee Status provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">VAT Registered</div>
            <div className="value">
              {formData.isVatRegistered === true
                ? "Yes"
                : formData.isVatRegistered === false
                ? "No"
                : "No Vat Registered Status provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">VAT Number</div>
            <div className="value">
              {formData.vatNumber || "No Vat Registered Status provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Accept Cards</div>
            <div className="value">
              {formData.acceptCards === true
                ? "Yes"
                : formData.acceptCards === false
                ? "No"
                : "No Accept Cards Status provided"}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Services Provided</div>
            <div className="value">
              {Array.isArray(formData.services) &&
              formData.services.length > 0 ? (
                formData.services.map((service, index) => (
                  <div key={index}>{service}</div>
                ))
              ) : (
                <span>No services listed</span>
              )}
            </div>
          </div>
          {/* Work Images */}
          <div className="detail-item">
            <div className="summary-label">Photos of Your Work</div>
            <div className="value">
              {formData.workImages && formData.workImages.length > 0 ? (
                <div className="work-image-list">
                  {formData.workImages.map((file, index) => {
                    const isValidFile =
                      file instanceof Blob || file instanceof File;
                    return (
                      <div key={index}>
                        <a
                          href={
                            typeof file === "string"
                              ? file
                              : isValidFile
                              ? URL.createObjectURL(file)
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Work Image {index + 1}
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                "No work images uploaded"
              )}
            </div>
          </div>
          {/* Business Description */}
          <div className="detail-item">
            <div className="summary-label">Business Description</div>
            <div className="value">
              {formData.businessDescription || "No description provided"}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">Opening Hours</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(5)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Business Hours</div>
            <div className="value">
              {formData.businessAvailability &&
                Object.keys(formData.businessAvailability).map((day) => {
                  const dayData = formData.businessAvailability[day];

                  // Convert 24-hour format to 12-hour format
                  const formatTime = (time) => {
                    if (!time) return "";
                    const [hours, minutes] = time.split(":");
                    return new Date(0, 0, 0, hours, minutes).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    );
                  };

                  // Calculate time difference in hours
                  const getTimeDifference = (start, end) => {
                    if (!start || !end) return 0;
                    const [startHours, startMinutes] = start
                      .split(":")
                      .map(Number);
                    const [endHours, endMinutes] = end.split(":").map(Number);

                    const startTime = startHours * 60 + startMinutes;
                    const endTime = endHours * 60 + endMinutes;

                    return (endTime - startTime) / 60; // Convert to hours
                  };

                  const timeDifference = getTimeDifference(
                    dayData.startTime,
                    dayData.endTime
                  );

                  // Determine circle color
                  let circle = null;
                  if (!dayData.available) {
                    circle = (
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#E33629",
                          borderRadius: "50%",
                          marginRight: "12px",
                        }}
                      ></span>
                    ); // Red for Closed
                  } else if (timeDifference >= 6) {
                    circle = (
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#21A62A",
                          borderRadius: "50%",
                          marginRight: "12px",
                        }}
                      ></span>
                    ); // Green for 6+ hours
                  } else if (timeDifference > 0) {
                    circle = (
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          backgroundColor: "#FFBC58",
                          borderRadius: "50%",
                          marginRight: "12px",
                        }}
                      ></span>
                    );
                  }

                  return (
                    <div key={day} className="day-item">
                      <span className="day-name">
                        {circle}
                        {day} {dayData.available ? "" : "(CLOSED)"}
                      </span>
                      {dayData.available && (
                        <span>
                          ({formatTime(dayData.startTime)} -{" "}
                          {formatTime(dayData.endTime)})
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="detail-item-emergency">
          <div className="summary-label">Emergency Cover</div>
          <div className="value">
            {formData.emergencyHours === "Yes"
              ? "Offer 24/7 services"
              : formData.emergencyHours === "No"
              ? "Does not offer 24/7 services"
              : "Not selected"}
          </div>
        </div>
      </div>
    </div>

    <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">About You</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(6)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Profile Picture / Selfie</div>
            <div className="value">
              {formData.profilePicture &&
              (typeof formData.profilePicture === "string" ||
                formData.profilePicture instanceof Blob ||
                formData.profilePicture instanceof File) ? (
                <a
                  href={
                    typeof formData.profilePicture === "string"
                      ? formData.profilePicture
                      : URL.createObjectURL(formData.profilePicture)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile Picture
                </a>
              ) : (
                "No profile picture uploaded"
              )}
            </div>
          </div>

          <div className="detail-item">
            <div className="summary-label">Short Bio</div>
            <div className="value">{formData.shortBio}</div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Date of Birth</div>
            <div className="value">
              {formData.birthday
                ? new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(formData.birthday + "T00:00:00"))
                : "No Birthday Added"}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">Get Verified</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(7)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">
              Public Liability Insurance Certificate
            </div>
            <div className="value">
              {formData.insuranceCertificate &&
              (typeof formData.insuranceCertificate === "string" ||
                formData.insuranceCertificate instanceof Blob ||
                formData.insuranceCertificate instanceof File) ? (
                <a
                  href={
                    typeof formData.insuranceCertificate === "string"
                      ? formData.insuranceCertificate
                      : URL.createObjectURL(formData.insuranceCertificate)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Insurance Certificate
                </a>
              ) : (
                "No Insurance Certificate uploaded"
              )}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Photo ID</div>
            <div className="value">
              {formData.photoId &&
              (typeof formData.photoId === "string" ||
                formData.photoId instanceof Blob ||
                formData.photoId instanceof File) ? (
                <a
                  href={
                    typeof formData.photoId === "string"
                      ? formData.photoId
                      : URL.createObjectURL(formData.photoId)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Photo ID
                </a>
              ) : (
                "No Photo ID uploaded"
              )}
            </div>
          </div>
          <div className="detail-item">
            <div className="summary-label">Proof of Business Address</div>
            <div className="value">
              {formData.businessAddressProof &&
              (typeof formData.businessAddressProof === "string" ||
                formData.businessAddressProof instanceof Blob ||
                formData.businessAddressProof instanceof File) ? (
                <a
                  href={
                    typeof formData.businessAddressProof === "string"
                      ? formData.businessAddressProof
                      : URL.createObjectURL(formData.businessAddressProof)
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Proof of Business Address
                </a>
              ) : (
                "No Proof of Business Address uploaded"
              )}
            </div>
          </div>
          {/* Certifications */}
          <div className="detail-item">
            <div className="summary-label">Certifications</div>
            <div className="value">
              {formData.certifications && formData.certifications.length > 0 ? (
                <ul>
                  {formData.certifications.map((file, index) => {
                    // Ensure the file is either a Blob or a File object
                    const isValidFile =
                      file instanceof Blob || file instanceof File;
                    return isValidFile ? (
                      <li key={index}>
                        <a
                          href={URL.createObjectURL(file)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Certificate {index + 1}
                        </a>
                      </li>
                    ) : (
                      <li key={index}>Invalid file</li> // Show fallback for invalid file type
                    );
                  })}
                </ul>
              ) : (
                "No certifications uploaded" // Fallback for empty or non-existent certifications array
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">Social Media</span>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => onEdit(8)}
            className="edit-link"
          >
            Edit
          </p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Facebook Page</div>
            <div className="value">
              facebook.com/
              {formData.socialMediaLinks?.facebook || "Not Provided"}
            </div>{" "}
            {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">Instagram Page</div>
            <div className="value">
              instagram.com/
              {formData.socialMediaLinks?.instagram || "Not Provided"}
            </div>{" "}
            {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">LinkedIn Page</div>
            <div className="value">
              linkedin.com/company/
              {formData.socialMediaLinks?.linkedin || "Not Provided"}
            </div>{" "}
            {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">TikTok Page</div>
            <div className="value">
              tiktok.com/@{formData.socialMediaLinks?.tiktok || "Not Provided"}
            </div>{" "}
            {/* Render value */}
          </div>
        </div>
      </div>
    </div>
    <hr className="custom-divider" />
    <div className="agreement-container">
      <label className="agreement-label">
        <input type="checkbox" className="agreement-checkbox" />
        <span className="agreement-text">
          I hereby agree to submit the details requested for the purpose of the
          verification process. I understand that these details will be used
          solely for administrative reference and verification purposes in
          accordance with the stated guidelines.
        </span>
      </label>
    </div>

    <form onSubmit={handleSubmit}>
      <button type="submit" className="regForm-button custom-next-btn">
        Submit for Review
      </button>
      <button onClick={onBack} className="regForm-button custom-next-btn final">
        Back
      </button>
    </form>
  </>
);

export default RegistrationForm;
