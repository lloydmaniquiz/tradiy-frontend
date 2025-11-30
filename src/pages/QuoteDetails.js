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
      // FIXED: use the variable inside the template literal
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${currentQuote.quoteNumber}/status`,
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

  // safe formatter: always returns a string like "0.00"
  const fmt = (value) => {
    if (value === null || value === undefined || value === "") return "0.00";
    const num = Number(value);
    return Number.isFinite(num) ? num.toFixed(2) : "0.00";
  };

  const createdDate = currentQuote.createdAt
    ? new Date(currentQuote.createdAt).toLocaleDateString()
    : "—";

  return (
    <div className="quote-details-wrapper">
      <div className="quote-header">
        <div className="quote-header-left">
          <span
            className={`status-badge ${(
              currentQuote.status || "pending"
            ).toLowerCase()}`}
          >
            {(currentQuote.status || "PENDING").toUpperCase()}
          </span>
        </div>

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
        <div className="quote-info-h3">
          <h3>{currentQuote.homeOwnerName || currentQuote.id || "—"}</h3>
          <p className="address">
            <strong>Property Address</strong>
            <br />
            {currentQuote.address || "No address provided"}
          </p>
          <p className="contact">
            <small>{currentQuote.contact || ""}</small>
          </p>
        </div>

        <div className="quote-info-trader">
          <p className="trader-title">Trader</p>
          <p className="trader-name">{currentQuote.traderName || "Unknown"}</p>
          <p className="trader-business">{currentQuote.traderBusiness || ""}</p>
        </div>

        <div className="quote-info-details">
          <p className="details-title">Quote Details</p>
          <p>Quote ID: {currentQuote.quoteNumber || "—"}</p>
          <p>Request Type: {currentQuote.requestType || "—"}</p>
          <p>Date Created: {createdDate}</p>
        </div>
      </div>

      <p className="quote-note">
        To proceed with the request, an initial deposit of{" "}
        <strong>£{fmt(currentQuote.deposit || 0)}</strong> is required to be
        paid.
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
          {(currentQuote.services || []).length === 0 && (
            <tr>
              <td colSpan="4" className="no-services">
                No services added
              </td>
            </tr>
          )}
          {(currentQuote.services || []).map((service, i) => (
            <tr key={i}>
              <td>{service.name}</td>
              <td>{service.quantity ?? 1}</td>
              <td>£{fmt(service.unitPrice ?? 0)}</td>
              <td>£{fmt(service.total ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="separator" />

      <div className="quote-footer">
        <div className="attachments">
          {(currentQuote.attachments || []).map((src, i) => (
            <img key={i} src={src} alt={`attachment-${i}`} />
          ))}
        </div>

        <div className="quote-totals">
          <p>Subtotal: £{fmt(currentQuote.subtotal)}</p>
          <p>VAT: £{fmt(currentQuote.vat)}</p>
          <p className="total">Total: £{fmt(currentQuote.total)}</p>
          <p>Deposit: £{fmt(currentQuote.deposit)}</p>
        </div>
      </div>

      <button className="back-btn" onClick={onBack}>
        ← Back to Quotes
      </button>
    </div>
  );
}
