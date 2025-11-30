// src/pages/DashboardClients.jsx
import React, { useState, useEffect } from "react";
import "../styles/DashboardClients.css";
import { FaChevronDown } from "react-icons/fa";
import TotalCustomersIcon from "../images/total-customers.png";
import NewCustomersIcon from "../images/new-customers.png";
import LeadsIcon from "../images/leads.png";
import CustomerDetails from "../components/CustomerDetails"; // <- new component

export default function DashboardClients() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    region: "",
    postcode: "",
    billingSame: false,
  });

  const [customers, setCustomers] = useState([
    {
      name: "Freya Reynolds",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "QUOTE SENT",
      reviews: 5,
      email: "freya.reynolds@email.com",
      address: "18C Burnbank Road, Ayr KA7 3QN",
    },
    {
      name: "David Walsh",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "QUOTE ACCEPTED",
      reviews: 5,
      email: "david.walsh@email.com",
      address: "12 Example Street",
    },
    {
      name: "Toby Reid",
      quotes: 1,
      jobs: 1,
      payments: 1,
      status: "JOB SCHEDULED",
      reviews: 4,
      email: "toby.reid@email.com",
      address: "34 Another Rd",
    },
  ]);

  // optional: persist so details survive page reloads (same tip as DashboardJobs)
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleSave = (e) => {
    e.preventDefault();
    setCustomers((prev) => [
      {
        name: newCustomer.name,
        quotes: 0,
        jobs: 0,
        payments: 0,
        status: "QUOTE SENT",
        reviews: 5,
        email: newCustomer.email,
        address: newCustomer.address,
      },
      ...prev,
    ]);
    setShowAddForm(false);
    setNewCustomer({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      region: "",
      postcode: "",
      billingSame: false,
    });
  };

  // If a customer is selected, render the details view (same pattern as DashboardJobs)
  if (selectedCustomer) {
    return (
      <CustomerDetails
        customer={selectedCustomer}
        onBack={() => setSelectedCustomer(null)}
        // optional: pass a callback to update the customer in the list
        onUpdate={(updated) =>
          setCustomers((prev) =>
            prev.map((c) => (c.name === selectedCustomer.name ? updated : c))
          )
        }
      />
    );
  }

  return (
    <div className="db-clients-container">
      {/* Header */}
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

      {/* Statistics */}
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
        {!showAddForm && (
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
        )}

        {/* Add Customer Form */}
        {showAddForm ? (
          <div className="add-customer-form">
            <h2>Add New Customer</h2>

            <form onSubmit={handleSave} className="add-customer-card">
              <div className="form-columns">
                {/* Left Column */}
                <div className="form-section">
                  <div className="form-section-header active">
                    Customer Details
                  </div>

                  <label>Customer Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Edward Fisher"
                    value={newCustomer.name}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, name: e.target.value })
                    }
                    required
                  />

                  <label>Phone Number</label>
                  <input
                    type="text"
                    placeholder="01234 567890"
                    value={newCustomer.phone}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, phone: e.target.value })
                    }
                  />

                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g., edwardfisher@email.com"
                    value={newCustomer.email}
                    onChange={(e) =>
                      setNewCustomer({ ...newCustomer, email: e.target.value })
                    }
                  />
                </div>

                {/* Right Column */}
                <div className="form-section">
                  <div className="form-section-header active">
                    Property Details
                  </div>

                  <label>Address</label>
                  <input
                    type="text"
                    placeholder=""
                    value={newCustomer.address}
                    onChange={(e) =>
                      setNewCustomer({
                        ...newCustomer,
                        address: e.target.value,
                      })
                    }
                  />

                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="City"
                      value={newCustomer.city}
                      onChange={(e) =>
                        setNewCustomer({ ...newCustomer, city: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newCustomer.state}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Region"
                      value={newCustomer.region}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          region: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Postcode"
                      value={newCustomer.postcode}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          postcode: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="checkbox-row">
                    <input
                      type="checkbox"
                      checked={newCustomer.billingSame}
                      onChange={(e) =>
                        setNewCustomer({
                          ...newCustomer,
                          billingSame: e.target.checked,
                        })
                      }
                    />
                    <label>
                      Billing address is the same as property address
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Table View
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
                  <tr
                    key={i}
                    className="clickable-row"
                    onClick={() => setSelectedCustomer(c)}
                  >
                    <td>{c.name}</td>
                    <td>{c.quotes}</td>
                    <td>{c.jobs}</td>
                    <td>{c.payments}</td>
                    <td>
                      <span
                        className={`db-clients-badge ${
                          c.status.includes("QUOTE SENT")
                            ? "orange"
                            : c.status.includes("QUOTE ACCEPTED")
                            ? "teal"
                            : c.status.includes("JOB SCHEDULED")
                            ? "blue"
                            : c.status.includes("JOB COMPLETED")
                            ? "green"
                            : c.status.includes("INVOICE SENT")
                            ? "pink"
                            : c.status.includes("PAYMENT RECEIVED")
                            ? "teal"
                            : c.status.includes("JOB CANCELLED")
                            ? "red"
                            : "blue"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <div className="stars">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span
                            key={si}
                            className={`star ${si < c.reviews ? "" : "empty"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
