import React, { useState, forwardRef } from "react";
import "../App.css";
import SearchIcon from "../images/search-white.png";
import SearchDropdown from "../images/search-dropdown.png";
import BuildierIcon from "../images/constructor.png"; // Add plumbing icon path
import ElectricalIcon from "../images/electrician.png"; // Add electrical icon path
import CarpetIcon from "../images/carpet.png"; // Add carpentry icon path
import DrivewayIcon from "../images/road.png"; // Add painting icon path
import GardenerIcon from "../images/trimming.png"; // Add landscaping icon path

// Forward ref to root div
const SearchBar = forwardRef(({ handleSearch }, ref) => {
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to get time difference in a human-readable format
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp; // Difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service && postcode) {
      const timestamp = new Date();
      const newSearch = {
        service,
        postcode,
        time: getTimeAgo(timestamp),
        timestamp: timestamp.toISOString(),
      };

      const storedSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];
      storedSearches.unshift(newSearch);

      localStorage.setItem("recentSearches", JSON.stringify(storedSearches));

      handleSearch(service, postcode);
    }
  };

  return (
    <div className="search-bar" ref={ref}>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <div className="dropdown-wrapper">
          <div
            className="custom-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="dropdown-selected">
              {service || "What service do you need?"}
            </div>
            <img
              src={SearchDropdown}
              alt="Dropdown"
              className="custom-dropdown-icon"
            />
          </div>
          {dropdownOpen && (
            <div className="dropdown-options">
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Builder");
                  setDropdownOpen(false);
                }}
              >
                <img src={BuildierIcon} alt="Builder" />
                <span>Builder</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Carpet Fitting");
                  setDropdownOpen(false);
                }}
              >
                <img src={CarpetIcon} alt="Carpentry" />
                <span>Carpet Fitting</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Driveways/Patios");
                  setDropdownOpen(false);
                }}
              >
                <img src={DrivewayIcon} alt="Driveways/Patios" />
                <span>Driveways/Patios</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Electrial");
                  setDropdownOpen(false);
                }}
              >
                <img src={ElectricalIcon} alt="Electrical" />
                <span>Electrical</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Gardener");
                  setDropdownOpen(false);
                }}
              >
                <img src={GardenerIcon} alt="Gardener" />
                <span>Gardener</span>
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="What is your postcode?"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button className="search-button" type="submit">
          <img src={SearchIcon} alt="🔍" />
          <p>Search</p>
        </button>
      </form>
    </div>
  );
});

export default SearchBar;
