import React, { useState } from "react";

const JobDetails = () => {
  // Sample state data
  const [internalNotes, setInternalNotes] = useState("");
  const [serviceItems, setServiceItems] = useState([
    {
      id: 1,
      service: "Service A",
      description: "Lorem ipsum",
      qty: 1,
      unitPrice: 1000,
    },
  ]);
  const [discount, setDiscount] = useState(0); // Assume discount in percentage
  const [tax, setTax] = useState(20); // Tax percentage

  // Constants data
  const jobData = {
    name: "Jasmine Davies",
    title: "Job Title Lorem Ipsum",
    description:
      "Job description Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    propertyAddress: "29d Harbour Place, Ardrossan, KA22 8BU",
    contactDetails: {
      phone: "01234 567890",
      email: "charlottegriffiths@email.com",
    },
    jobId: "JOB-1234",
    startDate: "17 January 2025",
    endDate: "17 January 2025",
    status: "IN PROGRESS",
  };

  // Calculations
  const subtotal = serviceItems.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const taxedAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxedAmount;

  // Handlers
  const handleAddDiscount = () => {
    let discountInput = prompt("Enter discount percentage:", discount);
    const discountValue = Number(discountInput);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      setDiscount(discountValue);
    } else {
      alert("Please enter a valid discount percentage (0-100).");
    }
  };

  const handleInternalNotesChange = (e) => {
    setInternalNotes(e.target.value);
  };

  const handleUploadFile = () => {
    alert("Upload file dialog would open here.");
  };

  const handleAddItem = () => {
    alert("Add Item functionality (not implemented).");
  };

  const handleServicePricing = () => {
    alert("Service Pricing functionality (not implemented).");
  };

  const handleHoldJob = () => {
    alert("Hold Job functionality (not implemented).");
  };

  const handleMoreActions = () => {
    alert("More Actions menu (not implemented).");
  };

  const handlePrintQuote = () => {
    alert("Print Quote PDF functionality (not implemented).");
  };

  const handleBillClient = () => {
    alert("Bill Client functionality (not implemented).");
  };

  const handleCancel = () => {
    alert("Cancel button clicked.");
  };

  const handleSave = () => {
    alert("Save button clicked.");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ margin: 0 }}>Job Details</h1>
        <div>
          <button onClick={handlePrintQuote} style={styles.printBtn}>
            Print Quote PDF
          </button>
          <button onClick={() => alert("Back clicked")} style={styles.backBtn}>
            &lt; Back
          </button>
        </div>
      </header>

      <section style={styles.statusSection}>
        <span style={styles.statusLabel}>{jobData.status}</span>
      </section>

      <section style={styles.mainSection}>
        <div style={styles.leftColumn}>
          <h2>{jobData.name}</h2>
          <p style={styles.jobTitle}>{jobData.title}</p>
          <p style={styles.jobDesc}>{jobData.description}</p>
          <div style={styles.addressSection}>
            <div>
              <strong>Property Address</strong>
              <p>{jobData.propertyAddress}</p>
            </div>
            <div>
              <strong>Contact Details</strong>
              <p>{jobData.contactDetails.phone}</p>
              <p style={{ color: "#008080", cursor: "pointer" }}>
                {jobData.contactDetails.email}
              </p>
            </div>
          </div>
        </div>

        <div style={styles.rightColumn}>
          <div>
            <strong>Job Details</strong>
            <div style={styles.jobDetailsRow}>
              <span>Job ID</span>
              <span>{jobData.jobId}</span>
            </div>
            <div style={styles.jobDetailsRow}>
              <span>Start Date</span>
              <span>{jobData.startDate}</span>
            </div>
            <div style={styles.jobDetailsRow}>
              <span>End Date</span>
              <span>{jobData.endDate}</span>
            </div>
          </div>
          <div style={styles.actionButtons}>
            <button onClick={handleMoreActions} style={styles.moreActionsBtn}>
              More Actions ▼
            </button>
            <button onClick={handleHoldJob} style={styles.holdJobBtn}>
              Hold Job
            </button>
          </div>
        </div>
      </section>

      <hr />

      <section style={styles.serviceItemsSection}>
        <h3>Service Items</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableCellLeft}>Service</th>
              <th>Qty.</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {serviceItems.map(
              ({ id, service, description, qty, unitPrice }) => (
                <tr key={id}>
                  <td style={styles.tableCellLeft}>
                    <strong>{service}</strong>
                    <br />
                    <small>{description}</small>
                  </td>
                  <td style={{ textAlign: "center" }}>{qty}</td>
                  <td style={{ textAlign: "right" }}>
                    £{unitPrice.toFixed(2)}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    £{(qty * unitPrice).toFixed(2)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div style={styles.itemsActions}>
          <button onClick={handleAddItem} style={styles.addItemBtn}>
            + Add Item
          </button>
          <button
            onClick={handleServicePricing}
            style={styles.servicePricingBtn}
          >
            Service Pricing
          </button>
        </div>

        <div style={styles.summaryBox}>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Discount</span>
            <button
              onClick={handleAddDiscount}
              style={styles.addDiscountBtn}
              title="Add or edit discount"
            >
              {discount > 0 ? `${discount}%` : "Add Discount"}
            </button>
          </div>
          <div style={styles.summaryRow}>
            <span>Tax</span>
            <span>{tax}%</span>
          </div>
          <div style={{ ...styles.summaryRow, fontWeight: "bold" }}>
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <hr />

      <section style={styles.billingSection}>
        <h3>Billing</h3>
        <p>No recorded invoice.</p>
        <button onClick={handleBillClient} style={styles.billClientBtn}>
          Bill Client
        </button>
      </section>

      <hr />

      <section style={styles.internalNotesSection}>
        <h3>Internal Notes</h3>
        <p>Your team alone can see internal notes.</p>
        <textarea
          placeholder="Enter internal notes here."
          style={styles.textarea}
          value={internalNotes}
          onChange={handleInternalNotesChange}
        />
        <div style={styles.fileUploadSection}>
          <button onClick={handleUploadFile} style={styles.uploadFileBtn}>
            Upload a file
          </button>
          <div style={{ flexGrow: 1 }} />
          <button onClick={handleCancel} style={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

// Basic inline styles - you can replace with CSS or styled-components if needed
const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    padding: 20,
    maxWidth: 900,
    margin: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  printBtn: {
    padding: "6px 12px",
    marginRight: 10,
    borderRadius: 20,
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
  },
  backBtn: {
    padding: "6px 12px",
    borderRadius: 20,
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
  },
  statusSection: {
    marginBottom: 15,
  },
  statusLabel: {
    backgroundColor: "#ffe599",
    color: "#7a5900",
    padding: "5px 10px",
    fontWeight: "bold",
    borderRadius: 10,
    fontSize: 12,
    display: "inline-block",
  },
  mainSection: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  leftColumn: {
    flexBasis: "60%",
  },
  jobTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  jobDesc: {
    fontSize: 12,
    marginBottom: 10,
    color: "#555",
  },
  addressSection: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
    fontSize: 12,
  },
  rightColumn: {
    flexBasis: "35%",
    fontSize: 13,
  },
  jobDetailsRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  actionButtons: {
    marginTop: 15,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  moreActionsBtn: {
    backgroundColor: "#eaeaea",
    borderRadius: 5,
    border: "1px solid #bbb",
    padding: "6px 12px",
    cursor: "pointer",
  },
  holdJobBtn: {
    backgroundColor: "#001f4d",
    color: "white",
    borderRadius: 20,
    padding: "6px 18px",
    cursor: "pointer",
    border: "none",
  },
  serviceItemsSection: {
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 10,
    fontSize: 14,
  },
  tableCellLeft: {
    textAlign: "left",
    paddingLeft: 5,
    verticalAlign: "top",
  },
  itemsActions: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },
  addItemBtn: {
    backgroundColor: "#001f4d",
    color: "white",
    borderRadius: 20,
    border: "none",
    padding: "6px 18px",
    cursor: "pointer",
  },
  servicePricingBtn: {
    borderRadius: 20,
    border: "1px solid #001f4d",
    backgroundColor: "white",
    color: "#001f4d",
    padding: "6px 18px",
    cursor: "pointer",
  },
  summaryBox: {
    maxWidth: 280,
    marginLeft: "auto",
    fontSize: 14,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  addDiscountBtn: {
    border: "none",
    backgroundColor: "transparent",
    color: "#008080",
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
  },
  billingSection: {
    fontSize: 14,
  },
  billClientBtn: {
    backgroundColor: "#001f4d",
    color: "white",
    borderRadius: 20,
    border: "none",
    padding: "8px 20px",
    cursor: "pointer",
    marginTop: 8,
  },
  internalNotesSection: {
    marginTop: 20,
    fontSize: 14,
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    borderRadius: 6,
    fontSize: 14,
    padding: 10,
    border: "1px solid #ccc",
    resize: "vertical",
  },
  fileUploadSection: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  },
  uploadFileBtn: {
    backgroundColor: "white",
    color: "#001f4d",
    borderRadius: 20,
    border: "1px solid #001f4d",
    padding: "6px 18px",
    cursor: "pointer",
  },
  cancelBtn: {
    marginLeft: "auto",
    backgroundColor: "white",
    borderRadius: 20,
    border: "1px solid #999",
    color: "#999",
    padding: "6px 20px",
    cursor: "pointer",
  },
  saveBtn: {
    marginLeft: 8,
    backgroundColor: "#001f4d",
    color: "white",
    borderRadius: 20,
    border: "none",
    padding: "6px 20px",
    cursor: "pointer",
  },
};

export default JobDetails;
