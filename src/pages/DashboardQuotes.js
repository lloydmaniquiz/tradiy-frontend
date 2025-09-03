import React, { useState } from "react";
import "../styles/DashboardQuotes.css";
import { FaChevronDown } from "react-icons/fa";
import AcceptedIcon from "../images/accepted.png";
import PendingIcon from "../images/pending.png";
import ConvertedIcon from "../images/converted.png";

export default function DashboardQuotes() {
  const role = localStorage.getItem("role"); // check role from localStorage
  const [activeTab, setActiveTab] = useState("Pending"); // default tab
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // dummy datasets
  const pendingQuotes = [
    {
      id: "QT-ABCD-1234",
      customer: "Freya Reynolds",
      type: "Quote Visit",
      date: "29 Jan 2025",
      status: "Pending",
    },
    {
      id: "QT-EFGH-5678",
      customer: "David Walsh",
      type: "Quote Estimate",
      date: "28 Jan 2025",
      status: "Pending",
    },
  ];

  const acceptedQuotes = [
    {
      id: "QT-IJKL-9012",
      customer: "Toby Reid",
      type: "Quote Visit",
      date: "28 Jan 2025",
    },
    {
      id: "QT-MNOP-3456",
      customer: "Cameron Turner",
      type: "Quote Visit",
      date: "27 Jan 2025",
    },
  ];

  const convertedQuotes = [
    {
      id: "QT-QRST-7890",
      customer: "Charlotte Griffiths",
      type: "Quote Visit",
      date: "26 Jan 2025",
    },
  ];

  const declinedQuotes = [
    { id: "QT-UVWX-1234", customer: "Daisy Holmes", type: "Quote Visit" },
    { id: "QT-YZAB-5678", customer: "Michael Carter", type: "Quote Estimate" },
  ];

  // pick correct dataset
  let data = [];
  if (activeTab === "Pending") data = pendingQuotes;
  if (activeTab === "Accepted") data = acceptedQuotes;
  if (activeTab === "Converted") data = convertedQuotes;
  if (activeTab === "Declined") data = declinedQuotes;

  // pagination slice
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // reset page when switching tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ✅ Tradesperson view (table layout)
  if (role === "Trader") {
    return (
      <div className="db-quotes-container">
        {/* Stats Summary */}
        <div className="db-quotes-header">
          <h1 className="db-quotes-header-title">Quotes</h1>

          <div className="db-quotesheader-select-wrapper">
            <select className="db-quotesheader-select">
              <option>Business Name 1</option>
              <option>Business Name 2</option>
              <option>Business Name 3</option>
            </select>
            <FaChevronDown className="db-quotesheader-icon" />
          </div>
        </div>
        <div className="db-quotes-stats">
          <div className="db-quotes-item">
            <div className="db-quotes-icon">
              <img src={AcceptedIcon} alt="Accepted" />
              <h4>Accepted</h4>
            </div>
            <p className="db-quotes-number">12</p>
          </div>
          <div className="db-quotes-item">
            <div className="db-quotes-icon">
              <img src={PendingIcon} alt="Pending" />
              <h4>Pending</h4>
            </div>
            <p className="db-quotes-number">12</p>
          </div>
          <div className="db-quotes-item">
            <div className="db-quotes-icon">
              <img src={ConvertedIcon} alt="Converted" />
              <h4>Converted</h4>
            </div>
            <p className="db-quotes-number">123</p>
          </div>
        </div>

        <div className="db-quotes-main-container">
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
            {["Pending", "Accepted", "Converted", "Declined"].map((tab) => (
              <button
                key={tab}
                className={`db-quotes-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="db-quotes-table-wrapper">
            {activeTab === "Pending" && (
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
                  {currentItems.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.customer}</td>
                      <td>{q.type}</td>
                      <td>{q.date}</td>
                      <td>
                        <span
                          className={`db-quotes-status ${q.status.toLowerCase()}`}
                        >
                          ● {q.status}
                        </span>
                      </td>
                      <td>...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "Accepted" && (
              <table className="db-quotes-table">
                <thead>
                  <tr>
                    <th>Quote ID</th>
                    <th>Customer Name</th>
                    <th>Request Type</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.customer}</td>
                      <td>{q.type}</td>
                      <td>{q.date}</td>
                      <td>...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "Converted" && (
              <table className="db-quotes-table">
                <thead>
                  <tr>
                    <th>Quote ID</th>
                    <th>Customer Name</th>
                    <th>Request Type</th>
                    <th>Date Converted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.customer}</td>
                      <td>{q.type}</td>
                      <td>{q.date}</td>
                      <td>...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === "Declined" && (
              <table className="db-quotes-table">
                <thead>
                  <tr>
                    <th>Quote ID</th>
                    <th>Customer Name</th>
                    <th>Request Type</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((q) => (
                    <tr key={q.id}>
                      <td>{q.id}</td>
                      <td>{q.customer}</td>
                      <td>{q.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
