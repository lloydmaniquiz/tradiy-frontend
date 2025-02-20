import React, { useState } from "react";
import "../App.css";

const HTWQuestions = () => {
  const questionsData = [
    { question: "What is Tradiy?", answer: "Tradiy is a platform that helps you find local, verified tradespeople for your home improvement and repair needs. From plumbers to electricians, all listed professionals are vetted to ensure quality and reliability." },
    { question: "How do I search for tradespeople?", answer: "Visit Tradiy’s website (or soon, the mobile app) and search by location and trade. For example, you can look for “electricians in Ayrshire” or “plumbers in Glasgow.”" },
    { question: "Are all tradespeople verified?", answer: "Yes, tradespeople listed on Tradiy must provide valid ID, public liability insurance, and any necessary certifications to ensure they are trustworthy and competent." },
    { question: "Is Tradiy free to use?", answer: "Yes, Tradiy is completely free for homeowners to use." },
    { question: "How do I contact a tradesperson?", answer: "Once you find a tradesperson you’d like to work with, you can contact them directly through the details provided in their Tradiy profile." }
  ];

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleDropdown = (index) => {
    setOpenIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      }
      return [...prevIndexes, index];
    });
  };

  return (
    <div className="faqs">
      <h3>Got more questions? Let’s get them answered!</h3>
      <h1>Frequently Asked Questions</h1>
      {questionsData.map((item, index) => (
        <div key={index} className="faq-container">
          <div
            className={`faq-header ${openIndexes.includes(index) ? "open" : ""}`}
            onClick={() => toggleDropdown(index)}
            style={{ cursor: "pointer" }}
            aria-expanded={openIndexes.includes(index)}
          >
            <h2>{item.question}</h2>
            {/* Add icon for + and - */}
            <span className="faq-icon">
              {openIndexes.includes(index) ? "-" : "+"}
            </span>
          </div>
          {openIndexes.includes(index) && (
            <div className="faq-content">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
      <div className="faqs-link-directory">
        <a href="/faqs">More FAQs</a>
      </div>
    </div>
  );
};

export default HTWQuestions;
