import React, { forwardRef } from "react";
import "../App.css";
import SearchIcon from '../images/search-white.png';
import SearchDropdown from "../images/search-dropdown.png";
import Divider from "../images/divider.png";

// Forward the ref to the root div of SearchBar component
const SearchBar = forwardRef((props, ref) => {
  return (
    <div className="search-bar" ref={ref}>
      <div className="input-wrapper">
        <div className="dropdown-wrapper">
          <select defaultValue="" className="dropdown">
            <option value="" disabled>
              What service do you need?
            </option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="carpentry">Carpentry</option>
            <option value="painting">Painting</option>
            <option value="landscaping">Landscaping</option>
          </select>
          <img src={SearchDropdown} alt="Dropdown" className="custom-dropdown-icon" />
          <img src={Divider} alt="Dropdown" className="dropdown-divider" />
        </div>
        <input type="text" placeholder="What is your postcode?" />
        <button className="search-button">
          <img src={SearchIcon} alt='🔍'/>
        </button>
      </div>
    </div>
  );
});

export default SearchBar;
