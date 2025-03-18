import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import "../styles/TraderProfile.css";
import peacockCheck from "../images/peacock-check.png";
import Gallery from "../components/TraderGallery";
import ServiceAvailable from "../images/available-service.png";
import ServiceUnavailable from "../images/unavailable-service.png";
import Badge from "../images/badge.png";
import Calendar from "react-calendar"; // Import Calendar
import "react-calendar/dist/Calendar.css"; // Default styles
import StarIcon from "../images/cyan-star.png";
import NavyBlueCheck from "../images/navyBlue-check.png";
import InsuranceIcon from "../images/PLI-icon.png";
import VatRegistered from "../images/vat-registered.png";
import CompanyType from "../images/company-type.png";
import WebsiteURL from "../images/websiteURL.png";
import TraderRating from "../components/TraderRating";
import VerifiedTraderBadge from "../images/verified-trader.png";
import profilePlaceholder from "../images/profile-placeholder.jpg";

const TraderProfile = () => {
  const { id } = useParams();
  const traderId = Number(id);
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tradespeople");
        const data = await response.json();
        console.log("Fetched Trader Data:", data);

        const foundTrader = data.find((t) => t.id === traderId);
        console.log("Found Trader:", foundTrader);

        if (foundTrader) {
          setTrader(foundTrader);
        } else {
          setError("Trader not found");
        }
      } catch (err) {
        setError("Failed to fetch trader data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId]);

  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!trader) {
    return <h2 className="text-center">Trader Not Found</h2>;
  }

  console.log("Trader Object:", trader);

  // Fetch work images from trader instead of result
  const workImages = trader?.workImages
    ? String(trader.workImages)
        .split(",")
        .map((img) => img.trim())
    : [];

  // Process services
  const services =
    typeof trader?.services === "string"
      ? trader.services
          .replace(/[[\]"']/g, "") // Remove square brackets and quotes
          .split(",")
          .map((service) => service.trim()) // Trim spaces
      : [];

  // Process traderCategory
  const traderCategory =
    typeof trader?.traderCategory === "string"
      ? trader.traderCategory
          .replace(/[[\]"']/g, "") // Remove square brackets and quotes
          .split(",")
          .map((service) => service.trim()) // Trim spaces
      : [];

  return (
    <>
      <StickyHeader handleSearch={handleSearch} />
      <div className="trader-container">
        <div className="trader-profile">
          {/* Gallery at the top */}
          <Gallery workImages={workImages} />

          {/* Trader Info Section */}
          <div className="trader-info">
            <div className="trader-header">
              <h1>{trader.businessName}</h1>
              <button className="quote-btn">Request a Quote</button>
            </div>
            <p className="trader-address">
              {trader.businessAddress || "Address not available"}
            </p>

            <div className="trader-features">
              <div>
                <img
                  src={
                    trader.emergencyHours
                      ? ServiceAvailable
                      : ServiceUnavailable
                  }
                  alt={
                    trader.emergencyHours
                      ? "Emergency Hours Available"
                      : "No Emergency Hours"
                  }
                />
                <span>{trader.emergencyHours ? "24 Hours" : "24 Hours"}</span>
              </div>

              <div>
                <img
                  src={
                    trader.acceptCards ? ServiceAvailable : ServiceUnavailable
                  }
                  alt={
                    trader.acceptCards
                      ? "Accepts Cards"
                      : "Does Not Accept Cards"
                  }
                />
                <span>
                  {trader.acceptCards ? "Accepts Cards" : "Accepts Cards"}
                </span>
              </div>

              <div>
                <img
                  src={
                    trader.hasCalloutCharge
                      ? ServiceAvailable
                      : ServiceUnavailable
                  }
                  alt={
                    trader.hasCalloutCharge
                      ? "Callout Charge Applies"
                      : "No Callout Charge"
                  }
                />
                <span>
                  {trader.hasCalloutCharge
                    ? "Callout Charge"
                    : "Callout Charge"}
                </span>
              </div>
            </div>
          </div>

          <hr style={{ margin: "20px 0", borderTop: "2px solid #BBBCC0" }} />

          {/* Services Section */}
          <div className="trader-services">
            <h2>Services Offered</h2>
            {traderCategory.length > 0 ? (
              <ul>
                {traderCategory.map((service, index) => (
                  <li key={index}>
                    <div className="service">
                      <img src={peacockCheck} alt="check" />
                      {service}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No services available</p>
            )}
          </div>
        </div>

        <div className="trader-details-container">
          {/* Trader Info Box */}
          <div className="trader-block">
            <div className="trader-details-box">
              <div className="badge-info-wrapper">
                <img src={Badge} alt="Badge" className="detail-icon" />
                <div className="member-operates-wrapper">
                  <p>
                    Member since{" "}
                    {new Date(trader.dateJoined).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p>
                    Operates in {trader.postCode || "Location not available"}
                  </p>
                </div>

                {/* Reviews Section */}
                <div className="reviews-wrapper">
                  <img src={StarIcon} alt="Star" className="review-icon" />
                  <div className="reviews-block">
                    <span className="review-count">{trader.reviews || 0}</span>
                    <span className="review-text">reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Force Services & Skills Section Below */}
            <div className="services-container">
              <div className="services-skills">
                <h3 className="section-title">Services & Skills</h3>
                <hr className="divider" />
                <ul className="skills-list" style={{ listStyle: "none" }}>
                  {Array.isArray(services) && services.length > 0 ? (
                    services.map((service, index) => (
                      <li key={index}>
                        <img
                          src={NavyBlueCheck}
                          alt="✔"
                          className="check-icon"
                        />
                        {service}
                      </li>
                    ))
                  ) : (
                    <li>No services available</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="company-profile">
              <h3 className="section-title">Company Profile</h3>
              <hr className="divider" />
              <div className="profile-details">
                {trader.insuranceCertificate && (
                  <div className="profile-item">
                    <img
                      src={InsuranceIcon}
                      alt="PLI"
                      className="profile-icon"
                    />
                    <span>Public Liability Insurance</span>
                    <span className="profile-value">Self-Certified</span>
                  </div>
                )}

                {trader.isVatRegistered !== null && (
                  <div className="profile-item">
                    <img
                      src={VatRegistered}
                      alt="VAT"
                      className="profile-icon"
                    />
                    <span>VAT Registered</span>
                    <span className="profile-value">
                      {trader.isVatRegistered ? "Yes" : "No"}
                    </span>
                  </div>
                )}

                {trader.companyType && (
                  <div className="profile-item">
                    <img
                      src={CompanyType}
                      alt="Company Type"
                      className="profile-icon"
                    />
                    <span>Company Type</span>
                    <span className="profile-value">{trader.companyType}</span>
                  </div>
                )}

                {trader.websiteURL && (
                  <div className="profile-item">
                    <img
                      src={WebsiteURL}
                      alt="Website"
                      className="profile-icon"
                    />
                    <span>Company Website</span>
                    <a
                      href={trader.websiteURL}
                      className="profile-value"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trader.websiteURL}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <hr className="divider" />
            {/* INSERT THE MAPS AND SCHEDULE */}

            <hr className="divider" />

            <div className="about-company">
              <h3 className="section-title">About the Company</h3>
              {trader.businessDescription ? (
                <p>{trader.businessDescription}</p>
              ) : (
                <p>No business description available.</p>
              )}

              <div className="awards">
                <h3 className="section-title">Awards & Accreditations</h3>
                <div className="award-item">
                  <img src={NavyBlueCheck} alt="Check" className="award-icon" />
                  <span>NCQ level 3 painting and decorating</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="calendar-container">
            <div className="calendar-header">
              <h3 className="calendar-title">Request a Quote Visit</h3>
              <p className="calendar-today" onClick={() => setDate(new Date())}>
                Today
              </p>
            </div>
            <Calendar
              onChange={setDate}
              value={date}
              minDate={new Date()}
              next2Label={null} // Hide double navigation arrows
              prev2Label={null}
            />
            <p className="calendar-note">
              This booking is only for quote visits and does not indicate the
              actual acceptance of the job. It is solely for assessing the scope
              and cost of the service.
            </p>
          </div>
        </div>

        <hr className="divider" />

        <TraderRating />

        <hr className="divider" />

        {/* Meet the Trader Section */}
        <div className="meet-the-trader">
          <h3 className="meet-the-trade-title">Meet the Trader</h3>
          <div className="meet-the-trader-wrapper">
            <div className="trader-bio">
              {/* Trader Profile Picture */}
              <div>
                <img
                  src={trader.profilePicture || profilePlaceholder}
                  alt={`${trader.businessOwner || "Trader"}'s profile`}
                  className="trader-profile-img"
                  width="120"
                  height="120"
                />
              </div>

              {/* Trader Details */}
              <div className="trader-bio-content">
                <div className="business-owner-verified-wrapper">
                  <h3>{trader.businessOwner || "Trader Name Not Available"}</h3>
                  {trader.isVerifiedTrader && (
                    <img
                      src={VerifiedTraderBadge}
                      alt="Verified Trader"
                      className="verified-badge"
                    />
                  )}
                </div>

                {/* Confirmed Information Section */}
                <div className="confirmed-info">
                  <span>Confirmed information:</span>
                  <ul className="info-list" style={{ listStyle: "none" }}>
                    {trader.photoId && (
                      <li>
                        <img src={NavyBlueCheck} alt="blue check" /> Identity
                      </li>
                    )}
                    {trader.email && (
                      <li>
                        <img src={NavyBlueCheck} alt="blue check" /> Email
                        Address
                      </li>
                    )}
                    {trader.businessNumber && (
                      <li>
                        <img src={NavyBlueCheck} alt="blue check" /> Phone
                        Number
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="is-verified-bio">
              <div className="is-verified-header">
                {trader.businessOwner} is{" "}
                {trader.isVerifiedTrader ? (
                  <span className="verified-text">
                    a verified Tradiy trader.
                  </span>
                ) : (
                  <span className="not-verified-text">
                    not a verified Tradiy trader.
                  </span>
                )}
              </div>
              <div className="is-verified-content">
                <p>{trader.shortBio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* TRADER'S RATING */}
      </div>

      <Footer />
    </>
  );
};

export default TraderProfile;
