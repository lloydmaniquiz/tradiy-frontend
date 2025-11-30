import React from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Enquiries Email Templates",
    category: "enquiries",
    items: [
      { id: "request-received", label: "Request Received" },
      { id: "request-confirmed", label: "Request Confirmed" },
      { id: "quote-visit-reminder", label: "Quote Visit Reminder" },
    ],
  },
  {
    title: "Quotes Email Templates",
    category: "quotes",
    items: [{ id: "quote-approval", label: "Quote Approval" }],
  },
  {
    title: "Jobs Email Templates",
    category: "jobs",
    items: [
      { id: "booking-confirmation", label: "Booking Confirmation" },
      { id: "visit-reminder", label: "Visit Reminder" },
      { id: "deposit-request", label: "Deposit Request" },
      { id: "job-review", label: "Job Review" },
    ],
  },
  {
    title: "Invoice Email Templates",
    category: "invoice",
    items: [
      { id: "new-invoice", label: "New Invoice" },
      { id: "payment-receipt", label: "Payment Receipt" },
    ],
  },
];

const SettingsEmail = () => {
  const navigate = useNavigate();

  const openTemplate = (category, id) => {
    navigate(`${category}/${id}`);
  };

  return (
    <>
      {sections.map((section) => (
        <div key={section.title} className="settings-card">
          <h2 className="settings-card-title">{section.title}</h2>

          <div className="template-list">
            {section.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="template-row"
                onClick={() => openTemplate(section.category, item.id)}
              >
                <span>{item.label}</span>
                <span className="template-row-arrow">›</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SettingsEmail;
