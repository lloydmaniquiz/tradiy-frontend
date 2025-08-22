import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../styles/MenuPage.css";
import TradiyHeroLogo from "../images/tradiy-hero-logo.png";
import DefaultUserImage from "../images/default-sticky.png";

const MenuPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if user is logged in (example: token stored in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="menu-container">
      {/* Menu Header */}
      <div
        className="menu-page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
        }}
      >
        <h2>Menu</h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#423e3e",
          }}
          aria-label="Close Menu"
        >
          &times;
        </button>
      </div>

      {/* Show Guest User only if NOT logged in */}
      {!isLoggedIn && (
        <div className="guest-user-button">
          <img src={DefaultUserImage} alt="Guest" className="guest-avatar" />
          <span className="guest-name">Guest User</span>
          <a href="#/login" className="login-signup">
            Login / Sign Up
          </a>
        </div>
      )}

      <MenuSection title="Homeowners">
        <MenuItem label="Are you a homeowner?" link="#/how-tradiy-works" />
      </MenuSection>

      <MenuSection title="Tradespeople">
        <MenuItem label="Tradiy Benefits" link="#/tradiy-benefits" />
      </MenuSection>

      <MenuSection title="Sources">
        <MenuItem label="Blogs" link="#/blogs" />
        <MenuItem label="Join our Newsletter" link="#/newsletter" />
        <MenuItem label="Site Map" link="#/site-map" />
      </MenuSection>

      <MenuSection title="Support">
        <MenuItem label="Contact Us" link="#/contact-us" />
        <MenuItem label="FAQs" link="#/faqs" />
      </MenuSection>

      <MenuSection title="Legal">
        <MenuItem label="Privacy Policy" link="#/privacy" />
        <MenuItem label="Terms of Service" link="#/terms" />
        <MenuItem label="Trader Code of Conduct" link="#/trader-coc" />
      </MenuSection>

      <footer className="menu-footer">
        <img src={TradiyHeroLogo} alt="Tradify Logo" className="logo" />
        <p>United Kingdom</p>
        <p>© 2025, Tradify. All rights reserved.</p>
      </footer>
    </div>
  );
};

const MenuSection = ({ title, children }) => (
  <div className="menu-section">
    <h3>{title}</h3>
    {children}
  </div>
);

const MenuItem = ({ label, link }) => (
  <a href={link} className="menu-item">
    {label} <AiOutlineArrowRight className="menu-arrow" />
  </a>
);

export default MenuPage;
