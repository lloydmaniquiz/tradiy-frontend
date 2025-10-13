import React, { useState, useRef, useEffect, useMemo } from "react";
import "../styles/DashboardEnquiries.css";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import AttachmentPreview from "../components/AttachmentPreview";

export default function DashboardEnquiries() {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ visit: false, estimate: false });
  const [enquiries, setEnquiries] = useState([]);
  const [traderEmail, setTraderEmail] = useState(null);

  const [selectedEnquiryId, setSelectedEnquiryId] = useState(null);
  const [enquiryDetails, setEnquiryDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const enquiriesPerPage = 10;

  const filterRef = useRef(null);

  // Fetch logged-in user to get traderEmail
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      if (!token || !userId) return;

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setTraderEmail(data.user.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch enquiries list
  useEffect(() => {
    if (!traderEmail) return;
    const fetchEnquiries = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/enquiries/${traderEmail}`
        );
        if (!res.ok) throw new Error("Failed to fetch enquiries");
        const data = await res.json();
        setEnquiries(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEnquiries();
  }, [traderEmail]);

  // Fetch enquiry details when selected
  useEffect(() => {
    if (!selectedEnquiryId) return;

    const fetchEnquiryDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/enquiry/${selectedEnquiryId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch enquiry details");
        const data = await res.json();

        setEnquiryDetails(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEnquiryDetails();
  }, [selectedEnquiryId]);

  // Outside click handler for filters
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEnquiries = useMemo(() => {
    const q = search.trim().toLowerCase();
    const hasTypeFilter = filters.visit || filters.estimate;

    return enquiries
      .filter((e) => e.status === "Pending") // ✅ Only pending
      .filter((e) => {
        const matchType =
          !hasTypeFilter ||
          (filters.visit && e.type === "Quote Visit") ||
          (filters.estimate && e.type === "Quote Estimate");

        const matchSearch =
          q.length === 0 ||
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q);

        return matchType && matchSearch;
      });
  }, [search, filters, enquiries]);

  // Pagination
  const totalPages = Math.ceil(filteredEnquiries.length / enquiriesPerPage);
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * enquiriesPerPage,
    currentPage * enquiriesPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  // ✅ Update enquiry status (Accept/Reject)
  async function updateEnquiryStatus(id, newStatus) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/enquiry/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }), // ✅ must be JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update enquiry status");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  }

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

      {/* LIST VIEW */}
      {!selectedEnquiryId && (
        <div className="enquiries-card">
          <div className="enquiries-header">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
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
                        setFilters((f) => ({
                          ...f,
                          estimate: e.target.checked,
                        }))
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
                        setCurrentPage(1);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="enquiries-list">
            {paginatedEnquiries.map((enquiry) => (
              <div
                key={enquiry.quoteNumber}
                className="enquiry-item"
                onClick={async () => {
                  // 1️⃣ Mark as read locally
                  setEnquiries((prev) =>
                    prev.map((e) =>
                      e.quoteNumber === enquiry.quoteNumber
                        ? { ...e, unread: 0 }
                        : e
                    )
                  );

                  // 2️⃣ Set selected enquiry
                  setSelectedEnquiryId(enquiry.quoteNumber);

                  // 3️⃣ Persist read status in backend
                  try {
                    const token = localStorage.getItem("token");
                    await fetch(
                      `${process.env.REACT_APP_API_URL}/enquiry/${enquiry.quoteNumber}/read`,
                      {
                        method: "PUT",
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                  } catch (err) {
                    console.error("Failed to mark enquiry as read:", err);
                  }
                }}
              >
                <div className="enquiry-dot-type">
                  {/* Convert unread from 0/1 to boolean */}
                  {Boolean(enquiry.unread) && (
                    <span className="unread-dot"></span>
                  )}
                  <span
                    className={`badge ${
                      enquiry.type === "Quote Visit"
                        ? "badge-blue"
                        : "badge-pink"
                    }`}
                  >
                    {enquiry.type}
                  </span>
                </div>

                <div className="enquiry-info">
                  <p className="enquiry-name">{enquiry.name}</p>
                  <p className="enquiry-email">{enquiry.email}</p>
                </div>
                <p className="enquiry-date">{enquiry.date}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                className="pagination-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                &#8592; Previous
              </button>
              <div className="pagination-info">
                Page <span>{currentPage}</span> of <span>{totalPages}</span>
              </div>
              <button
                className="pagination-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next &#8594;
              </button>
            </div>
          )}
        </div>
      )}

      {/* DETAIL VIEW */}
      {selectedEnquiryId && (
        <div className="enquiries-detail-card">
          <div className="detail-header">
            <button
              className="chev-back-btn"
              onClick={() => {
                setSelectedEnquiryId(null);
                setEnquiryDetails(null);
              }}
            >
              <FaChevronLeft size={24} />
            </button>
            <h2>{enquiryDetails?.type}</h2>
          </div>

          {!enquiryDetails ? (
            <p>Loading details...</p>
          ) : (
            <>
              <p>
                <strong>{enquiryDetails.name}</strong>
              </p>
              <p>{enquiryDetails.email}</p>
              <p>{enquiryDetails.phone}</p>

              <h3>Appointment Details</h3>
              <p>Date: {enquiryDetails.date}</p>
              <p>Time: {enquiryDetails.time}</p>

              <h3>Project Details</h3>
              <p>Service Type: {enquiryDetails.serviceType}</p>
              <p>Postcode: {enquiryDetails.postCode}</p>
              <p>Timeline: {enquiryDetails.timeline}</p>
              <p>Description: {enquiryDetails.description}</p>

              {enquiryDetails.attachments?.length > 0 && (
                <AttachmentPreview attachments={enquiryDetails.attachments} />
              )}

              <div className="detail-actions">
                <button
                  className="reject-btn"
                  onClick={
                    () => updateEnquiryStatus(selectedEnquiryId, "Declined") // ✅ pass id
                  }
                >
                  Reject Booking
                </button>
                <button
                  className="accept-btn"
                  onClick={
                    () => updateEnquiryStatus(selectedEnquiryId, "Accepted") // ✅ pass id
                  }
                >
                  Accept Booking
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
