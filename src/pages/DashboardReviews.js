import React from "react";
import "../styles/DashboardReviews.css";
import { FaChevronDown } from "react-icons/fa";

export default function DashboardReviews() {
  const role = localStorage.getItem("role");

  if (role === "Homeowner") {
    // 🔹 Homeowner view (Card Layout)
    return (
      <div className="db-reviews-home-container">
        <div className="db-reviews-home-header">
          <h2>Reviews</h2>
        </div>

        {/* Tabs */}
        <div className="db-reviews-home-tabs">
          <button className="db-reviews-home-tab active">
            Unreviewed <span className="db-reviews-home-badge">2</span>
          </button>
          <button className="db-reviews-home-tab">Reviewed</button>
        </div>

        {/* Review Cards */}
        <div className="db-reviews-home-list">
          <div className="db-reviews-home-card">
            <div>
              <h4>Service Name</h4>
              <p>Ryan Johnson</p>
              <p className="db-reviews-home-date">20 February 2025</p>
              <span className="db-reviews-home-muted">No ratings yet.</span>
            </div>
            <button className="db-reviews-home-btn">Write a review</button>
          </div>

          <div className="db-reviews-home-card">
            <div>
              <h4>Service Name</h4>
              <p>Harvey Knight</p>
              <p className="db-reviews-home-date">21 January 2025</p>
              <span className="db-reviews-home-muted">No ratings yet.</span>
            </div>
            <button className="db-reviews-home-btn">Write a review</button>
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Tradesperson view (Table Layout)
  return (
    <div className="db-reviews-container">
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

      {/* Stats */}
      <div className="db-quotes-stats">
        <div className="db-quotes-item">
          <h4>Average Stars</h4>
          <p className="db-quotes-number">4.6</p>
        </div>
        <div className="db-quotes-item">
          <h4>Total Reviews Received</h4>
          <p className="db-quotes-number">123</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="db-reviews-tabs">
        <button className="db-reviews-tab active">
          Unreviewed <span className="db-reviews-badge">6</span>
        </button>
        <button className="db-reviews-tab">Reviewed</button>
      </div>

      {/* Review List */}
      <div className="db-reviews-list">
        {[
          {
            name: "Frederick Roberts",
            date: "20 January 2025",
            service: "Service A",
          },
          { name: "Maya Rose", date: "20 January 2025", service: "Service A" },
          {
            name: "Olivia Reynolds",
            date: "20 January 2025",
            service: "Service A",
          },
        ].map((review, idx) => (
          <div className="db-reviews-item" key={idx}>
            <div className="db-reviews-info">
              <h4>{review.name}</h4>
              <p>
                {review.date} | {review.service}
              </p>
              <span className="db-reviews-muted">No ratings yet.</span>
            </div>
            <button className="db-reviews-btn">Write a review</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="db-reviews-pagination">
        <button className="db-reviews-page">&lt;</button>
        <button className="db-reviews-page active">1</button>
        <button className="db-reviews-page">&gt;</button>
      </div>
    </div>
  );
}
