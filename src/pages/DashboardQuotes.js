import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardQuotes.css";
import { FaChevronDown } from "react-icons/fa";
import AcceptedIcon from "../images/accepted.png";
import PendingIcon from "../images/pending.png";
import ConvertedIcon from "../images/converted.png";
import QuoteDetailsDrawer from "../components/QuoteDetailsDrawer";
import AddQuoteForm from "../components/AddQuoteForm";
import QuoteDetails from "./QuoteDetails";

export default function DashboardQuotes() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const itemsPerPageHome = 12;

  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [homeownerStatusFilter, setHomeownerStatusFilter] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch user email
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      if (!token || !userId) return;

      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setUserEmail(data.user.email);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch quotes
  useEffect(() => {
    if (!userEmail) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const endpoint =
      role === "Trader"
        ? `/quotes/${userEmail}` // Quotes for trader
        : `/quotes/sent/${userEmail}`; // Quotes sent by homeowner

    fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setQuotes(data);
        else setQuotes([]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching quotes:", err);
        setQuotes([]);
        setLoading(false);
      });
  }, [userEmail, role]);

  // Filter quotes
  const filteredQuotes =
    role === "Trader"
      ? quotes.filter((q) => {
          const status = q.status?.trim().toLowerCase();
          const tab = activeTab.toLowerCase();
          return status === tab;
        })
      : quotes.filter((q) => {
          if (homeownerStatusFilter === "All") return true;
          const status = q.status?.trim().toLowerCase();
          const filter = homeownerStatusFilter.toLowerCase();
          return status === filter;
        });

  // Pagination (Trader)
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredQuotes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // === SHOW ONLY FULL QUOTE DETAILS ===
  if (showFullDetails && selectedQuote) {
    return (
      <QuoteDetails
        quote={selectedQuote}
        onBack={() => {
          setShowFullDetails(false);
          setSelectedQuote(null);
        }}
      />
    );
  }

  // === DASHBOARD VIEW ===
  return (
    <div className="db-quotes-container">
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">
          {showAddForm ? "Create New Quote" : "Quotes"}
        </h1>
        {!showAddForm && (
          <div className="db-quotesheader-select-wrapper">
            <select className="db-quotesheader-select">
              <option>Business Name 1</option>
              <option>Business Name 2</option>
              <option>Business Name 3</option>
            </select>
            <FaChevronDown className="db-quotesheader-icon" />
          </div>
        )}
      </div>

      {!showAddForm && (
        <div className="db-quotes-stats">
          {["Accepted", "Pending", "Converted"].map((status) => {
            const count = quotes.filter(
              (q) => q.status?.trim().toLowerCase() === status.toLowerCase()
            ).length;
            let icon;
            if (status === "Accepted") icon = AcceptedIcon;
            if (status === "Pending") icon = PendingIcon;
            if (status === "Converted") icon = ConvertedIcon;
            return (
              <div className="db-quotes-item" key={status}>
                <div className="db-quotes-icon">
                  <img src={icon} alt={status} />
                  <h4>{status}</h4>
                </div>
                <p className="db-quotes-number">{count}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="db-quotes-main-container">
        {/* Toolbar */}
        {!showAddForm && (
          <div className="db-quotes-toolbar">
            <input
              type="text"
              placeholder="Search"
              className="db-quotes-search"
            />
            <button
              className="db-quotes-add-btn"
              onClick={() => setShowAddForm(true)}
            >
              + Add Quote
            </button>
          </div>
        )}

        {/* Tabs */}
        {!showAddForm && (
          <div className="db-quotes-tabs">
            {["Pending", "Accepted", "Converted", "Declined"].map((tab) => (
              <button
                key={tab}
                className={`db-quotes-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Table / Form */}
        <div className="db-quotes-table-wrapper">
          {loading ? (
            <p>Loading quotes...</p>
          ) : showAddForm ? (
            <AddQuoteForm
              onSave={(data) => {
                setQuotes((prev) => [
                  { ...data, id: Date.now(), status: "Pending" },
                  ...prev,
                ]);
                setShowAddForm(false);
              }}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <table className="db-quotes-table">
              <thead>
                <tr>
                  <th>Quote ID</th>
                  <th>Customer Name</th>
                  <th>Request Type</th>
                  <th>Date Created</th>
                  {activeTab === "Pending" && <th>Status</th>}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((q) => (
                  <tr
                    key={q.id}
                    className="clickable-row"
                    onClick={() => setSelectedQuote(q)} // opens drawer
                  >
                    <td>{q.quoteNumber}</td>
                    <td>{q.homeOwnerName}</td>
                    <td>
                      {q.quoteNumber?.startsWith("Q")
                        ? "Quote Estimate"
                        : q.quoteNumber?.startsWith("B")
                        ? "Quote Visit"
                        : "Unknown"}
                    </td>
                    <td>
                      {new Date(q.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    {activeTab === "Pending" && (
                      <td>
                        <span
                          className={`db-quotes-status ${q.status?.toLowerCase()}`}
                        >
                          ● {q.status}
                        </span>
                      </td>
                    )}
                    <td>...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Drawer */}
          {!showFullDetails && selectedQuote && (
            <QuoteDetailsDrawer
              quote={selectedQuote}
              onClose={() => setSelectedQuote(null)}
              onOpenFullDetails={(quote) => {
                setShowFullDetails(true);
                setSelectedQuote(quote);
              }}
            />
          )}
        </div>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="db-quotes-pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`db-quotes-page ${
                currentPage === i + 1 ? "active" : ""
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
