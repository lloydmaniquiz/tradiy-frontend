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
        <img src={result.image} alt={result.name} className="results-image" />
        <div className="logo-badge">LOGO</div>
      </div>

      {/* Business Info */}
      <div className="card-content">
        <h3 className="business-name">{result.name}</h3>
        <p className="business-address">{result.address}</p>

        {/* Services */}
        <div className="services">
          {result.services.map((service, index) => (
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
