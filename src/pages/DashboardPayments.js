import React, { useState } from "react";
import "../styles/DashboardPayments.css";
import { FaChevronDown } from "react-icons/fa";
import InvoiceForm from "../components/InvoiceForm";

export default function DashboardPayments() {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  const handleAddInvoiceClick = () => {
    setShowInvoiceForm(true);
  };

  const handleBack = () => {
    setShowInvoiceForm(false);
  };

  if (showInvoiceForm) {
    return <InvoiceForm onBack={handleBack} />;
  }

  return (
    <div className="db-payments-container">
      {/* Page Title + Business Selector */}
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Payments</h1>

        <div className="db-quotesheader-select-wrapper">
          <select className="db-quotesheader-select">
            <option>Business Name 1</option>
            <option>Business Name 2</option>
            <option>Business Name 3</option>
          </select>
          <FaChevronDown className="db-quotesheader-icon" />
        </div>
      </div>

      {/* Stats */}
      <div className="db-quotes-stats">
        <div className="db-quotes-item">
          <h4>Issued Invoice</h4>
          <p className="db-quotes-number">123</p>
        </div>
        <div className="db-quotes-item">
          <h4>Paid</h4>
          <p className="db-quotes-number">123</p>
        </div>
        <div className="db-quotes-item">
          <h4>Awaiting Payment</h4>
          <p className="db-quotes-number">123</p>
        </div>
        <div className="db-quotes-item">
          <h4>Past Due</h4>
          <p className="db-quotes-number">123</p>
        </div>
      </div>

      <div className="db-quotes-main-container">
        {/* Toolbar */}
        <div className="db-quotes-toolbar">
          <input
            type="text"
            placeholder="Search"
            className="db-quotes-search"
          />
          <button className="db-quotes-add-btn" onClick={handleAddInvoiceClick}>
            + Add Invoice
          </button>
        </div>

        {/* Tabs */}
        <div className="db-payments-tabs">
          <button className="db-payments-tab active">Awaiting Payment</button>
          <button className="db-payments-tab">Paid</button>
          <button className="db-payments-tab">Past Due</button>
        </div>

        {/* Table */}
        <div className="db-payments-table-wrapper">
          <table className="db-payments-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing To</th>
                <th>Due Date</th>
                <th>Total Amount</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Email Activity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-123-456</td>
                <td>Freya Reynolds</td>
                <td>29 Jan 2025</td>
                <td>£1,000.00</td>
                <td>£0.00</td>
                <td>
                  <span className="db-payments-badge red">DELIVERED</span>
                </td>
                <td>Opened</td>
              </tr>
              <tr>
                <td>INV-789-101</td>
                <td>David Walsh</td>
                <td>28 Jan 2025</td>
                <td>£1,200.00</td>
                <td>£0.00</td>
                <td>
                  <span className="db-payments-badge red">DELIVERED</span>
                </td>
                <td>Delivered</td>
              </tr>
              <tr>
                <td>INV-202-122</td>
                <td>Daisy Holmes</td>
                <td>25 Jan 2025</td>
                <td>£120.25</td>
                <td>£0.00</td>
                <td>
                  <span className="db-payments-badge blue">CONFIRMED</span>
                </td>
                <td>Opened</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="db-payments-pagination">
        <button className="db-payments-page active">1</button>
        <button className="db-payments-page">2</button>
        <button className="db-payments-page">3</button>
        <button className="db-payments-page">...</button>
      </div>
    </div>
  );
}
