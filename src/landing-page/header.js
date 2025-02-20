import React from "react";
import "../App.css";
import logo from "../images/tradiy-navy-seal.png";
import BurgerDropdown from "./burger.js";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="mobile-app-banner">Mobile App Coming Soon!</div>
      </header>
      <div className="logo-burger">
        <img src={logo} alt="logo"/>
        <BurgerDropdown />
      </div>
    </>
  );
};

export default Header;
