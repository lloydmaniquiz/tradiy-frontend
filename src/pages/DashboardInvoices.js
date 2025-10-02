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
          <div className="db-quotes-card">
            <span className="db-quotes-status paid">● PAID</span>
            <p className="db-invoices-small">Invoice ID</p>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 05 February 2025
            </p>
            <hr className="db-quotes-divider" />
            <p className="db-invoices-home-amount">
              TOTAL AMOUNT:
              <span className="amount-value">£120.00</span>
            </p>
            <p className="db-invoices-home-balance">
              BALANCE:
              <span className="balance-value">£0.00</span>
            </p>

            <button className="db-invoices-home-action outline">
              Download PDF
            </button>
          </div>

          {/* Awaiting Payment */}
          <div className="db-quotes-card">
            <span className="db-quotes-status awaiting">
              ● AWAITING PAYMENT
            </span>
            <p className="db-invoices-small">Invoice ID</p>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 03 February 2025
            </p>
            <hr className="db-quotes-divider" />
            <p className="db-invoices-home-amount">
              TOTAL AMOUNT:
              <span className="amount-value">£120.00</span>
            </p>
            <p className="db-invoices-home-balance">
              BALANCE:
              <span className="balance-value negative">£0.00</span>
            </p>
            <button className="db-invoices-home-action primary">Pay Now</button>
          </div>

          {/* Past Due */}
          <div className="db-quotes-card">
            <span className="db-quotes-status pastdue">● PAST DUE</span>
            <p className="db-invoices-small">Invoice ID</p>
            <h4 className="db-invoices-home-id">INV-123-456</h4>
            <p className="db-invoices-home-service">Service A</p>
            <p className="db-invoices-home-date">
              <strong>Due Date:</strong> 14 January 2025
            </p>
            <hr className="db-quotes-divider" />
            <p className="db-invoices-home-amount">
              TOTAL AMOUNT:
              <span className="amount-value">£120.00</span>
            </p>
            <p className="db-invoices-home-balance">
              BALANCE:
              <span className="balance-value negative">£0.00</span>
            </p>
            <button className="db-invoices-home-action primary">Pay Now</button>
          </div>
        </div>
      </div>
    );
  }
}
