import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./App.css";
import Header from "./landing-page/header";
import StickyHeader from "./landing-page/sticky-header";
import MobileHeader from "./landing-page/mobile-header";
import BottomNavBar from "./components/BottomNavBar"; // Import BottomNavBar
import SearchBar from "./landing-page/search-bar";
import RecentSearches from "./landing-page/recent-searches";
import CarouselSearch from "./landing-page/carousel-search";
import HowItWorks from "./landing-page/homeowners-lookup";
import BenefitsTradespeople from "./landing-page/tradepeople-benefits";
import Questions from "./landing-page/questions";
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
import BlogsPage from "./pages/blogs";
import SearchPage from "./landing-page/mobile-header-searchpage";
import BlogDetail from "./pages/BlogDetail";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import MenuPage from "./components/MenuPage";
import BackButton from "./images/back-button.png";
import Dashboard from "./pages/dashboards";
import QuickAction from "./pages/DashboardQuickActions";
import DashboardHome from "./pages/DashboardHome";
import DashboardCalendar from "./pages/DashboardCalendar";
import DashboardChat from "./pages/DashboardChat";
import DashboardEnquiries from "./pages/DashboardEnquiries";
import DashboardQuotes from "./pages/DashboardQuotes";
import DashboardJobs from "./pages/DashboardJobs";
import DashboardClients from "./pages/DashboardClients";
import DashboardPayments from "./pages/DashboardPayments";
import DashboardReviews from "./pages/DashboardReviews";
import DashboardReports from "./pages/DashboardReports";
import DashboardProfile from "./pages/DashboardProfile";
import DashboardBusiness from "./pages/DashboardBusiness";
import DashboardTickets from "./pages/DashboardTickets";
import DashboardResources from "./pages/DashboardResources";
import DashboardReferrals from "./pages/DashboardReferrals";
import ThankYouForm from "./pages/ThankYouForm";
import ResetPWSuccess from "./landing-page/password-change-success";
import FailedPrompt from "./landing-page/failed-prompt";
import Referral from "./pages/Referral";
import Divider from "./landing-page/divider";
import LocalTrades from "./landing-page/local-trades";
import PrivateRoute from "./components/PrivateRoute";
import Bookmarks from "./pages/Bookmarks";

function App() {
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const searchBarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        const offset = -250;
        setShowStickyHeader(rect.top <= offset);
      }
    };

    const loadRecentSearches = () => {
      const storedSearches = localStorage.getItem("recentSearches");
      if (storedSearches) {
        try {
          const parsed = JSON.parse(storedSearches);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecentSearches(parsed);
          }
        } catch (e) {
          console.error("Error parsing recentSearches from localStorage:", e);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();
    loadRecentSearches();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      if (searchBarRef.current) {
        const rect = searchBarRef.current.getBoundingClientRect();
        const offset = -250;
        setShowStickyHeader(rect.top <= offset);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Hide bottom navigation on certain pages
  const hideBottomNavPages = [
    "/login",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
    "/trader",
    "/email-verification",
    "/email-verified",
    "/tradiy-registration-form",
    "/thank-you",
  ];
  const shouldShowBottomNav =
    isMobile &&
    !hideBottomNavPages.some((path) => location.pathname.startsWith(path));

  const pagesWithBackButton = [
    "/trader",
    "/blogs",
    "/newsletter",
    "/faqs",
    "/privacy",
    "/terms",
    "/trader-coc",
    "/directory",
  ];

  return (
    <HelmetProvider>
      <div className="landing-page">
        <ScrollToTop />

        {/* Back Button (only for mobile on specific pages) */}
        {isMobile &&
          pagesWithBackButton.some((path) =>
            location.pathname.startsWith(path)
          ) && (
            <button className="back-btn" onClick={() => window.history.back()}>
              <img src={BackButton} alt="Back" />
            </button>
          )}
        {location.pathname === "/" && <Header />}
        {showStickyHeader &&
          location.pathname !== "/mobile-search" &&
          (isMobile ? (
            <MobileHeader handleSearch={handleSearch} />
          ) : (
            <StickyHeader handleSearch={handleSearch} />
          ))}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Helmet>
                  <title>Tradiy | Find Trusted Local Trades</title>
                  <meta
                    name="description"
                    content="Find trusted and verified tradespeople in Ayrshire & Glasgow."
                  />
                  <meta
                    property="og:title"
                    content="Tradiy | Find Trusted Local Trades"
                  />
                  <meta
                    property="og:description"
                    content="Find verified tradespeople quickly."
                  />
                  <meta
                    property="og:image"
                    content="/tradify-frontend/default-image.jpg"
                  />
                </Helmet>

                <main className="hero">
                  <div className="hero-content">
                    <h1>Find trusted local trades in seconds</h1>
                    <p>
                      Your directory for verified tradespeople in Ayrshire &
                      Glasgow.
                    </p>
                    <SearchBar ref={searchBarRef} handleSearch={handleSearch} />
                    {!isMobile && recentSearches.length > 0 && (
                      <RecentSearches handleSearch={handleSearch} />
                    )}
                  </div>
                  <CarouselSearch handleSearch={handleSearch} />
                  <HowItWorks />
                  <BenefitsTradespeople />
                  <Questions />
                  <div className="mobile-footer">
                    <Divider />
                    <LocalTrades />
                    <hr
                      style={{
                        border: "1px solid #ccc",
                        width: "100%",
                        margin: "0 auto",
                        marginTop: "10px",
                        marginBottom: "100px",
                        marginRight: "150px",
                      }}
                    />
                  </div>
                  <Footer />
                </main>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route path="/thank-you" element={<ThankYouForm />} />
          <Route path="/reset-password-success" element={<ResetPWSuccess />} />
          <Route path="/failed-prompt" element={<FailedPrompt />} />
          <Route
            path="/tradiy-registration-form"
            element={<RegistrationForm />}
          />

          <Route path="/referral" element={<Referral />} />
          <Route path="/how-tradiy-works" element={<HowTradiyWorks />} />
          <Route path="/tradiy-benefits" element={<TradiyBenefits />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/trader/:id" element={<TraderProfile />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route
            path="bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<MobileHeader />} />
          <Route
            path="/mobile-search"
            element={<SearchPage handleSearch={handleSearch} />}
          />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/menu-page" element={<MenuPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="quick-actions" element={<QuickAction />} />
            <Route path="dashboard-home" element={<DashboardHome />} />
            <Route path="calendar" element={<DashboardCalendar />} />
            <Route path="chat" element={<DashboardChat />} />
            <Route path="enquiries" element={<DashboardEnquiries />} />
            <Route path="quotes" element={<DashboardQuotes />} />
            <Route path="jobs" element={<DashboardJobs />} />
            <Route path="clients" element={<DashboardClients />} />
            <Route path="payments" element={<DashboardPayments />} />
            <Route path="reviews" element={<DashboardReviews />} />
            <Route path="reports" element={<DashboardReports />} />
            <Route path="workbench/profile" element={<DashboardProfile />} />
            <Route path="workbench/business" element={<DashboardBusiness />} />
            <Route path="helpdesk/tickets" element={<DashboardTickets />} />
            <Route path="helpdesk/resources" element={<DashboardResources />} />
            <Route path="referrals" element={<DashboardReferrals />} />
          </Route>
        </Routes>

        {/* Show bottom navigation only on mobile except in login/signup pages */}
        {shouldShowBottomNav && <BottomNavBar />}
      </div>
    </HelmetProvider>
  );
}

export default App;
