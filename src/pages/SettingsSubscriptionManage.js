import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const fakePayments = [
  {
    id: "SUBS-1234-5678",
    amount: "£50.00",
    date: "20 Feb 2025",
    status: "SUCCESS",
  },
  {
    id: "SUBS-9012-3456",
    amount: "£50.00",
    date: "20 Jan 2025",
    status: "SUCCESS",
  },
];

const SettingsSubscriptionManage = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState({
    accountName: "Jacob Butler",
    accountNumber: "1234 5432 6789 8765",
    sortCode: "12345",
    swiftCode: "AB1CDE23",
  });

  const handleChange = (field) => (e) => {
    setBilling((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Save subscription billing:", billing);
    // TODO: send to API
  };

  const handleCancelSub = () => {
    console.log("Cancel subscription");
    // TODO: open confirm modal / call API
  };

  return (
    <>
      {/* Subscription details top card */}
      <div className="settings-card">
        <div className="subscription-manage-header">
          <div className="subscription-manage-info">
            <h2 className="settings-card-title">Subscription Details</h2>
            <div className="subscription-plan">
              <span className="subscription-plan-name paid">PAID PLAN</span>
              <span className="subscription-plan-price">£50.00 / month</span>
              <p className="subscription-next-billing">
                Next billing date: 17 March 2025
              </p>
            </div>
          </div>

          <button
            type="button"
            className="cancel-sub-btn"
            onClick={handleCancelSub}
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* Billing information */}
      <div className="settings-card">
        <form onSubmit={handleSave}>
          <div className="settings-card-header">
            <h2 className="settings-card-title">
              Subscription Billing Information
            </h2>
            <p className="settings-card-subtitle">
              Provide the bank account we will use to charge your subscription.
            </p>
          </div>

          {/* Bank card (reusing the wallet look) */}
          <div className="billing-bank-card">
            <div className="billing-bank-card-left">
              <div className="billing-card-brand">VISA</div>
              <div className="billing-card-number">**** **** **** 8765</div>
            </div>
            <button type="button" className="billing-card-menu">
              ⋮
            </button>
          </div>

          <div className="settings-grid">
            <div className="settings-field">
              <label>Account Name</label>
              <input
                type="text"
                value={billing.accountName}
                onChange={handleChange("accountName")}
              />
            </div>

            <div className="settings-field">
              <label>Account Number</label>
              <input
                type="text"
                value={billing.accountNumber}
                onChange={handleChange("accountNumber")}
              />
            </div>

            <div className="settings-field">
              <label>Sort Code</label>
              <input
                type="text"
                value={billing.sortCode}
                onChange={handleChange("sortCode")}
              />
            </div>

            <div className="settings-field">
              <label>Swift Code</label>
              <input
                type="text"
                value={billing.swiftCode}
                onChange={handleChange("swiftCode")}
              />
            </div>
          </div>

          <div className="settings-actions settings-actions-left">
            <button className="primary-button" disabled>
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Payment history */}
      <div className="settings-card">
        <h2 className="settings-card-title">Payment History</h2>

        <div className="payment-table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Amount Paid</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {fakePayments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td>
                    <span className="payment-status success">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Simple pagination mock */}
        <div className="payment-pagination">
          <button className="pagination-btn" disabled>
            ‹
          </button>
          <span className="pagination-page">1</span>
          <button className="pagination-btn" disabled>
            ›
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsSubscriptionManage;
