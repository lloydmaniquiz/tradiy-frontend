import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"; // Removed HashRouter here
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import Header from "./landing-page/header";
import StickyHeader from "./landing-page/sticky-header";
import SearchBar from "./landing-page/search-bar";
import RecentSearches from "./landing-page/recent-searches";
import CarouselSearch from "./landing-page/carousel-search";
import HowItWorks from "./landing-page/homeowners-lookup";
import BenefitsTradespeople from "./landing-page/tradepeople-benefits";
import Questions from "./landing-page/questions";
import Divider from "./landing-page/divider";
import LocalTrades from "./landing-page/local-trades";
import Footer from "./landing-page/footer";
import Login from "./pages/login";
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
import Directory from "./pages/directory";
import SearchResults from "./pages/SearchResults";
import TraderProfile from "./pages/traders-profile";

function App() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const searchBarRef = useRef(null);
  const location = useLocation();

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
    const handleScroll = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        const offset = -250; // Adjust this value to control how much you need to scroll before the header appears
        setShowStickyHeader(rect.top <= offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call the function initially to check the scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      <ScrollToTop /> {/* Add ScrollToTop here */}
      {location.pathname === "/" && <Header />}
      {showStickyHeader && <StickyHeader handleSearch={handleSearch} />}
      <Routes>
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
                <SearchBar ref={searchBarRef} handleSearch={handleSearch} />
                <RecentSearches handleSearch={handleSearch} />
              </div>
              <CarouselSearch handleSearch={handleSearch} />
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
        <Route path="/directory" element={<Directory />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/trader/:profileId" element={<TraderProfile />} />
      </Routes>
    </div>
  );
}

export default App;
