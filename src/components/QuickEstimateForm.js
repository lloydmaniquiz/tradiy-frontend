import React, { useState, useEffect } from "react";
import "../styles/QuickEstimateForm.css";
import Select from "react-select";

const QuickEstimateForm = ({
  businessOwner,
  traderEmail,
  traderId,
  closeModal,
  businessName,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    homeOwnerName: "",
    phoneNumber: "",
    email: "",
    serviceType: [],
    postCode: "",
    timeline: "",
    time: "",
    description: "",
    files: [],
    confirm: false, // Ensure checkboxes exist
    agree: false,
    traderEmail: traderEmail,
    businessOwner: businessOwner,
    businessName: businessName,
  });

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/tradespeople/`
        );
        const data = await response.json();

        const foundTrader = data.find((t) => t.id === traderId);

        if (foundTrader) {
          // Ensure weeklySchedule is parsed correctly
          const parsedSchedule =
            typeof foundTrader.weeklySchedule === "string"
              ? JSON.parse(foundTrader.weeklySchedule)
              : foundTrader.weeklySchedule;

          setTrader({ ...foundTrader, weeklySchedule: parsedSchedule });
        } else {
          setError("Trader not found");
        }
      } catch (err) {
        setError("Failed to fetch trader data");
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId]);

  const traderCategories = trader?.traderCategory
    ? JSON.parse(trader.traderCategory)
    : []; // Ensure it's always an array

  const options = traderCategories.map((service) => ({
    value: service,
    label: service,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // <-- Handle checkboxes correctly
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    // Here, React Select returns an array of selected options when `isMulti` is used
    setFormData((prevState) => ({
      ...prevState,
      serviceType: selectedOptions.map((option) => option.value), // Store just the values (service names)
    }));
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];

    setFormData((prevState) => ({
      ...prevState,
      files: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const requiredFields = [
      "homeOwnerName",
      "phoneNumber",
      "email",
      "serviceType",
      "postCode",
    ];

    const newErrors = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      // Ensure the value exists and is a string (in case it's an array or another type)
      if (
        !formData[field] ||
        (typeof formData[field] === "string" &&
          formData[field].trim() === "") ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] = "This field is required";
      }
    });

    // Ensure checkboxes are validated properly
    if (!formData.confirm) {
      newErrors.confirm = "You must confirm you are the homeowner";
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and privacy policy";
    }

    // If there are validation errors, set the error state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    // Prepare FormData for sending the request
    const formDataObj = new FormData();

    Object.keys(formData).forEach((key) => {
      // Don't append 'files' in the FormData object, it's handled separately
      if (key !== "files") {
        formDataObj.append(key, formData[key]);
      }
    });

    formData.files.forEach((file) => {
      formDataObj.append("files", file);
    });

    try {
      // Make the API request
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/submit-quote/`,
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Form submitted successfully!");

      // Reset form after successful submission
      setFormData({
        homeOwnerName: "",
        phoneNumber: "",
        email: "",
        serviceType: [],
        postCode: "",
        timeline: "",
        time: "",
        description: "",
        confirm: false,
        agree: false,
        files: [],
        traderEmail: traderEmail,
        businessOwner: businessOwner,
        businessName: businessName,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
  };

  return (
    <div className="quote-form-container">
      <span onClick={closeModal} className="close-icon">
        &times;
      </span>
      <h1 className="form-title">Enquiry Details</h1>

      {loading ? (
        <p>Loading trader schedule...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className="section">
              <h2 className="quote-section-title">CONTACT INFORMATION</h2>
              <div className="quote-form-group">
                <div>
                  <label htmlFor="homeOwnerName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="homeOwnerName"
                    name="homeOwnerName"
                    value={formData.homeOwnerName}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                  {error?.homeOwnerName && (
                    <p className="error-message">{error.homeOwnerName}</p>
                  )}{" "}
                </div>
                <div>
                  <label htmlFor="phoneNumber">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="01234 567890"
                    required
                  />
                  {error?.phoneNumber && (
                    <p className="error-message">{error.phoneNumber}</p>
                  )}{" "}
                </div>
                <div>
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@email.com"
                    required
                  />
                  {error?.email && (
                    <p className="error-message">{error.email}</p>
                  )}{" "}
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="quote-section-title">PROJECT DETAILS</h2>
              <div className="quote-form-group">
                <div>
                  <label htmlFor="serviceType">
                    Service Type <span className="required">*</span>
                  </label>
                  <Select
                    isMulti
                    name="serviceType"
                    className="quote-react-select"
                    options={options}
                    value={options.filter((option) =>
                      formData.serviceType.includes(option.value)
                    )}
                    onChange={handleSelectChange} // React Select calls this with the full selected options array
                    placeholder="Select services"
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
                  />
                  {error?.serviceType && (
                    <p className="error-message">{error.serviceType}</p>
                  )}{" "}
                </div>
                <div className="location-group">
                  <label htmlFor="location" className="location-label">
                    Location <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder=""
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="region"
                    placeholder="Region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="postCode"
                    placeholder="Postcode"
                    value={formData.postCode}
                    onChange={handleChange}
                    required
                  />

                  {error?.postCode && (
                    <p className="error-message">{error.postCode}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="timeline">Timeline</label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    placeholder="HH:MM"
                  />
                </div>
                <div>
                  <label htmlFor="description">Brief Job Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="upload">
                    Upload Photos or Files (Optional)
                  </label>
                  <div
                    className={`file-upload ${isDragging ? "dragging" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const files = Array.from(e.dataTransfer.files);
                      handleFileChange({ target: { files } }); // triggers your existing logic
                    }}
                  >
                    <p>Drag and drop files here or</p>

                    <label htmlFor="upload" className="custom-file-upload">
                      Choose File
                    </label>

                    <input
                      type="file"
                      id="upload"
                      name="files"
                      multiple
                      onChange={handleFileChange}
                    />

                    <div className="file-name">
                      {formData.files.length > 0
                        ? formData.files.map((file, index) => {
                            const fileName = file.name;
                            const extIndex = fileName.lastIndexOf(".");
                            const nameWithoutExtension = fileName.slice(
                              0,
                              extIndex
                            );
                            const extension = fileName.slice(extIndex);

                            const truncatedName =
                              nameWithoutExtension.length > 10
                                ? `${nameWithoutExtension.slice(0, 10)}...`
                                : nameWithoutExtension;

                            return (
                              <span key={index}>
                                {truncatedName + extension}
                              </span>
                            );
                          })
                        : "No file chosen"}
                    </div>
                  </div>
                  <hr className="custom-divider" />
                  <div>
                    <div className="checkbox-group">
                      {error?.confirm && (
                        <p className="error-message">{error.confirm}</p>
                      )}{" "}
                      {/* Error for confirm checkbox */}
                      <label>
                        <input
                          type="checkbox"
                          id="agree"
                          name="agree"
                          checked={formData.agree || false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              agree: e.target.checked,
                            })
                          }
                          required
                        />
                        I agree to Tradiy’s{" "}
                        <a href="#/terms-and-policies">
                          Terms and Privacy Policy.
                        </a>
                      </label>
                      {error?.agree && (
                        <p className="error-message">{error.agree}</p>
                      )}{" "}
                      {/* Error for agree checkbox */}
                    </div>

                    <div className="contact-preference-section">
                      <p className="contact-label">
                        I would like to be contacted via:
                      </p>
                      <div className="contact-options">
                        <label>
                          <input
                            type="radio"
                            name="contactMethod"
                            value="Email"
                            checked={formData.contactMethod === "Email"}
                            onChange={handleChange}
                          />
                          Email
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="contactMethod"
                            value="Chat"
                            checked={formData.contactMethod === "Chat"}
                            onChange={handleChange}
                          />
                          Chat
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="contactMethod"
                            value="WhatsApp"
                            checked={formData.contactMethod === "WhatsApp"}
                            onChange={handleChange}
                          />
                          WhatsApp
                        </label>
                      </div>

                      <button type="submit" className="quote-book-btn">
                        Get My Estimate
                      </button>

                      <p className="info-paragraph">
                        If you’re new to Tradiy, we’ll setup an account for you
                        with your email above. This will make it easier to
                        access your conversations with trades and manage your
                        jobs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default QuickEstimateForm;
