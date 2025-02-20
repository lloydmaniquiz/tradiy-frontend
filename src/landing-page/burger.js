import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the CSS for styling

const BurgerDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/how-tradiy-works");
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
            <li><a href="/login">Login</a></li>
            <li><a href="/sign-up">Sign Up</a></li>
            <div className="divider"></div>
            <li className="has-submenu">
              HOMEOWNERS
              <ul className="submenu">
              <li>
                <a 
                  href="/how-tradiy-works" 
                  onClick={(e) => { 
                    e.preventDefault(); 
                    handleNavigation();
                  }}
                >
                  Are you a homeowner?
                </a>
              </li>
                <li><a href="/directory">Find a Trade</a></li>
              </ul>
            </li>
            <li className="has-submenu">
              TRADESPEOPLE
              <ul className="submenu">
                <li><a href="/tradiy-benefits">Tradiy Benefits</a></li>
                <li><a href="/sign-up">Be a Tradiy Trader</a></li>
              </ul>
            </li>
            <div className="divider"></div>
            <li><a href="/blogs">Blog</a></li>
            <li><a href="/newsletter">Join our Newsletter</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BurgerDropdown;
