import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/DashboardHome.css";

export default function DashboardHome() {
  const [date, setDate] = useState(new Date());

  // Demo data
  const stats = {
    enquiries: 12,
    quotes: 12,
    jobs: 12,
    clients: 12,
  };

  const todos = [
    {
      id: 1,
      title: "Certificate Name A",
      subtitle: "Business Workbench - Certificates",
      status: "EXPIRED",
    },
    {
      id: 2,
      title: "QT-ABCD-1234",
      subtitle: "Cameron Turner",
      status: "PENDING",
    },
    {
      id: 3,
      title: "JOB-1234",
      subtitle: "Corey Taylor",
      status: "TO INVOICE",
    },
    {
      id: 4,
      title: "QT-EFGH-5678",
      subtitle: "Sebastian Edwards",
      status: "DECLINED",
    },
    {
      id: 5,
      title: "QT-IJKL-9012",
      subtitle: "Oliver Wilkinson",
      status: "OPEN",
    },
  ];

  const invoices = [
    {
      id: "INV-D-141-516",
      name: "Caitlin Edwards",
      date: "25 Jan 2025",
      status: "OVERDUE",
    },
    {
      id: "INV-D-141-516",
      name: "Caitlin Edwards",
      date: "25 Jan 2025",
      status: "OVERDUE",
    },
    {
      id: "INV-D-141-516",
      name: "Caitlin Edwards",
      date: "25 Jan 2025",
      status: "PAID",
    },
    {
      id: "INV-D-141-516",
      name: "Caitlin Edwards",
      date: "25 Jan 2025",
      status: "PAID",
    },
    {
      id: "INV-D-141-516",
      name: "Caitlin Edwards",
      date: "25 Jan 2025",
      status: "PAID",
    },
  ];

  const bookings = [
    {
      time: "9:00",
      name: "Sofia Kennedy",
      job: "JOB-1234",
      address: "29d Harbour Place, Ardrossan, KA22 8BU",
    },
    {
      time: "10:30",
      name: "Ella Robinson",
      job: "QT-IKL-1234",
      address: "29d Harbour Place, Ardrossan, KA22 8BU",
    },
    {
      time: "14:00",
      name: "Reece Jones",
      job: "JOB-5678",
      address: "29d Harbour Place, Ardrossan, KA22 8BU",
    },
    {
      time: "15:30",
      name: "Kiera Campbell",
      job: "QT-ABCD-7890",
      address: "29d Harbour Place, Ardrossan, KA22 8BU",
    },
  ];

  // Booking dates to highlight
  const bookingDates = [
    new Date(2024, 11, 21),
    new Date(2024, 11, 22),
    new Date(2024, 11, 24),
    new Date(2024, 11, 26),
    new Date(2024, 11, 27),
    new Date(2024, 11, 31),
  ];

  const tileClassName = ({ date }) => {
    if (bookingDates.find((d) => d.toDateString() === date.toDateString())) {
      return "highlight-date";
    }
    return null;
  };

  return (
    <div className="dashboard-container">
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
            To get the most out of Tradiy Hero, complete your profile so clients
            can find and trust you.
          </p>
        </div>
      </section>
      {/* Stats Cards */}
      <section className="stats-card">
        <div className="stat-item">
          <div className="stat-top">
            <div className="stat-icon">
              <i className="fas fa-comments"></i>
            </div>
            <span className="stat-title">Enquiries</span>
          </div>
          <span className="stat-value">{stats.enquiries}</span>
        </div>

        <div className="stat-item">
          <div className="stat-top">
            <div className="stat-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <span className="stat-title">Quotes</span>
          </div>
          <span className="stat-value">{stats.quotes}</span>
        </div>

        <div className="stat-item">
          <div className="stat-top">
            <div className="stat-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <span className="stat-title">Jobs</span>
          </div>
          <span className="stat-value">{stats.jobs}</span>
        </div>

        <div className="stat-item">
          <div className="stat-top">
            <div className="stat-icon">
              <i className="fas fa-handshake"></i>
            </div>
            <span className="stat-title">Clients</span>
          </div>
          <span className="stat-value">{stats.clients}</span>
        </div>
      </section>

      {/* To-do & Invoices */}
      <section className="grid-two">
        <div className="card">
          <h3>
            <i className="fas fa-tasks"></i> To-do List
          </h3>
          <ul className="todo-list">
            {todos.map((item) => (
              <li key={item.id} className="todo-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.subtitle}</p>
                </div>
                <span
                  className={`status-badge ${item.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>
            <i className="fas fa-file-invoice"></i> Invoices
          </h3>
          <ul className="invoice-list">
            {invoices.map((inv, i) => (
              <li key={i} className="invoice-item">
                <span
                  className={`invoice-status ${inv.status.toLowerCase()}`}
                ></span>
                <div>
                  <strong>
                    {inv.id}: {inv.name}
                  </strong>
                  <p>Service Name - Location</p>
                </div>
                <span className="invoice-date">{inv.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Availability */}
      <section className="availability-card">
        <h3>
          <i className="fas fa-calendar-alt"></i> Your Availability
        </h3>
        <p className="availability-subtext">
          Click on days in the calendar below to quickly toggle your
          availability for work, client visits etc.
        </p>
        <div className="availability-grid">
          <div className="availability-info">
            <h4>{date.toDateString()}</h4>
            {bookings.map((b, i) => (
              <div key={i} className="booking-item">
                <div className="booking-details">
                  <strong>{b.name}</strong>
                  <p>
                    {b.job} <br /> {b.address}
                  </p>
                </div>
                <span className="booking-time">{b.time}</span>
              </div>
            ))}
          </div>

          <div className="availability-calendar">
            <Calendar
              value={date}
              onChange={setDate}
              tileClassName={tileClassName}
            />
            <div className="update-link">Update Availability</div>
          </div>
        </div>
      </section>
    </div>
  );
}
