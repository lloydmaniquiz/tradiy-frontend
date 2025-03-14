import React from "react";
import { FaStar } from "react-icons/fa";
import { CheckCircle } from "lucide-react";
import "../styles/SearchResultsCard.css";

const SearchResultsCard = ({ result }) => {
  return (
    <div className="result-card">
      {/* Badge and Bookmark */}
      <div className="card-header">
        <span className="badge">✨ {result.badge}</span>
        <button className="bookmark">⭐</button>
      </div>

      {/* Image Section */}
      <div className="results-image-container">
        <img
          src={result.image}
          alt={result.businessName}
          className="results-image"
        />
        <div className="logo-badge">LOGO</div>
      </div>

      {/* Business Info */}
      <div className="card-content">
        <h3 className="business-name">{result.businessName}</h3>
        <p className="business-address">{result.businessAddress}</p>

        {/* Services */}
        <div className="services">
          {Array.isArray(result.services)
            ? result.services.map((service, index) => (
                <div key={index} className="service">
                  <CheckCircle className="check-icon" size={16} />
                  {service}
                </div>
              ))
            : // If result.services is a string, parse it first
              JSON.parse(result.services || "[]").map((service, index) => (
                <div key={index} className="service">
                  <CheckCircle className="check-icon" size={16} />
                  {service}
                </div>
              ))}
        </div>

        {/* Rating and Reviews */}
        <div className="rating-reviews">
          <FaStar className="star-icon" />
          <span className="rating">{result.rating}</span>
          <span className="reviews">| {result.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
