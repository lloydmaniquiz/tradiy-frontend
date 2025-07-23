import React from "react";
import { useState } from "react";
import yellowStar from "../images/yellow-star.png";
import { Carousel } from "react-responsive-carousel";
import peacockCheck from "../images/peacock-check.png";
import TradiyHero from "../images/tradiy-hero.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/SearchResultsCard.css";
import BookmarkBlank from "../images/BookmarkBlank.png";
import BookmarkFilled from "../images/BookmarkFilled.png";

const SearchResultsCard = ({ result }) => {
  const [isBookmarked, setIsBookmarked] = useState(false); // Track bookmark status

  // Ensure work images are properly handled
  const workImages = result.workImages
    ? String(result.workImages)
        .split(",")
        .map((img) => img.trim())
    : [];

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // Prevent parent click event
    setIsBookmarked((prev) => !prev); // Toggle bookmark state
  };

  return (
    <div className="result-card">
      <div className="results-image-container">
        <div className="card-header">
          <div className="image-overlay">
            {/* Flexbox container for hero & bookmark */}
            <div className="overlay-left">
              {result.isTradiyHero && (
                <span className="tradiy-hero">
                  <img
                    style={{ height: "30px" }}
                    src={TradiyHero}
                    alt="Tradiy Hero"
                  />
                </span>
              )}
            </div>

            <button className="bookmark" onClick={handleBookmarkClick}>
              <img
                src={isBookmarked ? BookmarkFilled : BookmarkBlank} // Toggle images
                alt={isBookmarked ? "Bookmarked" : "Not Bookmarked"}
                style={{ height: "30px" }} // Adjust size if needed
              />
            </button>
          </div>

          {workImages.length > 0 ? (
            <Carousel
              showThumbs={false}
              autoPlay={false} // ✅ No auto-scroll
              infiniteLoop
              showArrows={true}
              showStatus={false}
              onClickItem={(e) => e.stopPropagation()}
              onClickThumb={(e) => e.stopPropagation()}
            >
              {workImages.map((image, index) => (
                <div key={index} onClick={(e) => e.stopPropagation()}>
                  <img
                    src={image}
                    alt={`Work ${index}`}
                    className="carousel-image"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="no-image-container">
              <p>No image available</p>
            </div>
          )}

          {/* Business Logo */}
          {result.businessLogo && (
            <img
              src={result.businessLogo}
              alt="Business Logo"
              className="business-logo"
            />
          )}
        </div>
      </div>

      {/* Business Info */}
      <div className="card-content">
        <h3 className="business-name">{result.businessName}</h3>
        <p className="business-address">{result.businessAddress}</p>

        {/* Services */}
        <div className="services">
          {Array.isArray(result.services)
            ? result.services.map((service, index) => (
                <div key={index} className="service-card">
                  <img src={peacockCheck} alt="check" />
                  {service}
                </div>
              ))
            : JSON.parse(result.services || "[]").map((service, index) => (
                <div key={index} className="service-card">
                  <img src={peacockCheck} alt="check" />
                  {service}
                </div>
              ))}
        </div>

        {/* Rating and Reviews */}
        <div className="rating-reviews">
          <img
            className="yellow-star"
            src={yellowStar}
            alt="yellow-star"
            style={{ width: "14px", height: "auto" }}
          />
          <span className="rating">{result.rating}</span>
          <span>|</span>
          <span className="reviews">{result.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
