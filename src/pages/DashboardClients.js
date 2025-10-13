import React from "react";
import "../styles/DashboardClients.css";
import { FaChevronDown } from "react-icons/fa";
import TotalCustomersIcon from "../images/total-customers.png";
import NewCustomersIcon from "../images/new-customers.png";
import LeadsIcon from "../images/leads.png";

export default function DashboardClients() {
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

      {/* Stats */}
      <div className="db-quotes-stats">
        <div className="db-quotes-item">
          <div className="db-quotes-icon">
            <img src={TotalCustomersIcon} alt="Total Customers" />
            <h4>Total Customers</h4>
          </div>
          <p className="db-quotes-number">1,234</p>
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
          <button className="db-quotes-add-btn">+ Add Customer</button>
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
