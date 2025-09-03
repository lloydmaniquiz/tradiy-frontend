import React from "react";
import "../styles/DashboardJobs.css";

export default function DashboardJobs() {
  const role = localStorage.getItem("role");

  if (role === "Homeowner") {
    // 🔹 Homeowner view (Card Layout)
    return (
      <div className="db-jobs-home-container">
        <div className="db-jobs-home-header">
          <h2>Jobs</h2>
          <button className="db-jobs-home-filter">⚙ Filters</button>
        </div>

        <div className="db-jobs-home-grid">
          {/* New */}
          <div className="db-jobs-home-card">
            <span className="db-jobs-home-status new">● New</span>
            <h4 className="db-jobs-home-id">JOB-4568</h4>
            <p className="db-jobs-home-address">
              59 Cambridge Street <br /> Glasgow G3 6QX
            </p>
            <p className="db-jobs-home-date">05 February 2025 — 10:00</p>
            <button className="db-jobs-home-action primary">Confirm Job</button>
          </div>

          {/* In Progress */}
          <div className="db-jobs-home-card">
            <span className="db-jobs-home-status progress">● In Progress</span>
            <h4 className="db-jobs-home-id">JOB-2441</h4>
            <p className="db-jobs-home-address">
              59 Cambridge Street <br /> Glasgow G3 6QX
            </p>
            <p className="db-jobs-home-date">26 January 2025 — 10:00</p>
            <button className="db-jobs-home-action outline">
              View Details
            </button>
          </div>

          {/* Completed */}
          <div className="db-jobs-home-card">
            <span className="db-jobs-home-status completed">● Completed</span>
            <h4 className="db-jobs-home-id">JOB-7856</h4>
            <p className="db-jobs-home-address">
              59 Cambridge Street <br /> Glasgow G3 6QX
            </p>
            <p className="db-jobs-home-date">09 January 2025 — 10:00</p>
            <button className="db-jobs-home-action outline">
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Tradesperson view (Table Layout)
  return (
    <div className="db-jobs-container">
      {/* Page Title + Business Selector */}
      <div className="db-jobs-header">
        <h2 className="db-jobs-title">Jobs</h2>
        <select className="db-jobs-business-select">
          <option>Business Name 1</option>
          <option>Business Name 2</option>
        </select>
      </div>

      {/* Stats */}
      <div className="db-jobs-stats">
        <div className="db-jobs-card">
          <h4>New</h4>
          <p className="db-jobs-number">12</p>
        </div>
        <div className="db-jobs-card">
          <h4>In Progress</h4>
          <p className="db-jobs-number">12</p>
        </div>
        <div className="db-jobs-card">
          <h4>Completed</h4>
          <p className="db-jobs-number">123</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="db-jobs-toolbar">
        <input type="text" placeholder="Search" className="db-jobs-search" />
        <button className="db-jobs-add-btn">+ Add Job</button>
      </div>

      {/* Tabs */}
      <div className="db-jobs-tabs">
        <button className="db-jobs-tab active">New</button>
        <button className="db-jobs-tab">In Progress</button>
        <button className="db-jobs-tab">Completed</button>
      </div>

      {/* Table */}
      <div className="db-jobs-table-wrapper">
        <table className="db-jobs-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Customer Name</th>
              <th>Service Type</th>
              <th>Staff Assigned</th>
              <th>Scheduled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>JOB-1234</td>
              <td>Freya Reynolds</td>
              <td>Lorem ipsum</td>
              <td>Jacob Butler</td>
              <td>29 Jan 2025</td>
              <td>...</td>
            </tr>
            <tr>
              <td>JOB-8682</td>
              <td>David Walsh</td>
              <td>Lorem ipsum</td>
              <td>Aaron Miller</td>
              <td>28 Jan 2025</td>
              <td>...</td>
            </tr>
            <tr>
              <td>JOB-8653</td>
              <td>Toby Reid</td>
              <td>Lorem ipsum</td>
              <td>Louis Robertson</td>
              <td>28 Jan 2025</td>
              <td>...</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="db-jobs-pagination">
        <button className="db-jobs-page active">1</button>
        <button className="db-jobs-page">2</button>
        <button className="db-jobs-page">3</button>
        <button className="db-jobs-page">...</button>
      </div>
    </div>
  );
}
