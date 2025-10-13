import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import defaultPhoto from "../images/default-user.png";
import stickyDefaultPhoto from "../images/default-sticky.png";

const BurgerDropdown = ({ showLoginButton = true, isSticky = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null); // store user's photo if available
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Example: Get user photo from localStorage or API
    const photo = localStorage.getItem("userPhoto"); // assume you store photo URL in localStorage
    setUserPhoto(photo || null);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userPhoto");
    setIsLoggedIn(false);
    setUserPhoto(null);
    setIsOpen(false);
    navigate("/login");
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
    <>
      <div
        className="burger-dropdown-wrapper"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        {/* Login button beside burger if not logged in */}
        {/* Only show login button if explicitly allowed */}
        {showLoginButton && !isLoggedIn && (
          <Link to="/login" className="login-button-header">
            Login
          </Link>
        )}

        <div
          className="burger-dropdown"
          ref={menuRef}
          style={{
            display: window.innerWidth <= 1024 ? "none" : "flex", // hide on mobile
            alignItems: "center",
            backgroundColor: isSticky ? "#FDFEFF" : "#F2F4FA",
            padding: "10px 16px 10px 10px",
            borderRadius: "50px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* User photo */}
            <img
              src={userPhoto || (isSticky ? defaultPhoto : stickyDefaultPhoto)}
              alt="User"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0",
              }}
            />

            {/* Burger icon */}
            <button
              className="burger-icon"
              onClick={toggleMenu}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "25px",
                height: "18px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`burger-line ${isOpen ? "open" : ""}`}
                  style={{
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#333",
                    borderRadius: "1px",
                  }}
                />
              ))}
            </button>
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="dropdown-menu">
              <ul>
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
                {isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/dashboard/dashboard-home"
                        className="dashboard-link"
                      >
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
                      <Link
                        to="/how-tradiy-works"
                        onClick={() => setIsOpen(false)}
                      >
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
                      <Link
                        to="/tradiy-benefits"
                        onClick={() => setIsOpen(false)}
                      >
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
      </div>
    </>
  );
};

export default BurgerDropdown;
