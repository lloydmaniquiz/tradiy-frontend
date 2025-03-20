import React, { useState } from "react";
import filledStar from "../images/filled-star.png";
import emptyStar from "../images/outline-star.png";
import defaultAvatar from "../images/profile-placeholder.jpg"; // Add a default avatar
import "../styles/ReviewContentModal.css";

const ReviewModal = ({ reviews, onClose, trader }) => {
  const [sortOption, setSortOption] = useState("recent");

  // Function to sort reviews based on selected filter
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (sortOption === "highest") {
      return b.trader_service - a.trader_service;
    } else if (sortOption === "lowest") {
      return a.trader_service - b.trader_service;
    }
    return 0;
  });
  // Calculate average rating
  const getAverageTraderService = (reviews) => {
    if (!reviews || reviews.length === 0) return "N/A";

    const validRatings = reviews
      .map((review) => review.trader_service)
      .filter((rating) => rating !== null && rating !== undefined);

    if (validRatings.length === 0) return "N/A";

    const sum = validRatings.reduce((acc, val) => acc + val, 0);
    return (sum / validRatings.length).toFixed(2);
  };

  const averageTraderService = getAverageTraderService(trader.reviews);

  const getTimeAgo = (dateString) => {
    const reviewDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - reviewDate) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hr ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  };

  return (
    <div className="review-overlay">
      <div className="review-overlay-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        {/* Modal Header */}
        <div className="review-modal-header">
          <div>
            <div className="rating-header">
              <img src={filledStar} alt="star" className="star-icon" />
              <p>{averageTraderService}</p>
            </div>
            <h2>Tradiy Trader Rating</h2>
          </div>
        </div>

        {/* Scrollable Reviews */}
        <div className="overlay-reviews">
          <div
            className="dropdown-number-wrapper"
            style={{
              alignItems: "center",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <span>{reviews.length} reviews</span> {/* Fixed the typo */}
            <select
              className="filter-dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>

          {sortedReviews.map((review, index) => (
            <div key={index} className="review">
              <div className="text-review-header">
                <img
                  src={defaultAvatar}
                  alt="User avatar"
                  className="review-avatar"
                  style={{ height: "60px", width: "60px" }}
                />
                <div className="name-time-wrapper">
                  <span className="review-name">{review.reviewer_name}</span>
                  <span className="review-time">
                    {getTimeAgo(review.created_at)}
                  </span>
                </div>
              </div>
              <div className="verified-stars-wrapper">
                <span className="badge unverified">UNVERIFIED</span>
                <div className="stars-container">
                  {Array.from({ length: 5 }, (_, i) => (
                    <img
                      key={i}
                      src={i < review.trader_service ? filledStar : emptyStar}
                      alt="star"
                      className="star"
                      style={{ height: "16px", marginBottom: "0px" }}
                    />
                  ))}
                </div>
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
