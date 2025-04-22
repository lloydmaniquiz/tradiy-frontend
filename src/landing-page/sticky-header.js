import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Importing React Router's useLocation
import "../styles/StickyHeader.css";
import SearchBar from "./search-bar";
import TradiyLogo from "../images/tradiy-navy-seal.png";
import BurgerDropdown from "./burger.js";
import CarouselSearch from "./carousel-search.js";
import FilterIcon from "../images/filter.png";
import SearchIcon from "../images/search-navy-blue.png";
import FilterModal from "../components/FilterModal"; // Import the modal

function StickyHeader({
  handleSearch,
  disableAutoScroll,
  showFilterButton,
  handleModalFilter,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation(); // Getting the current route location

  const handleFilter = () => {
    setIsFilterOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterOpen(false);
  };

  // Check if the current pathname contains '/trader/' to detect trader profile pages
  const isTraderProfilePage = location.pathname.includes("/trader/");

  return (
    <header className="sticky-header visible">
      <div className="sticky-carousel-wrapper">
        <div className="sticky-wrapper">
          <img
            className="tradiy-logo"
            src={TradiyLogo}
            alt="Tradiy-Logo"
            onClick={() => (window.location.href = process.env.PUBLIC_URL)}
          />
          <SearchBar
            className="sticky-search-bar"
            handleSearch={handleSearch}
          />

          <div className="sticky-burger-wrapper">
            <p>Be a Tradiy Trader</p>
            <BurgerDropdown />
          </div>
        </div>

        {/* Conditionally apply class if showFilterButton is true */}
        <div
          className="sticky-carousel-container"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {showFilterButton && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  marginRight: "20px",
                }}
              >
                <img style={{ height: "44px" }} src={SearchIcon} alt="Search" />
                <span className="your-search-text">Your Search</span>
              </div>
              <div className="vertical-divider"></div>
            </>
          )}

          {/* Only render CarouselSearch if not on a Trader Profile page */}
          {!isTraderProfilePage && (
            <CarouselSearch
              handleSearch={handleSearch}
              disableAutoScroll={disableAutoScroll}
            />
          )}

          {showFilterButton && (
            <button
              className="filter-button"
              onClick={handleFilter}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img style={{ height: "18px" }} src={FilterIcon} alt="filter" />
              Filters
            </button>
          )}
        </div>
      </div>

      {/* Render Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={closeFilterModal}
        onApplyFilter={(filters) => {
          handleFilter(filters); // Send to SearchResults
          closeFilterModal(); // Close modal after applying
        }}
      />
    </header>
  );
}

export default StickyHeader;
