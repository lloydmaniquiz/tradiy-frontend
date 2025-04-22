import React, { useState } from "react";
import "../styles/ReviewModal.css";
import filledStar from "../images/filled-star.png";
import outlineStar from "../images/outline-star.png";

const ReviewModal = ({ traderId, isOpen, onClose }) => {
  const [ratings, setRatings] = useState({
    professionalism: 1,
    cleanliness: 1,
    timeliness: 1,
    workQuality: 1,
    valueForMoney: 1,
  });

  const [traderServiceRating, setTraderServiceRating] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Handle star click
  const handleStarClick = (category, value) => {
    if (category === "traderService") {
      setTraderServiceRating(value);
    } else {
      setRatings({ ...ratings, [category]: value });
    }
  };

  // Render stars dynamically
  const renderStars = (category, rating) => (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((num) => (
        <img
          key={num}
          src={num <= rating ? filledStar : outlineStar}
          alt="Star"
          className="star-icon"
          onClick={() => handleStarClick(category, num)}
          style={{
            height: "20px",
            width: "20px",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );

  // Submit review function
  const handleSubmitReview = async () => {
    if (!traderId) {
      setError("Trader ID is missing");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new URLSearchParams();
    formData.append("tradesperson_id", traderId);
    formData.append("reviewer_name", name);
    formData.append("professionalism", ratings.professionalism);
    formData.append("cleanliness", ratings.cleanliness);
    formData.append("timeliness", ratings.timeliness);
    formData.append("work_quality", ratings.workQuality);
    formData.append("value_for_money", ratings.valueForMoney);
    formData.append("trader_service", traderServiceRating);
    formData.append("comment", reviewText);

    // ✅ Log the review data before sending the request
    console.log("Submitting review data:", Object.fromEntries(formData));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/submit-review/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Review submitted successfully:", data);

      // Reset form after successful submission
      setName("");
      setReviewText("");
      setRatings({
        professionalism: 1,
        cleanliness: 1,
        timeliness: 1,
        workQuality: 1,
        valueForMoney: 1,
      });
      setTraderServiceRating(1);

      onClose(); // Close the modal after success
    } catch (error) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="review-modal-content">
        <div className="modal-header">
          <h3>Write a Review</h3>
          <button className="closeButton" onClick={onClose}>
            &times;
          </button>
        </div>

        <hr className="modal-divider" />

        <p className="feedback-text">
          We Value Your Feedback! Your experience matters to us, and we'd love
          to hear your thoughts. Your review not only helps traders improve but
          also guides others in making informed decisions.
        </p>

        {/* User Info */}
        <div className="user-info">
          <input
            type="text"
            className="user-name-input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Leave your review here."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <hr className="modal-divider" />
        <div className="rating-breakdown">
          <div className="rating-category">
            <p>Trader Service</p>
            {renderStars("traderService", traderServiceRating)}
          </div>
        </div>

        <hr className="modal-divider" />
        <div className="rating-breakdown">
          {Object.keys(ratings).map((category, index) => (
            <div key={index} className="rating-category">
              <p>
                {category
                  .replace(/([A-Z])/g, " $1")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
              {renderStars(category, ratings[category])}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Action Button */}
        <div className="modal-actions">
          <button
            className="btn submit"
            onClick={handleSubmitReview}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Post Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
