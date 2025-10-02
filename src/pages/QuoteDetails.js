// src/components/QuoteDetails.jsx
import React, { useState } from "react";
import "../styles/QuoteDetails.css";

export default function QuoteDetails({ quote, onBack }) {
  const [currentQuote, setCurrentQuote] = useState(quote);
  const [loading, setLoading] = useState(false);

  if (!currentQuote) return <p>No Quote Selected</p>;

  const handleAcceptQuote = async () => {
    if (currentQuote.status === "Converted") return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/enquiry/${currentQuote.quoteNumber}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Converted" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setCurrentQuote({ ...currentQuote, status: data.status });
      alert("Quote status updated to Converted!");
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update quote status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-details-wrapper">
      <div className="quote-header">
        <span
          className={`status-badge ${
            currentQuote.status?.toLowerCase() || "pending"
          }`}
        >
          {currentQuote.status?.toUpperCase() || "PENDING"}
        </span>

        <div className="quote-header-actions">
          <button className="outline">More Actions ⌄</button>
          <button
            className="primary"
            onClick={handleAcceptQuote}
            disabled={loading || currentQuote.status === "Converted"}
          >
            {loading ? "Updating..." : "Accept Quote"}
          </button>
        </div>
      </div>

      <div className="quote-info">
        <div>
          <h3>{currentQuote.homeOwnerName}</h3>
          <p>
            <strong>Property Address</strong>
            <br />
            {currentQuote.address || "No address provided"}
          </p>
        </div>

        <div>
          <p>
            <strong>Trader</strong>
            <br />
            {currentQuote.traderName || "Unknown"}
            <br />
            {currentQuote.traderBusiness || ""}
          </p>
        </div>

        <div>
          <p>
            <strong>Quote Details</strong>
            <br />
            Quote ID: {currentQuote.quoteNumber}
            <br />
            Request Type: {currentQuote.requestType}
            <br />
            Date Created:{" "}
            {new Date(currentQuote.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="quote-note">
        To proceed with the request, an initial deposit of{" "}
        <strong>£{currentQuote.deposit || 0}</strong> is required to be paid.
      </p>

      <h4>Service Summary</h4>
      <table className="quote-services">
        <thead>
          <tr>
            <th>Service</th>
            <th>Qty.</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {(currentQuote.services || []).map((service, i) => (
            <tr key={i}>
              <td>{service.name}</td>
              <td>{service.quantity}</td>
              <td>£{service.unitPrice.toFixed(2)}</td>
              <td>£{service.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="quote-totals">
        <p>Subtotal: £{currentQuote.subtotal?.toFixed(2) || "0.00"}</p>
        <p>VAT: £{currentQuote.vat?.toFixed(2) || "0.00"}</p>
        <p className="total">
          Total: £{currentQuote.total?.toFixed(2) || "0.00"}
        </p>
        <p>Deposit: £{currentQuote.deposit?.toFixed(2) || "0.00"}</p>
      </div>

      <button className="back-btn" onClick={onBack}>
        ← Back to Quotes
      </button>
    </div>
  );
}
