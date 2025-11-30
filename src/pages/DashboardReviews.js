import React, { useState } from "react";
import "../styles/DashboardReviews.css";
import { FaChevronDown, FaStar } from "react-icons/fa";

export default function DashboardReviews() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    {
      name: "Jasmine Davies",
      service: "Service A",
      date: "20 January 2025",
      ratings: {
        professionalism: 5,
        cleanliness: 5,
        timeliness: 5,
        workQuality: 5,
        valueForMoney: 5,
      },
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "Frederick Roberts",
      service: "Service B",
      date: "10 February 2025",
      ratings: {
        professionalism: 4,
        cleanliness: 5,
        timeliness: 4,
        workQuality: 4,
        valueForMoney: 5,
      },
      review:
        "Great experience overall. Excellent communication and quality work delivered on time.",
    },
  ];

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReview(null);
  };

  return (
    <div className="db-reviews-container">
      {/* Header */}
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Reviews</h1>

        <div className="db-quotesheader-select-wrapper">
          <select className="db-quotesheader-select">
            <option>Business Name 1</option>
            <option>Business Name 2</option>
            <option>Business Name 3</option>
          </select>
          <FaChevronDown className="db-quotesheader-icon" />
        </div>
      </div>

      {/* Stats */}
      <div className="db-quotes-stats">
        <div className="db-quotes-item">
          <h4>Average Stars</h4>
          <p className="db-quotes-number">4.6</p>
        </div>
        <div className="db-quotes-item">
          <h4>Total Reviews Received</h4>
          <p className="db-quotes-number">123</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="db-reviews-tabs">
        <button className="db-reviews-tab active">
          Unreviewed <span className="db-reviews-badge">6</span>
        </button>
        <button className="db-reviews-tab">Reviewed</button>
      </div>

      {/* Review List */}
      <div className="db-reviews-list">
        {reviews.map((review, idx) => (
          <div className="db-reviews-item" key={idx}>
            <div className="db-reviews-info">
              <h4>{review.name}</h4>
              <p>
                {review.date} | {review.service}
              </p>
              <span className="db-reviews-muted">No ratings yet.</span>
            </div>
            <button
              className="db-reviews-btn"
              onClick={() => openReviewModal(review)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="db-reviews-pagination">
        <button className="db-reviews-page">&lt;</button>
        <button className="db-reviews-page active">1</button>
        <button className="db-reviews-page">&gt;</button>
      </div>

      {/* === Slide-In Modal === */}
      {showModal && selectedReview && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="review-modal">
            <div className="review-modal-header">
              <button className="close-btn" onClick={closeModal}>
                ✕
              </button>
              <h3>Review Details</h3>
              <div className="stars large">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
            </div>

            <div className="review-modal-content">
              <p>
                <strong>Client Name:</strong> {selectedReview.name}
              </p>
              <div className="review-info-row">
                <p>
                  <strong>Service:</strong> {selectedReview.service}
                </p>
                <p>
                  <strong>Review Date:</strong> {selectedReview.date}
                </p>
              </div>

              <h4>Review Details</h4>
              {Object.entries(selectedReview.ratings).map(([key, value]) => (
                <div className="rating-row" key={key}>
                  <span>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (c) => c.toUpperCase())}
                  </span>
                  <div className="stars">
                    {[...Array(value)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                  </div>
                </div>
              ))}

              <div className="client-review">
                <strong>Client Review</strong>
                <p>{selectedReview.review}</p>
              </div>

              <button className="btn-report">Report</button>

              <div className="write-review-section">
                <h4>Write a Review</h4>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
                <textarea
                  placeholder="Leave your client review here..."
                  className="review-textarea"
                ></textarea>
                <div className="review-modal-actions">
                  <button className="btn-outline" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn-primary">Submit Review</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
