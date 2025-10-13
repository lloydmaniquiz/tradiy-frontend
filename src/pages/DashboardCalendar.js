import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/DashboardCalendar.css";
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardCalendar() {
  const [view, setView] = useState("dayGridMonth");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [title, setTitle] = useState(""); // ✅ calendar title state
  const calendarRef = useRef(null);

  const events = [
    {
      title: "Meeting with Michael",
      start: "2025-09-30T13:30:00",
      end: "2025-09-30T14:00:00",
    },
    { title: "Daisy", start: "2025-09-30T14:00:00" },
    { title: "Lorem Ipsum", start: "2025-09-30T09:00:00" },
  ];

  const handleViewChange = (newView) => {
    setView(newView);
    const api = calendarRef.current.getApi();
    api.changeView(newView);
    setTitle(api.view.title); // ✅ update title when view changes
    setDropdownOpen(false);
  };

  const handleToday = () => {
    const api = calendarRef.current.getApi();
    api.today();
    setTitle(api.view.title); // ✅ update title after navigating
  };

  const handlePrev = () => {
    const api = calendarRef.current.getApi();
    api.prev();
    setTitle(api.view.title); // ✅ update title
  };

  const handleNext = () => {
    const api = calendarRef.current.getApi();
    api.next();
    setTitle(api.view.title); // ✅ update title
  };

  return (
    <>
      <div>
        <h2 className="calendar-top-header">Calendar</h2>
      </div>
      <div className="calendar-page-container">
        <div className="calendar-header">
          <div className="left-controls">
            <button onClick={handlePrev} className="nav-btn">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={handleNext} className="nav-btn">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div className="center-title">{title}</div>
          </div>

          <div className="right-controls">
            <div className="dropdown">
              <button
                className="dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {view === "dayGridMonth"
                  ? "Monthly"
                  : view === "timeGridWeek"
                  ? "Weekly"
                  : "Daily"}{" "}
                <FontAwesomeIcon
                  icon={dropdownOpen ? faChevronUp : faChevronDown}
                  className="dropdown-icon"
                />
              </button>

              {dropdownOpen && (
                <div className="calendar-dropdown-menu">
                  <div onClick={() => handleViewChange("dayGridMonth")}>
                    Monthly
                  </div>
                  <div onClick={() => handleViewChange("timeGridWeek")}>
                    Weekly
                  </div>
                  <div onClick={() => handleViewChange("timeGridDay")}>
                    Daily
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleToday} className="today-btn">
              Today
            </button>
            <button className="add-btn">+</button>
          </div>
        </div>

        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          events={events}
          headerToolbar={false}
          datesSet={(arg) => setTitle(arg.view.title)} // ✅ set title on init & changes
        />
      </div>
    </>
  );
}
