import React, { useState } from "react";
import "../App.css";
import dropDownOpen from "../images/up-gray.png";
import dropDownClosed from "../images/down-gray.png";

const LocalTrades = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const handleItemClick = (item) => {
    console.log(`You selected: ${item}`);
  };

  return (
    <div className="local-trades-dropdown-container">
      <button
        className={`local-trades-dropdown ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}
      >
        <p>View Local Trades in your Area</p>
        <img
          src={isOpen ? dropDownOpen : dropDownClosed} // Toggle image based on isOpen state
          alt="Dropdown indicator"
          className="dropdown-indicator"
        />
      </button>
      {isOpen && (
        <div className="local-trades-dropdown">
          <ul>
            <li
              onClick={() => {
                handleItemClick("Ayrshire");
              }}
            >
              Ayrshire
            </li>
            <li
              onClick={() => {
                handleItemClick("Glasgow");
              }}
            >
              Glasgow
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocalTrades;
