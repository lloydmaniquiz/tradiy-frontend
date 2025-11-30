import React, { useState } from "react";
import "../styles/JobDetails.css";
import { FaChevronLeft } from "react-icons/fa";

const JobDetails = () => {
  const [serviceItems] = useState([
    {
      id: 1,
      service: "Service A",
      description: "Lorem ipsum",
      qty: 1,
      unitPrice: 1000,
    },
  ]);
  const [discount, setDiscount] = useState(0);
  const [tax] = useState(20);

  const jobData = {
    name: "Jasmine Davies",
    title: "Job Title Lorem Ipsum",
    description:
      "Job description lorem ipsum dolor sit amet, consectetur adipiscing elit",
    propertyAddress: "29d Harbour Place, Ardrossan, KA22 8BU",
    contactDetails: {
      phone: "01234 567890",
      email: "charlottegriffiths@email.com",
    },
    jobId: "JOB-1234",
    startDate: "17 January 2025",
    endDate: "17 January 2025",
    status: "COMPLETED",
  };

  const subtotal = serviceItems.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );
  const total = subtotal - (subtotal * discount) / 100;

  return (
    <div className="jobdetails-container">
      {/* Header */}
      <div className="jobdetails-header">
        <h1>Job Details</h1>
        <div className="jobdetails-header-buttons">
          <button className="outline-btn">Print Quote PDF</button>
          <button className="db-back-btn">
            <FaChevronLeft className="icon" /> Back
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="jobdetails-card">
        {/* Top Info */}
        <div className="jobdetails-top">
          <div className="left">
            <div className="status-badge completed">● COMPLETED</div>
            <h2>{jobData.name}</h2>
            <p className="job-title">{jobData.title}</p>
            <p className="job-desc">{jobData.description}</p>

            <div className="info-grid">
              <div>
                <strong>Property Address</strong>
                <p>{jobData.propertyAddress}</p>
              </div>
              <div>
                <strong>Contact Details</strong>
                <p>{jobData.contactDetails.phone}</p>
                <p className="email">{jobData.contactDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="right-buttons">
              <button className="outline-btn">More Actions ▼</button>
              <button className="primary-btn">Send Invoice</button>
            </div>
            <h4>Job Details</h4>
            <div className="details-row">
              <span>Job ID</span>
              <span>{jobData.jobId}</span>
            </div>
            <div className="details-row">
              <span>Start Date</span>
              <span>{jobData.startDate}</span>
            </div>
            <div className="details-row">
              <span>End Date</span>
              <span>{jobData.endDate}</span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        {/* Service Items */}
        <section className="service-section">
          <h3>Service Items</h3>

          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Qty.</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {serviceItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.service}</strong>
                    <br />
                    <small>{item.description}</small>
                  </td>
                  <td>{item.qty}</td>
                  <td>£{item.unitPrice.toFixed(2)}</td>
                  <td>£{(item.qty * item.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="service-buttons">
            <button className="primary-btn">+ Add Item</button>
            <button className="outline-btn">Service Pricing</button>
          </div>

          <div className="summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <button className="link-btn">Add Discount</button>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>{tax}%</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* Billing */}
        <section className="billing-section">
          <h3>Billing</h3>
          <p>No recorded invoice.</p>
          <button className="primary-btn">Bill Client</button>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
