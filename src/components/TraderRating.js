import React, { useState, useEffect } from "react";
import "../styles/TraderProfile.css";
import ReviewModal from "./ReviewModal";
import RatingsSummary from "./RatingsSummary"; // Import RatingsSummary
import filledStar from "../images/filled-star.png";
import emptyStar from "../images/outline-star.png";
import defaultAvatar from "../images/profile-placeholder.jpg"; // Add a default avatar
import ReviewContentModal from "./ReviewContentModal";

const TraderRating = ({ traderId, setReviewsCount }) => {
  const [trader, setTrader] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/reviews/?tradesperson_id=${traderId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setTrader(data);
        setReviewsCount(data.reviews.length);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId, setReviewsCount]);

  if (loading) return <p>Loading trader data...</p>;
  if (error) return <p>Error: {error}</p>;

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

  // Limit reviews to 6 initially
  const visibleReviews = showAll ? trader.reviews : trader.reviews.slice(0, 4);

  return (
    <section className="trader-rating">
      <div className="rating-header">
        <div
          style={{ display: "flex", gap: "14px", alignItems: "center" }}
          className="rating-header-design"
        >
          <div className="star-review-header">
            <img
              src={filledStar}
              alt="star"
              style={{ height: "40px", width: "40px" }}
            />
            <p>{averageTraderService}</p>
          </div>
          <h2>Tradiy Trader Rating</h2>
        </div>
        <button className="review-btn" onClick={() => setIsModalOpen(true)}>
          Write a review
        </button>
      </div>

      {/* Integrate Ratings Summary here */}
      <RatingsSummary reviews={trader.reviews} />

      <div>
        <div className="reviews">
          {visibleReviews.map((review, index) => (
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

        {/* Show "View All Reviews" Button */}
        <button
          className="btn show-reviews"
          onClick={() => setIsReviewModalOpen(true)}
        >
          View All Reviews
        </button>
        {/* Render Review Modal */}
        {isReviewModalOpen && (
          <ReviewContentModal
            reviews={trader.reviews}
            onClose={() => setIsReviewModalOpen(false)}
            trader={trader}
            setReviewsCount={setReviewsCount}
          />
        )}
      </div>

      <ReviewModal
        traderId={traderId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default TraderRating;
