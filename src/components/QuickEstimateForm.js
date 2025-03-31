import React, { useState } from "react";
import "../styles/QuickEstimateForm.css";

const QuickEstimateForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    timeline: "",
    time: "",
    description: "",
    files: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];

    setFormData((prevState) => ({
      ...prevState,
      files: files,
    }));
  };

  return (
    <div className="quote-form-container">
      <span onClick={closeModal} className="close-icon">
        &times;
      </span>
      <h1 className="form-title">Quote Estimate Form</h1>
      <p className="form-subtitle">(Quick Pricing Request)</p>

      <div className="section">
        <h2 className="quote-section-title">CONTACT INFORMATION</h2>
        <form className="quote-form-group">
          <div>
            <label htmlFor="name">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="01234 567890"
            />
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
            />
          </div>
        </form>
      </div>

      <div className="section">
        <h2 className="quote-section-title">PROJECT DETAILS</h2>
        <form className="quote-form-group">
          <div>
            <label htmlFor="service">
              Service Type <span className="required">*</span>
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="quote-service-select"
            >
              <option>Select a service</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">
              Location <span className="required">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
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
            <label htmlFor="upload">Upload Photos or Files (Optional)</label>
            <div className="file-upload">
              <p>Drag and drop files here</p>

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

              {/* Dynamically Display File Names */}
              <span className="file-name">
                {formData.files.length > 0
                  ? formData.files.map((file) => file.name).join(", ")
                  : "No file chosen"}
              </span>
            </div>
            <hr className="custom-divider" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickEstimateForm;
