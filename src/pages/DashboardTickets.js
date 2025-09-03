import React from "react";
import "../styles/DashboardTickets.css";

const tickets = [
  {
    id: "#12345",
    type: "Dispute",
    name: "Inappropriate Review",
    priority: "Low",
    status: "Open",
  },
  {
    id: "#12356",
    type: "Review Flagging",
    name: "Factually Incorrect",
    priority: "Medium",
    status: "Closed",
  },
  {
    id: "#12367",
    type: "Review Flagging",
    name: "Duplicate Review",
    priority: "High",
    status: "Open",
  },
  {
    id: "#12378",
    type: "Review Flagging",
    name: "Unfair Star Rating",
    priority: "Low",
    status: "Open",
  },
  {
    id: "#12389",
    type: "Dispute",
    name: "Inappropriate Review",
    priority: "Low",
    status: "Open",
  },
];

export default function DashboardTickets() {
  const role = localStorage.getItem("role"); // "tradesperson" | "homeowner"

  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h2>{role === "homeowner" ? "My Tickets" : "Tickets Dashboard"}</h2>
        <button className="submit-btn">Submit a Ticket</button>
      </div>

      {/* Filters (visible for both roles, can be customized) */}
      <div className="tickets-filters">
        <span>Ticket Type ⌄</span>
        <span>Ticket Name ⌄</span>
        <span>Priority ⌄</span>
        <span>Status ⌄</span>
      </div>

      {/* Shared Table Layout */}
      <table className="tickets-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Ticket Type</th>
            <th>Ticket Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>{t.name}</td>
              <td>
                <span className={`badge priority-${t.priority.toLowerCase()}`}>
                  {t.priority}
                </span>
              </td>
              <td>
                <span className={`badge status-${t.status.toLowerCase()}`}>
                  {t.status}
                </span>
              </td>
              <td>
                <button className="delete-btn">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="tickets-pagination">
        <button>{"<"}</button>
        <span>1</span>
        <button>{">"}</button>
      </div>
    </div>
  );
}
