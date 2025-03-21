import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MobileHeader.css";
import TradiyLogo from "../images/tradiy-navy-seal.png";
import SearchIcon from "../images/search-navy-blue.png";

function MobileHeader() {
  const navigate = useNavigate();

  const openSearchPage = () => {
    navigate("/mobile-search"); // Redirect to /search
  };

  return (
    <header className="mobile-header">
      <img className="logo" src={TradiyLogo} alt="Tradiy Logo" />
      <button className="mobile-search-button" onClick={openSearchPage}>
        <img src={SearchIcon} alt="Search" />
        <span>Search for services...</span>
      </button>
    </header>
  );
}

export default MobileHeader;
