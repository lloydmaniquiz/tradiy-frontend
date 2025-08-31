import React from "react";
import "../styles/DashboardEnquiries.css";

const enquiries = [
  {
    type: "Quote Visit",
    name: "Joel Fox",
    email: "joelfox@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Visit",
    name: "Georgia Mason",
    email: "georgiamason@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Estimate",
    name: "Scarlett Adams",
    email: "scarlett.adams@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Visit",
    name: "Henry Owen",
    email: "henryowen@email.com",
    date: "15 Jan",
  },
  {
    type: "Quote Estimate",
    name: "Oliver Scott",
    email: "oliverscott@email.com",
    date: "15 Jan",
  },
  {
    type: "Quote Estimate",
    name: "George Hunter",
    email: "georgehunter@email.com",
    date: "12 Jan",
  },
  {
    type: "Quote Visit",
    name: "Christopher Mason",
    email: "chrismason@email.com",
    date: "11 Jan",
  },
  {
    type: "Quote Estimate",
    name: "Faith Thompson",
    email: "faith.thompson@email.com",
    date: "10 Jan",
  },
  {
    type: "Quote Visit",
    name: "Laura Harris",
    email: "lauraharris@email.com",
    date: "10 Jan",
  },
  {
    type: "Quote Visit",
    name: "Finley Phillips",
    email: "finleyphillips@email.com",
    date: "07 Jan",
  },
];

export default function DashboardEnquiries() {
  return (
    <div className="enquiries-container">
      <div className="enquiries-card">
        {/* Header with Search & Filters */}
        <div className="enquiries-header">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="filter-button">⚙ Filters</button>
        </div>

        {/* Enquiries List */}
        <div className="enquiries-list">
          {enquiries.map((enquiry, idx) => (
            <div key={idx} className="enquiry-item">
              <div className="enquiry-left">
                {enquiry.unread && <span className="unread-dot"></span>}
                <span
                  className={`badge ${
                    enquiry.type === "Quote Visit" ? "badge-blue" : "badge-pink"
                  }`}
                >
                  {enquiry.type}
                </span>
                <div>
                  <p className="enquiry-name">{enquiry.name}</p>
                  <p className="enquiry-email">{enquiry.email}</p>
                </div>
              </div>
              <p className="enquiry-date">{enquiry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
