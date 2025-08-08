import React from "react";
import HammerIconBlue from "../images/hammer-icon-blue.png"
import HammerIconGray from "../images/hammer-icon-gray.png"
import SettingsBlue from "../images/settings-blue.png"
import SettingsGray from "../images/settings-gray.png"
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BottomNavBar.css";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <NavItem
        icon={<img src={location.pathname === "/" ? HammerIconBlue : HammerIconGray} alt="Hammer" style={{ width: 24, height: 24 }} />}
        label="TRADIY"
        onClick={() => navigate("/")}
        active={location.pathname === "/"}
      />
      <NavItem
        icon={<img src={location.pathname === "/directory" ? SettingsBlue : SettingsGray} alt="Hammer" style={{ width: 24, height: 24 }} />}
        label="SERVICES"
        onClick={() => navigate("/directory")}
        active={location.pathname === "/directory"}
      />
    </div>
  );
};

const NavItem = ({ icon, label, onClick, active }) => {
  return (
    <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
      {icon}
      <span>{label}</span>
    </div>
  );
};

export default BottomNavBar;
