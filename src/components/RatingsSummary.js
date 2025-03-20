import React from "react";
import "../styles/TraderProfile.css"; // Ensure to style properly
import professionalismIcon from "../images/professionalism.png";
import cleanlinessIcon from "../images/cleanliness.png";
import timelinessIcon from "../images/timeliness.png";
import workQualityIcon from "../images/workQuality.png";
import valueForMoneyIcon from "../images/valueForMoney.png";

const RatingsSummary = ({ reviews }) => {
  // Initialize rating distribution
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const categoryAverages = {
    professionalism: 0,
    cleanliness: 0,
    timeliness: 0,
    work_quality: 0,
    value_for_money: 0,
  };

  let validTraderServiceCount = 0;

  if (reviews && reviews.length > 0) {
    reviews.forEach((review) => {
      if (
        review.trader_service !== null &&
        review.trader_service >= 1 &&
        review.trader_service <= 5
      ) {
        ratingCounts[review.trader_service]++;
        validTraderServiceCount++;
      }

      // Sum up category ratings, handling missing/null values
      Object.keys(categoryAverages).forEach((key) => {
        categoryAverages[key] += review[key] || 0;
      });
    });

    // Calculate averages
    Object.keys(categoryAverages).forEach((key) => {
      categoryAverages[key] = (
        reviews.length > 0 ? categoryAverages[key] / reviews.length : 0
      ).toFixed(1);
    });
  }

  return (
    <div className="ratings-summary">
      {/* Overall Rating Section */}
      <div className="overall-rating">
        <h3>Overall Rating</h3>

        {/* Rating Distribution */}
        {Object.entries(ratingCounts)
          .reverse() // Ensure display from 5 stars to 1 star
          .map(([rating, count]) => {
            const percentage =
              validTraderServiceCount > 0
                ? (count / validTraderServiceCount) * 100
                : 0;

            return (
              <div key={rating} className="rating-row">
                <span>{rating}</span>
                <div className="rating-bar">
                  <div
                    className="filled-bar"
                    style={{
                      width: `${percentage}%`,
                      minWidth: count > 0 ? "5px" : "0",
                      backgroundColor: count > 0 ? "#000839" : "transparent",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Category Ratings */}
      <div className="category-ratings">
        {[
          {
            label: "Professionalism",
            value: categoryAverages.professionalism,
            icon: professionalismIcon,
          },
          {
            label: "Cleanliness of the Job",
            value: categoryAverages.cleanliness,
            icon: cleanlinessIcon,
          },
          {
            label: "Timeliness",
            value: categoryAverages.timeliness,
            icon: timelinessIcon,
          },
          {
            label: "Work Quality",
            value: categoryAverages.work_quality,
            icon: workQualityIcon,
          },
          {
            label: "Value for Money",
            value: categoryAverages.value_for_money,
            icon: valueForMoneyIcon,
          },
        ].map((category, index, array) => (
          <React.Fragment key={index}>
            {/* Add the first divider before the first item */}
            {index === 0 && <div className="vertical-divider"></div>}

            <div className="category">
              <h3>{category.label}</h3>
              <p>{category.value}</p>
              <img
                src={category.icon}
                alt={category.label}
                className="category-icon"
              />
            </div>

            {/* Add dividers between items, but not after the last one */}
            {index < array.length - 1 && (
              <div className="vertical-divider"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RatingsSummary;
