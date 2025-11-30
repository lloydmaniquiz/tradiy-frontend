import React, { useState } from "react";

const permissionOptions = [
  "Calendar",
  "Enquiries",
  "Profile Workbench",
  "Business Workbench",
  "Quotes",
  "Jobs",
  "Customers",
  "Payments",
  "Reviews",
  "Reports",
];

const SettingsWorkTeam = () => {
  const [mode, setMode] = useState("list"); // "list" | "add"

  const [form, setForm] = useState({
    name: "",
    email: "",
    standardPayRate: "£0.00",
    hourlyRate: "£0.00",
    taxRate: "",
    permissions: [],
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const togglePermission = (perm) => {
    setForm((prev) => {
      const exists = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit team member:", form);
    // TODO: send to API here
  };

  const handleCancel = () => {
    setMode("list");
  };

  /* ----------------- RENDER ----------------- */

  if (mode === "add") {
    return (
      <div className="settings-card">
        <form onSubmit={handleSubmit}>
          <div className="add-member-title-row">
            <button
              type="button"
              className="back-icon-btn"
              onClick={() => setMode("list")}
            >
              ←
            </button>
            <h2 className="settings-card-title">Add a Team Member</h2>
          </div>

          <div className="settings-grid">
            <div className="settings-field">
              <label>
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange("name")}
              />
            </div>

            <div className="settings-field">
              <label>
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
              />
            </div>

            <div className="settings-field">
              <label>Standard Pay Rate</label>
              <input
                type="text"
                value={form.standardPayRate}
                onChange={handleChange("standardPayRate")}
              />
            </div>

            <div className="settings-field">
              <label>Hourly Rate</label>
              <input
                type="text"
                value={form.hourlyRate}
                onChange={handleChange("hourlyRate")}
              />
            </div>

            <div className="settings-field">
              <label>Tax Rate</label>
              <select value={form.taxRate} onChange={handleChange("taxRate")}>
                <option value="">Select Tax Rate</option>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="20">20%</option>
              </select>
            </div>
          </div>

          <div className="settings-field">
            <label>
              Permissions <span className="required">*</span>
            </label>
            <div className="permissions-list">
              {permissionOptions.map((perm) => (
                <label key={perm} className="permission-item">
                  <input
                    type="checkbox"
                    checked={form.permissions.includes(perm)}
                    onChange={() => togglePermission(perm)}
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="add-member-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ------------ LIST VIEW (original "Your Team") ------------

  return (
    <div className="settings-card">
      <div className="settings-card-header">
        <h2 className="settings-card-title">Your Team</h2>
        <p className="settings-card-subtitle">
          Invite and manage team members who need access to your business at
          Tradiy Trader Hub.
        </p>
      </div>

      <div className="team-header-row">
        <div className="team-tabs">
          <button className="team-tab active">Active Users</button>
          <button className="team-tab team-count">2 of 2</button>
        </div>
        <button
          className="team-add-btn"
          type="button"
          onClick={() => setMode("add")}
        >
          Add User
        </button>
      </div>

      <div className="team-table-wrapper">
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role Name</th>
              <th>Login Activity</th>
              <th className="team-actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="team-name-link">Jacob Butler</td>
              <td>jacob.butler@email.com</td>
              <td>Account Owner</td>
              <td>29 Jan 2025</td>
              <td className="team-actions-col" />
            </tr>
            <tr>
              <td className="team-name-link">Nathan Scott</td>
              <td>nathanscott@email.com</td>
              <td>Assistant</td>
              <td>28 Jan 2025</td>
              <td className="team-actions-col">
                <button className="team-remove-btn">🗑</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingsWorkTeam;
