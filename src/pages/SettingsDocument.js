// SettingsDocument.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsDocument = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-card">
      <div className="settings-card-header doc-header-row">
        <div>
          <h2 className="settings-card-title">Document Templates</h2>
          <p className="settings-card-subtitle">
            Document Templates let you manage, customize, and create your own
            style for documents that will appear in the PDF files sent to
            customers.
          </p>
        </div>
        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("create")}
        >
          Create Template
        </button>
      </div>

      <div className="template-list">
        <button type="button" className="template-row">
          <span>Standard Template</span>
          <span className="template-row-arrow">›</span>
        </button>

        <button type="button" className="template-row">
          <span>Quote Template</span>
          <span className="template-row-arrow">›</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsDocument;
