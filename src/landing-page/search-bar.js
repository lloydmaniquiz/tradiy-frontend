import React, { useState, forwardRef } from "react";
import "../App.css";
import SearchIcon from "../images/search-white.png";
import SearchDropdown from "../images/search-dropdown.png";
import BuildierIcon from "../images/constructor.png"; // Builder icon
import ElectricalIcon from "../images/electrician.png"; // Electrical icon
import CarpetIcon from "../images/carpet.png"; // Carpet fitting icon
import DrivewayIcon from "../images/road.png"; // Driveway icon
import GardenerIcon from "../images/trimming.png"; // Gardener icon

// Add the rest of the service icons
import CentralHeatingIcon from "../images/central-heating.png"; // Central Heating icon
import ITSystemsIcon from "../images/it-systems.png"; // IT Systems icon
import PlumberIcon from "../images/plumber.png"; // Plumber icon
import BathroomsIcon from "../images/bathrooms.png"; // Bathrooms icon
import CurtainIcon from "../images/curtain.png"; // Curtain / Blind Fitters icon
import GlassIcon from "../images/glass.png"; // Glass icon
import JoinerIcon from "../images/joiner.png"; // Joiner icon
import KitchensIcon from "../images/kitchens.png"; // Kitchens icon
import PainterIcon from "../images/painter.png"; // Painter / Decorator icon
import PlastererIcon from "../images/plasterer.png"; // Plasterer icon
import TilerIcon from "../images/tiler.png"; // Tiler icon
import DampProoferIcon from "../images/damp-proofer.png"; // Damp Proofer icon
import DrainageIcon from "../images/drainage.png"; // Drainage icon
import FasciaIcon from "../images/fascia.png"; // Fascia / Soffits icon
import UPVCIcon from "../images/upvc.png"; // UPVC Windows icon
import RooferIcon from "../images/roofer.png"; // Roofer icon
import ScaffoldingIcon from "../images/scaffolding.png"; // Scaffolding icon
import RoughcasterRendererIcon from "../images/roughcaster-renderer.png"; // Roughcaster & Renderer icon
import StoneWorkIcon from "../images/stonework.png"; // Stone Work icon
import WeatherCoatingsIcon from "../images/weather-coatings.png"; // Weather Coatings icon
import ConservatoriesIcon from "../images/conservatories.png"; // Conservatories icon
import FencingIcon from "../images/fencing.png"; // Fencing / Gates icon
import LandscapingIcon from "../images/landscaping.png"; // Landscaping icon
import TreeSurgeonIcon from "../images/tree-surgeon.png"; // Tree Surgeon icon
import CleanerIcon from "../images/cleaner.png"; // Cleaner icon
import ExteriorCleaningIcon from "../images/exterior-cleaning.png"; // Exterior Cleaning icon
import WasteIcon from "../images/waste.png"; // Waste / Clearance icon
import PestControlIcon from "../images/pest-control.png"; // Pest Control icon
import PoweredAccessIcon from "../images/powered-access.png"; // Powered Access icon
import RenewableEnergyIcon from "../images/renewable-energy.png"; // Renewable Energy icon
import StovesIcon from "../images/stoves.png"; // Stoves / Log Burners icon
import TVAerialIcon from "../images/tv-aerial.png"; // TV Aerials icon
import AlarmsSecurityIcon from "../images/alarms-security.png"; // Alarms / Security icon

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
              {/* Alphabetically sorted dropdown options */}
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Alarm / Security Services");
                  setDropdownOpen(false);
                }}
              >
                <img src={AlarmsSecurityIcon} alt="Alarm / Security Services" />
                <span>Alarm / Security Services</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Bathroom Services");
                  setDropdownOpen(false);
                }}
              >
                <img src={BathroomsIcon} alt="Bathroom Services" />
                <span>Bathroom Services</span>
              </div>
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
                <img src={CarpetIcon} alt="Carpet Fitting" />
                <span>Carpet Fitting</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Central Heating");
                  setDropdownOpen(false);
                }}
              >
                <img src={CentralHeatingIcon} alt="Central Heating" />
                <span>Central Heating</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Cleaning Services");
                  setDropdownOpen(false);
                }}
              >
                <img src={CleanerIcon} alt="Cleaning Services" />
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
                  src={ConservatoriesIcon}
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
                <img src={CurtainIcon} alt="Curtain / Blind Fitters" />
                <span>Curtain / Blind Fitters</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Damp Proofer");
                  setDropdownOpen(false);
                }}
              >
                <img src={DampProoferIcon} alt="Damp Proofer" />
                <span>Damp Proofer</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Drainage");
                  setDropdownOpen(false);
                }}
              >
                <img src={DrainageIcon} alt="Drainage" />
                <span>Drainage</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Driveways / Patios");
                  setDropdownOpen(false);
                }}
              >
                <img src={DrivewayIcon} alt="Driveways/Patios" />
                <span>Driveways/Patios</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Electrician");
                  setDropdownOpen(false);
                }}
              >
                <img src={ElectricalIcon} alt="Electrician" />
                <span>Electrician</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Exterior Cleaning");
                  setDropdownOpen(false);
                }}
              >
                <img src={ExteriorCleaningIcon} alt="Exterior Cleaning" />
                <span>Exterior Cleaning</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Fascia / Soffits");
                  setDropdownOpen(false);
                }}
              >
                <img src={FasciaIcon} alt="Fascia / Soffits" />
                <span>Fascia / Soffits</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Fencing / Gates");
                  setDropdownOpen(false);
                }}
              >
                <img src={FencingIcon} alt="Fencing / Gates" />
                <span>Fencing / Gates</span>
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
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Glass");
                  setDropdownOpen(false);
                }}
              >
                <img src={GlassIcon} alt="Glass" />
                <span>Glass</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("IT Systems & Telecommunications");
                  setDropdownOpen(false);
                }}
              >
                <img src={ITSystemsIcon} alt="IT Systems" />
                <span>IT Systems & Telecommunications</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Joiner");
                  setDropdownOpen(false);
                }}
              >
                <img src={JoinerIcon} alt="Joiner" />
                <span>Joiner</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Kitchens");
                  setDropdownOpen(false);
                }}
              >
                <img src={KitchensIcon} alt="Kitchens" />
                <span>Kitchens</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Landscaping");
                  setDropdownOpen(false);
                }}
              >
                <img src={LandscapingIcon} alt="Landscaping" />
                <span>Landscaping</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Painter / Decorator");
                  setDropdownOpen(false);
                }}
              >
                <img src={PainterIcon} alt="Painter / Decorator" />
                <span>Painter / Decorator</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Plasterer");
                  setDropdownOpen(false);
                }}
              >
                <img src={PlastererIcon} alt="Plasterer" />
                <span>Plasterer</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Plumber");
                  setDropdownOpen(false);
                }}
              >
                <img src={PlumberIcon} alt="Plumber" />
                <span>Plumber</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Pest Control");
                  setDropdownOpen(false);
                }}
              >
                <img src={PestControlIcon} alt="Pest Control" />
                <span>Pest Control</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Powered Access");
                  setDropdownOpen(false);
                }}
              >
                <img src={PoweredAccessIcon} alt="Powered Access" />
                <span>Powered Access</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Renewable Energy");
                  setDropdownOpen(false);
                }}
              >
                <img src={RenewableEnergyIcon} alt="Renewable Energy" />
                <span>Renewable Energy</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Roofer");
                  setDropdownOpen(false);
                }}
              >
                <img src={RooferIcon} alt="Roofer" />
                <span>Roofer</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Roughcaster & Renderer");
                  setDropdownOpen(false);
                }}
              >
                <img
                  src={RoughcasterRendererIcon}
                  alt="Roughcaster & Renderer"
                />
                <span>Roughcaster & Renderer</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Scaffolding");
                  setDropdownOpen(false);
                }}
              >
                <img src={ScaffoldingIcon} alt="Scaffolding" />
                <span>Scaffolding</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Stone Work");
                  setDropdownOpen(false);
                }}
              >
                <img src={StoneWorkIcon} alt="Stone Work" />
                <span>Stone Work</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Stoves / Log Burners");
                  setDropdownOpen(false);
                }}
              >
                <img src={StovesIcon} alt="Stoves / Log Burners" />
                <span>Stoves / Log Burners</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Tiler");
                  setDropdownOpen(false);
                }}
              >
                <img src={TilerIcon} alt="Tiler" />
                <span>Tiler</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Tree Surgeon");
                  setDropdownOpen(false);
                }}
              >
                <img src={TreeSurgeonIcon} alt="Tree Surgeon" />
                <span>Tree Surgeon</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("UPVC Windows");
                  setDropdownOpen(false);
                }}
              >
                <img src={UPVCIcon} alt="UPVC Windows" />
                <span>UPVC Windows</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Waste / Clearance");
                  setDropdownOpen(false);
                }}
              >
                <img src={WasteIcon} alt="Waste / Clearance" />
                <span>Waste / Clearance</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("Weather Coatings");
                  setDropdownOpen(false);
                }}
              >
                <img src={WeatherCoatingsIcon} alt="Weather Coatings" />
                <span>Weather Coatings</span>
              </div>
              <div
                className="dropdown-option"
                onClick={() => {
                  setService("TV Aerials");
                  setDropdownOpen(false);
                }}
              >
                <img src={TVAerialIcon} alt="TV Aerials" />
                <span>TV Aerials</span>
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
