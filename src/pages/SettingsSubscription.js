// SettingsSubscription.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const SettingsSubscription = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-card">
      <div className="subscription-header">
        <div>
          <h2 className="settings-card-title">Subscription Details</h2>
          <div className="subscription-plan">
            <span className="subscription-plan-name">FREE PLAN</span>
            <span className="subscription-plan-price">£0.00 / month</span>
          </div>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={() => navigate("manage")}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};

export default SettingsSubscription;
