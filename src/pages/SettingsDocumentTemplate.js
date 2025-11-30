import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const OPTIONS = {
  quote: {
    label: "Quote Details",
    description:
      "Check on which items would you like to be displayed on the document.",
    fields: [
      { id: "businessLogo", label: "Business Logo", defaultChecked: true },
      {
        id: "quoteRequestType",
        label: "Quote Request Type",
        defaultChecked: true,
      },
      {
        id: "customerDetails",
        label: "Customer Details",
        defaultChecked: true,
      },
      {
        id: "referenceNumber",
        label: "Reference Number",
        defaultChecked: true,
      },
      { id: "serviceName", label: "Service Name", defaultChecked: true },
      { id: "quantity", label: "Quantity", defaultChecked: false },
      { id: "unitPrice", label: "Unit Price", defaultChecked: false },
      { id: "discount", label: "Discount", defaultChecked: false },
      { id: "tax", label: "Tax", defaultChecked: false },
      { id: "depositAmount", label: "Deposit Amount", defaultChecked: true },
      { id: "subTotal", label: "Sub Total", defaultChecked: true },
      { id: "totalAmount", label: "Total Amount", defaultChecked: true },
      {
        id: "paymentDeadline",
        label: "Payment Deadline",
        defaultChecked: true,
      },
    ],
  },
  invoice: {
    label: "Invoice Details",
    description:
      "Check on which items would you like to be displayed on the document.",
    fields: [
      { id: "businessLogo", label: "Business Logo", defaultChecked: true },
      {
        id: "customerDetails",
        label: "Customer Details",
        defaultChecked: true,
      },
      {
        id: "referenceNumber",
        label: "Reference Number",
        defaultChecked: true,
      },
      { id: "invoiceDate", label: "Invoice Date", defaultChecked: true },
      { id: "dueDate", label: "Due Date", defaultChecked: true },
      { id: "serviceName", label: "Service Name", defaultChecked: true },
      { id: "quantity", label: "Quantity", defaultChecked: false },
      { id: "unitPrice", label: "Unit Price", defaultChecked: false },
      { id: "discount", label: "Discount", defaultChecked: false },
      { id: "tax", label: "Tax", defaultChecked: false },
      { id: "subTotal", label: "Sub Total", defaultChecked: true },
      { id: "totalAmount", label: "Total Amount", defaultChecked: true },
      { id: "paymentDetails", label: "Payment Details", defaultChecked: true },
    ],
  },
  receipt: {
    label: "Receipt Details",
    description:
      "Check on which items would you like to be displayed on the document.",
    fields: [
      { id: "businessLogo", label: "Business Logo", defaultChecked: true },
      {
        id: "customerDetails",
        label: "Customer Details",
        defaultChecked: true,
      },
      {
        id: "referenceNumber",
        label: "Reference Number",
        defaultChecked: true,
      },
      { id: "serviceName", label: "Service Name", defaultChecked: true },
      { id: "totalAmount", label: "Total Amount", defaultChecked: true },
      {
        id: "transactionDate",
        label: "Transaction Date",
        defaultChecked: true,
      },
      { id: "paymentMethod", label: "Payment Method", defaultChecked: true },
    ],
  },
};

const getDefaultSelected = (type) => {
  const cfg = OPTIONS[type];
  if (!cfg) return {};
  const out = {};
  cfg.fields.forEach((f) => {
    out[f.id] = !!f.defaultChecked;
  });
  return out;
};

const SettingsDocumentTemplate = () => {
  const navigate = useNavigate();

  const [docType, setDocType] = useState("quote");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [selected, setSelected] = useState(() => getDefaultSelected("quote"));
  const [setAsDefault, setSetAsDefault] = useState(false);

  const details = useMemo(() => OPTIONS[docType], [docType]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setDocType(value);
    setSelected(getDefaultSelected(value)); // reset checkboxes when switching type
  };

  const toggleField = (id) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      type: docType,
      title,
      notes,
      fields: Object.keys(selected).filter((k) => selected[k]),
      setAsDefault,
    };
    console.log("Creating document template:", payload);
    // TODO: send to API
  };

  return (
    <div className="settings-card">
      <form onSubmit={handleSubmit}>
        {/* Header with back */}
        <div className="doc-template-header">
          <button
            type="button"
            className="back-icon-btn"
            onClick={() => navigate(-1)}
          >
            ←
          </button>
          <h2 className="settings-card-title">Create Document Template</h2>
        </div>

        {/* Type selection */}
        <div className="document-type-row">
          <label className="document-type-option">
            <input
              type="radio"
              name="docType"
              value="quote"
              checked={docType === "quote"}
              onChange={handleTypeChange}
            />
            <span>Quote</span>
          </label>

          <label className="document-type-option">
            <input
              type="radio"
              name="docType"
              value="invoice"
              checked={docType === "invoice"}
              onChange={handleTypeChange}
            />
            <span>Invoice</span>
          </label>

          <label className="document-type-option">
            <input
              type="radio"
              name="docType"
              value="receipt"
              checked={docType === "receipt"}
              onChange={handleTypeChange}
            />
            <span>Receipt</span>
          </label>
        </div>

        {/* Title */}
        <div className="settings-field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Notes (editor area – simple textarea for now) */}
        <div className="settings-field">
          <label>Notes</label>
          <div className="doc-editor-wrapper">
            <div className="doc-editor-toolbar">
              <span>Default</span>
              {/* icons would go here if you add them */}
            </div>
            <textarea
              className="doc-template-textarea"
              placeholder="Enter document notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Detail checkboxes */}
        <div className="doc-details-section">
          <h3 className="doc-details-title">{details.label}</h3>
          <p className="doc-details-description">{details.description}</p>

          <div className="doc-details-list">
            {details.fields.map((field) => (
              <label key={field.id} className="doc-detail-item">
                <input
                  type="checkbox"
                  checked={!!selected[field.id]}
                  onChange={() => toggleField(field.id)}
                />
                <span>{field.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Set as default format toggle */}
        <div className="doc-default-row">
          <span>Set as default format</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={setAsDefault}
              onChange={(e) => setSetAsDefault(e.target.checked)}
            />
            <span className="slider" />
          </label>
        </div>

        {/* Footer buttons */}
        <div className="doc-template-footer">
          <button
            type="button"
            className="secondary-button preview-btn"
            disabled
          >
            Preview PDF
          </button>
          <div className="doc-footer-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsDocumentTemplate;
