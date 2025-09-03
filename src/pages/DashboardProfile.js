import React from "react";
import "../styles/DashboardProfile.css"; // make sure this file exists

export default function DashboardProfile() {
  return (
    <div className="db-profile-container">
      {/* Top Section */}
      <div className="db-profile-header">
        <div className="db-profile-info">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="db-profile-avatar"
          />
          <div>
            <h2 className="db-profile-name">Jacob Butler</h2>
            <p className="db-profile-id">TRDY-2025-12345</p>
            <p className="db-profile-email">jacobbutler@email.com</p>
            <p className="db-profile-phone">01234 567890</p>
            <span className="db-profile-verified">✔ Verified</span>
          </div>
        </div>
        <div className="db-profile-feedback">
          <h4>Reputation & Feedback</h4>
          <div className="db-profile-toggle-item active">Tradly Hero</div>
          <div className="db-profile-toggle-item">Trader Rating</div>
          <div className="db-profile-toggle-item">Reviews</div>
        </div>
      </div>

      {/* Professional Profile */}
      <div className="db-profile-section">
        <div className="db-profile-section-header">
          <h3>Professional Profile</h3>
          <button className="db-profile-edit-btn">Edit</button>
        </div>
        <div className="db-profile-about">
          <h4>About Yourself</h4>
          <div className="db-profile-info-row">
            <span className="db-profile-label">Short Bio:</span>
            <span className="db-profile-value">
              Hi, I’m Edward, with 15 years of plumbing experience.
            </span>
          </div>
          <div className="db-profile-info-row">
            <span className="db-profile-label">Date of Birth:</span>
            <span className="db-profile-value">15 October 1986</span>
          </div>
        </div>
      </div>

      {/* Business Profile */}
      <div className="db-profile-section">
        <h3>Business Profile</h3>
        <div className="db-profile-business-list">
          <div className="db-profile-business-card">
            <img
              src="https://via.placeholder.com/60"
              alt="Business Logo"
              className="db-profile-business-logo"
            />
            <div>
              <h4>Fisher’s Plumbing Services Ltd</h4>
              <p>29d Harbour Place, Ardrossan, KA22 8BU</p>
              <p>SC123456</p>
            </div>
          </div>
          <div className="db-profile-business-card">
            <img
              src="https://via.placeholder.com/60"
              alt="Business Logo"
              className="db-profile-business-logo"
            />
            <div>
              <h4>Fisher’s Decorating Services Ltd</h4>
              <p>29d Harbour Place, Ardrossan, KA22 8BU</p>
              <p>SC123456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
