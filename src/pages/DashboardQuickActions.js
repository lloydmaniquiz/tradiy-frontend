import React from "react";
import "../styles/QuickActionDrawer.css";

const QuickActionDrawer = ({ open, onClose }) => {
  if (!open) return null;

  const actions = [
    "Add Customer",
    "Add Quote",
    "Add Job",
    "Add Invoice",
    "Add Event",
  ];

  return (
    <div className="quickaction-overlay" onClick={onClose}>
      <div
        className="quickaction-drawer"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {actions.map((label, index) => (
          <div key={index} className="quickaction-item">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionDrawer;
