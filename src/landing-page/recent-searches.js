import React, { useState, useEffect } from "react";
import "../App.css";
import dropDownOpen from "../images/up-white.png";
import dropDownClosed from "../images/down-white.png";

// Utility function to format time in human-readable format
const timeAgo = (time) => {
  const now = new Date();
  const searchTime = new Date(time);
  const diffInSeconds = Math.floor((now - searchTime) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInSeconds < 60) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  return searchTime.toLocaleString(); // Fallback to full date
};

const RecentSearches = ({ handleSearch }) => {
  const [searches, setSearches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setSearches(storedSearches);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle search click
  const handleSearchClick = (search) => {
    handleSearch(search.service, search.postcode);
  };

  // Delete a search from recent searches
  const handleDelete = (index) => {
    const updatedSearches = searches.filter((_, i) => i !== index);
    setSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches)); // Save updated searches to localStorage
  };

  // Limit the visible recent searches to 6
  const visibleSearches = searches.slice(0, 6);

  return (
    <div className="recent-searches">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <span>Recent searches:</span>
        <img
          className="dropdown-arrow"
          src={isOpen ? dropDownOpen : dropDownClosed}
          alt="dropdown arrow"
        />
      </div>
      {isOpen && (
        <div className="dropdown-content">
          {visibleSearches.length > 0 ? (
            visibleSearches.map((search, index) => (
              <div className="search-card" key={index}>
                <div
                  className="search-info"
                  onClick={() => handleSearchClick(search)}
                >
                  <div className="info-left">
                    <small>{timeAgo(search.timestamp)}</small>
                    <p>{search.service}</p>
                    <span>{search.postcode}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering search click when deleting
                      handleDelete(index);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">No recent searches</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentSearches;
