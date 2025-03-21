import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../images/close.png";
import "../styles/MobileHeader.css";
import SearchBar from "./search-bar";
import RecentSearches from "./recent-searches";

function SearchPage({ handleSearch }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return null; // Hide the component if the screen is wider than 1024px
  }

  return (
    <div className="mobile-search-page">
      <img
        className="close-icon"
        src={CloseIcon}
        alt="Close"
        onClick={() => navigate(-1)}
      />
      <div className="mobile-search-container">
        <h2>SEARCH FOR TRADES</h2>
        <div className="mobile-search-content-wrapper">
          <SearchBar handleSearch={handleSearch} />
          <RecentSearches handleSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
