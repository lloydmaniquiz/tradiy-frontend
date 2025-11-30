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

  // split error concerns:
  const [fetchError, setFetchError] = useState(null); // string | null (network/trader errors)
  const [validationErrors, setValidationErrors] = useState(null); // object | null (form validation)

  const [formData, setFormData] = useState({
    homeOwnerName: "",
    phoneNumber: "",
    email: "",
    serviceType: [],
    address: "",
    city: "",
    state: "",
    region: "",
    postCode: "",
    timeline: "",
    time: "",
    description: "",
    files: [],
    confirm: false,
    agree: false,
    contactMethod: "",
    traderEmail: traderEmail || "",
    businessOwner: businessOwner || "",
    businessName: businessName || "",
  });

  useEffect(() => {
    const fetchTraderData = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/tradespeople/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch traders");
        }
        const data = await response.json();

        const foundTrader = data.find((t) => t.id === traderId);

        if (foundTrader) {
          const parsedSchedule =
            typeof foundTrader.weeklySchedule === "string"
              ? JSON.parse(foundTrader.weeklySchedule)
              : foundTrader.weeklySchedule;

          setTrader({ ...foundTrader, weeklySchedule: parsedSchedule });
        } else {
          setFetchError("Trader not found");
        }
      } catch (err) {
        console.error(err);
        setFetchError("Failed to fetch trader data");
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId]);

  const traderCategories =
    trader && trader.traderCategory
      ? // trader.traderCategory might be a JSON string
        typeof trader.traderCategory === "string"
        ? JSON.parse(trader.traderCategory)
        : trader.traderCategory
      : [];

  const options = (traderCategories || []).map((service) => ({
    value: service,
    label: service,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));

    // clear individual validation error on change for that field
    if (validationErrors && validationErrors[name]) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return Object.keys(copy).length === 0 ? null : copy;
      });
    }
  };

  const handleSelectChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map((o) => o.value) : [];
    setFormData((prev) => ({ ...prev, serviceType: values }));
    if (validationErrors?.serviceType) {
      setValidationErrors((prev) => {
        const copy = { ...prev };
        delete copy.serviceType;
        return Object.keys(copy).length === 0 ? null : copy;
      });
    }
  };

  const handleFileChange = (eOrFiles) => {
    // Accept either an input event or an array of File objects
    const files =
      eOrFiles && eOrFiles.target && eOrFiles.target.files
        ? Array.from(eOrFiles.target.files)
        : Array.isArray(eOrFiles)
        ? eOrFiles
        : [];

    setFormData((prev) => ({ ...prev, files }));
  };

  const validate = () => {
    const requiredFields = [
      "homeOwnerName",
      "phoneNumber",
      "email",
      "serviceType",
      "postCode",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0)
      ) {
        newErrors[field] = "This field is required";
      }
    });

    if (!formData.confirm) {
      newErrors.confirm = "You must confirm you are the homeowner";
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and privacy policy";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors(null);
    setFetchError(null);

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    // Prepare FormData
    const fd = new FormData();

    // Append primitive/string fields and JSON-encode arrays/objects/booleans
    Object.keys(formData).forEach((key) => {
      if (key === "files") return; // files handled separately
      const val = formData[key];

      if (val === undefined || val === null) {
        fd.append(key, "");
      } else if (
        Array.isArray(val) ||
        typeof val === "object" ||
        typeof val === "boolean"
      ) {
        // Send arrays/objects/booleans as JSON strings so backend can parse easily
        fd.append(key, JSON.stringify(val));
      } else {
        fd.append(key, String(val));
      }
    });

    // Append files
    formData.files.forEach((file) => {
      fd.append("files", file);
    });

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/submit-quote/`,
        {
          method: "POST",
          body: fd,
        }
      );

      if (!response.ok) {
        // attempt to parse server error
        let serverMsg = "Failed to submit form";
        try {
          const errBody = await response.json();
          serverMsg = errBody?.message || JSON.stringify(errBody);
        } catch {
          // ignore parse error
        }
        throw new Error(serverMsg);
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Form submitted successfully!");

      // reset form (keep traderEmail/businessOwner/businessName)
      setFormData({
        homeOwnerName: "",
        phoneNumber: "",
        email: "",
        serviceType: [],
        address: "",
        city: "",
        state: "",
        region: "",
        postCode: "",
        timeline: "",
        time: "",
        description: "",
        files: [],
        confirm: false,
        agree: false,
        contactMethod: "",
        traderEmail: traderEmail || "",
        businessOwner: businessOwner || "",
        businessName: businessName || "",
      });

      setValidationErrors(null);
      setFetchError(null);
    } catch (err) {
      console.error("Submit error:", err);
      setFetchError(err.message || "Failed to submit form");
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
      ) : fetchError ? (
        // fetchError is a string; safe to render
        <p className="error">{fetchError}</p>
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
                  {validationErrors?.homeOwnerName && (
                    <p className="error-message">
                      {validationErrors.homeOwnerName}
                    </p>
                  )}
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
                  {validationErrors?.phoneNumber && (
                    <p className="error-message">
                      {validationErrors.phoneNumber}
                    </p>
                  )}
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
                  {validationErrors?.email && (
                    <p className="error-message">{validationErrors.email}</p>
                  )}
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
                    onChange={handleSelectChange}
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
                  {validationErrors?.serviceType && (
                    <p className="error-message">
                      {validationErrors.serviceType}
                    </p>
                  )}
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

                  {validationErrors?.postCode && (
                    <p className="error-message">{validationErrors.postCode}</p>
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
                      handleFileChange(files);
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
                      {/* Confirm homeowner (you were validating confirm but didn't render it) */}
                      <label>
                        <input
                          type="checkbox"
                          id="confirm"
                          name="confirm"
                          checked={formData.confirm || false}
                          onChange={handleChange}
                        />
                        I confirm I am the homeowner.
                      </label>
                      {validationErrors?.confirm && (
                        <p className="error-message">
                          {validationErrors.confirm}
                        </p>
                      )}

                      <label>
                        <input
                          type="checkbox"
                          id="agree"
                          name="agree"
                          checked={formData.agree || false}
                          onChange={handleChange}
                        />
                        I agree to Tradiy’s{" "}
                        <a href="#/terms-and-policies">
                          Terms and Privacy Policy.
                        </a>
                      </label>
                      {validationErrors?.agree && (
                        <p className="error-message">
                          {validationErrors.agree}
                        </p>
                      )}
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
