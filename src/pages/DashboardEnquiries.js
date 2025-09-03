import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/DashboardEnquiries.css";
import { FaChevronDown } from "react-icons/fa";

const enquiries = [
  {
    type: "Quote Visit",
    name: "Joel Fox",
    email: "joelfox@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Visit",
    name: "Georgia Mason",
    email: "georgiamason@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Estimate",
    name: "Scarlett Adams",
    email: "scarlett.adams@email.com",
    date: "19 Jan",
    unread: true,
  },
  {
    type: "Quote Visit",
    name: "Henry Owen",
    email: "henryowen@email.com",
    date: "15 Jan",
  },
  {
    type: "Quote Estimate",
    name: "Oliver Scott",
    email: "oliverscott@email.com",
    date: "15 Jan",
  },
  {
    type: "Quote Estimate",
    name: "George Hunter",
    email: "georgehunter@email.com",
    date: "12 Jan",
  },
  {
    type: "Quote Visit",
    name: "Christopher Mason",
    email: "chrismason@email.com",
    date: "11 Jan",
  },
  {
    type: "Quote Estimate",
    name: "Faith Thompson",
    email: "faith.thompson@email.com",
    date: "10 Jan",
  },
  {
    type: "Quote Visit",
    name: "Laura Harris",
    email: "lauraharris@email.com",
    date: "10 Jan",
  },
  {
    type: "Quote Visit",
    name: "Finley Phillips",
    email: "finleyphillips@email.com",
    date: "07 Jan",
  },
];

export default function DashboardEnquiries() {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    visit: false,
    estimate: false,
  });

  const filterRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute filtered list
  const filteredEnquiries = useMemo(() => {
    const q = search.trim().toLowerCase();
    const hasTypeFilter = filters.visit || filters.estimate;

    return enquiries.filter((e) => {
      // type filter
      const matchType =
        !hasTypeFilter ||
        (filters.visit && e.type === "Quote Visit") ||
        (filters.estimate && e.type === "Quote Estimate");

      // search filter (name or email)
      const matchSearch =
        q.length === 0 ||
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q);

      return matchType && matchSearch;
    });
  }, [search, filters]);

  return (
    <div className="enquiries-container">
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Enquiries</h1>

        <div className="db-quotesheader-select-wrapper">
          <select className="db-quotesheader-select">
            <option>Business Name 1</option>
            <option>Business Name 2</option>
            <option>Business Name 3</option>
          </select>
          <FaChevronDown className="db-quotesheader-icon" />
        </div>
      </div>
      <div className="enquiries-card">
        <div className="enquiries-header">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filter-wrapper" ref={filterRef}>
            <button
              className="filter-button"
              onClick={() => setShowFilters((v) => !v)}
            >
              ⚙ Filters
            </button>

            {showFilters && (
              <div className="filter-dropdown">
                <p className="filter-title">Filter by Enquiry Type</p>

                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.visit}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, visit: e.target.checked }))
                    }
                  />
                  Quote Visit
                </label>

                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.estimate}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, estimate: e.target.checked }))
                    }
                  />
                  Quote Estimate
                </label>
                <div className="enq-filter-btns">
                  <button
                    className="enq-apply-button"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filter
                  </button>
                  <button
                    className="enq-clear-button"
                    onClick={() => {
                      setFilters({ visit: false, estimate: false });
                      setSearch("");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enquiries List */}
        <div className="enquiries-list">
          {filteredEnquiries.map((enquiry, idx) => (
            <div key={idx} className="enquiry-item">
              {/* Dot + Type */}
              <div className="enquiry-dot-type">
                {enquiry.unread && <span className="unread-dot"></span>}
                <span
                  className={`badge ${
                    enquiry.type === "Quote Visit" ? "badge-blue" : "badge-pink"
                  }`}
                >
                  {enquiry.type}
                </span>
              </div>

              {/* Name + Email */}
              <div className="enquiry-info">
                <p className="enquiry-name">{enquiry.name}</p>
                <p className="enquiry-email">{enquiry.email}</p>
              </div>

              {/* Date */}
              <p className="enquiry-date">{enquiry.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
