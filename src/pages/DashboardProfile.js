import React, { useEffect, useState } from "react";
import "../styles/DashboardProfile.css";
import tradiyBanner from "../images/tradiy-hero-banner.png";

export default function DashboardProfile() {
  // Log whenever profile changes
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    shortBio: "",
    birthday: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("No user_id or token found in localStorage");
      setLoading(false);
      return;
    }

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch dashboard data");

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // when dashboardData loads, sync formData
  useEffect(() => {
    if (dashboardData?.profile) {
      setFormData({
        shortBio: dashboardData.profile.shortBio || "",
        birthday: dashboardData.profile.birthday || "",
      });
    }
  }, [dashboardData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/dashboard/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save profile");
      }

      // get updated data from backend
      const updatedData = await res.json();

      // update local state so UI reflects the new values
      setDashboardData(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div>Unable to load dashboard.</div>;
  }

  const { user, profile } = dashboardData;

  return (
    <div className="db-profile-container">
      {/* Top Section */}
      <div className="db-profile-header">
        {/* Left card */}
        <div className="db-profile-info">
          <img
            src={profile.profilePicture || "https://via.placeholder.com/100"}
            alt="Profile"
            className="db-profile-avatar"
          />
          <div>
            <h2 className="db-profile-name">{profile.businessOwner}</h2>
            <p className="db-profile-id">TRDY-2025-12345</p>
            <p className="db-profile-email">{profile.email}</p>
            <p className="db-profile-phone">{profile.businessNumber}</p>
            {profile.verified && (
              <span className="db-profile-verified">✔ Verified</span>
            )}
          </div>
        </div>

        {/* Right card */}
        <div className="db-profile-feedback">
          <h4>Reputation & Feedback</h4>
          <p className="db-profile-feedback-sub">
            Toggle to display on profile
          </p>

          <label className="db-profile-toggle-item">
            <input type="checkbox" defaultChecked={profile.showBanner} />
            <span className="db-toggle-switch"></span>
            <img
              src={tradiyBanner}
              className="tradiy-banner"
              alt="Tradiy Hero"
            />
          </label>

          <label className="db-profile-toggle-item">
            <input type="checkbox" defaultChecked={profile.showRating} />
            <span className="db-toggle-switch"></span>Trader Rating
          </label>

          <label className="db-profile-toggle-item">
            <input type="checkbox" defaultChecked={profile.showReviews} />
            <span className="db-toggle-switch"></span>
            Reviews
          </label>
        </div>
      </div>

      {/* Professional Profile */}
      <div className="db-profile-section">
        <div className="db-profile-section-header">
          <h3>Professional Profile</h3>
          {!isEditing ? (
            <button
              className="db-profile-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : null}
        </div>

        <div className="db-profile-about">
          <h4>About Yourself</h4>

          {isEditing ? (
            <>
              <div className="db-profile-info-row">
                <label className="db-profile-label">Short Bio</label>
                <textarea
                  name="shortBio"
                  value={formData.shortBio}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <div className="db-profile-info-row">
                <label className="db-profile-label">Date of Birth</label>
                <input
                  type="text" // can change to "date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                />
              </div>

              <div className="db-profile-actions">
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                <button onClick={handleSave}>Save Changes</button>
              </div>
            </>
          ) : (
            <>
              <div className="db-profile-info-row">
                <span className="db-profile-label">Short Bio</span>
                <span className="db-profile-value">{profile.shortBio}</span>
              </div>
              <div className="db-profile-info-row">
                <span className="db-profile-label">Date of Birth</span>
                <span className="db-profile-value">{profile.birthday}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Business Profile */}
      <div className="db-profile-section">
        <h3>Business Profile</h3>
        <div className="db-profile-business-list">
          {(Array.isArray(profile.businesses)
            ? profile.businesses
            : [profile]
          ).map((business, index) => (
            <div key={index} className="db-profile-business-card">
              <img
                src={business.businessLogo || "https://via.placeholder.com/60"}
                alt="Business Logo"
                className="db-profile-business-logo"
              />
              <div>
                <h4>{business.businessName}</h4>
                <p>{business.businessAddress}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
