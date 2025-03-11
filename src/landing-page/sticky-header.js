import React from "react";
import "../App.css";
import SearchBar from "./search-bar";
import TradiyLogo from "../images/tradiy-navy-seal.png";
import BurgerDropdown from "./burger.js";
import CarouselSearch from "./carousel-search.js";

function StickyHeader({ handleSearch }) {
  const home = () => {
    window.location.href = "#/";
  };

  return (
    <header className="sticky-header visible">
      <div className="sticky-carousel-wrapper">
        <div className="sticky-wrapper">
          <img
            className="tradiy-logo"
            src={TradiyLogo}
            alt="Tradiy-Logo"
            onClick={home}
          />
          {/* Pass handleSearch to SearchBar */}
          <SearchBar
            className="sticky-search-bar"
            handleSearch={handleSearch}
          />
          <div className="sticky-burger-wrapper">
            <p>Be a Tradiy Trader</p>
            <BurgerDropdown />
          </div>
        </div>
        <div className="sticky-carousel">
          <CarouselSearch handleSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}

export default StickyHeader;
