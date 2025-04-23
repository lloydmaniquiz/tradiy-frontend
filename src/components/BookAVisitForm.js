import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/BookAVisitForm.css";
import Select from "react-select";

const BookAVisitForm = ({
  traderEmail,
  businessName,
  businessOwner,
  traderId,
  closeModal,
  modalData = {},
}) => {
  const [trader, setTrader] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    homeOwnerName: "",
    phoneNumber: "",
    email: "",
    selectedDate: modalData?.selectedDate
      ? new Date(modalData.selectedDate)
      : new Date(),
    selectedTime: modalData?.selectedTime || "",
    serviceType: [],
    postCode: "",
    timeline: "",
    time: "",
    description: "",
    files: [],
    confirm: false, // Ensure checkboxes exist
    agree: false,
    traderEmail: traderEmail,
    businessOwner: businessOwner,
    businessName: businessName,
  });

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        console.log("Fetching trader data for ID:", traderId);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/tradespeople/`
        );
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

  const traderCategories = trader?.traderCategory
    ? JSON.parse(trader.traderCategory)
    : []; // Ensure it's always an array

  const options = traderCategories.map((service) => ({
    value: service,
    label: service,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // <-- Handle checkboxes correctly
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    // Here, React Select returns an array of selected options when `isMulti` is used
    setFormData((prevState) => ({
      ...prevState,
      serviceType: selectedOptions.map((option) => option.value), // Store just the values (service names)
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
  const selectedDay = (() => {
    // First, ensure selectedDate is a valid Date object
    const selectedDateObj = new Date(formData.selectedDate);

    // If it's a valid date, return the day name; otherwise, handle invalid date
    if (selectedDateObj instanceof Date && !isNaN(selectedDateObj)) {
      return selectedDateObj.toLocaleDateString("en-US", { weekday: "long" });
    } else {
      console.error("Invalid selectedDate:", formData.selectedDate);
      return ""; // Return an empty string or a default value if invalid
    }
  })();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const requiredFields = [
      "homeOwnerName",
      "phoneNumber",
      "email",
      "serviceType",
      "postCode",
    ];

    const newErrors = {};

    // Validate required fields
    requiredFields.forEach((field) => {
      // Ensure the value exists and is a string (in case it's an array or another type)
      if (
        !formData[field] ||
        (typeof formData[field] === "string" &&
          formData[field].trim() === "") ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] = "This field is required";
      }
    });

    // Ensure checkboxes are validated properly
    if (!formData.confirm) {
      newErrors.confirm = "You must confirm you are the homeowner";
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and privacy policy";
    }

    // If there are validation errors, set the error state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "files") {
        if (key === "selectedDate") {
          const formattedDate = formData[key].toISOString().split("T")[0]; // Formats date as yyyy-MM-dd
          formDataObj.append(key, formattedDate);
        } else {
          formDataObj.append(key, formData[key]);
        }
      }
    });

    formData.files.forEach((file) => {
      formDataObj.append("files", file);
    });

    try {
      // Make the API request
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/submit-book-visit/`,
        {
          method: "POST",
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Form submitted successfully!");

      // Reset form after successful submission
      setFormData({
        homeOwnerName: "",
        phoneNumber: "",
        email: "",
        selectedDate: modalData?.selectedDate
          ? new Date(modalData.selectedDate).toISOString().split("T")[0] // Format it as yyyy-MM-dd
          : new Date().toISOString().split("T")[0], // If no modalData, use today's date in the correct format
        selectedTime: modalData?.selectedTime || "",
        serviceType: [],
        postCode: "",
        timeline: "",
        time: "",
        description: "",
        files: [],
        confirm: false, // Ensure checkboxes exist
        agree: false,
        traderEmail: traderEmail,
        businessOwner: businessOwner,
        businessName: businessName,
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form");
    }
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
          <form onSubmit={handleSubmit}>
            <div className="quote-form-group">
              <h2 className="quote-section-title">CONTACT INFORMATION</h2>
              <div>
                <label htmlFor="homeOwnerName">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="homeOwnerName"
                  name="homeOwnerName"
                  value={formData.homeOwnerName}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                {error?.homeOwnerName && (
                  <p className="error-message">{error.homeOwnerName}</p>
                )}{" "}
              </div>

              <div>
                <label htmlFor="phoneNumber">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="01234 567890"
                  required
                />
                {error?.phoneNumber && (
                  <p className="error-message">{error.phoneNumber}</p>
                )}
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
                  required
                />
                {error?.email && <p className="error-message">{error.email}</p>}{" "}
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
                  required
                />
              </div>
              <div className="time-selection">
                <span>
                  {formData.selectedDate instanceof Date &&
                  !isNaN(formData.selectedDate)
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
                      className={
                        formData.selectedTime === time ? "selected" : ""
                      }
                      onClick={() => handleTimeClick(time)}
                    >
                      {time}
                    </button>
                  ))
                ) : (
                  <p>No available times for this day</p>
                )}
                {error?.selectedTime && (
                  <p className="error-message">
                    {error?.selectedTime?.toString()}
                  </p>
                )}
              </div>
            </div>

            <div className="section">
              <h2 className="quote-section-title">PROJECT DETAILS</h2>
              <div className="quote-form-group">
                <div>
                  <label htmlFor="serviceType">
                    Service Type <span className="required">*</span>
                  </label>
                  <Select
                    isMulti
                    name="serviceType"
                    className="quote-react-select"
                    options={options}
                    value={options.filter((option) =>
                      formData.serviceType.includes(option.value)
                    )}
                    onChange={handleSelectChange} // React Select calls this with the full selected options array
                    placeholder="Select services"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        fontFamily: '"Hanken Grotesk", "Arial"',
                        color: "#000839",
                        border: "none",
                        boxShadow: "none",
                        borderColor: state.isFocused ? "transparent" : "none",
                      }),
                      multiValue: (base) => ({
                        ...base,
                        borderRadius: "5px",
                        backgroundColor: "#ECEDF2",
                        padding: "5px 10px",
                      }),
                      multiValueLabel: (base) => ({
                        ...base,
                        color: "#000839",
                      }),
                      multiValueRemove: (base) => ({
                        ...base,
                        color: "#000839",
                        ":hover": {
                          backgroundColor: "#f0f0f0",
                        },
                      }),
                    }}
                  />
                  {error?.serviceType && (
                    <p className="error-message">{error.serviceType}</p>
                  )}{" "}
                </div>
                <div>
                  <label htmlFor="postCode">
                    Post Code <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="postCode"
                    name="postCode"
                    value={formData.postCode}
                    onChange={handleChange}
                    placeholder="Post Code"
                    required
                  />
                  {error?.postCode && (
                    <p className="error-message">{error.postCode}</p>
                  )}
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
                    <div className="file-name">
                      {formData.files.length > 0
                        ? formData.files.map((file, index) => {
                            const fileName = file.name;
                            const extIndex = fileName.lastIndexOf(".");
                            const nameWithoutExtension = fileName.slice(
                              0,
                              extIndex
                            );
                            const extension = fileName.slice(extIndex);

                            const truncatedName =
                              nameWithoutExtension.length > 10 // Adjust length as needed
                                ? `${nameWithoutExtension.slice(0, 10)}...`
                                : nameWithoutExtension;

                            return (
                              <span key={index}>
                                {truncatedName + extension}
                              </span>
                            );
                          })
                        : "No file chosen"}
                    </div>
                  </div>
                  <hr className="custom-divider" />
                  <div>
                    <div className="checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          id="confirm"
                          name="confirm"
                          checked={formData.confirm || false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              confirm: e.target.checked,
                            })
                          }
                          required
                        />
                        I confirm that I am the homeowner or have permission to
                        book this visit.
                      </label>
                      {error?.confirm && (
                        <p className="error-message">{error.confirm}</p>
                      )}{" "}
                      {/* Error for confirm checkbox */}
                      <label>
                        <input
                          type="checkbox"
                          id="agree"
                          name="agree"
                          checked={formData.agree || false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              agree: e.target.checked,
                            })
                          }
                          required
                        />
                        I agree to Tradiy’s{" "}
                        <a href="#/terms-and-policies">
                          Terms and Privacy Policy.
                        </a>
                      </label>
                      {error?.agree && (
                        <p className="error-message">{error.agree}</p>
                      )}{" "}
                      {/* Error for agree checkbox */}
                    </div>

                    <button type="submit" className="quote-book-btn">
                      Book My Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default BookAVisitForm;
