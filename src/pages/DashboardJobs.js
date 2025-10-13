import React, { useState, useEffect } from "react";
import "../styles/DashboardJobs.css";
import { FaChevronDown } from "react-icons/fa";
import TotalCustomersIcon from "../images/total-customers.png";
import NewCustomersIcon from "../images/new-customers.png";
import LeadsIcon from "../images/leads.png";
import AddJobForm from "../components/AddJobForm";
import JobDetails from "../components/JobDetails"; // Import JobDetails

export default function DashboardJobs() {
  const role = localStorage.getItem("role"); // Trader or Homeowner
  const [userEmail, setUserEmail] = useState("");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("New");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // 🔹 Fetch user email
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

  // 🔹 Fetch jobs after getting email
  useEffect(() => {
    if (!userEmail) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const endpoint =
      role === "Trader" ? `/quotes/${userEmail}` : `/quotes/sent/${userEmail}`;

    const fetchQuotes = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          const convertedJobs = data
            .filter((q) => q.status === "Converted")
            .map((q) => ({
              id: q.quoteNumber,
              customer: q.homeOwnerName,
              service: q.type,
              staff: q.assignedStaff || "Unassigned",
              date: q.createdAt,
              status: "New",
              businessAddress: q.businessAddress || "", // optional
            }));

          setJobsData(convertedJobs);
        } else {
          setJobsData([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setJobsData([]);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [userEmail, role]);

  // 🔹 Filter by tab
  const filteredJobs = jobsData.filter((job) => {
    if (activeTab === "New") return job.status === "New";
    if (activeTab === "In Progress") return job.status === "In Progress";
    if (activeTab === "Completed") return job.status === "Completed";
    return true;
  });

  // 🔹 Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  if (loading) return <p>Loading jobs...</p>;

  // 🔹 If a job is selected, show JobDetails instead of table
  if (selectedJob) {
    return <JobDetails job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  // ✅ Homeowner view
  if (role === "Homeowner") {
    return (
      <div className="db-jobs-home-container">
        <div className="db-jobs-home-header">
          <h2>Jobs</h2>
          <button className="db-jobs-home-filter">⚙ Filters</button>
        </div>
        <div className="db-jobs-home-grid">
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="db-quotes-card clickable-row"
              onClick={() => setSelectedJob(job)}
            >
              <span className="db-quotes-status new">● {job.status}</span>
              <p className="db-jobs-home-small">Job ID</p>
              <h4 className="db-jobs-home-id">{job.id}</h4>
              <p className="db-jobs-home-address">{job.businessAddress}</p>
              <p className="db-jobs-home-date">{job.date}</p>
              <button className="db-jobs-home-action primary">
                Confirm Job
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Tradesperson view
  return (
    <div className="db-jobs-container">
      <div className="db-quotes-header">
        <h1 className="db-quotes-header-title">Jobs</h1>
        <div className="db-quotesheader-select-wrapper">
          <select className="db-quotesheader-select">
            <option>Business Name 1</option>
            <option>Business Name 2</option>
            <option>Business Name 3</option>
          </select>
          <FaChevronDown className="db-quotesheader-icon" />
        </div>
      </div>

      {showAddForm ? (
        <AddJobForm />
      ) : (
        <>
          {/* --- STATS --- */}
          <div className="db-quotes-stats">
            <div className="db-quotes-item">
              <div className="db-quotes-icon">
                <img src={TotalCustomersIcon} alt="New" />
                <h4>New</h4>
              </div>
              <p className="db-quotes-number">{jobsData.length}</p>
            </div>
            <div className="db-quotes-item">
              <div className="db-quotes-icon">
                <img src={NewCustomersIcon} alt="In Progress" />
                <h4>In Progress</h4>
              </div>
              <p className="db-quotes-number">
                {jobsData.filter((j) => j.status === "New").length}
              </p>
            </div>
            <div className="db-quotes-item">
              <div className="db-quotes-icon">
                <img src={LeadsIcon} alt="Completed" />
                <h4>Completed</h4>
              </div>
              <p className="db-quotes-number">{jobsData.length}</p>
            </div>
          </div>

          {/* --- MAIN CONTENT --- */}
          <div className="db-quotes-main-container">
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
                + Add Job
              </button>
            </div>

            <div className="db-quotes-tabs">
              {["New", "In Progress", "Completed"].map((tab) => (
                <button
                  key={tab}
                  className={`db-jobs-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="db-jobs-table-wrapper">
              <table className="db-jobs-table">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Customer Name</th>
                    <th>Service Type</th>
                    <th>Staff Assigned</th>
                    <th>Scheduled</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((job) => (
                    <tr
                      key={job.id}
                      className="clickable-row"
                      onClick={() => setSelectedJob(job)}
                    >
                      <td>{job.id}</td>
                      <td>{job.customer}</td>
                      <td>{job.service}</td>
                      <td>{job.staff}</td>
                      <td>{job.date}</td>
                      <td>
                        <span
                          className={`db-jobs-status ${job.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          ● {job.status}
                        </span>
                      </td>
                      <td>...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
        </>
      )}
    </div>
  );
}
