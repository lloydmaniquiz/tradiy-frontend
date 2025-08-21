import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const BurgerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token"); // or use context/state if you have it
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate("/login"); // redirect to login page
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            {/* Show Login/Sign Up only if not logged in */}
            {!isLoggedIn && (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Link>
                </li>
                <div className="dropdown-burger-divider" />
              </>
            )}
            {/* Show Dashboard and Bookmarks if logged in */}
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/dashboard" className="dashboard-link">
                    Your Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/bookmarks" className="bookmarks-link">
                    Bookmarks
                  </Link>
                </li>
                <div className="dropdown-burger-divider" />
              </>
            )}
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
                {!isLoggedIn && (
                  <li>
                    <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                      Be a Tradiy Trader
                    </Link>
                  </li>
                )}
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
            {/* Show Logout if logged in */}{" "}
            {isLoggedIn && (
              <li>
                <Link onClick={handleLogout} className="logout-button">
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerDropdown;
