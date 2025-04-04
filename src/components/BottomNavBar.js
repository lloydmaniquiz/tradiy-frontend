import React from "react";
import { FaHammer } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BottomNavBar.css";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <NavItem
        icon={<FaHammer />}
        label="TRADIY"
        onClick={() => navigate("/")}
        active={location.pathname === "/"}
      />
      <NavItem
        icon={<AiOutlineSetting />}
        label="SERVICES"
        onClick={() => navigate("/directory")}
        active={location.pathname === "/directory"}
      />
      <NavItem
        icon={<HiOutlineMenu />}
        label="MENU"
        onClick={() => navigate("/menu-page")}
        active={location.pathname === "/menu-page"}
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
