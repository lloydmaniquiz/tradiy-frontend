// src/components/CustomerDetails.jsx
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "../styles/CustomerDetails.css"; // create or reuse your styles

export default function CustomerDetails({ customer, onBack, onUpdate }) {
  if (!customer) return null;

  const handleEditSave = () => {
    // example update; in real app you'd show a form
    const updated = { ...customer, notes: "Saved note" };
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div className="customer-details-page">
      <div className="customer-details-main">
        <div className="details-header">
          <button className="back-btn" onClick={onBack}>
            <FaArrowLeft /> Back
          </button>
          <h2 className="customer-name">{customer.name}</h2>
          <p className="subtitle">Activity Overview</p>
        </div>

        <section className="activity-overview card">
          <div className="tabs">
            <button>Jobs</button>
            <button>Quotes</button>
            <button>Invoices</button>
          </div>

          <table className="mini-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JOB-1234</td>
                <td>Lorem ipsum</td>
                <td>20 Jan 2025</td>
                <td>£100.00</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="schedules card">
          <h3>Schedules</h3>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Quote Visit</td>
                <td>30 Jan 2025</td>
                <td>14:00 - 15:00</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="internal-notes card">
          <h3>Internal Notes</h3>
          <textarea placeholder="Enter internal notes here..." rows={6} />
          <div className="actions">
            <button className="btn-outline" onClick={onBack}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleEditSave}>
              Save
            </button>
          </div>
        </section>
      </div>

      <aside className="customer-details-side">
        <div className="customer-info card">
          <h4>Customer Information</h4>
          <p>{customer.address}</p>
          <p>Phone: {customer.phone || "—"}</p>
          <p>Email: {customer.email || "—"}</p>
        </div>

        <div className="billing-history card">
          <h4>Billing History</h4>
          <ul>
            <li>INV-A-123-456 — £100.00</li>
            <li>INV-A-123-456 — -£100.00</li>
          </ul>
          <div className="current-balance">Current Balance: £0.00</div>
        </div>

        <div className="communication-history card">
          <h4>Communication History</h4>
          <div>10 Jan 2025 — Booking Confirmation (Email)</div>
          <div>03 Jan 2025 — Lorem ipsum (Chat)</div>
        </div>

        <div className="activity-log card">
          <h4>Activity Log</h4>
          <ul>
            <li>20 Jun 2025 — Quote Approved</li>
            <li>1 Jun 2025 — Payment marked Complete</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
