import React from "react";
import "../styles/DashboardQuotes.css";

export default function DashboardQuotes() {
  const role = localStorage.getItem("role"); // check role from localStorage

  // ✅ Tradesperson view (table layout)
  if (role === "Tradesperson") {
    return (
      <div className="db-quotes-container">
        {/* Stats Summary */}
        <div className="db-quotes-stats">
          <div className="db-quotes-card">
            <h4>Accepted</h4>
            <p className="db-quotes-number">12</p>
          </div>
          <div className="db-quotes-card">
            <h4>Pending</h4>
            <p className="db-quotes-number">12</p>
          </div>
          <div className="db-quotes-card">
            <h4>Converted</h4>
            <p className="db-quotes-number">123</p>
          </div>
        </div>

        {/* Search + Add Button */}
        <div className="db-quotes-toolbar">
          <input
            type="text"
            placeholder="Search"
            className="db-quotes-search"
          />
          <button className="db-quotes-add-btn">+ Add Quote</button>
        </div>

        {/* Tabs */}
        <div className="db-quotes-tabs">
          <button className="db-quotes-tab active">Pending</button>
          <button className="db-quotes-tab">Accepted</button>
          <button className="db-quotes-tab">Converted</button>
          <button className="db-quotes-tab">Declined</button>
        </div>

        {/* Table */}
        <div className="db-quotes-table-wrapper">
          <table className="db-quotes-table">
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Customer Name</th>
                <th>Request Type</th>
                <th>Date Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>QT-ABCD-1234</td>
                <td>Freya Reynolds</td>
                <td>Quote Visit</td>
                <td>29 Jan 2025</td>
                <td>
                  <span className="db-quotes-status pending">● Pending</span>
                </td>
                <td>...</td>
              </tr>
              <tr>
                <td>QT-EFGH-5678</td>
                <td>David Walsh</td>
                <td>Quote Estimate</td>
                <td>28 Jan 2025</td>
                <td>
                  <span className="db-quotes-status pending">● Pending</span>
                </td>
                <td>...</td>
              </tr>
              <tr>
                <td>QT-MNOP-3456</td>
                <td>Cameron Turner</td>
                <td>Quote Visit</td>
                <td>27 Jan 2025</td>
                <td>
                  <span className="db-quotes-status open">● Open</span>
                </td>
                <td>...</td>
              </tr>
              <tr>
                <td>QT-QRST-7890</td>
                <td>Charlotte Griffiths</td>
                <td>Quote Visit</td>
                <td>26 Jan 2025</td>
                <td>
                  <span className="db-quotes-status expired">● Expired</span>
                </td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="db-quotes-pagination">
          <button className="db-quotes-page active">1</button>
          <button className="db-quotes-page">2</button>
          <button className="db-quotes-page">3</button>
          <button className="db-quotes-page">...</button>
        </div>
      </div>
    );
  }

  // ✅ Homeowner view (cards layout)
  return (
    <div className="db-quotes-container">
      {/* Header */}
      <div className="db-quotes-header">
        <h2>Quotes</h2>
        <button className="db-quotes-request-btn">+ Request Quote</button>
      </div>

      {/* Filters */}
      <div className="db-quotes-filters">
        <select>
          <option>Request Type</option>
          <option>Quote Visit</option>
          <option>Quote Estimate</option>
        </select>
        <select>
          <option>Date Created</option>
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
        <select>
          <option>Status</option>
          <option>Pending</option>
          <option>Accepted</option>
          <option>Converted</option>
          <option>Declined</option>
        </select>
      </div>

      {/* Cards */}
      <div className="db-quotes-grid">
        <div className="db-quotes-card">
          <span className="db-quotes-status pending">● Pending</span>
          <h4 className="db-quotes-id">QT-GHIJ-3456</h4>
          <p className="db-quotes-address">
            59 Cambridge Street
            <br />
            Glasgow G3 6QX
          </p>
          <p className="db-quotes-date">05 February 2025</p>
          <p className="db-quotes-amount">
            Total Amount
            <br />
            <strong>£100.00</strong>
          </p>
          <button className="db-quotes-action primary">Accept Quote</button>
        </div>

        <div className="db-quotes-card">
          <span className="db-quotes-status accepted">● Accepted</span>
          <h4 className="db-quotes-id">QT-CDEF-3445</h4>
          <p className="db-quotes-address">
            59 Cambridge Street
            <br />
            Glasgow G3 6QX
          </p>
          <p className="db-quotes-date">26 January 2025</p>
          <p className="db-quotes-amount">
            Total Amount
            <br />
            <strong>£100.00</strong>
          </p>
          <button className="db-quotes-action outline">View Details</button>
        </div>

        <div className="db-quotes-card">
          <span className="db-quotes-status converted">● Converted</span>
          <h4 className="db-quotes-id">QT-JKLM-7890</h4>
          <p className="db-quotes-address">
            59 Cambridge Street
            <br />
            Glasgow G3 6QX
          </p>
          <p className="db-quotes-date">09 January 2025</p>
          <p className="db-quotes-amount">
            Total Amount
            <br />
            <strong>£100.00</strong>
          </p>
          <button className="db-quotes-action primary">View Job</button>
        </div>
      </div>
    </div>
  );
}
