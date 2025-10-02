import React, { useState } from "react";
import "../styles/DashboardClients.css";
import { FaChevronDown } from "react-icons/fa";
import TotalCustomersIcon from "../images/total-customers.png";
import NewCustomersIcon from "../images/new-customers.png";
import LeadsIcon from "../images/leads.png";

export default function DashboardClients() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    quotes: 0,
    jobs: 0,
    payments: 0,
    status: "QUOTE SENT",
    reviews: "⭐⭐⭐⭐⭐",
  });

  const [customers, setCustomers] = useState([
    {
      name: "Freya Reynolds",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "QUOTE SENT",
      reviews: "⭐⭐⭐⭐⭐",
    },
    {
      name: "David Walsh",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "QUOTE ACCEPTED",
      reviews: "⭐⭐⭐⭐⭐",
    },
    {
      name: "Toby Reid",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "JOB SCHEDULED",
      reviews: "⭐⭐⭐⭐☆",
    },
  ]);

  const handleSave = (e) => {
    e.preventDefault();
    setCustomers((prev) => [newCustomer, ...prev]);
    setShowAddForm(false);
    setNewCustomer({
      name: "",
      quotes: 0,
      jobs: 0,
      payments: 0,
      status: "QUOTE SENT",
      reviews: "⭐⭐⭐⭐⭐",
    });
  };

  return (
    <div className="db-clients-container">
      {/* Page Title + Business Selector */}
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Customers</h1>

        <div className="db-quotesheader-select-wrapper">
          <select className="db-quotesheader-select">
            <option>Business Name 1</option>
            <option>Business Name 2</option>
            <option>Business Name 3</option>
          </select>
          <FaChevronDown className="db-quotesheader-icon" />
        </div>
      </div>

      {!showAddForm && (
        <div className="db-quotes-stats">
          <div className="db-quotes-item">
            <div className="db-quotes-icon">
              <img src={TotalCustomersIcon} alt="Total Customers" />
              <h4>Total Customers</h4>
            </div>
            <p className="db-quotes-number">{customers.length}</p>
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
      )}

      <div className="db-quotes-main-container">
        {/* Toolbar */}
        <div className="db-quotes-toolbar">
          <input
            type="text"
            placeholder="Search"
            className="db-quotes-search"
          />
          <button
            className="db-quotes-add-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add Customer
          </button>
        </div>

        {showAddForm ? (
          // --- FORM VIEW ---
          <div className="db-clients-add-form">
            <h3>Create New Customer</h3>
            <form onSubmit={handleSave}>
              <input
                type="text"
                placeholder="Customer Name"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Quotes"
                value={newCustomer.quotes}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, quotes: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Jobs"
                value={newCustomer.jobs}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, jobs: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Payments"
                value={newCustomer.payments}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, payments: e.target.value })
                }
              />
              <select
                value={newCustomer.status}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, status: e.target.value })
                }
              >
                <option>QUOTE SENT</option>
                <option>QUOTE ACCEPTED</option>
                <option>JOB SCHEDULED</option>
              </select>
              <div className="db-quotes-actions">
                <button type="submit" className="primary">
                  Save
                </button>
                <button
                  type="button"
                  className="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          // --- TABLE VIEW ---
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
                {customers.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.quotes}</td>
                    <td>{c.jobs}</td>
                    <td>{c.payments}</td>
                    <td>
                      <span
                        className={`db-clients-badge ${
                          c.status.includes("SENT")
                            ? "orange"
                            : c.status.includes("ACCEPTED")
                            ? "green"
                            : "blue"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.reviews}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {!showAddForm && (
        <div className="db-clients-pagination">
          <button className="db-clients-page active">1</button>
          <button className="db-clients-page">2</button>
          <button className="db-clients-page">3</button>
          <button className="db-clients-page">...</button>
        </div>
      )}
    </div>
  );
}
