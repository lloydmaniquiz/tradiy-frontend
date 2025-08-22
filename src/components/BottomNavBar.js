import React, { useEffect, useState } from "react";
import HammerIconBlue from "../images/hammer-icon-blue.png";
import HammerIconGray from "../images/hammer-icon-gray.png";
import BookmarksBlue from "../images/bookmarks-blue.png";
import BookmarksGray from "../images/bookmarks-gray.png";
import HubBlue from "../images/hub-blue.png";
import HubGray from "../images/hub-gray.png";
import ChatBlue from "../images/chat-blue.png";
import ChatGray from "../images/chat-gray.png";
import SettingsBlue from "../images/settings-blue.png";
import SettingsGray from "../images/settings-gray.png";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/BottomNavBar.css";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token"); // check login
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="bottom-nav">
      {/* Tradiy is always first */}
      <NavItem
        icon={
          <img
            src={location.pathname === "/" ? HammerIconBlue : HammerIconGray}
            alt="Tradiy"
            style={{ width: 24, height: 24 }}
          />
        }
        label="TRADIY"
        onClick={() => navigate("/")}
        active={location.pathname === "/"}
      />

      {isLoggedIn ? (
        <>
          <NavItem
            icon={
              <img
                src={
                  location.pathname === "/bookmarks"
                    ? BookmarksBlue
                    : BookmarksGray
                }
                alt="Bookmarks"
                style={{ width: 24, height: 24 }}
              />
            }
            label="BOOKMARKS"
            onClick={() => navigate("/bookmarks")}
            active={location.pathname === "/bookmarks"}
          />
          <NavItem
            icon={
              <img
                src={location.pathname === "/dashboard" ? HubBlue : HubGray}
                alt="dashboard"
                style={{ width: 24, height: 24 }}
              />
            }
            label="HUB"
            onClick={() => navigate("/dashboard")}
            active={location.pathname === "/dashboard"}
          />
          <NavItem
            icon={
              <img
                src={location.pathname === "/chat" ? ChatBlue : ChatGray}
                alt="Chat"
                style={{ width: 24, height: 24 }}
              />
            }
            label="CHAT"
            onClick={() => navigate("/chat")}
            active={location.pathname === "/chat"}
          />
        </>
      ) : (
        <NavItem
          icon={
            <img
              src={
                location.pathname === "/directory" ? SettingsBlue : SettingsGray
              }
              alt="Services"
              style={{ width: 24, height: 24 }}
            />
          }
          label="SERVICES"
          onClick={() => navigate("/directory")}
          active={location.pathname === "/directory"}
        />
      )}
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
