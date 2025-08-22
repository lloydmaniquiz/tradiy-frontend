import React, { useState, useEffect } from "react";
import yellowStar from "../images/yellow-star.png";
import { Carousel } from "react-responsive-carousel";
import peacockCheck from "../images/peacock-check.png";
import TradiyHero from "../images/tradiy-hero.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/SearchResultsCard.css";
import BookmarkBlank from "../images/BookmarkBlank.png";
import BookmarkFilled from "../images/BookmarkFilled.png";

const SearchResultsCard = ({ result }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch user's bookmarks when component mounts
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bookmarks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch bookmarks");
        const bookmarks = await response.json();

        // Check if this result is already bookmarked
        const currentBookmark = bookmarks.find(
          (b) =>
            b.url ===
            `/trader/${result.id}?query=${encodeURIComponent(
              result.businessName
            )}`
        );
        if (currentBookmark) {
          setIsBookmarked(true);
          setBookmarkId(currentBookmark.id);
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [result.id, result.businessName, token]);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (!token) {
      alert("Please log in to save bookmarks");
      return;
    }

    try {
      if (!isBookmarked) {
        // Add bookmark
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bookmarks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: result.businessName,
              url: `/trader/${result.id}?query=${encodeURIComponent(
                result.businessName
              )}`,
              trader_id: result.id, // <-- send trader_id
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to add bookmark");
        }

        const data = await response.json();
        setIsBookmarked(true);
        setBookmarkId(data.id);
        console.log("Bookmark added:", data);
      } else {
        // Remove bookmark
        if (!bookmarkId) return;

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bookmarks/${bookmarkId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to remove bookmark");
        }

        setIsBookmarked(false);
        setBookmarkId(null);
        console.log("Bookmark removed");
      }
    } catch (err) {
      console.error("Error updating bookmark:", err);
      alert(err.message);
    }
  };

  // Handle work images
  const workImages = result.workImages
    ? String(result.workImages)
        .split(",")
        .map((img) => img.trim())
    : [];

  return (
    <div className="result-card">
      <div className="results-image-container">
        <div className="card-header">
          <div className="image-overlay">
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
                src={isBookmarked ? BookmarkFilled : BookmarkBlank}
                alt={isBookmarked ? "Bookmarked" : "Not Bookmarked"}
                style={{ height: "30px" }}
              />
            </button>
          </div>

          {workImages.length > 0 ? (
            <Carousel
              showThumbs={false}
              autoPlay={false}
              infiniteLoop
              showArrows
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

          {result.businessLogo && (
            <img
              src={result.businessLogo}
              alt="Business Logo"
              className="business-logo"
            />
          )}
        </div>
      </div>

      <div className="card-content">
        <h3 className="business-name">{result.businessName}</h3>
        <p className="business-address">{result.businessAddress}</p>

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

        <div className="rating-reviews">
          <img
            className="yellow-star"
            src={yellowStar}
            alt="yellow-star"
            style={{ width: "14px", height: "auto" }}
          />
          <span className="rating">{result.rating}</span>
          <span>|</span>
          <span className="result-reviews">{result.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
