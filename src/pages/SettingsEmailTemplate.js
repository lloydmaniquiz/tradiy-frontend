import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TEMPLATE_CONFIG = {
  enquiries: {
    "request-received": {
      title: "Enquiries - Request Received",
      defaultSubject: "We've Got Your Request!",
      defaultBody: `Hi {{CLIENT_NAME}},

Thank you for reaching out! We've received your request and will be in touch shortly.

If you have any questions in the meantime, feel free to contact us at jacob.butler@email.com

Looking forward to assisting you!

Sincerely,
Jacob Butler`,
    },
    // you can add more later:
    // "request-confirmed": { ... },
  },
  // quotes: { ... }, jobs: { ... }, invoice: { ... }
};

const sampleData = {
  CLIENT_NAME: "Isabel Stevens",
};

function applyPlaceholders(text) {
  if (!text) return "";
  let result = text;
  Object.entries(sampleData).forEach(([key, value]) => {
    const re = new RegExp(`{{${key}}}|{${key}}`, "g");
    result = result.replace(re, value);
  });
  return result;
}

const SettingsEmailTemplate = () => {
  const navigate = useNavigate();
  const { category, templateId } = useParams();

  const config = useMemo(() => {
    const cat = TEMPLATE_CONFIG[category] || {};
    const base = cat[templateId];

    if (base) return base;

    // fallback if not defined yet
    const prettyId = templateId
      ?.split("-")
      .map((s) => s[0]?.toUpperCase() + s.slice(1))
      .join(" ");

    return {
      title: prettyId || "Email Template",
      defaultSubject: prettyId || "Template Subject",
      defaultBody: "",
    };
  }, [category, templateId]);

  const [subject, setSubject] = useState(config.defaultSubject);
  const [body, setBody] = useState(config.defaultBody);

  const previewSubject = subject || "(No subject)";
  const previewBody = applyPlaceholders(body);

  const handleClear = () => setBody("");

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: send to API
    console.log("Saving template", { category, templateId, subject, body });
  };

  return (
    <div className="settings-card">
      <form onSubmit={handleSave}>
        {/* Top: back + title */}
        <div className="email-template-header">
          <button
            type="button"
            className="back-icon-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 className="settings-card-title">{config.title}</h2>
        </div>

        {/* Subject + Message */}
        <div className="settings-field">
          <label>Email Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="settings-field">
          <label>Message</label>
          <textarea
            className="email-template-textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="text-button email-clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>

        {/* Preview block */}
        <div className="email-preview-card">
          <h3 className="email-preview-title">{previewSubject}</h3>
          <pre className="email-preview-body">{previewBody}</pre>
        </div>

        {/* Footer buttons */}
        <div className="template-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="primary-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsEmailTemplate;
