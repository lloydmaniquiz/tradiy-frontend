import React from "react";
import "../styles/DashboardClients.css";

export default function DashboardClients() {
  return (
    <div className="db-clients-container">
      {/* Page Title + Business Selector */}
      <div className="db-clients-header">
        <h2 className="db-clients-title">Customers</h2>
        <select className="db-clients-business-select">
          <option>Business Name 1</option>
          <option>Business Name 2</option>
        </select>
      </div>

      {/* Stats */}
      <div className="db-clients-stats">
        <div className="db-clients-card">
          <h4>Total Customers</h4>
          <p className="db-clients-number">1,234</p>
        </div>
        <div className="db-clients-card">
          <h4>
            New Customers <span className="db-clients-sub">Past 30 days</span>
          </h4>
          <p className="db-clients-number">12</p>
        </div>
        <div className="db-clients-card">
          <h4>Leads</h4>
          <p className="db-clients-number">123</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="db-clients-toolbar">
        <input type="text" placeholder="Search" className="db-clients-search" />
        <button className="db-clients-add-btn">+ Add Customer</button>
      </div>

      {/* Table */}
      <div className="db-clients-table-wrapper">
        <table className="db-clients-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Quotes</th>
              <th>Jobs</th>
              <th>Payments</th>
              <th>Job Status</th>
              <th>Reviews</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Freya Reynolds</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>
                <span className="db-clients-badge orange">QUOTE SENT</span>
              </td>
              <td>⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td>David Walsh</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>
                <span className="db-clients-badge green">QUOTE ACCEPTED</span>
              </td>
              <td>⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td>Toby Reid</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>
                <span className="db-clients-badge blue">JOB SCHEDULED</span>
              </td>
              <td>⭐⭐⭐⭐☆</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="db-clients-pagination">
        <button className="db-clients-page active">1</button>
        <button className="db-clients-page">2</button>
        <button className="db-clients-page">3</button>
        <button className="db-clients-page">...</button>
      </div>
    </div>
  );
}
