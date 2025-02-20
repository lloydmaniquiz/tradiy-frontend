import React, { useState } from "react";
import "../App.css";

const Questions = () => {
  const questionsData = [
    { question: "What is Tradiy?", answer: "Tradiy is an online directory connecting homeowners in Scotland with verified tradespeople. It’s designed to make finding trusted professionals for home projects quick, simple, and stress-free." },
    { question: "How does Tradiy ensure tradespeople are reliable?", answer: "All tradespeople listed on Tradiy are personally vetted by our team. They must provide valid ID, public liability insurance, and relevant certifications to be verified." },
    { question: "Is Tradiy free to use?", answer: "Yes, Tradiy is free for homeowners to browse and contact tradespeople. Tradespeople can currently sign up and get verified for free as well." },
    { question: "How do I search for tradespeople on Tradiy?", answer: "You can search the directory by trade and location. For example, enter “electrician in Glasgow” or “plumber in Ayrshire” to find professionals near you." },
    { question: "Can homeowners leave reviews?", answer: "Currently, our team personally vets all tradespeople. In the future, homeowners will be able to leave reviews to further help others make informed decisions." }
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

export default Questions;
