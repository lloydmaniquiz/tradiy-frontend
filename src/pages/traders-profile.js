import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import starIcon from "../images/gray-star.png";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import Footer from "../landing-page/footer";
import "../styles/TraderProfile.css";
import Gallery from "../components/TraderGallery";
import ServiceAvailable from "../images/available-service.png";
import ServiceUnavailable from "../images/unavailable-service.png";
import Badge from "../images/badge.png";
import Calendar from "react-calendar"; // Import Calendar
import "react-calendar/dist/Calendar.css"; // Default styles
import NavyBlueCheck from "../images/gray-check.png";
import InsuranceIcon from "../images/insurance-gray.png";
import VatRegistered from "../images/registered-gray.png";
import CompanyType from "../images/company-gray.png";
import TraderRating from "../components/TraderRating";
import VerifiedTraderBadge from "../images/verified-trader.png";
import profilePlaceholder from "../images/profile-placeholder.jpg";
import Map from "../components/BusinessMap";
import QuickEstimateForm from "../components/QuickEstimateForm";
import BookAVisitForm from "../components/BookAVisitForm";

import alarmsIcon from "../images/directory-carousel/Alarms  Security.png";
import bathroomsIcon from "../images/directory-carousel/Bathrooms.png";
import builderIcon from "../images/directory-carousel/Builder.png";
import carpetFittingIcon from "../images/directory-carousel/carpet.png";
import centralHeatingIcon from "../images/directory-carousel/Central Heating.png";
import cleanerIcon from "../images/directory-carousel/Cleaner.png";
import conservatoriesIcon from "../images/directory-carousel/Conservatories & Garden Rooms.png";
import curtainblindIcon from "../images/directory-carousel/Curtain  Blind Fitters.png";
import dampProoferIcon from "../images/directory-carousel/Damp Proofer.png";
import drainageIcon from "../images/directory-carousel/Drainage.png";
import drivewaysIcon from "../images/directory-carousel/Driveways  Patios.png";
import electricianIcon from "../images/directory-carousel/electrician.png";
import exteriorCleaningIcon from "../images/directory-carousel/Exterior Cleaning.png";
import fasciaIcon from "../images/directory-carousel/Fascia  Soffits.png";
import fencingIcon from "../images/directory-carousel/Fencing  Gates.png";
import gardenerIcon from "../images/directory-carousel/Gardener.png";
import glassIcon from "../images/directory-carousel/glass.png";
import ITIcon from "../images/directory-carousel/IT Systems & Telecommunications.png";
import joinerIcon from "../images/directory-carousel/Joiner.png";
import kitchenIcon from "../images/directory-carousel/kitchen.png";
import landscapingIcon from "../images/directory-carousel/Landscaping.png";
import painterIcon from "../images/directory-carousel/Painter  Decorator.png";
import pestcontrolIcon from "../images/directory-carousel/pest-control.png";
import plastererIcon from "../images/directory-carousel/Plasterer.png";
import plumberIcon from "../images/directory-carousel/Plumber.png";
import poweredaccessIcon from "../images/directory-carousel/Powered Access.png";
import renewableEnergyIcon from "../images/directory-carousel/Renewable Energy.png";
import rooferIcon from "../images/directory-carousel/Roofer.png";
import roughcasterIcon from "../images/directory-carousel/Roughcaster & Renderer.png";
import scaffoldingIcon from "../images/directory-carousel/scaffolding.png";
import stoneWorkIcon from "../images/directory-carousel/Stone Work.png";
import stovesLogIcon from "../images/directory-carousel/Stoves  Log Burners.png";
import tilerIcon from "../images/directory-carousel/Tiler.png";
import treeSurgeonIcon from "../images/directory-carousel/Tree Surgeon.png";
import tvAerialsIcon from "../images/directory-carousel/TV Aerials  Satellite Services.png";
import upvcWindowsIcon from "../images/directory-carousel/UPVC Windows.png";
import wasteClearanceIcon from "../images/directory-carousel/Waste  Clearance.png";
import weatherCoatingsIcon from "../images/directory-carousel/Weather Coatings.png";

const TraderProfile = () => {
  const { id } = useParams();
  const traderId = Number(id);
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const [reviewsCount, setReviewsCount] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isMainModalOpen, setIsMainModalOpen] = useState(false);
  const [sideModalType, setSideModalType] = useState(null); // 'estimate' or 'visit'
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false); // Control view state
  const [modalData, setModalData] = useState({});
  const [averageRating, setAverageRating] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const serviceIcons = {
    "Alarms / Security Services": alarmsIcon,
    "Bathroom Services": bathroomsIcon,
    "Building / Home Improvement Services": builderIcon,
    "Carpets / Flooring": carpetFittingIcon,
    "Central Heating": centralHeatingIcon,
    "Cleaning Services": cleanerIcon,
    Cleaner: cleanerIcon,
    "Conservatories & Garden Rooms": conservatoriesIcon,
    "Curtain / Blind Fitters": curtainblindIcon,
    "Damp Proofer": dampProoferIcon,
    Drainage: drainageIcon,
    "Driveways / Patios": drivewaysIcon,
    Electrician: electricianIcon,
    "Exterior Cleaning": exteriorCleaningIcon,
    "Fascia / Soffits": fasciaIcon,
    "Fencing / Gates": fencingIcon,
    Gardener: gardenerIcon,
    Glass: glassIcon,
    "IT Systems & Telecommunications": ITIcon,
    Joiner: joinerIcon,
    Kitchens: kitchenIcon,
    Landscaping: landscapingIcon,
    "Painter / Decorator": painterIcon,
    Plasterer: plastererIcon,
    Plumber: plumberIcon,
    "Pest Control": pestcontrolIcon,
    "Powered Access": poweredaccessIcon,
    "Renewable Energy": renewableEnergyIcon,
    Roofer: rooferIcon,
    "Roughcaster & Renderer": roughcasterIcon,
    Scaffolding: scaffoldingIcon,
    "Stone Work": stoneWorkIcon,
    "Stoves / Log Burners": stovesLogIcon,
    Tiler: tilerIcon,
    "Tree Surgeon": treeSurgeonIcon,
    "UPVC Windows": upvcWindowsIcon,
    "Waste / Clearance": wasteClearanceIcon,
    "Weather Coatings": weatherCoatingsIcon,
    "TV Aerials": tvAerialsIcon,
  };

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/tradespeople/`
        );
        const data = await response.json();
        const foundTrader = data.find((t) => t.id === traderId);

        if (foundTrader) {
          // Parse the weeklySchedule string into an object if it's a string
          const parsedSchedule =
            typeof foundTrader.weeklySchedule === "string"
              ? JSON.parse(foundTrader.weeklySchedule)
              : foundTrader.weeklySchedule;

          setTrader({ ...foundTrader, weeklySchedule: parsedSchedule });
        } else {
          setError("Trader not found");
        }
      } catch (err) {
        setError("Failed to fetch trader data");
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId]);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/reviews/?tradesperson_id=${traderId}`
        );
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        const validRatings = data.reviews
          .map((review) => review.trader_service)
          .filter((rating) => rating !== null && rating !== undefined);

        if (validRatings.length === 0) {
          setAverageRating("N/A");
          return;
        }

        const sum = validRatings.reduce((acc, val) => acc + val, 0);
        const average = (sum / validRatings.length).toFixed(2);
        setAverageRating(average);
      } catch (err) {
        console.error("Error fetching average rating:", err);
      }
    };

    fetchAverageRating();
  }, [traderId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check if trader data is available before rendering schedule
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!trader || !trader.weeklySchedule) {
    return <div>No schedule available</div>;
  }

  const traderEmail = trader.email;
  const businessOwner = trader.businessOwner;
  const businessName = trader.businessName;

  // Parse weekly schedule
  const parsedSchedule =
    typeof trader?.weeklySchedule === "string"
      ? JSON.parse(trader.weeklySchedule)
      : trader?.weeklySchedule;

  // Handle date selection
  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowTimeSlots(true); // Switch view to time slots
  };

  // Function to generate time slots
  const generateTimeSlots = (startTime, endTime) => {
    const times = [];
    let currentTime = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    while (currentTime < end) {
      times.push(
        currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      currentTime.setMinutes(currentTime.getMinutes() + 60); // 60-min intervals
    }

    return times;
  };

  // Get selected day name
  const selectedDay = date
    ? date.toLocaleDateString("en-US", { weekday: "long" })
    : null;

  // Get schedule for selected day
  const schedule = parsedSchedule?.[selectedDay];

  // Generate available time slots
  const availableTimes =
    schedule && schedule.available
      ? generateTimeSlots(schedule.startTime, schedule.endTime)
      : [];

  // Handle time selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  // Handle back to calendar view
  const handleBackToCalendar = () => {
    setShowTimeSlots(false);
    setDate(null);
  };

  const getScheduleStatus = (schedule) => {
    if (!schedule.available) {
      return "Closed";
    }

    const currentTime = new Date();
    const startTime = new Date();
    const [startHour, startMinute] = schedule.startTime.split(":");
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date();
    const [endHour, endMinute] = schedule.endTime.split(":");
    endTime.setHours(endHour, endMinute, 0, 0);

    if (currentTime < startTime) {
      return "Closed";
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return "Open";
    } else {
      return "Closed";
    }
  };

  const getTodayScheduleStatus = () => {
    const currentDay = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase(); // Get today's day name, e.g., "monday", "wednesday"

    // Normalize the day to ensure it matches the keys in parsedSchedule
    const todaySchedule =
      parsedSchedule[currentDay.charAt(0).toUpperCase() + currentDay.slice(1)];

    return todaySchedule ? getScheduleStatus(todaySchedule) : "Closed";
  };

  // Helper function to convert 24-hour time to 12-hour time with AM/PM
  const formatTimeWithAMPM = (time) => {
    const [hour, minute] = time.split(":");
    let formattedHour = parseInt(hour, 10);
    const formattedMinute = minute;

    const period = formattedHour >= 12 ? "pm" : "am"; // Determine AM or PM
    if (formattedHour > 12) {
      formattedHour -= 12; // Convert 24-hour format to 12-hour format
    } else if (formattedHour === 0) {
      formattedHour = 12; // Handle midnight case
    }

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  // Get today's day name
  const today = new Date()
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  // Wait for the trader data to be available before trying to parse the schedule
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!trader) {
    return <h2 className="text-center">Trader Not Found</h2>;
  }

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

  const handleSearchClick = () => {
    // Check if the searchQuery exists and navigate back to the previous page
    if (searchQuery) {
      // You can use the `window.history` API to go back
      navigate(-1); // This will go back to the previous page
    }
  };

  // Highlight only available days in the calendar
  const tileDisabled = ({ date }) => {
    if (!trader || !trader.weeklySchedule) return true;

    const parsedSchedule =
      typeof trader.weeklySchedule === "string"
        ? JSON.parse(trader.weeklySchedule)
        : trader.weeklySchedule;

    const day = date.toLocaleDateString("en-US", { weekday: "long" }).trim(); // Get the day name

    return !(parsedSchedule[day] && parsedSchedule[day].available);
  };

  function isValidTime(value) {
    // Basic fallback check: avoid 'NaN', 'undefined', or empty string
    return (
      value &&
      typeof value === "string" &&
      !value.includes("NaN") &&
      !value.includes("undefined")
    );
  }

  return (
    <>
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
      <div className="trader-container">
        <div className="trader-top-header">
          {searchQuery ? (
            <>
              <p onClick={handleSearchClick} style={{ cursor: "pointer" }}>
                {searchQuery}
              </p>
              <p>&gt;</p>
              <h3>{trader.businessName}</h3>
            </>
          ) : null}
        </div>

        <div className="trader-profile">
          {/* Gallery at the top */}
          <Gallery workImages={workImages} />

          {/* Trader Info Section */}
          <div className="trader-info">
            <div className="trader-header">
              <h1>{trader.businessName}</h1>
              {!isMobile && (
                <button
                  className="quote-btn"
                  onClick={() => setIsMainModalOpen(true)}
                >
                  Request a Quote
                </button>
              )}
            </div>

            {/* Main Modal */}
            {isMainModalOpen && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="close-request-wrapper">
                    <span
                      className="close"
                      onClick={() => setIsMainModalOpen(false)}
                    >
                      &times;
                    </span>
                    <span className="modal-title">Request a Quote</span>
                  </div>
                  <p>Kindly select your preferred service.</p>
                  <button
                    className="btn primary"
                    onClick={() => {
                      setIsMainModalOpen(false);
                      setSideModalType("estimate");
                    }}
                  >
                    Quick Estimate
                  </button>
                  <p>or</p>
                  <button
                    className="btn outline"
                    onClick={() => {
                      setIsMainModalOpen(false);
                      setSideModalType("visit");
                    }}
                  >
                    Book a Visit
                  </button>
                </div>
              </div>
            )}

            {/* Side Modal for Quick Estimate */}
            {sideModalType === "estimate" && (
              <div className="side-modal-overlay">
                <div className="side-modal">
                  <QuickEstimateForm
                    closeModal={() => setSideModalType(null)}
                    traderId={traderId}
                    traderEmail={traderEmail}
                    businessOwner={businessOwner}
                    businessName={businessName}
                  />
                </div>
              </div>
            )}

            {/* Side Modal for Book a Visit */}
            {sideModalType === "visit" && (
              <div className="side-modal-overlay">
                <div className="side-modal">
                  <BookAVisitForm
                    traderId={traderId}
                    closeModal={() => setSideModalType(null)}
                    modalData={modalData} // Pass selected data
                    traderEmail={traderEmail}
                    businessOwner={businessOwner}
                    businessName={businessName}
                  />
                </div>
              </div>
            )}
            <p className="trader-address">
              {trader.businessAddress || "Address not available"}
            </p>
            <p
              className="trader-review-count"
              style={{
                cursor: "default",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <img
                src={starIcon}
                alt="star"
                style={{ height: "16px", width: "16px" }}
              />
              {averageRating} • {reviewsCount || 0}{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setIsReviewModalOpen(true)}
              >
                reviews
              </span>
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
            {traderCategory.length > 0 ? (
              <ul>
                {traderCategory.map((service, index) => {
                  const icon = serviceIcons[service]; // Lookup the icon
                  return (
                    <li key={index}>
                      <div className="service">
                        {icon && (
                          <img
                            src={icon}
                            alt={`${service} icon`}
                            className="service-icon"
                          />
                        )}
                        {service}
                      </div>
                    </li>
                  );
                })}
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
              </div>
              <div className="star-review-wrapper"></div>
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
              </div>
            </div>
            <hr className="divider" />

            {/* INSERT THE MAPS AND SCHEDULE */}
            <div className="map-container">
              <div className="map-schedule-wrapper">
                <Map businessAddress={trader.businessAddress} />
                <ul>
                  <h3
                    className={
                      getTodayScheduleStatus() === "Open"
                        ? "open-schedule"
                        : "closed-schedule"
                    }
                  >
                    Currently {getTodayScheduleStatus()}
                  </h3>

                  {/* Display all days' schedules */}
                  {Object.entries(parsedSchedule).map(([day, schedule]) => {
                    const isToday = day.toLowerCase() === today; // Check if today is the current day
                    const scheduleStatus = schedule.available
                      ? `${formatTimeWithAMPM(
                          schedule.startTime
                        )} to ${formatTimeWithAMPM(schedule.endTime)}`
                      : "CLOSED";

                    return (
                      <li key={day} style={{ listStyle: "none" }}>
                        <div className="profile-item">
                          <span
                            className="day"
                            style={isToday ? { color: "#FFBC58" } : {}}
                          >
                            {day}
                          </span>
                          <span
                            className={`time ${
                              scheduleStatus === "CLOSED"
                                ? "closed-time"
                                : "time-unique"
                            }`}
                            style={isToday ? { color: "#FFBC58" } : {}}
                          >
                            {isValidTime(scheduleStatus)
                              ? scheduleStatus
                              : "No schedule available"}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
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

          <div className="calendar-container">
            <div className="calendar-header">
              <h3 className="calendar-title">Request a Quote Visit</h3>
              {!showTimeSlots && (
                <p
                  className="calendar-today"
                  onClick={() => setDate(new Date())}
                >
                  Today
                </p>
              )}
            </div>

            {!showTimeSlots ? (
              // Calendar View
              <Calendar
                onChange={handleDateChange} // Ensure this updates state
                value={date}
                minDate={new Date()}
                next2Label={null}
                prev2Label={null}
                tileDisabled={tileDisabled}
              />
            ) : (
              // Time Slots View
              <div className="time-selection">
                <button className="back-button" onClick={handleBackToCalendar}>
                  &lt; Back
                </button>
                <span>
                  {date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <button
                      key={time}
                      className={selectedTime === time ? "selected" : ""}
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p>No available times for this day</p>
                )}

                {/* Book a Quote Visit Button */}
                {selectedTime && (
                  <button
                    className="book-button"
                    onClick={() => {
                      setModalData({ selectedDate: date, selectedTime }); // Save the selected values
                      setIsMainModalOpen(false); // Close main modal if needed
                      setSideModalType("visit"); // Open the side modal
                    }}
                  >
                    Book a Quote Visit
                  </button>
                )}
              </div>
            )}

            <p className="calendar-note">
              This booking is only for quote visits and does not indicate the
              actual acceptance of the job. It is solely for assessing the scope
              and cost of the service.
            </p>
          </div>
        </div>

        <hr className="divider" />

        <TraderRating
          traderId={traderId}
          setReviewsCount={setReviewsCount}
          isReviewModalOpen={isReviewModalOpen}
          setIsReviewModalOpen={setIsReviewModalOpen}
        />

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

              {/* Sticky Footer (Only visible on mobile) */}
              {isMobile && !isMainModalOpen && (
                <footer className="sticky-footer">
                  <button
                    className="quote-btn"
                    onClick={() => setIsMainModalOpen(true)}
                  >
                    Request a Quote
                  </button>
                </footer>
              )}
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
