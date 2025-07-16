import "../App.css";
import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import Footer from "../landing-page/footer";
import searchIcon from "../images/search-blue.png";

const questionsData = [
  {
    category: "GENERAL FAQS",
    question: "What is Tradiy?",
    answer:
      "Tradiy is a local directory and job tool that helps people in Scotland find skilled tradespeople. It also gives traders digital tools to run their business — like quotes, calendars, and job tracking. You don’t need to be verified to use Tradiy Hero or appear on the site, but we’re building a trusted platform and working to keep it full of real pros.",
  },
  {
    category: "GENERAL FAQS",
    question: "Are all tradespeople verified?",
    answer: [
      "Nope. Verification is optional — not everyone has it.",
      "Verified traders have passed our checks (ID, insurance, trade certs).",
      "Unverified traders might still be brilliant — some just haven’t sent their documents yet. We clearly show who’s verified and who’s not, so you can decide.",
    ],
  },
  {
    category: "GENERAL FAQS",
    question: "Is Tradiy free?",
    answer:
      "Yes. Homeowners use Tradiy for free. Tradespeople can sign up and use the core site for free too. You only pay if you want access to our full job tools or extras like ad boosts.",
  },
  {
    category: "GENERAL FAQS",
    question: "How do I find someone for a job?",
    answer:
      "Search by trade and location — things like “plumber in Ayr” or “sparky in Glasgow.” You’ll see both verified and unverified traders.",
  },
  {
    category: "GENERAL FAQS",
    question: "Can I leave a review?",
    answer: [
      "Yes. You can leave a review if:",
      "You found the trader through Tradiy Hero, or",
      "You’ve used them in the past (even off the platform).",
      "We clearly mark reviews as either:",
      "✅ Verified – we’ve confirmed the job or the reviewer.",
      "⚠️ Unverified – we couldn’t confirm their identity or they don’t have a Tradiy account.",
      "Both types are allowed, and it’s up to you who you trust.",
    ],
  },

  {
    category: "FOR TRADESPEOPLE",
    question: "Do I need to be verified to join?",
    answer: [
      "No.",
      "You don’t need to be verified to:",
      "Be listed on Tradiy",
      "Use Tradiy Hero tools like quotes, invoices, calendars, etc.",
      "But if you want the Verified badge, send us your ID, public liability insurance, and any trade certs. Being verified helps you stand out and build trust with customers.",
    ],
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "What’s the point of being verified?",
    answer: [
      "It’s not required, but it does help.",
      "Verified traders look more professional and may get more work. Homeowners can see who’s verified and who’s not. It’s all about building trust.",
    ],
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "What do I need to sign up?",
    answer: [
      "Just your name, contact details, and a bit about your work. That gets your listing live.",
      "For verification, you’ll need:",
      "Valid ID",
      "Public liability insurance",
      "Any relevant trade certs",
    ],
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "How long does verification take?",
    answer: "Usually 1–2 working days once all your documents are in.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "Can I use the platform without being verified?",
    answer: [
      "Yes.",
      "Even if you’re not verified, you can:",
      "Be listed",
      "Be found by customers",
      "Use our software tools to run your business",
      "But again — verified traders may appear higher in results and have more trust.",
    ],
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "Can I update my profile later?",
    answer:
      "Yep. You can log in anytime to update your services, upload photos, add new skills, or change contact details.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "How do customers find me?",
    answer:
      "They search by trade and location. If you’re in the area and offer the service, you’ll show up — verified or not. But verified traders may get shown higher.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "What support does Tradiy offer?",
    answer:
      "We’ve got your back. Whether you need help getting set up, uploading docs, or using the tools, just drop us a message through the site or email.",
  },
  {
    category: "FOR TRADESPEOPLE",
    question: "Can I delete my account?",
    answer:
      "Yes. You can deactivate or delete your profile anytime from your account or by contacting us.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I find a tradesperson?",
    answer:
      "Go to our website or app, type what you need and where you are — like “roofer in Kilmarnock.” You’ll see a list of available traders, both verified and unverified.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Do I have to choose a verified tradesperson?",
    answer: [
      "No.",
      "You can choose anyone you feel is right for the job. We show you clearly who’s verified and who’s not, and both can be brilliant.",
    ],
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I contact a tradesperson?",
    answer:
      "Each profile has direct contact info. Just call, text, or email them — no middleman.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "How do I know if they’re right for me?",
    answer: [
      "Check their profile. We show:",
      "Their trade and experience",
      "Qualifications (if verified)",
      "Photos of their work",
      "Customer reviews (both verified and unverified)",
    ],
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Can I leave a review after the job?",
    answer: [
      "Yes. If you’ve worked with the trader — on or off Tradiy — you can leave a review.",
      "Reviews are marked:",
      "✅ Verified (confirmed job or identity)",
      "⚠️ Unverified (no confirmed link)",
      "We leave the choice to you who to trust.",
    ],
  },
  {
    category: "FOR HOMEOWNERS",
    question: "What if there’s a problem?",
    answer: [
      "First, try speaking directly to the tradesperson.",
      "If it’s not resolved, contact Tradiy support and we’ll help where we can.",
    ],
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Can I ask for more than one quote?",
    answer: "Definitely. Message as many tradespeople as you like and compare.",
  },
  {
    category: "FOR HOMEOWNERS",
    question: "Is it safe to use Tradiy?",
    answer: [
      "Yes — and we’re working to make it safer every day.",
      "We clearly label who’s been verified, and we’re building a trusted platform that keeps rogue traders out.",
    ],
  },
];

const FAQs = () => {
  const [search, setSearch] = useState("");
  const [openIndexes, setOpenIndexes] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const navigate = useNavigate();
  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
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
