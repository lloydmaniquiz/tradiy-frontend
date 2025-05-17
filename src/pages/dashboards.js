import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../styles/Dashboard.css";
import TradiyLogo from "../images/tradiy-hero-logo.png";
import FastForward from "../images/fast-forward.png";
import ArrowUp from "../images/arrow-up.png";
import ArrowDown from "../images/arrow-down.png";

export default function Dashboard() {
  const [workbenchOpen, setWorkbenchOpen] = useState(false);
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="main-header">
        <div className="header-left">
          <img src={TradiyLogo} alt="Tradiy Hero logo" width="56" />
        </div>
        <div className="header-right">
          <button className="icon-button">
            <i className="far fa-bell"></i>
            <span className="notification-dot"></span>
          </button>
          <button className="icon-button">
            <i className="fas fa-cog"></i>
          </button>
          <button className="profile-button">
            <img
              src="https://storage.googleapis.com/a1aa/image/fbf9999e-513e-4e59-c928-36b57757d0d0.jpg"
              alt="Profile of Jacob Butler"
              width="32"
              height="32"
            />
            <span>Jacob Butler</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      </header>

      {/* Layout Below Header */}
      <div className="layout-below-header">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">TRADER HUB</h2>
            <img src={FastForward} alt="Collapse" className="sidebar-icon" />
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="quick-actions"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-bicycle"></i>
              <span className="label">Quick Action</span>
            </NavLink>
            <NavLink
              to="dashboard-home"
              end
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-th-large"></i>
              <span className="label">Dashboard</span>
            </NavLink>
            <NavLink
              to="calendar"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-calendar-alt"></i>
              <span className="label">Calendar</span>
            </NavLink>
            <NavLink
              to="chat"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-comment-alt"></i>
              <span className="label">Chat</span>
            </NavLink>
            <hr class="divider" />
            <NavLink
              to="enquiries"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-question-circle"></i>
              <span className="label">Enquiries</span>
            </NavLink>

            <button className="nav-item" onClick={toggleWorkbench}>
              <div className="text-button-wrapper">
                <span
                  className="helpdesk-text"
                  style={{ marginTop: "6px", marginBottom: "4px" }}
                >
                  Workbench
                </span>
                <img
                  src={workbenchOpen ? ArrowDown : ArrowUp}
                  alt="Toggle Arrow"
                  className="helpdesk-arrow"
                  style={{ marginTop: "6px", marginBottom: "4px" }}
                />
              </div>
            </button>

            {workbenchOpen && (
              <div className="submenu">
                <NavLink
                  to="workbench/profile"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  <i className="fas fa-user"></i>
                  <span className="label">Profile</span>
                </NavLink>
                <NavLink
                  to="workbench/business"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  <i className="fas fa-briefcase"></i>
                  <span className="label">Business</span>
                </NavLink>
              </div>
            )}

            <NavLink
              to="quotes"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-file-alt"></i>
              <span className="label">Quotes</span>
            </NavLink>
            <NavLink
              to="jobs"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-truck"></i>
              <span className="label">Jobs</span>
            </NavLink>
            <NavLink
              to="clients"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-users"></i>
              <span className="label">Clients</span>
            </NavLink>
            <NavLink
              to="payments"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-credit-card"></i>
              <span className="label">Payments</span>
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-star"></i>
              <span className="label">Reviews</span>
            </NavLink>
            <NavLink
              to="reports"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="far fa-chart-bar"></i>
              <span className="label">Reports</span>
            </NavLink>
            <hr class="divider" />
            <button
              className="nav-item helpdesk-button"
              onClick={toggleHelpdesk}
            >
              <div className="text-button-wrapper">
                <span
                  className="helpdesk-text"
                  style={{ marginTop: "6px", marginBottom: "4px" }}
                >
                  Helpdesk
                </span>
                <img
                  src={isHelpdeskOpen ? ArrowDown : ArrowUp}
                  alt="Toggle Arrow"
                  className="helpdesk-arrow"
                  style={{ marginTop: "6px", marginBottom: "4px" }}
                />
              </div>
            </button>
            {isHelpdeskOpen && (
              <div className="submenu">
                <NavLink
                  to="helpdesk/tickets"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  <i className="fas fa-ticket-alt"></i>
                  <span className="label">Tickets</span>
                </NavLink>
                <NavLink
                  to="helpdesk/resources"
                  className={({ isActive }) =>
                    isActive ? "nav-item active" : "nav-item"
                  }
                >
                  <i className="fas fa-book"></i>
                  <span className="label">Resources</span>
                </NavLink>
              </div>
            )}

            <button className="nav-item">
              <i className="fas fa-user-friends"></i>
              Referrals
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <section className="top-bar">
            <div className="time-display">
              {formatDate(currentTime)}, {formatTime(currentTime)}
            </div>
            <form className="search-form">
              <i className="fas fa-search"></i>
              <input type="search" placeholder="Search" />
            </form>
          </section>

          <h1 className="greeting">Good evening, Jacob!</h1>

          <section className="profile-completion">
            <div className="progress-ring">
              <svg viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M48 4a44 44 0 0 1 0 88"
                  stroke="#14B8D6"
                  strokeWidth="10"
                  fill="none"
                />
              </svg>
              <div className="progress-text">
                <span className="percentage">50%</span>
              </div>
            </div>
            <div className="profile-info">
              <h2>Complete your profile</h2>
              <p>
                To get the most out of Tradiy Hero, complete your profile so
                clients can find and trust you.
              </p>
            </div>
          </section>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
