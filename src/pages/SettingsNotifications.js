import React, { useState } from "react";

const sections = [
  {
    title: "Calendar",
    items: [
      { id: "scheduleReminder", label: "Schedule Reminder" },
      { id: "missedEventReminder", label: "Missed Event Reminder" },
    ],
  },
  {
    title: "Chat & Enquiries",
    items: [
      { id: "newMessageAlert", label: "New Message Alerts" },
      { id: "messageReply", label: "Message Conversation Reply" },
      { id: "unreadMessages", label: "Unread Messages Alerts" },
    ],
  },
  {
    title: "Workbench",
    items: [
      { id: "documentsExpiry", label: "Documents Approaching Expiry Date" },
    ],
  },
  {
    title: "Pipeline",
    items: [
      { id: "newClientAdded", label: "New Client Added" },
      { id: "newQuoteRequest", label: "New Quote Request" },
      { id: "quoteSoftConfirmation", label: "Quote Soft Confirmation" },
      { id: "quoteAccepted", label: "Quote Accepted Notification" },
      { id: "quoteDeclined", label: "Quote Declined Notification" },
      { id: "newJobRequest", label: "New Job Request" },
      { id: "jobConversion", label: "Job Conversion" },
      { id: "jobStatusUpdate", label: "Job Status Update" },
    ],
  },
  {
    title: "Payments",
    items: [
      { id: "paymentReceived", label: "Payment Received" },
      { id: "paymentReminder", label: "Payment Reminder" },
      { id: "depositReceived", label: "Deposit Payment Received" },
      { id: "partialPayment", label: "Part Payment Received" },
      { id: "overdueAlert", label: "Overdue Payment Alert" },
      { id: "fullPayment", label: "Full Payment Received" },
    ],
  },
  {
    title: "Contents & Activity",
    items: [
      { id: "newReview", label: "New Review Received" },
      { id: "reportedReview", label: "Reported Review" },
      { id: "responseToReview", label: "Awaiting Response to Review" },
      { id: "supportTicket", label: "Support Ticket Submission" },
      { id: "ticketStatus", label: "Ticket Status Updated" },
    ],
  },
  {
    title: "Subscription",
    items: [
      { id: "subscriptionActivated", label: "Subscription Activated" },
      { id: "subscriptionExpiry", label: "Subscription Expiry" },
      { id: "planReminder", label: "Subscription Payment Reminder" },
      { id: "freeTrialEnding", label: "Free Trial Ending Soon" },
    ],
  },
];

const SettingsNotifications = () => {
  const [enabled, setEnabled] = useState({});

  const toggle = (id) => {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {sections.map((section) => (
        <div key={section.title} className="settings-card">
          <h2 className="settings-card-title">{section.title}</h2>

          {section.items.map((item) => (
            <div key={item.id} className="notif-row">
              <div className="notif-label">{item.label}</div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!enabled[item.id]}
                  onChange={() => toggle(item.id)}
                />
                <span className="slider" />
              </label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default SettingsNotifications;
