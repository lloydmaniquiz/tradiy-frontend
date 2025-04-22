import React, { useState } from "react";
import Calendar from "react-calendar"; // Import Calendar
import "react-calendar/dist/Calendar.css"; // Default styles
import "../styles/FilterModal.css";
import { FaStar } from "react-icons/fa";

const FilterModal = ({ isOpen, onClose, onApplyFilter }) => {
  const [date, setDate] = useState(new Date());
  const [distance, setDistance] = useState(12);
  const [verified, setVerified] = useState(false);
  const [selectedMinRating, setSelectedMinRating] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Filters</h2>

        {/* Availability Section */}
        <h3>Availability</h3>
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            minDate={new Date()} // Prevent past dates
          />
        </div>

        {/* Star Rating Filter */}
        <h3>Star Rating</h3>
        <div className="star-rating">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label key={stars} className="star-option">
              <input
                type="checkbox"
                onChange={() => setSelectedMinRating(stars)}
                checked={selectedMinRating === stars}
              />
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={i < stars ? "star filled" : "star"}
                />
              ))}
              &nbsp;& Up
            </label>
          ))}
        </div>

        {/* Distance Filter */}
        <h3>Distance</h3>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="50"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
          <span>{distance}mi</span>
        </div>

        {/* Verified Trader Toggle */}
        <h3>Verified Trader</h3>
        <label className="switch">
          <input
            type="checkbox"
            checked={verified}
            onChange={() => setVerified(!verified)}
          />
          <span className="slider round"></span>
        </label>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="clear-button">Clear All</button>
          <button
            className="apply-button"
            onClick={() =>
              onApplyFilter({
                date,
                distance,
                verified,
                minRating: selectedMinRating,
              })
            }
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
