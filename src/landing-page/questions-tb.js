import React, { useState } from "react";
import "../App.css";

const TBQuestions = () => {
  const questionsData = [
    {
      question: "What is Tradiy?",
      answer:
        "Tradiy is an online directory and soon-to-be mobile app designed to connect local tradespeople in Scotland with homeowners looking for reliable, verified professionals. It helps you grow your business by making it easy for potential clients to find and trust your services.",
    },
    {
      question: "Why should I join Tradiy?",
      answer: [
        "By joining Tradiy, you gain access to:",

        "- Increased visibility among local homeowners.",
        "- A platform that verifies your credentials, boosting your credibility.",
        "- Exclusive promotions and competitions, like the current **DeWalt cordless drill raffle**.",
        "- A simple way to showcase your work and expertise.",
        "- **A trusted brand association that helps you stand out from unverified competitors.**",
      ],
    },
    {
      question: "What do I need to sign up?",
      answer: [
        "To sign up and get verified on Tradiy, you’ll need to provide:",

        "- Proof of identity (valid ID).",
        "- Public liability insurance documentation.",
        "- Any relevant trade qualifications or certifications.",
        "- **A valid business address or trading location.**",
      ],
    },
    {
      question: "Is Tradiy a paid service?",
      answer:
        "Currently, sign-up and verification on Tradiy are free. However, premium features, such as enhanced listings, advertising opportunities, or additional exposure tools, may be introduced in the future.",
    },
    {
      question: "How do I get verified?",
      answer:
        "After submitting your documents during registration, our team will review and approve them. Verification ensures homeowners can trust you, giving you an edge over unverified competitors.",
    },
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

  const makeBold = (text) => {
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="faqs">
      <h3>Got more questions? Let’s get them answered!</h3>
      <h1>Frequently Asked Questions</h1>
      {questionsData.map((item, index) => (
        <div key={index} className="faq-container">
          <div
            className={`faq-header ${
              openIndexes.includes(index) ? "open" : ""
            }`}
            onClick={() => toggleDropdown(index)}
            style={{ cursor: "pointer" }}
            aria-expanded={openIndexes.includes(index)}
          >
            <h2>{item.question}</h2>
            <span className="faq-icon">
              {openIndexes.includes(index) ? "-" : "+"}
            </span>
          </div>
          {openIndexes.includes(index) && (
            <div className="faq-content">
              {Array.isArray(item.answer) ? (
                item.answer.map((line, idx) => (
                  <p
                    key={idx}
                    dangerouslySetInnerHTML={{ __html: makeBold(line) }}
                  />
                ))
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: makeBold(item.answer) }}
                />
              )}
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

export default TBQuestions;
