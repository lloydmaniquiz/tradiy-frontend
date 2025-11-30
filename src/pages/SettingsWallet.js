import React from "react";

const SettingsWallet = () => {
  return (
    <>
      {/* Billing Information */}
      <div className="settings-card">
        <div className="settings-card-header">
          <h2 className="settings-card-title">Billing Information</h2>
          <p className="settings-card-subtitle">
            Please provide the bank account details where you would like to
            receive payments.
          </p>
        </div>

        {/* Bank card */}
        <div className="billing-bank-card">
          <div className="billing-bank-card-left">
            <div className="billing-card-brand">VISA</div>
            <div className="billing-card-number">**** **** **** 8765</div>
          </div>
          <button className="billing-card-menu">⋮</button>
        </div>

        {/* Fields */}
        <div className="settings-grid">
          <div className="settings-field">
            <label>Account Name</label>
            <input type="text" defaultValue="Jacob Butler" />
          </div>

          <div className="settings-field">
            <label>Account Number</label>
            <input type="text" defaultValue="1234 5432 6789 8765" />
          </div>

          <div className="settings-field">
            <label>Sort Code</label>
            <input type="text" defaultValue="12345" />
          </div>

          <div className="settings-field">
            <label>Swift Code</label>
            <input type="text" defaultValue="AB1CDE23" />
          </div>

          <div className="settings-field">
            <label>Invoice Payment Due</label>
            <select defaultValue="net30">
              <option value="net7">Net 7</option>
              <option value="net14">Net 14</option>
              <option value="net30">Net 30</option>
              <option value="net60">Net 60</option>
            </select>
          </div>
        </div>
      </div>

      {/* VAT Settings */}
      <div className="settings-card">
        <h2 className="settings-card-title">VAT Settings</h2>

        <div className="settings-grid">
          <div className="settings-field">
            <label>Tax ID Name</label>
            <input type="text" />
          </div>

          <div className="settings-field">
            <label>Tax ID Number</label>
            <input type="text" />
          </div>

          <div className="settings-field">
            <label>Tax Name</label>
            <input type="text" defaultValue="VAT" />
          </div>

          <div className="settings-field vat-rate-field">
            <label>Tax Rate</label>
            <div className="vat-rate-wrapper">
              <input type="number" defaultValue={20} />
              <span className="vat-rate-suffix">%</span>
            </div>
          </div>
        </div>

        <div className="settings-actions settings-actions-right">
          <button className="primary-button" disabled>
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsWallet;
