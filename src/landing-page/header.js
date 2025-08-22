import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/Tradiy-Hero-NewLogo.png";
import BurgerDropdown from "./burger.js";
import MenuIcon from "../images/menu-icon.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <div className="mobile-app-banner">Mobile App Coming Soon!</div>
      </header>
      <div className="logo-burger">
        <img src={logo} alt="logo" />
        <BurgerDropdown />
      </div>
      <button
        className="header-menu-button"
        onClick={() => navigate("/menu-page")}
      >
        <img className="header-menu-icon" src={MenuIcon} alt="Menu Icon" />
      </button>
    </>
  );
};

export default Header;
