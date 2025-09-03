import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/DashboardHome.css";

export default function DashboardHome() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Example: role is stored like { role: "tradesperson" } or just "tradesperson"
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole.toLowerCase()); // normalize to lowercase
    } else {
      setRole("Trader"); // fallback default
    }
  }, []);

  if (!role) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      {role === "homeowner" ? (
        <HomeownerDashboard />
      ) : (
        <TradespersonDashboard />
      )}
    </div>
  );
}

/* ---------------- Tradesperson Dashboard ---------------- */
function TradespersonDashboard() {
  const [date, setDate] = useState(new Date());

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
    <>
      <h1 className="greeting">Good evening, Jacob!</h1>

      {/* Profile Completion */}
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
        <StatCard
          icon="fas fa-comments"
          title="Enquiries"
          value={stats.enquiries}
        />
        <StatCard icon="fas fa-file-alt" title="Quotes" value={stats.quotes} />
        <StatCard icon="fas fa-briefcase" title="Jobs" value={stats.jobs} />
        <StatCard
          icon="fas fa-handshake"
          title="Clients"
          value={stats.clients}
        />
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
    </>
  );
}

/* ---------------- Homeowner Dashboard ---------------- */
function HomeownerDashboard() {
  const reviews = 12;
  const bookmarks = 12;

  const schedule = [
    {
      id: "JOB-7890",
      title: "Service Type",
      time: "08:00",
      trader: "Ryan Johnson",
    },
    {
      id: "QT-HJKL-0987",
      title: "Quote Visit",
      time: "10:00",
      trader: "Jacob Butler",
    },
    { id: "JOB-5678", title: "Review Job", time: "—", trader: "Evan Watson" },
    {
      id: "QT-OPQR-6789",
      title: "Quote Estimate",
      time: "—",
      trader: "Daniel Hunt",
    },
  ];

  const invoices = [
    {
      id: "INV-D-141-516",
      name: "Service Name A",
      due: "25 January 2025",
      status: "UPCOMING",
    },
    {
      id: "INV-D-141-516",
      name: "Service Name B",
      due: "15 January 2025",
      status: "OVERDUE",
    },
    {
      id: "INV-D-141-516",
      name: "Service Name A",
      due: "25 January 2025",
      status: "PROCESSING",
    },
    {
      id: "INV-D-141-516",
      name: "Service Name B",
      due: "15 January 2025",
      status: "PAID",
    },
  ];

  return (
    <>
      <h1 className="greeting">Good evening, Charlotte!</h1>

      <div className="profile-header">
        <div className="profile-section profile-left">
          <img
            src="/path/to/profile.jpg"
            alt="Charlotte"
            className="profile-avatar"
          />
          <div>
            <h2>Charlotte Knight</h2>
            <p>Member since 2024</p>
            <ul>
              <li>Identity</li>
              <li>Email Address</li>
              <li>Phone Number</li>
            </ul>
          </div>
        </div>

        <div className="profile-section profile-stat">
          <p>Reviews Received</p>
          <span>{reviews}</span>
        </div>

        <div className="profile-section profile-stat">
          <p>Bookmarks</p>
          <span>{bookmarks}</span>
        </div>
      </div>

      <button className="similar-trades-btn">
        Similar Trades in your Area
      </button>

      <div className="grid-two">
        <div className="card">
          <h3>Today's Schedule</h3>
          <ul>
            {schedule.map((item) => (
              <li key={item.id}>
                <strong>
                  {item.id}: {item.title}
                </strong>
                <p>Trader: {item.trader}</p>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Invoices</h3>
          <ul>
            {invoices.map((inv, i) => (
              <li key={i}>
                <span className={`status ${inv.status.toLowerCase()}`}>
                  {inv.status}
                </span>
                <div>
                  <strong>
                    {inv.id}: {inv.name}
                  </strong>
                  <p>Due: {inv.due}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

/* ---------------- Small Reusable Components ---------------- */
function StatCard({ icon, title, value }) {
  return (
    <div className="stat-item">
      <div className="stat-top">
        <div className="stat-icon">
          <i className={icon}></i>
        </div>
        <span className="stat-title">{title}</span>
      </div>
      <span className="stat-value">{value}</span>
    </div>
  );
}
