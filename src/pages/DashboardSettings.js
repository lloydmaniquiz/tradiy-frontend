import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Settings.css";

const DashboardSettings = () => {
  return (
    <div className="settings-page">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-layout">
        {/* LEFT SIDEBAR */}
        <aside className="settings-sidebar">
          <div className="settings-section-label">Preferences</div>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="notifications"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Notifications
          </NavLink>

          <div className="settings-section-label">Business</div>
          <NavLink
            to="wallet"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Wallet
          </NavLink>

          <NavLink to="automations" className="settings-link disabled">
            Automations
          </NavLink>

          <NavLink
            to="work-team"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Work Team
          </NavLink>

          <div className="settings-section-label">Tools</div>
          <NavLink
            to="email"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Email
          </NavLink>
          <NavLink
            to="document"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Document
          </NavLink>
          <NavLink
            to="subscription"
            className={({ isActive }) =>
              "settings-link" + (isActive ? " active" : "")
            }
          >
            Subscription
          </NavLink>
        </aside>

        {/* RIGHT CONTENT */}
        <section className="settings-content">
          <Outlet /> {/* 👈 Profile / Notifications will render here */}
        </section>
      </div>
    </div>
  );
};

export default DashboardSettings;
