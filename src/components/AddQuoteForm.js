import React, { useState } from "react";
import "../styles/AddQuoteForm.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TradiyLogo from "../images/tradiy-hero-logo.png";

function AddNewQuote() {
  const [client, setClient] = useState("");
  const [quoteTitle, setQuoteTitle] = useState("");
  const [quoteId, setQuoteId] = useState("QT-012KL-1234");
  const [quoteDate, setQuoteDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [requestType, setRequestType] = useState("estimate");
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

  const handleLocationChange = (field, value) => {
    setLocation((prev) => ({ ...prev, [field]: value }));
  };

  const addServiceItem = () => {
    setServiceItems([
      ...serviceItems,
      { service: "", description: "", qty: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const handleServiceItemChange = (index, field, value) => {
    const items = [...serviceItems];
    items[index][field] =
      field === "qty" || field === "unitPrice" ? Number(value) : value;
    items[index].total = items[index].qty * items[index].unitPrice;
    setServiceItems(items);
  };

  const subtotal = serviceItems.reduce((acc, item) => acc + item.total, 0);
  const totalTax = (subtotal - discount) * (tax / 100);
  const total = subtotal - discount + totalTax;

  const handleFilesChange = (e, isInternal = false) => {
    const uploadedFiles = Array.from(e.target.files);
    if (isInternal) {
      setInternalFiles([...internalFiles, ...uploadedFiles]);
    } else {
      setFiles([...files, ...uploadedFiles]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quote Saved!");
  };

  // ✅ Generate and Download PDF
  const handlePrintPDF = async () => {
    const element = document.getElementById("quote-preview");

    if (!element) {
      alert("Quote preview not found!");
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${quoteId || "Quote"}.pdf`);
  };

  return (
    <div className="quote-container">
      {/* Header Buttons */}
      <div className="quote-header-buttons">
        <button type="button" onClick={handlePrintPDF}>
          Print Quote PDF
        </button>
        <button type="button">Preview</button>
        <button type="button">Back</button>
      </div>

      {/* Quote Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <fieldset className="fieldset">
            <legend>
              <strong>Quote for Customer</strong>
            </legend>
            <div className="client-select-row">
              <select
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
              >
                <option value="">Select Client</option>
                <option value="Charlotte Knight">Charlotte Knight</option>
                <option value="Client 2">Client 2</option>
              </select>
              <button
                type="button"
                onClick={() => alert("Add New Client logic")}
              >
                + New Client
              </button>
            </div>

            <input
              type="text"
              placeholder="Quote Title"
              value={quoteTitle}
              onChange={(e) => setQuoteTitle(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset small-fieldset">
            <legend>
              <strong>Quote Details</strong>
            </legend>
            <div className="input-block">
              <label>Quote ID</label>
              <input type="text" readOnly value={quoteId} />
            </div>
            <div className="input-block">
              <label>Quote Date</label>
              <input
                type="date"
                value={quoteDate}
                onChange={(e) => setQuoteDate(e.target.value)}
              />
            </div>
            <div className="input-block">
              <label>Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </fieldset>
        </div>

        <hr className="divider" />

        {/* Quote Service Section */}
        <fieldset className="fieldset quote-service-fieldset">
          <div className="quote-service">
            <h3>Quote Service</h3>
            <small>Request Type</small>
            <div className="quote-options">
              <label>
                <input
                  type="radio"
                  name="quoteType"
                  value="estimate"
                  checked={requestType === "estimate"}
                  onChange={(e) => setRequestType(e.target.value)}
                />
                Quote Estimate
              </label>
              <label>
                <input
                  type="radio"
                  name="quoteType"
                  value="visit"
                  checked={requestType === "visit"}
                  onChange={(e) => setRequestType(e.target.value)}
                />
                Quote Visit
              </label>
            </div>
          </div>

          <div className="service-location-layout">
            <div className="service-info-column">
              <select
                className="select-service-type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              >
                <option value="">Select Service Type</option>
                <option value="type1">Service Type 1</option>
                <option value="type2">Service Type 2</option>
              </select>

              <select
                className="select-timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
              >
                <option value="">Select Timeline</option>
                <option value="1 week">1 Week</option>
                <option value="2 weeks">2 Weeks</option>
                <option value="1 month">1 Month</option>
              </select>

              <textarea
                rows="5"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="location-info-column">
              <input
                type="text"
                placeholder="Address"
                value={location.address}
                onChange={(e) =>
                  handleLocationChange("address", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="City"
                value={location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
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
                onChange={(e) =>
                  handleLocationChange("postcode", e.target.value)
                }
              />
            </div>
          </div>
        </fieldset>

        {/* Service Items */}
        <fieldset className="fieldset">
          <legend>
            <strong>Service Items</strong>
          </legend>
          {serviceItems.map((item, idx) => (
            <div key={idx} className="service-item">
              <input
                type="text"
                placeholder="Service"
                value={item.service}
                onChange={(e) =>
                  handleServiceItemChange(idx, "service", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.qty}
                onChange={(e) =>
                  handleServiceItemChange(idx, "qty", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) =>
                  handleServiceItemChange(idx, "unitPrice", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Total"
                value={item.total.toFixed(2)}
                readOnly
              />
            </div>
          ))}
        </fieldset>
      </form>

      {/* Hidden Printable PDF Layout */}
      <div
        id="quote-preview"
        style={{
          width: "800px",
          padding: "40px",
          background: "white",
          color: "#333",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={TradiyLogo} alt="Tradiy Logo" width="120" />
          <h2 style={{ color: "#00AEEF" }}>QUOTE</h2>
        </div>

        <div
          style={{ borderBottom: "3px solid #00AEEF", margin: "10px 0 20px" }}
        />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <h3>Fisher Decorating Services Ltd</h3>
            <p>fisherdecoratingservices@hotmail.co.uk</p>
            <p>01234 56789</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <h4>TOTAL AMOUNT</h4>
            <h2>£{total.toFixed(2)}</h2>
            <p>{quoteId}</p>
            <p>{requestType === "visit" ? "Quote Visit" : "Quote Estimate"}</p>
          </div>
        </div>

        <div style={{ marginTop: "30px" }}>
          <h4>RECIPIENT</h4>
          <p>
            <strong>{client || "Client Name"}</strong>
          </p>
          <p>{location.address}</p>
          <p>
            {location.city} {location.postcode}
          </p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "30px",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "8px" }}>Service</th>
              <th style={{ padding: "8px" }}>Description</th>
              <th style={{ padding: "8px" }}>Qty</th>
              <th style={{ padding: "8px" }}>Unit Price</th>
              <th style={{ padding: "8px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {serviceItems.map((item, idx) => (
              <tr key={idx}>
                <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                  {item.service}
                </td>
                <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                  {item.description}
                </td>
                <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                  {item.qty}
                </td>
                <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                  £{item.unitPrice.toFixed(2)}
                </td>
                <td style={{ padding: "8px", borderTop: "1px solid #ddd" }}>
                  £{item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <p>Subtotal: £{subtotal.toFixed(2)}</p>
          <p>Discount: £{discount.toFixed(2)}</p>
          <p>
            Tax: £{tax}% (£{totalTax.toFixed(2)})
          </p>
          <h3>Total: £{total.toFixed(2)}</h3>
        </div>

        <div style={{ marginTop: "40px", fontSize: "12px" }}>
          <p>
            Please note this quote is valid for 30 days. After this period,
            pricing may be revised.
          </p>
          <h4>Deposit Required: £{requiredDeposit.toFixed(2)}</h4>
        </div>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "1px solid #000",
                width: "200px",
                margin: "auto",
              }}
            ></div>
            <small>Client Signature</small>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                borderTop: "1px solid #000",
                width: "200px",
                margin: "auto",
              }}
            ></div>
            <small>Date</small>
          </div>
        </div>

        <div style={{ marginTop: "40px", color: "#888" }}>
          <p>
            POWERED BY{" "}
            <span style={{ color: "#00AEEF", fontWeight: "bold" }}>
              Tradiy Hero
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddNewQuote;
