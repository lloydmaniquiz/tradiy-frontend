import React from "react";
import "../styles/QuoteDetailsDrawer.css";

export default function QuoteDetailsDrawer({
  quote,
  onClose,
  onOpenFullDetails,
}) {
  if (!quote) return null;

  return (
    <div className="quote-drawer-overlay" onClick={onClose}>
      <div
        className="quote-drawer"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className="quote-drawer-close" onClick={onClose}>
          ✕
        </button>
        <h2>Overview</h2>
        <span className={`quote-status ${quote.status.toLowerCase()}`}>
          {quote.status}
        </span>

        <div className="quote-detail">
          <p className="label">Customer Name</p>
          <p>{quote.homeOwnerName}</p>
        </div>

        <div className="quote-detail">
          <p className="label">Quote ID</p>
          <p
            className="clickable-quote-id"
            onClick={() => onOpenFullDetails(quote)}
          >
            {quote.quoteNumber}
          </p>
        </div>

        <div className="quote-detail">
          <p className="label">Information</p>
          <p>
            {quote.description ||
              "No additional information was provided for this quote."}
          </p>
        </div>

        <div className="quote-detail">
          <p className="label">To be contacted via</p>
          <p>Email</p>
        </div>

        <div className="quote-drawer-actions">
          <button className="primary">Send Reminder</button>
          <button className="outline">View Quote PDF</button>
        </div>
      </div>
    </div>
  );
}
