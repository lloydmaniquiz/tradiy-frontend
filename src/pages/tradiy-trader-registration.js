import React, { useState, useEffect } from 'react';
import "../styles/RegForm.css";
import TradiyLogo from "../images/tradiy-navy-seal.png"
import Drilling from "../images/drilling.jpg";
import { FaTimes } from 'react-icons/fa';  // Import the FaTimes icon
import UploadModal from "../components/UploadModal";
import workerSignup from "../images/worker-signup.png";
import Select from 'react-select';

// Main Registration Form component
const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Load saved data from sessionStorage when the component mounts
    const savedData = JSON.parse(sessionStorage.getItem('registrationForm'));
    if (savedData) {
      setFormData(savedData);
    } else {
      setFormData({});  // Initialize with empty data if nothing is saved
    }
  }, []);  // Runs once on mount

  // Save data to sessionStorage
  const saveFormData = (key, value) => {
    const updatedData = { ...formData, [key]: value };
    setFormData(updatedData);
    sessionStorage.setItem('registrationForm', JSON.stringify(updatedData));
  };

  // Save and Continue for Later button action
  const saveForLater = () => {
    sessionStorage.setItem('registrationForm', JSON.stringify(formData));
    alert('Your progress has been saved!');
  };

  // Clear form data and reset sessionStorage
  const clearData = () => {
    sessionStorage.removeItem('registrationForm');  // Remove saved data
    setFormData({});  // Clear form data in state
    alert('Form data has been cleared.');
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
      {step === 1 && <Step1 formData={formData} onSave={saveFormData} onNext={goNext} onEdit={goToStep} currentStep={1} totalSteps={9} />}
      {step === 2 && <Step2 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={2} totalSteps={9} />}
      {step === 3 && <Step3 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={3} totalSteps={9} />}
      {step === 4 && <Step4 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={4} totalSteps={9} />}
      {step === 5 && <Step5 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={5} totalSteps={9} />}
      {step === 6 && <Step6 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={6} totalSteps={9} />}
      {step === 7 && <Step7 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={7} totalSteps={9} />}
      {step === 8 && <Step8 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={8} totalSteps={9} />}
      {step === 9 && <Step9 formData={formData} onSave={saveFormData} onBack={goBack} onNext={goNext} onEdit={goToStep} currentStep={9} totalSteps={9} />}
      {step === 10 && <Step10 formData={formData} onBack={goBack} onNext={goNext} saveForLater={saveForLater} onEdit={goToStep} />}
      
      <button onClick={clearData} className="clear-button">Clear Form Data</button>
    </div>
  );
};

// Step 1 Business Details
const Step1 = ({ formData, onSave, onNext, saveForLater, currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  const options = [
    { value: 'Option 1', label: 'Alarm / Security Services' },
    { value: 'Option 2', label: 'Bathroom Services' },
    { value: 'Option 3', label: 'Building / Home Improvement Services' },
    { value: 'Option 4', label: 'Carpets / Flooring' },
    { value: 'Option 5', label: 'Cleaning Services' }
  ];

  const handleChange = (selectedOptions) => {
    // Ensure selectedOptions is always an array
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    onSave('traderCategory', selectedValues);
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className='regForm-logo' src={TradiyLogo} alt='Tradiy Logo' />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <h2>Business Details</h2>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="businessName" className="regForm-label">Business Name</label>
              <input
                id="businessName"
                type="text"
                placeholder="e.g., Fisher’s Plumbing Services Ltd"
                value={formData.businessName || ''}
                onChange={(e) => onSave('businessName', e.target.value)}
                className="regForm-input"
                style={{ fontFamily: '"Hanken Grotesk", "Arial"', color: "#000839" }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessOwner" className="regForm-label">Business Owner</label>
              <input
                id="businessOwner"
                type="text"
                placeholder="(matching Photo ID) e.g., Edward Fisher"
                value={formData.businessOwner || ''}
                onChange={(e) => onSave('businessOwner', e.target.value)}
                className="regForm-input"
                style={{ fontFamily: '"Hanken Grotesk", "Arial"', color: "#000839" }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessAddress" className="regForm-label">Business Address</label>
              <input
                id="businessAddress"
                type="text"
                placeholder="House Number, Street Name, Locality Name, Town, Postcode"
                value={formData.businessAddress || ''}
                onChange={(e) => onSave('businessAddress', e.target.value)}
                className="regForm-input"
                style={{ fontFamily: '"Hanken Grotesk", "Arial"', color: "#000839" }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="businessNumber" className="regForm-label">Business Phone Number</label>
              <input
                id="businessNumber"
                type="text"
                placeholder="Business Phone Number *"
                value={formData.businessNumber || ''}
                onChange={(e) => onSave('businessNumber', e.target.value)}
                className="regForm-input"
                style={{ fontFamily: '"Hanken Grotesk", "Arial"', color: "#000839" }}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="traderCategory" className="regForm-label">Trader Category</label>
              <div className="regForm-select-wrapper">
                <Select
                  id="traderCategory"
                  value={options.filter(option => (formData.traderCategory || []).includes(option.value))}
                  onChange={handleChange}
                  options={options}
                  isMulti  // Enable multiple selection
                  className="regForm-select"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      fontFamily: '"Hanken Grotesk", "Arial"',
                      color: '#000839',
                      border: 'none',
                      boxShadow: 'none',
                      borderColor: state.isFocused ? 'transparent' : 'none',
                    }),
                    multiValue: (base) => ({
                      ...base,
                      borderRadius: '5px',
                      backgroundColor: '#ECEDF2',
                      padding: '5px 10px',
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: '#000839',
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: '#000839',
                      ':hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }),
                  }}
                  placeholder="Choose the main trade your business covers"
                />
              </div>
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
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
const Step2 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  const [isVatRegistered, setIsVatRegistered] = useState(formData.isVatRegistered || false);

  const handleVatChange = (e) => {
    const value = e.target.value === 'yes';
    setIsVatRegistered(value);
    onSave('isVatRegistered', value);
  };

  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className='regForm-logo' src={TradiyLogo} alt='Tradiy Logo' />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <h2>Business Information</h2>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="companyType" className="regForm-label">Company Type</label>
              <div className="regForm-select-wrapper">
                <select
                  id="companyType"
                  value={formData.companyType || ''}
                  onChange={(e) => onSave('companyType', e.target.value)}
                  className="regForm-select"
                  style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                >
                  <option value="">Choose your company type</option>
                  <option value="Option 1">Sole Trader</option>
                  <option value="Option 2">Ltd Company</option>
                </select>
              </div>
            </div>

            <div className="regForm-input-group">
              <label htmlFor="websiteURL" className="regForm-label">Website</label>
              <input
                id="websiteURL"
                type="text"
                placeholder="e.g., www.fishersplumbing.com"
                value={formData.websiteURL || ''}
                onChange={(e) => onSave('websiteURL', e.target.value)}
                className="regForm-input"
                style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="calloutCharge" className="regForm-label">Callout Charge</label>
              <input
                id="calloutCharge"
                type="text"
                placeholder="e.g., £50"
                value={formData.calloutCharge || ''}
                onChange={(e) => onSave('calloutCharge', e.target.value)}
                className="regForm-input"
                style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
              />
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
                    style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
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
                    style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                  />
                  No
                </label>
              </div>
            </div>

            {isVatRegistered && (
              <div className="regForm-input-group">
                <label htmlFor="vatNumber" className="regForm-label">VAT Number</label>
                <input
                  id="vatNumber"
                  type="text"
                  placeholder="Enter your VAT Number"
                  value={formData.vatNumber || ''}
                  onChange={(e) => onSave('vatNumber', e.target.value)}
                  className="regForm-input"
                  style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                />
              </div>
            )}
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
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
const Step3 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  // Ensure formData.services is initialized with one empty string if it's empty
  const [services, setServices] = useState(formData?.services?.length > 0 ? formData.services : ['']);
  const maxServices = 10;  // Define the maximum limit for services

  const progress = (currentStep / totalSteps) * 100;

  const handleAddService = () => {
    if (services.length < maxServices) {
      setServices([...services, '']); // Add a new empty input field
    }
  };

  const handleChangeService = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index] = value;
    setServices(updatedServices);
    onSave('services', updatedServices); // Save updated services data
  };

  const handleDeleteService = (index) => {
    const updatedServices = services.filter((_, idx) => idx !== index); // Remove the selected input field
    setServices(updatedServices);
    onSave('services', updatedServices); // Save updated services data after deletion
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
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Business Information</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: 'pointer', color: '#000839', textDecoration: 'underline' }}
              >
                Skip for now
              </p>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">Services Provided</p>
              {services.map((service, index) => (
                <div key={index} className="regForm-input-group-services" style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder={`Service ${index + 1}`}
                    value={service}
                    onChange={(e) => handleChangeService(index, e.target.value)}
                    className="regForm-input"
                    style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                  />
                  {/* Delete Button (X) with FaTimes icon */}
                  {index > 0 && ( // Hide delete button for the first input
                    <button onClick={() => handleDeleteService(index)} className="regForm-x-button">
                      <FaTimes /> {/* Using FaTimes icon */}
                    </button>
                  )}
                </div>
              ))}

              {/* Add Service Button */}
              {services.length < maxServices ? (
                <button onClick={handleAddService} className="regForm-button-add-service">
                  + Add Service
                </button>
              ) : (
                <p className="max-limit-message" style={{ color: 'red' }}>
                  Maximum input limit reached
                </p>
              )}
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
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
const Step4 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [uploadedFiles, setUploadedFiles] = useState({
    "Business Logo": [],
    "Work Images": [],
    "Certifications": [],
  });

  // Load files from localStorage on initial load
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    console.log("Loaded files from localStorage:", savedFiles);
    if (savedFiles) {
      setUploadedFiles(JSON.parse(savedFiles));
    }
  }, []);  // Only run on initial load when component is mounted

  // Save files to localStorage whenever uploadedFiles changes
  useEffect(() => {
    console.log("Saving uploaded files to localStorage:", uploadedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);  // This ensures it triggers every time uploadedFiles changes

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
  
    validFiles = files.filter(file => {
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
  
      if (type === "Business Logo") {
        updatedFiles = validFiles.slice(0, 1);
        onSave("businessLogo", updatedFiles[0]); // Ensure onSave updates formData
      } else if (type === "Work Images") {
        validFiles = validFiles.filter(file => file.type.startsWith("image/"));
        updatedFiles = [...prev[type], ...validFiles].slice(0, 10);
        onSave("workImages", updatedFiles);
      } else if (type === "Certifications") {
        updatedFiles = [...prev[type], ...validFiles].slice(0, 10);
        onSave("certifications", updatedFiles);
      }
  
      // Log the updated files to ensure correct data
      console.log("Updated uploaded files:", updatedFiles);
  
      return { ...prev, [type]: updatedFiles };
    });
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
        <div className="regForm-form-container">
          <div className="regForm-header">
            <img className="regForm-logo" src={TradiyLogo} alt="Tradiy Logo" />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>

            <div className="h2-skip-wrapper">
              <h2>List Your Business</h2>
              <p className="skip-text" onClick={onNext} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-file-upload-buttons">
            {Object.keys(uploadedFiles).map((type) => (
              <div key={type} className="regForm-input-group">
                <p className="regForm-label">{type}</p>
                <button onClick={() => setModalType(type)} className="regForm-button">+ Upload</button>
                {type === "Business Logo" && <p className="regForm-description">High-quality image of your logo.</p>}
                {type === "Work Images" && <p className="regForm-description">Showcase past work. (Up to 10 images, max 5MB each)</p>}
                {type === "Certifications" && <p className="regForm-description">Proof of qualifications (e.g., Gas Safe, NICEIC).</p>}
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
              <p className="regForm-label">Tell us a bit about your business.</p>
              <textarea
                placeholder="Short description of your experience and team."
                onChange={(e) => onSave('businessDescription', e.target.value)}
                className="regForm-input-desc"
                value={formData.businessDescription || ''}
              ></textarea>
            </div>
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
          </div>
        </div>

        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 5 Add Your Categories
const Step5 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  return (
    <div className="regForm-step-container">
      <div className="regForm-content">
        {/* Left Side - Form */}
        <div className="regForm-form-container">
          {/* Fixed Header */}
          <div className="regForm-header">
            <img className='regForm-logo' src={TradiyLogo} alt='Tradiy Logo' />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Add Your Categories</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: 'pointer', color: '#000839', textDecoration: 'underline' }}
              >
                Skip for now
              </p>
            </div>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <label htmlFor="primaryTradeCategory" className="regForm-label">
                Primary Service Category
              </label>
              <input
                id="primaryTradeCategory"
                type="text"
                placeholder="Confirm the main service. (e.g., Plumbing)"
                value={formData.primaryTradeCategory || ''}
                onChange={(e) => onSave('primaryTradeCategory', e.target.value)}
                className="regForm-input"
                style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
              />
            </div>

            <div className="regForm-input-group">
              <label htmlFor="additionalCategory" className="regForm-label">
                Additional Service Categories
              </label>
              <div className="regForm-select-wrapper">
                <select
                  id="additionalCategory"
                  value={formData.additionalCategory || ''}
                  onChange={(e) => onSave('additionalCategory', e.target.value)}
                  className="regForm-select"
                  style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                >
                  <option value="">Select additional categories</option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                  <option value="Option 3">Option 3</option>
                  <option value="Option 4">Option 4</option>
                  <option value="Option 5">Option 5</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
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

// Step 6 Business Opening Hours
const Step6 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
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
    sessionStorage.setItem("businessAvailability", JSON.stringify(businessAvailability));
  }, [businessAvailability]);

  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    name: '',
    startDate: '',
    endDate: '',
    openTime: '',
    closeTime: '',
  });
  const [holidays, setHolidays] = useState([]);

  const handleCheckboxChange = (day) => {
    setbusinessAvailability((prev) => {
      const newAvailability = { ...prev };
      const newDay = { ...newAvailability[day] };

      if (!newDay.available) {
        newDay.startTime = '';
        newDay.endTime = '';
      }

      newDay.available = !newDay.available;
      newAvailability[day] = newDay;

      onSave('businessAvailability', newAvailability); // Save to parent formData
      return newAvailability;
    });
  };

  const handleTimeChange = (day, field, time) => {
    setbusinessAvailability((prev) => {
      const newAvailability = { ...prev, [day]: { ...prev[day], [field]: time } };
  
      // Validation: Prevent endTime from being earlier than startTime
      if (field === "endTime" && time < prev[day].startTime) {
        alert("End time cannot be earlier than start time!");
        return prev; // Prevent update
      }
  
      // Auto-adjust endTime if startTime is changed to be later than endTime
      if (field === "startTime" && newAvailability[day].endTime && time > prev[day].endTime) {
        newAvailability[day].endTime = time; 
      }
  
      onSave("businessAvailability", newAvailability); // Save to parent formData
      return newAvailability;
    });
  };
  

  const [emergencyHours, setEmergencyHours] = useState(() => {
    const savedEmergencyHours = sessionStorage.getItem("emergencyHours");
    return savedEmergencyHours ? JSON.parse(savedEmergencyHours) : false;
  });

  useEffect(() => {
    sessionStorage.setItem("emergencyHours", JSON.stringify(emergencyHours));
  }, [emergencyHours]);

  const handleEmergencyChange = () => {
    setEmergencyHours((prev) => {
      const newEmergencyStatus = !prev;
      onSave('emergencyHours', newEmergencyStatus ? 'Yes' : 'No'); // Save emergencyHours separately
      return newEmergencyStatus;
    });
  };

  const handleHolidayInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const addHoliday = () => {
    if (!newHoliday.name || !newHoliday.startDate || !newHoliday.endDate || !newHoliday.openTime || !newHoliday.closeTime) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const updatedHolidays = [...holidays, newHoliday];
    setHolidays(updatedHolidays);
    sessionStorage.setItem("holidays", JSON.stringify(updatedHolidays)); // Store in sessionStorage
    onSave("holidays", updatedHolidays);
    setNewHoliday({ name: "", startDate: "", endDate: "", openTime: "", closeTime: "" });
    setHolidayModalOpen(false);
  };

  useEffect(() => {
    const savedHolidays = JSON.parse(sessionStorage.getItem("holidays")) || [];
    setHolidays(savedHolidays);
  }, []);

  const handleNext = () => {
    // Check if any day has the checkbox selected but no time is entered
    for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]) {
      if (businessAvailability[day].available && (!businessAvailability[day].startTime || !businessAvailability[day].endTime)) {
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
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Business Opening Hours</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: "pointer", color: "#000839", textDecoration: "underline" }}
              >
                Skip for now
              </p>
            </div>
          </div>
          <p style={{ fontWeight: "bold", color: "#000839" }}>Select your weekly schedule. Do not select a day if it is your day off.</p>

          <div className="regForm-input-wrapper">
            {/* Day of the Week Checkboxes */}
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="regForm-input-group-checkbox">
                <div className='checkbox-input-wrapper'>
                  <div className="regForm-flex-container">
                    <input
                      type="checkbox"
                      id={day}
                      checked={businessAvailability[day].available}
                      onChange={() => handleCheckboxChange(day)}
                      className="regForm-checkbox"
                    />
                    <label htmlFor={day} className="regForm-label">{day}</label>
                  </div>
                    
                    {/* Time Inputs */}
                    <div className="regForm-time-inputs">
                      <input
                        type="time"
                        value={businessAvailability[day].startTime}
                        onChange={(e) => handleTimeChange(day, "startTime", e.target.value)}
                        className="regForm-input-time"
                        disabled={!businessAvailability[day].available}
                      />
                      <span>-</span>
                      <input
                        type="time"
                        value={businessAvailability[day].endTime}
                        onChange={(e) => handleTimeChange(day, "endTime", e.target.value)}
                        className="regForm-input-time"
                        disabled={!businessAvailability[day].available}
                      />
                    </div>
                </div>
              </div>
            ))}

            {/* Emergency Hours Checkbox */}
            <div className="regForm-input-group-emergency" style={{ marginTop: "15px", marginBottom: "20px" }}>
              <div className='checkbox-input-wrapper'>
                <div className="regForm-flex-container">
                  <input
                    type="checkbox"
                    id="emergencyHours"
                    onChange={handleEmergencyChange}
                    className="regForm-checkbox"
                  />
                  <label htmlFor="emergencyHours" className="regForm-label">
                    Emergency Hours (Tick if you offer 24/7 services.)
                  </label>
                </div>
              </div>
            </div>

            {/* Add Holiday/Special Hours Button */}
            <p style={{fontSize: "1rem", fontWeight: "600", color: "#000839", marginTop: "0.5rem"}}>Holiday/Special Hours</p>
            <div className="regForm-input-group">
              <button onClick={() => setHolidayModalOpen(true)} className="regForm-button">
                + Add Holiday/Special Hours
              </button>
            </div>

            {/* Modal for adding Holiday/Special Hours */}
            {holidayModalOpen && (
              <div className="regForm-modal-overlay">
                <div className="regForm-modal-content">
                  <div className='header-close-wrapper'>
                    <h3 className="regForm-modal-heading">Holiday/Special Hours</h3>
                    <button onClick={() => setHolidayModalOpen(false)} className="regForm-close-button">&times;</button>
                  </div>
                  <p style={{ display: "flex", fontStyle: "italic", color: "#000839", marginBottom: "20px", marginTop: "20px" }}>
                    You may add your custom dates for holiday hours.
                  </p>

                  {/* Input Fields for Holiday Details */}
                  <div className="regForm-input-group">
                    <label style={{ display: "block", marginBottom: "5px", textAlign: "left", fontWeight: "600", color: "#000839" }}>
                      Holiday/Special Hour Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Holiday/Special Hour Name"
                      value={newHoliday.name}
                      onChange={handleHolidayInputChange}
                      className="regForm-input"
                      maxLength={12}  
                      style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                      required
                    />
                  </div>

                  <div className="regForm-input-group">
                    <label style={{ display: "block", marginBottom: "5px", textAlign: "left", fontWeight: "600", color: "#000839" }}>Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newHoliday.startDate}
                      onChange={handleHolidayInputChange}
                      className="regForm-input"
                      style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                      required
                    />
                  </div>

                  <div className="regForm-input-group">
                    <label style={{ display: "block", marginBottom: "5px", textAlign: "left", fontWeight: "600", color: "#000839" }}>End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newHoliday.endDate}
                      onChange={handleHolidayInputChange}
                      className="regForm-input"
                      style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                      required
                    />
                  </div>

                  {/* Flexbox container for Open Time and Close Time */}
                  <div className="regForm-input-group" style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                    <div style={{ flex: "1" }}>
                      <label style={{ display: "block", marginBottom: "5px", textAlign: "left", fontWeight: "600", color: "#000839" }}>
                        Open Time
                      </label>
                      <input
                        type="time"
                        name="openTime"
                        value={newHoliday.openTime}
                        onChange={handleHolidayInputChange}
                        className="regForm-input"
                        required
                      />
                    </div>
                    <div style={{ flex: "1" }}>
                      <label style={{ display: "block", marginBottom: "5px", textAlign: "left", fontWeight: "600", color: "#000839" }}>
                        Close Time
                      </label>
                      <input
                        type="time"
                        name="closeTime"
                        value={newHoliday.closeTime}
                        onChange={handleHolidayInputChange}
                        className="regForm-input"
                        style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
                        required
                      />
                    </div>
                  </div>

                  <div className="regForm-modal-buttons">
                    <button onClick={() => setHolidayModalOpen(false)} className="regForm-button">Cancel</button>
                    <button onClick={addHoliday} className="regForm-button">Add Holiday</button>
                  </div>

                  {/* Divider */}
                  <hr style={{ marginTop: "20px", marginBottom: "20px", border: "1px solid #ddd" }} />
                  <p style={{textAlign: 'left', marginBottom: "15px", fontWeight:"bold", color: "#FFBC58"}}>Listed Holiday/Special Hours</p>
                  {/* List of Holidays */}
                  <div className="holidays-list">
                    {holidays.length > 0 ? (
                      <>
                        <div className="holiday-item">
                          <div>Name</div>
                          <div>Start Date</div>
                          <div>End Date</div>
                          <div>Time</div>
                        </div>
                        {holidays.map((holiday, index) => (
                          <div key={index} className="holiday-item">
                            <div>{holiday.name}</div>
                            <div>{holiday.startDate}</div>
                            <div>{holiday.endDate}</div>
                            <div>{`${holiday.openTime}-${holiday.closeTime}`}</div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p>No holidays added yet.</p>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={handleNext} className="regForm-button">Next</button>
          </div>
        </div>

        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Opening Hours Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 7 Tell Us About Yourself
const Step7 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({ "Profile Picture": [] });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    handleFileUploadLogic(files, modalType);
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = files.filter(file => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    }
    setErrorMessage("");

    setUploadedFiles((prev) => {
      let updatedFiles = type === "Profile Picture" ? validFiles.slice(0, 1) : validFiles;
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
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="h2-skip-wrapper">
              <h2>Tell Us About Yourself</h2>
              <p className="skip-text" onClick={onNext} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-file-upload-buttons">
            <div className="regForm-input-group">
              <p className="regForm-label">Profile Picture</p>
              <button onClick={() => setModalType("Profile Picture")} className="regForm-button">+ Upload</button>
              <p className="regForm-description">High-quality image of your profile.</p>
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
              <p className="regForm-label">Short Bio</p>
              <textarea
                placeholder="Introduce yourself to build trust. (e.g., “Hi, I’m Edward, with 15 years of plumbing experience.”)"
                value={formData.shortBio || ''}
                onChange={(e) => onSave('shortBio', e.target.value)}
                className="regForm-input-desc"
              ></textarea>
            </div>
          </div>

          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">Home Address</p>
              <input
                type="text"
                placeholder="Enter your personal address."
                value={formData.homeAddress || ''}
                onChange={(e) => onSave('homeAddress', e.target.value)}
                className="regForm-input"
                style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
              />
            </div>
          </div>

          <div className="regForm-input-wrapper">
            <div className="regForm-input-group">
              <p className="regForm-label">Birthday</p>
              <input
                type="date"
                value={formData.birthday || ''}
                onChange={(e) => onSave('birthday', e.target.value)}
                className="regForm-input"
                style={{fontFamily : '"Hanken Grotesk", "Arial"', color: "#000839"}}
              />
            </div>
          </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
          </div>
        </div>
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 8 Trader Verification
const Step8 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const [modalType, setModalType] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({
    insuranceCertificate: null,
    photoId: null,
    businessAddressProof: null,
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      handleFileUploadLogic(files, modalType);
    }
  };

  const handleFileUploadLogic = (files, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    let validFiles = files.filter(file => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      setErrorMessage("File size must not exceed 5MB.");
      return;
    }
    setErrorMessage("");

    const typeMapping = {
      "Insurance Certificate": "insuranceCertificate",
      "Photo ID": "photoId",
      "Proof of Business Address": "businessAddressProof"
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
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="h2-skip-wrapper">
              <h2>Trader Verification</h2>
              <p
                className="skip-text"
                onClick={onNext}
                style={{ cursor: 'pointer', color: '#000839', textDecoration: 'underline' }}
              >
                Skip for now
              </p>
            </div>
          </div>

          <div className="regForm-file-upload-buttons">
            {/* Insurance Certificate Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>Insurance Certificate</p>
              <button
                onClick={() => setModalType("Insurance Certificate")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">e.g., Public Liability Insurance</p>
            </div>

            {/* Photo ID Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>Photo ID</p>
              <button
                onClick={() => setModalType("Photo ID")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">e.g., Passport, Driver’s License</p>
            </div>

            {/* Proof of Business Address Upload Button */}
            <div className="regForm-input-group">
              <p className="regForm-label" style={{ marginBottom: "10px" }}>Proof of Business Address</p>
              <button
                onClick={() => setModalType("Proof of Business Address")}
                className="regForm-button"
              >
                + Upload
              </button>
              <p className="regForm-description">e.g., Public Liability Insurance</p>
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

      <div className="display-container">
        <p className="regForm-label" style={{ marginTop: "50px" }}>Business Verification</p>
        <p style={{ color: "#000839", marginBottom: "10px" }}>Reconfirm your company number and registered address.</p>
        <p className="regForm-input" style={{ marginBottom: "10px", backgroundColor: "#F2F4FA", color: "#000839" }}><strong>Business Address:</strong> {formData.businessAddress}</p>
        <p className="regForm-input" style={{ marginBottom: "10px", backgroundColor: "#F2F4FA", color: "#000839"}}><strong>Business Phone Number:</strong> {formData.businessNumber}</p>
      </div>

          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Next</button>
          </div>
        </div>
        <div className="regForm-image-container">
          <img src={Drilling} alt="Business Registration Illustration" />
        </div>
      </div>
    </div>
  );
};

// Step 9 Social Media
const Step9 = ({ onNext, onBack, formData, onSave, saveForLater, currentStep, totalSteps }) => {
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: ''
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
      onSave('socialMediaLinks', updatedLinks);
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
            <img className='regForm-logo' src={TradiyLogo} alt='Tradiy Logo' />
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <h2>Social Media</h2>
            <p>Feel free to enter your business’s social media links below. This is optional and helps homeowners connect with you online.</p>
          </div>

          {/* Scrollable Form Content */}
          <div className="regForm-input-wrapper">
            {['facebook', 'instagram', 'linkedin', 'tiktok'].map((platform) => (
              <div className="regForm-input-group" key={platform}>
                <label htmlFor={platform} className="regForm-label">{platform.charAt(0).toUpperCase() + platform.slice(1) + " Page"}</label>
                <input
                  type="text"
                  id={platform}
                  name={platform}
                  value={socialMediaLinks[platform]} // Bind to local state
                  onChange={handleInputChange}
                  placeholder={`Enter ${platform} username`}
                  className="regForm-input"
                  style={{ fontFamily: '"Hanken Grotesk", "Arial"', color: "#000839" }}
                />
              </div>
            ))}
          </div>

          {/* Fixed Footer Buttons */}
          <div className="regForm-button-container">
            <button onClick={onBack} className="regForm-button">Back</button>
            <button onClick={saveForLater} className="regForm-button">Save and Continue for Later</button>
            <button onClick={onNext} className="regForm-button">Finish</button>
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

// Step 10
const Step10 = ({ formData, onBack, onNext, saveForLater, onEdit }) => (
<>
<div style={{ overflow: 'hidden', height: '250px' }}>
  <img 
    src={workerSignup} 
    alt="worker cleaning" 
    style={{ width: '100%', objectFit: 'cover' }} 
  />
</div>
  <div className="step-container">
    <div className='regForm-final-header'>
      <div className='regForm-header-p'>
        <h2>Review & Submit</h2>
        <p>Please take a moment to review the information you've entered before submitting your form.</p>
      </div>
      <button onClick={onBack} className="regForm-button">Back</button>
    </div>
    <div className="business-container">
      <div className="header-block">
        <span className="title">Business Details</span>
        <p style={{ cursor: "pointer" }} onClick={() => onEdit(1)} className="edit-link">Edit</p>
      </div>
      <div className="details">
        <div className="detail-item">
          <div className="summary-label">Business Name</div>
          <div className="value">{formData.businessName || "No business name provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Business Owner</div>
          <div className="value">{formData.businessOwner || "No business owner provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Business Registered Address</div>
          <div className="value">{formData.businessAddress || "No registered address provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Business Phone Number</div>
          <div className="value">{formData.businessNumber || "No phone number provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Trade Category</div>
          <div className="value">{formData.traderCategory || "No trade category provided"}</div>
        </div>
      </div>
    </div>
  </div>

  <div className="step-container">
    <div className="business-container">
      <div className="header-block">
        <span className="title">Business Info</span>
        <p style={{ cursor: "pointer" }} onClick={() => onEdit(2)} className="edit-link">Edit</p>
      </div>
      <div className="details">
        <div className="detail-item">
          <div className="summary-label">Company Type</div>
          <div className="value">{formData.companyType || "No company type provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Website URL</div>
          <div className="value">{formData.websiteURL || "No website URL provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Services Provided</div>
          <div className="value">
            {Array.isArray(formData.services) && formData.services.length > 0 ? (
              formData.services.map((service, index) => (
                <div key={index}>{service}</div>
              ))
            ) : (
              <span>No services listed</span>
            )}
          </div>
        </div>
        <div className="detail-item">
          <div className="summary-label">VAT Registered?</div>
          <div className="value">{formData.isVatRegistered ? "Yes" : "No"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">VAT Number</div>
          <div className="value">
            {formData.isVatRegistered && formData.vatNumber ? formData.vatNumber : "Not registered"}
          </div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Call-Out Charge</div>
          <div className="value">
            {formData.calloutCharge ? `£${formData.calloutCharge} per visit` : "No call-out charge provided"}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="step-container">
    <div className="business-container">
      <div className="header-block">
        <span className="title">List Your Business</span>
        <p style={{ cursor: "pointer" }} onClick={() => onEdit(4)} className="edit-link">Edit</p>
      </div>
      <div className="details">
        
        {/* Business Logo */}
        <div className="detail-item">
          <div className="summary-label">Business Logo</div>
            <div className="value">
              {formData.businessLogo && (typeof formData.businessLogo === "string" || formData.businessLogo instanceof Blob || formData.businessLogo instanceof File) ? (
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

        {/* Work Images */}
        <div className="detail-item">
          <div className="summary-label">Work Images</div>
            <div className="value">
              {formData.workImages && formData.workImages.length > 0 ? (
                <ul>
                  {formData.workImages.map((file, index) => {
                    const isValidFile = file instanceof Blob || file instanceof File;
                    return (
                      <li key={index}>
                        <a
                          href={typeof file === "string" ? file : isValidFile ? URL.createObjectURL(file) : "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                         View Work Image {index + 1}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No work images uploaded"
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
                const isValidFile = file instanceof Blob || file instanceof File;
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

        {/* Business Description */}
        <div className="detail-item">
          <div className="summary-label">About Your Business</div>
          <div className="value">{formData.businessDescription || "No description provided"}</div>
        </div>
      </div>
    </div>
  </div>

  <div className="step-container">
    <div className="business-container">
      <div className="header-block">
        <span className="title">Add Your Categories</span>
        <p style={{ cursor: "pointer" }} onClick={() => onEdit(5)} className="edit-link">Edit</p>
      </div>
      <div className="details">
        <div className="detail-item">
          <div className="summary-label">Primary Trade Category</div>
          <div className="value">{formData.companyType || "No primary trade category provided"}</div>
        </div>
        <div className="detail-item">
          <div className="summary-label">Additional Categories</div>
          <div className="value">
            {Array.isArray(formData.additionalCategory) && formData.additionalCategory.length > 0 ? (
              formData.additionalCategory.map((category, index) => (
                <div key={index}>{category}</div>
              ))
            ) : (
              <span>No additional categories provided</span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  

  <div className="step-container">
  <div className="business-container">
    <div className="header-block">
      <span className="title">Business Opening Hours</span>
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
        <div className="summary-label">Weekly Schedule</div>
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
                const [startHours, startMinutes] = start.split(":").map(Number);
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
                circle = <span style={{ display: "inline-block", width: "16px", height: "16px", backgroundColor: "#E33629", borderRadius: "50%", marginRight: "12px" }}></span>; // Red for Closed
              } else if (timeDifference >= 6) {
                circle = <span style={{ display: "inline-block", width: "16px", height: "16px", backgroundColor: "#21A62A", borderRadius: "50%", marginRight: "12px" }}></span>; // Green for 6+ hours
              } else if (timeDifference > 0) {
                circle = <span style={{ display: "inline-block", width: "16px", height: "16px", backgroundColor: "#FFBC58", borderRadius: "50%", marginRight: "12px" }}></span>
              };

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

    <div className="detail-item">
      <div className="summary-label">Emergency Hours</div>
      <div className="value">
        {formData.emergencyHours === "Yes"
          ? "Offer 24/7 services"
          : formData.emergencyHours === "No"
          ? "Does not offer 24/7 services"
          : "Not selected"}
      </div>
    </div>

    <div className="detail-item">
      <div className="summary-label">Holiday/Special Hours</div>
      <div className="value">
        {formData.holidays && formData.holidays.length > 0 ? (
          formData.holidays.map((holiday, index) => {
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

            return (
              <div key={index} className="holiday-item">
                <span className="holiday-name">{holiday.name}</span> 
                <span className="holiday-date">
                  ({new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(holiday.startDate + "T00:00:00"))},{" "}
                </span>
                <span className="holiday-date"> {formatTime(holiday.openTime)} </span>
                <span className="holiday-date"> - </span>
                <span className="holiday-date">
                  {new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(holiday.endDate + "T00:00:00"))},{" "}
                </span>
                <span className="holiday-date"> {formatTime(holiday.closeTime)})</span>
              </div>


            );
          })
        ) : (
          <span>No special holidays set</span>
        )}
      </div>
    </div>
  </div>
</div>




  <div className="step-container">
  <div className="business-container">
    <div className="header-block">
      <span className="title">Tell Us About Yourself</span>
      <p style={{ cursor: "pointer" }} onClick={() => onEdit(7)} className="edit-link">Edit</p>
    </div>
    <div className="details">
    <div className="detail-item">
      <div className="summary-label">Profile Picture</div>
      <div className="value">
        {formData.profilePicture && (typeof formData.profilePicture === "string" || formData.profilePicture instanceof Blob || formData.profilePicture instanceof File) ? (
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
        <div className="summary-label">Home Address</div>
        <div className="value">{formData.homeAddress}</div>
      </div>
      <div className="detail-item">
      <div className="summary-label">Date of Birth</div>
      <div className="value">
        {formData.birthday ? 
          new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date(formData.birthday + "T00:00:00")) 
          : "No Birthday Added"
        }
      </div>
    </div>

    </div>
  </div>
  </div>

  <div className="step-container">
  <div className="business-container">
    <div className="header-block">
      <span className="title">Trader Verification</span>
      <p style={{ cursor: "pointer" }} onClick={() => onEdit(8)} className="edit-link">Edit</p>
    </div>
    <div className="details">
      <div className="detail-item">
        <div className="summary-label">Insurance Certificate</div>
        <div className="value">
          {formData.insuranceCertificate && (typeof formData.insuranceCertificate === "string" || formData.insuranceCertificate instanceof Blob || formData.insuranceCertificate instanceof File) ? (
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
          {formData.photoId && (typeof formData.photoId === "string" || formData.photoId instanceof Blob || formData.photoId instanceof File) ? (
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
          {formData.businessAddressProof && (typeof formData.businessAddressProof === "string" || formData.businessAddressProof instanceof Blob || formData.businessAddressProof instanceof File) ? (
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
    </div>
  </div>
  </div>

  <div className="step-container">
      <div className="business-container">
        <div className="header-block">
          <span className="title">Social Media</span>
          <p style={{ cursor: "pointer" }} onClick={() => onEdit(9)} className="edit-link">Edit</p>
        </div>
        <div className="details">
          <div className="detail-item">
            <div className="summary-label">Facebook Page</div>
            <div className="value">facebook.com/{formData.socialMediaLinks?.facebook || 'Not Provided'}</div> {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">Instagram Page</div>
            <div className="value">instagram.com/{formData.socialMediaLinks?.instagram || 'Not Provided'}</div> {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">LinkedIn Page</div>
            <div className="value">linkedin.com/company/{formData.socialMediaLinks?.linkedin || 'Not Provided'}</div> {/* Render value */}
          </div>
          <div className="detail-item">
            <div className="summary-label">TikTok Page</div>
            <div className="value">tiktok.com/@{formData.socialMediaLinks?.tiktok || 'Not Provided'}</div> {/* Render value */}
          </div>
        </div>
      </div>
    </div>

</>
);


export default RegistrationForm;
