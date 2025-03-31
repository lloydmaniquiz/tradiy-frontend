import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/BookAVisitForm.css";

const BookAVisitForm = ({ traderId, closeModal, modalData = {} }) => {
  const [trader, setTrader] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    selectedDate: modalData?.selectedDate
      ? new Date(modalData.selectedDate)
      : new Date(),
    selectedTime: modalData?.selectedTime || "",
    serviceType: "",
    postCode: "",
    jobDescription: "",
    files: [],
  });

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        console.log("Fetching trader data for ID:", traderId);
        const response = await fetch("http://127.0.0.1:8000/tradespeople");
        const data = await response.json();
        console.log("Fetched traders:", data);

        const foundTrader = data.find((t) => t.id === traderId);
        console.log("Found trader:", foundTrader);

        if (foundTrader) {
          // Ensure weeklySchedule is parsed correctly
          const parsedSchedule =
            typeof foundTrader.weeklySchedule === "string"
              ? JSON.parse(foundTrader.weeklySchedule)
              : foundTrader.weeklySchedule;

          console.log("Parsed Schedule:", parsedSchedule);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedDate: date,
      selectedTime: "", // Reset time on date change
    }));
  };

  const handleTimeClick = (time) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedTime: time,
    }));
  };

  const handleFileChange = (e) => {
    const files = [...e.target.files];

    setFormData((prevState) => ({
      ...prevState,
      files: files,
    }));
  };

  // Generate time slots between startTime and endTime
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

  // Get available times for the selected day
  // Parse weeklySchedule once to ensure consistency
  const parsedSchedule =
    typeof trader?.weeklySchedule === "string"
      ? JSON.parse(trader.weeklySchedule)
      : trader?.weeklySchedule;

  // Get selected day name
  const selectedDay = formData.selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Get schedule from parsedSchedule
  const schedule = parsedSchedule?.[selectedDay];

  const availableTimes =
    schedule && schedule.available
      ? generateTimeSlots(schedule.startTime, schedule.endTime)
      : [];

  // Highlight only available days in the calendar
  const tileDisabled = ({ date }) => {
    if (!trader || !parsedSchedule) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part to compare only dates

    if (date < today) return true; // Disable past dates

    const day = date.toLocaleDateString("en-US", { weekday: "long" }).trim(); // Get the day name

    return !(parsedSchedule[day] && parsedSchedule[day].available);
  };

  return (
    <div className="quote-form-container">
      <span onClick={closeModal} className="close-icon">
        &times;
      </span>
      <h1 className="form-title">Book a Quote Visit Form</h1>
      <p className="description">
        This form is only for quote visits and does not indicate the actual
        acceptance of the job. It is solely for assessing the scope and cost of
        the service.
      </p>

      {loading ? (
        <p>Loading trader schedule...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <div className="quote-form-group">
            <h2 className="quote-section-title">CONTACT INFORMATION</h2>
            <div>
              <label htmlFor="name">
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="phone">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01234 567890"
              />
            </div>
            <div>
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@email.com"
              />
            </div>
          </div>

          <div className="section">
            <h2 className="quote-section-title">APPOINTMENT DETAILS</h2>
            <div className="quote-react-calendar">
              <Calendar
                next2Label={null}
                prev2Label={null}
                onChange={handleDateChange}
                value={formData.selectedDate} // Ensuring the pre-selected date is applied
                tileDisabled={tileDisabled}
              />
            </div>
            <div className="time-selection">
              <span>
                {formData.selectedDate
                  ? formData.selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Select a date"}
              </span>
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <button
                    key={time}
                    className={formData.selectedTime === time ? "selected" : ""}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p>No available times for this day</p>
              )}
            </div>
          </div>

          <div className="section">
            <h2 className="quote-section-title">PROJECT DETAILS</h2>
            <form className="quote-form-group">
              <div>
                <label htmlFor="service">
                  Service Type <span className="required">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="quote-service-select"
                >
                  <option>Select a service</option>
                </select>
              </div>
              <div>
                <label htmlFor="location">
                  Location <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                />
              </div>
              <div>
                <label htmlFor="timeline">Timeline</label>
                <input
                  type="text"
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="HH:MM"
                />
              </div>
              <div>
                <label htmlFor="description">Brief Job Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label htmlFor="upload">
                  Upload Photos or Files (Optional)
                </label>
                <div className="file-upload">
                  <p>Drag and drop files here</p>

                  <label htmlFor="upload" className="custom-file-upload">
                    Choose File
                  </label>

                  <input
                    type="file"
                    id="upload"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                  />

                  {/* Dynamically Display File Names */}
                  <span className="file-name">
                    {formData.files.length > 0
                      ? formData.files.map((file) => file.name).join(", ")
                      : "No file chosen"}
                  </span>
                </div>
                <hr className="custom-divider" />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default BookAVisitForm;
