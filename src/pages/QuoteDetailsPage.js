// src/pages/QuoteDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuoteDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_API_URL}/enquiry/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quote details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!quote) return <p>Quote not found</p>;

  return (
    <div className="quote-details-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <h1>Quote #{quote.quoteNumber}</h1>
      <p>
        <strong>Status:</strong> {quote.status}
      </p>
      <p>
        <strong>Customer:</strong> {quote.homeOwnerName}
      </p>
      <p>
        <strong>Email:</strong> {quote.email}
      </p>
      <p>
        <strong>Service Type:</strong> {quote.serviceType}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(quote.createdAt).toLocaleString()}
      </p>

      {/* Expand here with attachments, totals, internal notes, etc */}
    </div>
  );
}
