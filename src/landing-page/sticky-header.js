import React from 'react';
import '../App.css';
import { useNavigate } from "react-router-dom";
import SearchBar from './search-bar';
import TradiyLogo from "../images/tradiy-navy-seal.png";
import BurgerDropdown from './burger.js';

function StickyHeader() {
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
};
  return (
    <header className="sticky-header visible"> {/* Always apply 'visible' when it is sticky */}
        <img className="tradiy-logo" src={TradiyLogo} alt='Tradiy-Logo' onClick={home}/>
        <SearchBar className="sticky-search-bar" />
        <div className='sticky-burger-wrapper'>
            <p>Be a Tradiy Trader</p>
            <BurgerDropdown />
        </div>
    </header>
  );
}

export default StickyHeader;