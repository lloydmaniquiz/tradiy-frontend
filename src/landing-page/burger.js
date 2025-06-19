import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import the CSS for styling

const BurgerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-dropdown">
      <button className="burger-icon" onClick={toggleMenu}>
        <div className={`burger-line ${isOpen ? "open" : ""}`} />
        <div className={`burger-line ${isOpen ? "open" : ""}`} />
        <div className={`burger-line ${isOpen ? "open" : ""}`} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link
                to="/login"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/sign-up"
                target="_blank"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </li>
            <div className="divider"></div>
            <li className="has-submenu">
              HOMEOWNERS
              <ul className="submenu">
                <li>
                  <Link to="/how-tradiy-works" onClick={() => setIsOpen(false)}>
                    Are you a homeowner?
                  </Link>
                </li>
                <li>
                  <Link to="/directory" onClick={() => setIsOpen(false)}>
                    Find a Trade
                  </Link>
                </li>
              </ul>
            </li>
            <li className="has-submenu">
              TRADESPEOPLE
              <ul className="submenu">
                <li>
                  <Link to="/tradiy-benefits" onClick={() => setIsOpen(false)}>
                    Tradiy Benefits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sign-up"
                    target="_blank"
                    onClick={() => setIsOpen(false)}
                  >
                    Be a Tradiy Trader
                  </Link>
                </li>
              </ul>
            </li>
            <div className="divider"></div>
            <li>
              <Link to="/blogs" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/newsletter" onClick={() => setIsOpen(false)}>
                Join our Newsletter
              </Link>
            </li>
            <li>
              <Link to="/contact-us" onClick={() => setIsOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/refer-a-trader" onClick={() => setIsOpen(false)}>
                Refer a Trader
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerDropdown;
