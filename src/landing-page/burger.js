import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BurgerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference to the entire component

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Listen for mouse clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="burger-dropdown" ref={menuRef}>
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
            <div className="dropdown-burger-divider" />
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
            <div className="dropdown-burger-divider" />
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
              <Link to="/referral" onClick={() => setIsOpen(false)}>
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
