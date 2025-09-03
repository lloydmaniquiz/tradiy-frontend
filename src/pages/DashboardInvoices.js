import React from "react";
import "../styles/DashboardInvoices.css";

export default function DashboardInvoices() {
  const role = localStorage.getItem("role");

  if (role === "Homeowner") {
    // 🔹 Homeowner view (Card Layout)
    return (
      <div className="db-invoices-home-container">
        <div className="db-invoices-home-header">
          <h2>Invoices</h2>
          <button className="db-invoices-home-filter">⚙ Filters</button>
        </div>

        <div className="db-invoices-home-grid">
          {/* Paid */}
          <div className="db-invoices-home-card">
            <span className="db-invoices-home-status paid">● Paid</span>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 05 February 2025
            </p>
            <p className="db-invoices-home-amount">Total Amount: £120.00</p>
            <p className="db-invoices-home-balance">Balance: £0.00</p>
            <button className="db-invoices-home-action outline">
              Download PDF
            </button>
          </div>

          {/* Awaiting Payment */}
          <div className="db-invoices-home-card">
            <span className="db-invoices-home-status awaiting">
              ● Awaiting Payment
            </span>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 03 February 2025
            </p>
            <p className="db-invoices-home-amount">Total Amount: £120.00</p>
            <p className="db-invoices-home-balance negative">
              Balance: £120.00
            </p>
            <button className="db-invoices-home-action primary">Pay Now</button>
          </div>

          {/* Past Due */}
          <div className="db-invoices-home-card">
            <span className="db-invoices-home-status pastdue">● Past Due</span>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 14 January 2025
            </p>
            <p className="db-invoices-home-amount">Total Amount: £220.00</p>
            <p className="db-invoices-home-balance negative">
              Balance: £220.00
            </p>
            <button className="db-invoices-home-action primary">Pay Now</button>
          </div>
        </div>
      </div>
    );
  }
}
