import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/MobileHeader.css";
import TradiyLogo from "../images/tradiy-hero-logo.png";
import SearchIcon from "../images/search-navy-blue.png";
import MenuIcon from "../images/menu-icon.png";

function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Define all pages where MobileHeader should NOT appear
  const hiddenPages = ["/menu-page", "/login", "/signup", "/dashboard"]; // Add more paths as needed

  // Do not render the header if the current page is in hiddenPages
  if (hiddenPages.includes(location.pathname)) {
    return null;
  }

  const openSearchPage = () => {
    navigate("/mobile-search"); // Redirect to /mobile-search
  };

  return (
    <header className="mobile-header">
      <img className="logo" src={TradiyLogo} alt="Tradiy Logo" />
      <button className="mobile-search-button" onClick={openSearchPage}>
        <img src={SearchIcon} alt="Search" />
        <span>Search for services...</span>
      </button>
      <img
        className="menu-icon"
        src={MenuIcon}
        alt="Menu Icon"
        onClick={() => navigate("/menu-page")}
      />
    </header>
  );
}

export default MobileHeader;
