import React, { useState } from "react";
import "../styles/DashboardJobs.css";
import { FaChevronDown } from "react-icons/fa";
import TotalCustomersIcon from "../images/total-customers.png";
import NewCustomersIcon from "../images/new-customers.png";
import LeadsIcon from "../images/leads.png";

export default function DashboardJobs() {
  const role = localStorage.getItem("role");
  const [activeTab, setActiveTab] = useState("New");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Dummy datasets
  const newJobs = [
    {
      id: "JOB-1234",
      customer: "Freya Reynolds",
      service: "Plumbing",
      staff: "Jacob Butler",
      date: "29 Jan 2025 - 10:00",
      status: "New",
    },
    {
      id: "JOB-8682",
      customer: "David Walsh",
      service: "Electrical",
      staff: "Aaron Miller",
      date: "28 Jan 2025 - 14:00",
      status: "New",
    },
  ];

  const progressJobs = [
    {
      id: "JOB-8653",
      customer: "Toby Reid",
      service: "Carpentry",
      staff: "Louis Robertson",
      date: "28 Jan 2025 - 09:00",
      status: "In Progress",
    },
  ];

  const completedJobs = [
    {
      id: "JOB-7777",
      customer: "Charlotte Griffiths",
      service: "Painting",
      staff: "Sophie Ellis",
      date: "25 Jan 2025 - 11:00",
      status: "Completed",
    },
  ];

  // 🔹 Pick correct dataset
  let data = [];
  if (activeTab === "New") data = newJobs;
  if (activeTab === "In Progress") data = progressJobs;
  if (activeTab === "Completed") data = completedJobs;

  // 🔹 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ✅ Homeowner view (cards)
  if (role === "Homeowner") {
    return (
      <div className="db-jobs-home-container">
        <div className="db-jobs-home-header">
          <h2>Jobs</h2>
          <button className="db-jobs-home-filter">⚙ Filters</button>
        </div>

        <div className="db-jobs-home-grid">
          <div className="db-jobs-home-card">
            <span className="db-jobs-home-status new">● New</span>
            <h4 className="db-jobs-home-id">JOB-4568</h4>
            <p className="db-jobs-home-address">
              59 Cambridge Street <br /> Glasgow G3 6QX
            </p>
            <p className="db-jobs-home-date">05 February 2025 — 10:00</p>
            <button className="db-jobs-home-action primary">Confirm Job</button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Tradesperson view (tables with tabs + pagination)
  return (
    <div className="db-jobs-container">
      {/* Header */}
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Jobs</h1>

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
          <div className="db-quotes-icon">
            <img src={TotalCustomersIcon} alt="Total Customers" />
            <h4>Total Customers</h4>
          </div>
          <p className="db-quotes-number">12</p>
        </div>
        <div className="db-quotes-item">
          <div className="db-quotes-icon">
            <img src={NewCustomersIcon} alt="New Customers" />
            <h4>New Customers</h4>
          </div>
          <p className="db-quotes-number">12</p>
        </div>
        <div className="db-quotes-item">
          <div className="db-quotes-icon">
            <img src={LeadsIcon} alt="Leads" />
            <h4>Leads</h4>
          </div>
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
          <button className="db-quotes-add-btn">+ Add Job</button>
        </div>

        {/* Tabs */}
        <div className="db-quotes-tabs">
          {["New", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`db-jobs-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tables */}
        <div className="db-jobs-table-wrapper">
          <table className="db-jobs-table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Customer Name</th>
                <th>Service Type</th>
                <th>Staff Assigned</th>
                <th>Scheduled</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.customer}</td>
                  <td>{job.service}</td>
                  <td>{job.staff}</td>
                  <td>{job.date}</td>
                  <td>
                    <span
                      className={`db-jobs-status ${job.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      ● {job.status}
                    </span>
                  </td>
                  <td>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="db-quotes-pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`db-quotes-page ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
