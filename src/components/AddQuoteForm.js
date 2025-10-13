import React, { useState } from "react";
import "../styles/AddQuoteForm.css";

function AddNewQuote() {
  const [client, setClient] = useState("");
  const [quoteTitle, setQuoteTitle] = useState("");
  const [quoteId, setQuoteId] = useState("QT-012KL-1234"); // Sample readonly quote ID
  const [quoteDate, setQuoteDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [requestType, setRequestType] = useState("estimate"); // Quote Estimate or Quote Visit
  const [serviceType, setServiceType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "",
    region: "",
    postcode: "",
  });

  const [files, setFiles] = useState([]);

  const [serviceItems, setServiceItems] = useState([
    { service: "", description: "", qty: 1, unitPrice: 0, total: 0 },
  ]);

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [requiredDeposit, setRequiredDeposit] = useState(0);

  const [message, setMessage] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [internalFiles, setInternalFiles] = useState([]);

  // Helper to update location state
  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding new service item
  const addServiceItem = () => {
    setServiceItems([
      ...serviceItems,
      { service: "", description: "", qty: 1, unitPrice: 0, total: 0 },
    ]);
  };

  // Handle service item change
  const handleServiceItemChange = (index, field, value) => {
    const items = [...serviceItems];
    items[index][field] =
      field === "qty" || field === "unitPrice" ? Number(value) : value;
    items[index].total = items[index].qty * items[index].unitPrice;
    setServiceItems(items);
  };

  // Calculate totals
  const subtotal = serviceItems.reduce((acc, item) => acc + item.total, 0);
  const totalTax = (subtotal - discount) * (tax / 100);
  const total = subtotal - discount + totalTax;

  // Handle file uploads (Quote files & Internal notes files)
  const handleFilesChange = (e, isInternal = false) => {
    const uploadedFiles = Array.from(e.target.files);
    if (isInternal) {
      setInternalFiles([...internalFiles, ...uploadedFiles]);
    } else {
      setFiles([...files, ...uploadedFiles]);
    }
  };

  // Form submission (placeholder)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the submission to backend or state management
    alert("Quote Saved!");
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Add New Quote</h2>
        <div>
          <button style={{ marginRight: 10 }}>Print Quote PDF</button>
          <button style={{ marginRight: 10 }}>Preview</button>
          <button>Back</button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Quote for Customer */}
        <fieldset
          style={{ marginBottom: 20, padding: 15, border: "1px solid #ccc" }}
        >
          <legend>
            <strong>Quote for Customer</strong>
          </legend>
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <select
              required
              value={client}
              onChange={(e) => setClient(e.target.value)}
              style={{ flex: 1, padding: 8 }}
            >
              <option value="">Select Client</option>
              <option value="client1">Client 1</option>
              <option value="client2">Client 2</option>
            </select>
            <button type="button" onClick={() => alert("Add New Client logic")}>
              + New Client
            </button>
          </div>

          <input
            type="text"
            placeholder="Quote Title"
            value={quoteTitle}
            onChange={(e) => setQuoteTitle(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </fieldset>

        {/* Quote Details */}
        <fieldset
          style={{
            marginBottom: 20,
            padding: 15,
            border: "1px solid #ccc",
            maxWidth: 300,
          }}
        >
          <legend>
            <strong>Quote Details</strong>
          </legend>
          <div style={{ marginBottom: 10 }}>
            <label>Quote ID</label>
            <input
              type="text"
              readOnly
              value={quoteId}
              style={{ width: "100%", padding: 6 }}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Quote Date</label>
            <input
              type="date"
              value={quoteDate}
              onChange={(e) => setQuoteDate(e.target.value)}
              style={{ width: "100%", padding: 6 }}
            />
          </div>
          <div>
            <label>Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              style={{ width: "100%", padding: 6 }}
            />
          </div>
        </fieldset>

        <hr style={{ margin: "30px 0" }} />

        {/* Quote Service */}
        <fieldset style={{ padding: 15, border: "1px solid #ccc" }}>
          <legend>
            <strong>Quote Service</strong>
          </legend>

          {/* Request Type */}
          <div style={{ marginBottom: 15 }}>
            <label>
              <input
                type="radio"
                name="requestType"
                value="estimate"
                checked={requestType === "estimate"}
                onChange={() => setRequestType("estimate")}
              />{" "}
              Quote Estimate
            </label>
            <label style={{ marginLeft: 20 }}>
              <input
                type="radio"
                name="requestType"
                value="visit"
                checked={requestType === "visit"}
                onChange={() => setRequestType("visit")}
              />{" "}
              Quote Visit
            </label>
          </div>

          {/* Service Type & Timeline */}
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              style={{ flex: 1, padding: 8 }}
              required
            >
              <option value="">Select Service Type</option>
              <option value="type1">Service Type 1</option>
              <option value="type2">Service Type 2</option>
            </select>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              style={{ flex: 1, padding: 8 }}
              required
            >
              <option value="">Select Timeline</option>
              <option value="1 week">1 Week</option>
              <option value="2 weeks">2 Weeks</option>
              <option value="1 month">1 Month</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            rows="3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />

          {/* Location */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <input
              type="text"
              placeholder="Location"
              value={location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={location.city}
              onChange={(e) => handleLocationChange("city", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={location.state}
              onChange={(e) => handleLocationChange("state", e.target.value)}
            />
            <input
              type="text"
              placeholder="Region"
              value={location.region}
              onChange={(e) => handleLocationChange("region", e.target.value)}
            />
            <input
              type="text"
              placeholder="Postcode"
              value={location.postcode}
              onChange={(e) => handleLocationChange("postcode", e.target.value)}
            />
          </div>

          {/* File Upload */}
          <div
            style={{
              border: "2px dashed #ccc",
              padding: 30,
              textAlign: "center",
              color: "#aaa",
              marginBottom: 20,
            }}
          >
            <p>Drag and drop files here or</p>
            <input
              type="file"
              multiple
              onChange={handleFilesChange}
              style={{ display: "block", margin: "10px auto" }}
            />
            {files.length > 0 && <p>{files.length} file(s) uploaded</p>}
          </div>
        </fieldset>

        {/* Service Items */}
        <fieldset
          style={{ padding: 15, border: "1px solid #ccc", marginTop: 20 }}
        >
          <legend>
            <strong>Service Items</strong>
          </legend>

          {serviceItems.map((item, idx) => (
            <div
              key={idx}
              style={{ display: "flex", gap: 10, marginBottom: 15 }}
            >
              <input
                type="text"
                placeholder="Search or Add Service"
                value={item.service}
                onChange={(e) =>
                  handleServiceItemChange(idx, "service", e.target.value)
                }
                style={{ flex: 2, padding: 8 }}
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  handleServiceItemChange(idx, "qty", e.target.value)
                }
                style={{ width: 70, padding: 8 }}
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                min="0"
                step="0.01"
                onChange={(e) =>
                  handleServiceItemChange(idx, "unitPrice", e.target.value)
                }
                style={{ width: 100, padding: 8 }}
              />
              <input
                type="number"
                placeholder="Total"
                value={item.total.toFixed(2)}
                readOnly
                style={{
                  width: 100,
                  padding: 8,
                  backgroundColor: "#eee",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          ))}

          <textarea
            placeholder="Description"
            value={serviceItems[serviceItems.length - 1].description}
            onChange={(e) =>
              handleServiceItemChange(
                serviceItems.length - 1,
                "description",
                e.target.value
              )
            }
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />

          <div style={{ marginBottom: 15 }}>
            <button
              type="button"
              onClick={addServiceItem}
              style={{ marginRight: 10 }}
            >
              + Add Item
            </button>
            <button
              type="button"
              onClick={() => alert("Service Pricing logic")}
            >
              Service Pricing
            </button>
          </div>

          {/* Totals */}
          <div style={{ maxWidth: 300, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <span>Discount</span>
              <button
                type="button"
                onClick={() => {
                  const disc = prompt("Enter Discount Amount", discount);
                  if (disc !== null) setDiscount(Number(disc));
                }}
              >
                Add Discount
              </button>
              <span>£{discount.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <span>Tax</span>
              <button
                type="button"
                onClick={() => {
                  const t = prompt("Enter Tax Percentage", tax);
                  if (t !== null) setTax(Number(t));
                }}
              >
                Add Tax
              </button>
              <span>£{totalTax.toFixed(2)}</span>
            </div>
            <div
              style={{
                borderTop: "1px solid #ddd",
                marginTop: 10,
                paddingTop: 10,
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
            <div
              style={{
                marginTop: 5,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Required Deposit</span>
              <button
                type="button"
                onClick={() => {
                  const rd = prompt(
                    "Enter Required Deposit Amount",
                    requiredDeposit
                  );
                  if (rd !== null) setRequiredDeposit(Number(rd));
                }}
              >
                Add Required Deposit
              </button>
              <span>£{requiredDeposit.toFixed(2)}</span>
            </div>
          </div>
        </fieldset>

        {/* Message */}
        <fieldset style={{ marginTop: 20 }}>
          <legend>
            <strong>Message</strong>
          </legend>
          <textarea
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </fieldset>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={() => alert("Cancel clicked")}>
            Cancel
          </button>
          <button type="submit" style={{ padding: "8px 20px" }}>
            Save and &#x25BC;
          </button>
        </div>
      </form>

      {/* Internal Notes Section */}
      <fieldset
        style={{ marginTop: 40, padding: 15, border: "1px solid #ccc" }}
      >
        <legend>
          <strong>Internal Notes</strong>
        </legend>
        <small>Your team alone can see internal notes.</small>
        <textarea
          placeholder="Enter internal notes here."
          rows="5"
          value={internalNotes}
          onChange={(e) => setInternalNotes(e.target.value)}
          style={{ width: "100%", padding: 8, marginTop: 10, marginBottom: 10 }}
        />
        <input
          type="file"
          multiple
          onChange={(e) => handleFilesChange(e, true)}
        />
        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          <button type="button" onClick={() => alert("Cancel Internal Notes")}>
            Cancel
          </button>
          <button type="button" onClick={() => alert("Internal notes saved")}>
            Save
          </button>
        </div>
      </fieldset>
    </div>
  );
}

export default AddNewQuote;
