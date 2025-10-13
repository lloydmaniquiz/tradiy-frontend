// InvoiceForm.js
import React, { useState } from "react";
import "../styles/InvoiceForm.css";

export default function InvoiceForm({ onBack }) {
  const [client, setClient] = useState("");
  const [invoiceSubject, setInvoiceSubject] = useState("");
  const [serviceItems, setServiceItems] = useState([
    { name: "", qty: "", unitPrice: "", total: "£0.00", description: "" },
  ]);
  const [message, setMessage] = useState("");
  // Other form states such as invoice id, dates, etc.

  // Example function to add a service item
  const addItem = () => {
    setServiceItems([
      ...serviceItems,
      { name: "", qty: "", unitPrice: "", total: "£0.00", description: "" },
    ]);
  };

  // Handle back button
  const handleBack = () => {
    onBack();
  };

  return (
    <div className="invoice-issuance-container">
      <div className="invoice-header">
        <button onClick={handleBack} className="back-button">
          &lt; Back
        </button>
        <h2>Invoice Issuance</h2>
      </div>

      <div className="invoice-for-customer">
        <h3>Invoice for Customer</h3>
        <select
          value={client}
          onChange={(e) => setClient(e.target.value)}
          aria-label="Select Client"
        >
          <option value="">Select Client</option>
          <option value="client1">Client 1</option>
          {/* Add client options */}
        </select>
        <button className="new-client-btn">+ New Client</button>

        <input
          type="text"
          placeholder="Invoice Subject"
          value={invoiceSubject}
          onChange={(e) => setInvoiceSubject(e.target.value)}
        />

        <div className="address-contact-details">
          <div className="property-address">Property Address: --</div>
          <div className="billing-address">Billing Address: --</div>
          <div className="contact-details">Contact Details: --</div>
        </div>
      </div>

      <div className="invoice-details">
        <h3>Invoice Details</h3>
        <p>Invoice ID: INV-474-849</p>
        <label>
          Issuance Date
          <input type="date" />
        </label>
        <label>
          Due Date
          <input type="date" />
        </label>
      </div>

      <hr />

      <div className="service-items">
        <h4>Service Items</h4>
        {serviceItems.map((item, idx) => (
          <div key={idx} className="service-item-row">
            <input
              type="text"
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                const newItems = [...serviceItems];
                newItems[idx].name = e.target.value;
                setServiceItems(newItems);
              }}
            />
            <input
              type="number"
              placeholder="Qty."
              value={item.qty}
              onChange={(e) => {
                const newItems = [...serviceItems];
                newItems[idx].qty = e.target.value;
                setServiceItems(newItems);
              }}
            />
            <input
              type="text"
              placeholder="£0.00"
              value={item.unitPrice}
              onChange={(e) => {
                const newItems = [...serviceItems];
                newItems[idx].unitPrice = e.target.value;
                setServiceItems(newItems);
              }}
            />
            <input
              type="text"
              placeholder="£0.00"
              value={item.total}
              readOnly
            />
            <textarea
              placeholder="Description"
              value={item.description}
              onChange={(e) => {
                const newItems = [...serviceItems];
                newItems[idx].description = e.target.value;
                setServiceItems(newItems);
              }}
            />
          </div>
        ))}
        <button onClick={addItem} className="add-item-btn">
          + Add Item
        </button>
        <button className="service-pricing-btn">Service Pricing</button>
      </div>

      <div className="invoice-summary">
        <div>Subtotal: £0.00</div>
        <div>
          Discount: <button>Add Discount</button>
        </div>
        <div>
          Tax: <button>Add Tax</button>
        </div>
        <div>Total: £0.00</div>
        <div>
          Required Deposit: <button>Add Deposit</button>
        </div>
      </div>

      <textarea
        className="message-input"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="invoice-actions">
        <button className="cancel-btn" onClick={handleBack}>
          Cancel
        </button>
        <button className="save-btn">Save and ▾</button>
      </div>
    </div>
  );
}
