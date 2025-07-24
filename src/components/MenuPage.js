import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../styles/MenuPage.css";
import TradiyLogoLion from "../images/tradiy-lion.png";
import TradiyHeroLogo from "../images/tradiy-hero-logo.png";

const MenuPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    return null; // Hide the component if the screen is wider than 1024px
  }

  return (
    <div className="menu-container">
      <h2>Menu</h2>

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
        <p>© 2024, Tradify. All rights reserved.</p>
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
