import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import TradiyLogo from "../images/tradiy-hero-logo.png";
import FastForward from "../images/fast-forward.png";
import ArrowUp from "../images/arrow-up.png";
import ArrowDown from "../images/arrow-down.png";
import Divider from "../landing-page/divider";
import BellIcon from "../images/bell.png";
import SettingsIcon from "../images/settings.png";
import defaultPhoto from "../images/default-user.png";
import DashboardIcon from "../images/db.png";
import CalendarIcon from "../images/calendar.png";
import ChatIcon from "../images/chats.png";
import QAIcon from "../images/qa.png";
import QuotesIcon from "../images/quotes.png";
import JobsIcon from "../images/jobs.png";
import InvoicesIcon from "../images/clients-blue.png";
import ReviewsIcon from "../images/reviews.png";
import ReferralsIcon from "../images/referrals.png";
import EnquiriesIcon from "../images/enq.png";
import CustomersIcon from "../images/clients-blue.png";
import PaymentsIcon from "../images/payments.png";
import ReportsIcon from "../images/reports.png";

export default function Dashboard({ user }) {
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const role = localStorage.getItem("role") || "";
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation(); // 👈 get current route
  const isChatRoute = location.pathname.includes("/chat"); // 👈 true on /dashboard/chat
  const navigate = useNavigate(); // 👈

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) return;

        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        console.log("Fetched userData:", data); // ✅ log the user data
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      console.warn("No token or user_id found. Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatTime = (date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const toggleWorkbench = () => {
    setWorkbenchOpen((prev) => !prev);
  };
  const toggleHelpdesk = () => setIsHelpdeskOpen((prev) => !prev);

  // Example notifications
  const notifications = [
    { id: 1, message: "New booking request" },
    { id: 2, message: "Your profile was updated" },
    { id: 3, message: "Reminder: Meeting tomorrow" },
  ];

  return (
    <div className={`dashboard ${isChatRoute ? "chat-mode" : ""}`}>
      {/* Header */}
      <header className="main-header">
        <div className="header-left">
          <img src={TradiyLogo} alt="Tradiy Hero logo" width="56" />
        </div>
        <div className="header-right">
          <div className="header-right">
            <div className="notification-wrapper" ref={dropdownRef}>
              <button
                className="icon-button"
                onClick={() => setOpen((prev) => !prev)}
              >
                <img src={BellIcon} alt="Notifications" className="icon-img" />
                <span className="notification-dot"></span>
              </button>

              {open && (
                <div className="notification-dropdown">
                  <h4>Notifications</h4>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((n) => (
                        <li key={n.id}>{n.message}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No notifications</p>
                  )}
                </div>
              )}
            </div>

            <button className="icon-button">
              <img src={SettingsIcon} alt="Settings" className="icon-img" />
            </button>
          </div>
          <button className="profile-button">
            <img
              src={userData?.profile?.profilePicture || defaultPhoto}
              alt={`Profile of ${
                userData?.profile?.businessOwner ||
                userData?.user?.username ||
                "User"
              }`}
              width="32"
              height="32"
              className="profile-avatar-dropdown"
            />
            <span>
              {userData?.profile?.businessOwner ||
                userData?.user?.username ||
                "Guest"}
            </span>
            <i className="fas fa-chevron-down profile-chevron"></i>
          </button>
        </div>
      </header>

      {/* Layout Below Header */}
      <div className={`layout-below-header ${isChatRoute ? "no-sidebar" : ""}`}>
        {!isChatRoute && (
          <>
            {/* Sidebar */}
            <aside className="sidebar">
              <div className="sidebar-header">
                <h2 className="sidebar-title">
                  {role === "Trader" ? "TRADER HUB" : "CUSTOMER HUB"}
                </h2>
                <img
                  src={FastForward}
                  alt="Collapse"
                  className="sidebar-icon"
                />
              </div>

              <nav className="sidebar-nav">
                {role === "Trader" && (
                  <NavLink
                    to="quick-actions"
                    className={({ isActive }) =>
                      isActive ? "db-nav-item active" : "db-nav-item"
                    }
                  >
                    <img src={QAIcon} alt="Dashboard" className="nav-icon" />
                    <span className="label">Quick Action</span>
                  </NavLink>
                )}
                {/* Common links */}
                <NavLink
                  to="dashboard-home"
                  end
                  className={({ isActive }) =>
                    isActive ? "db-nav-item active" : "db-nav-item"
                  }
                >
                  <img
                    src={DashboardIcon}
                    alt="Dashboard"
                    className="nav-icon"
                  />
                  <span className="label">Dashboard</span>
                </NavLink>
                <NavLink
                  to="calendar"
                  className={({ isActive }) =>
                    isActive ? "db-nav-item active" : "db-nav-item"
                  }
                >
                  <img
                    src={CalendarIcon}
                    alt="Dashboard"
                    className="nav-icon"
                  />
                  <span className="label">Calendar</span>
                </NavLink>
                <NavLink
                  to="chat"
                  className={({ isActive }) =>
                    isActive ? "db-nav-item active" : "db-nav-item"
                  }
                >
                  <img src={ChatIcon} alt="Dashboard" className="nav-icon" />
                  <span className="label">Chat</span>
                </NavLink>
                <Divider />

                {/* Trader Menu */}
                {role === "Trader" && (
                  <>
                    <NavLink
                      to="enquiries"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={EnquiriesIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Enquiries</span>
                    </NavLink>

                    <button className="db-nav-item" onClick={toggleWorkbench}>
                      <div className="text-button-wrapper">
                        <span className="helpdesk-text">Workbench</span>
                        <img
                          src={workbenchOpen ? ArrowDown : ArrowUp}
                          alt="Toggle Arrow"
                          className="helpdesk-arrow"
                        />
                      </div>
                    </button>
                    {workbenchOpen && (
                      <div className="submenu">
                        <NavLink
                          to="workbench/profile"
                          className={({ isActive }) =>
                            isActive ? "db-nav-item active" : "db-nav-item"
                          }
                        >
                          <span className="label">Profile</span>
                        </NavLink>
                        <NavLink
                          to="workbench/business"
                          className={({ isActive }) =>
                            isActive ? "db-nav-item active" : "db-nav-item"
                          }
                        >
                          <span className="label">Business</span>
                        </NavLink>
                      </div>
                    )}

                    <NavLink
                      to="quotes"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={QuotesIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Quotes</span>
                    </NavLink>
                    <NavLink
                      to="jobs"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={JobsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Jobs</span>
                    </NavLink>
                    <NavLink
                      to="clients"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={CustomersIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Customers</span>
                    </NavLink>
                    <NavLink
                      to="payments"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={PaymentsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Payments</span>
                    </NavLink>
                    <NavLink
                      to="reviews"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={ReviewsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Reviews</span>
                    </NavLink>
                    <NavLink
                      to="reports"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={ReportsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Reports</span>
                    </NavLink>

                    <Divider />
                  </>
                )}

                {/* Homeowner Menu */}
                {role === "Homeowner" && (
                  <>
                    <NavLink
                      to="quotes"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={QuotesIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Quotes</span>
                    </NavLink>
                    <NavLink
                      to="jobs"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={JobsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Jobs</span>
                    </NavLink>
                    <NavLink
                      to="invoices"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={InvoicesIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Invoices</span>
                    </NavLink>
                    <NavLink
                      to="reviews"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <img
                        src={ReviewsIcon}
                        alt="Dashboard"
                        className="nav-icon"
                      />
                      <span className="label">Reviews</span>
                    </NavLink>
                  </>
                )}

                {/* Shared Helpdesk + Referrals */}
                <button
                  className="db-nav-item helpdesk-button"
                  onClick={toggleHelpdesk}
                >
                  <div className="text-button-wrapper">
                    <span className="helpdesk-text">Helpdesk</span>
                    <img
                      src={isHelpdeskOpen ? ArrowDown : ArrowUp}
                      alt="Toggle Arrow"
                      className="helpdesk-arrow"
                    />
                  </div>
                </button>
                {isHelpdeskOpen && (
                  <div className="submenu">
                    <NavLink
                      to="helpdesk/tickets"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <span className="label">Tickets</span>
                    </NavLink>
                    <NavLink
                      to="helpdesk/resources"
                      className={({ isActive }) =>
                        isActive ? "db-nav-item active" : "db-nav-item"
                      }
                    >
                      <span className="label">Resources</span>
                    </NavLink>
                  </div>
                )}
                <NavLink
                  to="referrals"
                  className={({ isActive }) =>
                    isActive ? "db-nav-item active" : "db-nav-item"
                  }
                >
                  <img
                    src={ReferralsIcon}
                    alt="Dashboard"
                    className="nav-icon"
                  />
                  <span className="label">Referrals</span>
                </NavLink>

                {/* Homeowner special action at bottom */}
                {role === "Homeowner" && (
                  <div className="find-trader">
                    <button className="find-trader-btn">
                      Find a New Trader
                    </button>
                  </div>
                )}
              </nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main
          className={`main-content ${
            location.pathname.includes("chat") ? "chat-mode" : ""
          }`}
        >
          {!isChatRoute && (
            <section className="top-bar">
              <div className="time-display">
                {formatDate(currentTime)}, {formatTime(currentTime)}
              </div>
            </section>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
