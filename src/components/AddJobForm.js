import React, { useState } from "react";
import "../styles/AddJobForm.css";

function AddJobForm({ onCancel, onSave }) {
  const [newJob, setNewJob] = useState({
    client: "",
    jobTitle: "",
    description: "",
    serviceType: "",
    startDate: "",
    endDate: "",
    serviceItems: [
      { name: "", description: "", qty: 1, unitPrice: 0, total: 0 },
    ],
    internalNotes: "",
  });

  // Generate random Job ID (can enhance later)
  const jobId = `JOB-${Math.floor(1000 + Math.random() * 9000)}`;

  // Update individual service item field
  const updateServiceItem = (index, field, value) => {
    const updatedItems = newJob.serviceItems.map((item, i) =>
      i === index
        ? {
            ...item,
            [field]: value,
            total:
              field === "qty" || field === "unitPrice"
                ? (field === "qty" ? value : item.qty) *
                  (field === "unitPrice" ? value : item.unitPrice)
                : item.total,
          }
        : item
    );
    setNewJob({ ...newJob, serviceItems: updatedItems });
  };

  const addServiceItem = () => {
    setNewJob({
      ...newJob,
      serviceItems: [
        ...newJob.serviceItems,
        { name: "", description: "", qty: 1, unitPrice: 0, total: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newJob);
  };

  return (
    <div className="add-job-container">
      <form onSubmit={handleSubmit}>
        {/* Job for Customer */}
        <section className="add-job-section">
          <div className="add-job-header">
            <h3>Job for Customer</h3>
          </div>

          <div className="add-job-content">
            {/* --- LEFT SIDE FORM --- */}
            <div className="add-job-form">
              <div className="client-select-row">
                <select
                  className="add-job-select"
                  value={newJob.client}
                  onChange={(e) =>
                    setNewJob({ ...newJob, client: e.target.value })
                  }
                >
                  <option value="">Select Client</option>
                  <option>Client 1</option>
                  <option>Client 2</option>
                </select>
                <button type="button" className="add-job-btn primary">
                  + New Client
                </button>
              </div>

              <label>Job Title</label>
              <input
                type="text"
                className="add-job-input"
                placeholder="Enter job title"
                value={newJob.jobTitle}
                onChange={(e) =>
                  setNewJob({ ...newJob, jobTitle: e.target.value })
                }
              />

              <label>Description</label>
              <textarea
                className="add-job-textarea"
                placeholder="Enter job description"
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({ ...newJob, description: e.target.value })
                }
              />
            </div>

            {/* --- RIGHT SIDE DETAILS --- */}
            <div className="add-job-details">
              <h4>Job Details</h4>
              <p>
                <strong>Job ID</strong> <span>{jobId}</span>
              </p>
            </div>
          </div>
        </section>

        <div className="add-job-horizontal-line"></div>

        {/* Job Schedule */}
        <section className="add-job-section">
          <h3>Job Schedule</h3>

          <div className="add-job-form">
            <label htmlFor="serviceType">Service Type</label>
            <select
              id="serviceType"
              className="add-job-select"
              value={newJob.serviceType}
              onChange={(e) =>
                setNewJob({ ...newJob, serviceType: e.target.value })
              }
              required
            >
              <option value="">Select service type</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
            </select>

            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              className="add-job-input"
              value={newJob.startDate}
              onChange={(e) =>
                setNewJob({ ...newJob, startDate: e.target.value })
              }
              required
            />

            <label htmlFor="endDate">End Date</label>
            <input
              id="endDate"
              type="date"
              className="add-job-input"
              value={newJob.endDate}
              onChange={(e) =>
                setNewJob({ ...newJob, endDate: e.target.value })
              }
            />
          </div>
        </section>

        {/* Service Items */}
        <section className="add-job-section">
          <hr className="add-job-divider" />

          <h3>Service Items</h3>

          <div className="service-items-header">
            <label>Service</label>
            <label>Qty.</label>
            <label>Unit Price</label>
            <label>Total</label>
          </div>

          {newJob.serviceItems.map((item, index) => (
            <div key={index} className="service-items-row">
              <input
                type="text"
                placeholder="Name"
                value={item.name}
                onChange={(e) =>
                  updateServiceItem(index, "name", e.target.value)
                }
                required
              />

              <input
                type="number"
                placeholder="1"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  updateServiceItem(index, "qty", parseInt(e.target.value) || 1)
                }
                required
              />

              <input
                type="number"
                placeholder="£0.00"
                value={item.unitPrice}
                min="0"
                step="0.01"
                onChange={(e) =>
                  updateServiceItem(
                    index,
                    "unitPrice",
                    parseFloat(e.target.value) || 0
                  )
                }
                required
              />

              <input
                type="text"
                placeholder="£0.00"
                value={`£${item.total.toFixed(2)}`}
                readOnly
              />

              <textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  updateServiceItem(index, "description", e.target.value)
                }
              />
            </div>
          ))}

          <div className="service-items-actions">
            <button
              type="button"
              onClick={addServiceItem}
              className="add-job-btn primary"
            >
              + Add Item
            </button>

            <button type="button" className="add-job-btn outline">
              Service Pricing
            </button>
          </div>

          <hr className="add-job-divider" />
        </section>

        {/* Actions */}
        <div className="add-job-actions">
          <button
            type="button"
            onClick={onCancel}
            className="add-job-btn cancel"
          >
            Cancel
          </button>
          <button type="submit" className="add-job-btn primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJobForm;
