import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"; // Import useLocation
import Header from "./landing-page/header";
import StickyHeader from "./landing-page/sticky-header"; // New StickyHeader component
import SearchBar from "./landing-page/search-bar"; // Updated SearchBar
import RecentSearches from "./landing-page/recent-searches";
import CarouselSearch from "./landing-page/carousel-search";
import HowItWorks from "./landing-page/homeowners-lookup";
import BenefitsTradespeople from "./landing-page/tradepeople-benefits";
import Questions from "./landing-page/questions";
import Divider from "./landing-page/divider";
import LocalTrades from "./landing-page/local-trades";
import Footer from "./landing-page/footer";
import Login from "./pages/login"; // Import Login component
import SignUp from "./pages/sign-up";
import ForgotPassword from "./pages/forgot-pw";
import ResetPassword from "./pages/reset-password";
import EmailVerification from "./pages/email-verification";
import EmailVerified from "./pages/verified";
import RegistrationForm from "./pages/tradiy-trader-registration";
import HowTradiyWorks from "./landing-page/how-tradiy-works";
import FAQs from "./pages/faqs";
import ContactUs from "./pages/contact-us";
import TradiyBenefits from "./landing-page/tradiy-benefits";
import NewsletterPage from "./pages/newsletter";

function App() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const searchBarRef = useRef(null);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();

        if (rect.top <= 0) {
          setShowStickyHeader(true); // Sticky header should show when SearchBar goes out of view
        } else {
          setShowStickyHeader(false); // Hide sticky header if SearchBar is in view
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initially to check if SearchBar is already out of view

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Render Header only if we're on the home route */}
      {location.pathname === "/" && <Header />}{" "}
      {/* Conditionally render Header based on the current route */}
      {showStickyHeader && <StickyHeader />}{" "}
      {/* Conditionally render StickyHeader */}
      <Routes>
        {/* Define the routes for your pages */}
        <Route
          path="/"
          element={
            <main className="hero">
              <div className="hero-content">
                <h2>Find trusted local trades in seconds</h2>
                <p>
                  Your directory for verified tradespeople in Ayrshire &
                  Glasgow.
                </p>
                <SearchBar ref={searchBarRef} />
                <RecentSearches />
              </div>
              <CarouselSearch />
              <HowItWorks />
              <BenefitsTradespeople />
              <Questions />
              <Divider />
              <LocalTrades />
              <Divider />
              <Footer />
            </main>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/email-verified" element={<EmailVerified />} />
        <Route
          path="/tradiy-registration-form"
          element={<RegistrationForm />}
        />
        <Route path="/how-tradiy-works" element={<HowTradiyWorks />} />
        <Route path="/tradiy-benefits" element={<TradiyBenefits />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App /> {/* App is wrapped inside Router */}
    </Router>
  );
}
