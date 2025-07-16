import React, { useState, forwardRef, useRef, useEffect } from "react";
import "../App.css";
import SearchIcon from "../images/search-white.png";
import SearchDropdown from "../images/search-dropdown.png";
import alarmsIcon from "../images/directory-carousel/Alarms  Security.png";
import bathroomsIcon from "../images/directory-carousel/Bathrooms.png";
import builderIcon from "../images/directory-carousel/Builder.png";
import carpetFittingIcon from "../images/directory-carousel/carpet.png";
import centralHeatingIcon from "../images/directory-carousel/Central Heating.png";
import cleanerIcon from "../images/directory-carousel/Cleaner.png";
import conservatoriesIcon from "../images/directory-carousel/Conservatories & Garden Rooms.png";
import curtainblindIcon from "../images/directory-carousel/Curtain  Blind Fitters.png";
import dampProoferIcon from "../images/directory-carousel/Damp Proofer.png";
import drainageIcon from "../images/directory-carousel/Drainage.png";
import drivewaysIcon from "../images/directory-carousel/Driveways  Patios.png";
import electricianIcon from "../images/directory-carousel/electrician.png";
import exteriorCleaningIcon from "../images/directory-carousel/Exterior Cleaning.png";
import fasciaIcon from "../images/directory-carousel/Fascia  Soffits.png";
import fencingIcon from "../images/directory-carousel/Fencing  Gates.png";
import gardenerIcon from "../images/directory-carousel/Gardener.png";
import glassIcon from "../images/directory-carousel/glass.png";
import ITIcon from "../images/directory-carousel/IT Systems & Telecommunications.png";
import joinerIcon from "../images/directory-carousel/Joiner.png";
import kitchenIcon from "../images/directory-carousel/kitchen.png";
import landscapingIcon from "../images/directory-carousel/Landscaping.png";
import painterIcon from "../images/directory-carousel/Painter  Decorator.png";
import pestcontrolIcon from "../images/directory-carousel/pest-control.png";
import plastererIcon from "../images/directory-carousel/Plasterer.png";
import plumberIcon from "../images/directory-carousel/Plumber.png";
import poweredaccessIcon from "../images/directory-carousel/Powered Access.png";
import renewableEnergyIcon from "../images/directory-carousel/Renewable Energy.png";
import rooferIcon from "../images/directory-carousel/Roofer.png";
import roughcasterIcon from "../images/directory-carousel/Roughcaster & Renderer.png";
import scaffoldingIcon from "../images/directory-carousel/scaffolding.png";
import stoneWorkIcon from "../images/directory-carousel/Stone Work.png";
import stovesLogIcon from "../images/directory-carousel/Stoves  Log Burners.png";
import tilerIcon from "../images/directory-carousel/Tiler.png";
import treeSurgeonIcon from "../images/directory-carousel/Tree Surgeon.png";
import tvAerialsIcon from "../images/directory-carousel/TV Aerials  Satellite Services.png";
import upvcWindowsIcon from "../images/directory-carousel/UPVC Windows.png";
import wasteClearanceIcon from "../images/directory-carousel/Waste  Clearance.png";
import weatherCoatingsIcon from "../images/directory-carousel/Weather Coatings.png";

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

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={ref}>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <div className="dropdown-wrapper">
          <div ref={dropdownRef}>
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
                {/* Alphabetically sorted dropdown options */}
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Alarm / Security Services");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={alarmsIcon} alt="Alarm / Security Services" />
                  <span>Alarm / Security Services</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Bathroom Services");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={bathroomsIcon} alt="Bathroom Services" />
                  <span>Bathroom Services</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Builder");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={builderIcon} alt="Builder" />
                  <span>Builder</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Carpet Fitting");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={carpetFittingIcon} alt="Carpet Fitting" />
                  <span>Carpet Fitting</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Central Heating");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={centralHeatingIcon} alt="Central Heating" />
                  <span>Central Heating</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Cleaning Services");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={cleanerIcon} alt="Cleaning Services" />
                  <span>Cleaning Services</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Conservatories & Garden Rooms");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={conservatoriesIcon}
                    alt="Conservatories & Garden Rooms"
                  />
                  <span>Conservatories & Garden Rooms</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Curtain / Blind Fitters");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={curtainblindIcon} alt="Curtain / Blind Fitters" />
                  <span>Curtain / Blind Fitters</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Damp Proofer");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={dampProoferIcon} alt="Damp Proofer" />
                  <span>Damp Proofer</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Drainage");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={drainageIcon} alt="Drainage" />
                  <span>Drainage</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Driveways / Patios");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={drivewaysIcon} alt="Driveways/Patios" />
                  <span>Driveways/Patios</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Electrician");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={electricianIcon} alt="Electrician" />
                  <span>Electrician</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Exterior Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={exteriorCleaningIcon} alt="Exterior Cleaning" />
                  <span>Exterior Cleaning</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Fascia / Soffits");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={fasciaIcon} alt="Fascia / Soffits" />
                  <span>Fascia / Soffits</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Fencing / Gates");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={fencingIcon} alt="Fencing / Gates" />
                  <span>Fencing / Gates</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Gardener");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={gardenerIcon} alt="Gardener" />
                  <span>Gardener</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Glass");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={glassIcon} alt="Glass" />
                  <span>Glass</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("IT Systems & Telecommunications");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={ITIcon} alt="IT Systems" />
                  <span>IT Systems & Telecommunications</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Joiner");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={joinerIcon} alt="Joiner" />
                  <span>Joiner</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Kitchens");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={kitchenIcon} alt="Kitchens" />
                  <span>Kitchens</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Landscaping");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={landscapingIcon} alt="Landscaping" />
                  <span>Landscaping</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Painter / Decorator");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={painterIcon} alt="Painter / Decorator" />
                  <span>Painter / Decorator</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Plasterer");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={plastererIcon} alt="Plasterer" />
                  <span>Plasterer</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Plumber");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={plumberIcon} alt="Plumber" />
                  <span>Plumber</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Pest Control");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={pestcontrolIcon} alt="Pest Control" />
                  <span>Pest Control</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Powered Access");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={poweredaccessIcon} alt="Powered Access" />
                  <span>Powered Access</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Renewable Energy");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={renewableEnergyIcon} alt="Renewable Energy" />
                  <span>Renewable Energy</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Roofer");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={rooferIcon} alt="Roofer" />
                  <span>Roofer</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Roughcaster & Renderer");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={roughcasterIcon} alt="Roughcaster & Renderer" />
                  <span>Roughcaster & Renderer</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Scaffolding");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={scaffoldingIcon} alt="Scaffolding" />
                  <span>Scaffolding</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Stone Work");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={stoneWorkIcon} alt="Stone Work" />
                  <span>Stone Work</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Stoves / Log Burners");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={stovesLogIcon} alt="Stoves / Log Burners" />
                  <span>Stoves / Log Burners</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Tiler");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={tilerIcon} alt="Tiler" />
                  <span>Tiler</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Tree Surgeon");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={treeSurgeonIcon} alt="Tree Surgeon" />
                  <span>Tree Surgeon</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("UPVC Windows");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={upvcWindowsIcon} alt="UPVC Windows" />
                  <span>UPVC Windows</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Waste / Clearance");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={wasteClearanceIcon} alt="Waste / Clearance" />
                  <span>Waste / Clearance</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Weather Coatings");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={weatherCoatingsIcon} alt="Weather Coatings" />
                  <span>Weather Coatings</span>
                </div>
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("TV Aerials");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={tvAerialsIcon} alt="TV Aerials" />
                  <span>TV Aerials</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="What is your postcode?"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          style={{ color: "#423e3e", fontWeight: "400" }}
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
