import React, { useState } from "react";
import "../App.css";
import dropDownOpen from "../images/up-white.png";
import dropDownClosed from "../images/down-white.png";

const RecentSearches = () => {
  const [searches, setSearches] = useState([
    { service: "Service A", postcode: "KA22 7HF", time: "2 days ago" },
    { service: "Service B", postcode: "KA22 7HF", time: "4 weeks ago" },
    { service: "Service C", postcode: "KA22 7HF", time: "3 months ago" },
    { service: "Service D", postcode: "KA22 7HF", time: "5 months ago" },
    { service: "Service E", postcode: "KA22 7HF", time: "5 months ago" },
    { service: "Service F", postcode: "KA22 7HF", time: "5 months ago" },
    { service: "Service G", postcode: "KA22 7HF", time: "5 months ago" },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle clicking a search item
  const handleSearchClick = (search) => {
    alert(`You selected: ${search.service}, ${search.postcode}`);
  };

  // Handle deleting a search item
  const handleDelete = (index) => {
    const updatedSearches = searches.filter((_, i) => i !== index);
    setSearches(updatedSearches);
  };

  // Limit visible items to the first 6
  const visibleSearches = searches.slice(0, 6);

  return (
    <div className="recent-searches">
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        <span>Recent searches:</span>
        <img
          className="dropdown-arrow"
          src={isOpen ? dropDownOpen : dropDownClosed} // Use images for the open/closed state
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
                    <small>{search.time}</small>
                    <p>{search.service}</p>
                    <span>{search.postcode}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
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
