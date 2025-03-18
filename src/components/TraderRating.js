import React from "react";
import "../styles/TraderProfile.css"; // Import the CSS file

const trader = {
  rating: 4.85,
  reviews: [
    {
      name: "Jay",
      weeksAgo: 3,
      verified: false,
      rating: 5,
      comment: "Excellent work, very professional and clean.",
    },
    {
      name: "Daisy",
      weeksAgo: 1,
      verified: true,
      rating: 5,
      comment: "Great service, would highly recommend!",
    },
    {
      name: "Connor",
      weeksAgo: 9,
      verified: true,
      rating: 5,
      comment: "They did an amazing job painting my house!",
    },
    {
      name: "Zara",
      weeksAgo: 12,
      verified: false,
      rating: 5,
      comment: "Very professional and punctual. Will hire again.",
    },
  ],
  ratingBreakdown: {
    Professionalism: 5,
    "Cleanliness of the Job": 5,
    Timeliness: 4,
    "Work Quality": 4,
    "Value for Money": 5,
  },
};

const TraderRating = () => {
  // Removed ({ trader })
  if (!trader) return null;

  return (
    <section className="trader-rating">
      {/* Header */}
      <div className="rating-header">
        <h2>⭐ {trader.rating} Tradiy Trader Rating</h2>
        <button className="btn">Write a review</button>
      </div>

      {/* Rating Breakdown */}
      <div className="rating-breakdown">
        {Object.entries(trader.ratingBreakdown).map(([category, value]) => (
          <div key={category} className="rating-category">
            <p className="category-name">{category}</p>
            <p className="stars">⭐ {value}</p>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="reviews">
        {trader.reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span className="review-time">{review.weeksAgo} weeks ago</span>
            </div>
            <span
              className={`badge ${review.verified ? "verified" : "unverified"}`}
            >
              {review.verified ? "✅ VERIFIED" : "❌ UNVERIFIED"}
            </span>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Show All Reviews Button */}
      <button className="btn show-reviews">Show all reviews</button>
    </section>
  );
};

export default TraderRating;
