import React from "react";

const SettingsProfile = () => {
  return (
    <>
      <div className="settings-card">
        <h2 className="settings-card-title">Basic Information</h2>

        <div className="settings-grid">
          <div className="settings-field">
            <label>First Name</label>
            <input type="text" defaultValue="Jacob" />
          </div>
          <div className="settings-field">
            <label>Last Name</label>
            <input type="text" defaultValue="Butler" />
          </div>
          <div className="settings-field">
            <label>Email</label>
            <input type="email" defaultValue="jacob.butler@email.com" />
          </div>
          <div className="settings-field">
            <label>Phone Number</label>
            <input type="text" defaultValue="01234 567890" />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2 className="settings-card-title">Account Security</h2>

        <div className="settings-field">
          <label>Password</label>
          <button className="link-button">Change Password</button>
          <p className="settings-muted">Last changed 07 February 2025</p>
        </div>

        <div className="settings-field">
          <label>Recovery Email</label>
          <input type="email" defaultValue="jacob.butler123@gmail.com" />
        </div>

        <div className="settings-actions">
          <button className="danger-button">Delete my account</button>
          <button className="primary-button" disabled>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsProfile;
