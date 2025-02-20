import "../App.css";
import React, { useState } from "react";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import searchIcon from "../images/search-blue.png";

const questionsData = [
  {
    category: "FOR TRADESPEOPLE",
    question: "What is Tradiy?",
    answer:
      "Tradiy is an online directory and soon-to-be mobile app designed to connect local tradespeople in Scotland with homeowners looking for reliable, verified professionals. It helps you grow your business by making it easy for potential clients to find and trust your services.",
  },
  {
    category: "FOR TRADESPEOPLE",
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
    category: "FOR TRADESPEOPLE",
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
    category: "FOR TRADESPEOPLE",
    question: "Is Tradiy a paid service?",
    answer:
      "Currently, sign-up and verification on Tradiy are free. However, premium features, such as enhanced listings, advertising opportunities, or additional exposure tools, may be introduced in the future.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "How do I get verified?",
    answer:
      "After submitting your documents during registration, our team will review and approve them. Verification ensures homeowners can trust you, giving you an edge over unverified competitors.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "How long does verification take?",
    answer:
      "Verification typically takes 1–2 business days once all required documents are submitted. We’ll notify you once your profile is live.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "Can I update my profile later?",
    answer:
      "Yes! You can log in anytime to update your profile, add new services, upload photos of completed work, or refresh your contact details.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "What happens if my documents expire?",
    answer:
      "We’ll send you reminders to update any expiring documents, such as public liability insurance. Keeping your profile updated ensures you maintain your verified status.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "How will homeowners find me?",
    answer:
      "Homeowners in Scotland can search the Tradiy directory by location and trade. Your verified profile will appear in relevant search results, making it easy for them to contact you directly.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "Can I delete my profile?",
    answer:
      "Yes, you can deactivate or delete your profile at any time by contacting Tradiy support or through your account settings.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "What support does Tradiy provide for tradespeople?",
    answer:
      "- Tradiy offers personalised support to help you complete your profile, troubleshoot issues, or navigate compliance requirements like insurance renewals. You can reach out via email or the website’s contact form.",
  },

  {
    category: "FOR HOMEOWNERS",
    question: "What is Tradiy?",
    answer:
      "Tradiy is a platform that helps you find local, verified tradespeople for your home improvement and repair needs. From plumbers to electricians, all listed professionals are vetted to ensure quality and reliability.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I search for tradespeople",
    answer:
      "Visit Tradiy’s website (or soon, the mobile app) and search by location and trade. For example, you can look for “electricians in Ayrshire” or “plumbers in Glasgow.”",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Are all tradespeople verified?",
    answer:
      "Yes, tradespeople listed on Tradiy must provide valid ID, public liability insurance, and any necessary certifications to ensure they are trustworthy and competent.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Is Tradiy free to use?",
    answer: "Yes, Tradiy is completely free for homeowners to use.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I contact a tradesperson?",
    answer:
      "Once you find a tradesperson you’d like to work with, you can contact them directly through the details provided in their Tradiy profile.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I know the tradesperson is right for my job?",
    answer:
      "Each tradesperson’s profile includes details about their experience, qualifications, and customer reviews, helping you make an informed choice.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Can I leave a review?",
    answer:
      "Yes, Tradiy encourages homeowners to leave reviews after a job is completed. This helps other users make informed decisions and supports high-quality tradespeople.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "What types of tradespeople can I find on Tradiy?",
    answer: [
      "You can find a wide range of professionals, including:",
      "- Electricians",
      "- Plumbers",
      "- Carpenters",
      "- Roofers",
      "- Painters and decorators",
      "General contractors. If your required trade isn’t listed, feel free to suggest it to Tradiy’s support team.",
    ],
  },
  {
    category: "FOR HOMEOWNERS",
    question: "What if I have an issue with a tradesperson?",
    answer:
      "If you encounter any problems, you can: Contact the tradesperson directly to resolve the issue or Report the issue to Tradiy’s support team for further assistance.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Can I request multiple quotes?",
    answer:
      "Yes, you can contact multiple tradespeople through the platform and request quotes to compare services and prices.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How does Tradiy ensure my safety?",
    answer:
      "Tradiy requires tradespeople to provide valid ID, insurance, and proof of qualifications. Additionally, you can check reviews from previous customers to confirm their reliability.",
  },

  {
    category: "GENERAL FAQS",
    question: "What is Tradiy?",
    answer:
      "Tradiy is an online directory connecting homeowners in Scotland with verified tradespeople. It’s designed to make finding trusted professionals for home projects quick, simple, and stress-free.",
  },
  {
    category: "GENERAL FAQS",
    question: "How does Tradiy ensure tradespeople are reliable?",
    answer:
      "All tradespeople listed on Tradiy are personally vetted by our team. They must provide valid ID, public liability insurance, and relevant certifications to be verified.",
  },
  {
    category: "GENERAL FAQS",
    question: "Is Tradiy free to use?",
    answer:
      "Yes, Tradiy is free for homeowners to browse and contact tradespeople. Tradespeople can currently sign up and get verified for free as well..",
  },
  {
    category: "GENERAL FAQS",
    question: "How do I search for tradespeople on Tradiy?",
    answer:
      "You can search the directory by trade and location. For example, enter “electrician in Glasgow” or “plumber in Ayrshire” to find professionals near you.",
  },
  {
    category: "GENERAL FAQS",
    question: "Can homeowners leave reviews?",
    answer:
      "Currently, our team personally vets all tradespeople. In the future, homeowners will be able to leave reviews to further help others make informed decisions.",
  },
];

const FAQs = () => {
  const [search, setSearch] = useState("");
  const [openIndexes, setOpenIndexes] = useState({});

  // Group FAQs by category
  const categories = [...new Set(questionsData.map((faq) => faq.category))];

  // Filter FAQs based on search input
  const filteredFAQs = questionsData.filter(
    (faq) =>
      (faq.question &&
        faq.question.toLowerCase().includes(search.toLowerCase())) ||
      (typeof faq.answer === "string" &&
        faq.answer.toLowerCase().includes(search.toLowerCase())) // Check if answer is a string
  );

  const toggleDropdown = (category, index) => {
    setOpenIndexes((prevIndexes) => {
      const updatedIndexes = { ...prevIndexes };
      if (updatedIndexes[category]?.includes(index)) {
        updatedIndexes[category] = updatedIndexes[category].filter(
          (i) => i !== index
        );
      } else {
        updatedIndexes[category] = [...(updatedIndexes[category] || []), index];
      }
      return updatedIndexes;
    });
  };

  // Function to make bold text inside answers
  const formatAnswer = (answer) => {
    if (typeof answer === "string") {
      return answer
        .split("**")
        .map((part, index) =>
          index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        );
    }
    return answer.map((part, index) =>
      typeof part === "string"
        ? part
            .split("**")
            .map((subPart, subIndex) =>
              subIndex % 2 === 1 ? (
                <strong key={subIndex}>{subPart}</strong>
              ) : (
                subPart
              )
            )
        : part
    );
  };

  return (
    <>
      <StickyHeader />
      <div className="faqs-container">
        <div className="faqs-content">
          <section className="faqs-hero">
            <div className="faqs-overlay">
              <h1>Frequently Asked Questions</h1>
              <p>
                Find answers to commonly asked questions to guide you better!
              </p>
            </div>
          </section>
          <div className="faqs-search-container">
            <input
              type="text"
              placeholder="Search the FAQs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="faqs-search-input"
            />
            <img src={searchIcon} alt="search icon" className="search-icon" />
          </div>
          <div className="faq-list">
            {categories.map((category, categoryIndex) => {
              const categoryFAQs = filteredFAQs.filter(
                (faq) => faq.category === category
              );
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={categoryIndex} className="faq-category-container">
                  <h2 className="faq-category">{category}</h2>
                  {categoryFAQs.map((item, index) => (
                    <div key={index} className="faq-container">
                      <div
                        className={`faq-header ${
                          openIndexes[category]?.includes(index) ? "open" : ""
                        }`}
                        onClick={() => toggleDropdown(category, index)}
                        aria-expanded={openIndexes[category]?.includes(index)}
                      >
                        <h3>{item.question}</h3>
                        <span className="faq-icon">
                          {openIndexes[category]?.includes(index) ? "-" : "+"}
                        </span>
                      </div>
                      {openIndexes[category]?.includes(index) && (
                        <div className="faq-content">
                          {Array.isArray(item.answer) ? (
                            item.answer.map((ans, idx) => (
                              <p key={idx}>{formatAnswer(ans)}</p>
                            ))
                          ) : (
                            <p>{formatAnswer(item.answer)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
            {filteredFAQs.length === 0 && (
              <p className="no-faqs-found">No FAQs found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;
