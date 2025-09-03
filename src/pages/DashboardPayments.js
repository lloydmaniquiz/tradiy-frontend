import React from "react";
import "../styles/DashboardPayments.css";

export default function DashboardPayments() {
  return (
    <div className="db-payments-container">
      {/* Page Title + Business Selector */}
      <div className="db-payments-header">
        <h2 className="db-payments-title">Payments</h2>
        <select className="db-payments-business-select">
          <option>Business Name 1</option>
          <option>Business Name 2</option>
        </select>
      </div>

      {/* Stats */}
      <div className="db-payments-stats">
        <div className="db-payments-card">
          <h4>Issued Invoice</h4>
          <p className="db-payments-number">123</p>
        </div>
        <div className="db-payments-card">
          <h4>Paid</h4>
          <p className="db-payments-number">123</p>
        </div>
        <div className="db-payments-card">
          <h4>Awaiting Payment</h4>
          <p className="db-payments-number">123</p>
        </div>
        <div className="db-payments-card">
          <h4>Past Due</h4>
          <p className="db-payments-number">123</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="db-payments-toolbar">
        <input
          type="text"
          placeholder="Search"
          className="db-payments-search"
        />
        <button className="db-payments-add-btn">+ Add Invoice</button>
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
