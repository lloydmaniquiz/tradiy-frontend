import "../App.css";
import { useNavigate } from "react-router-dom";
import StickyHeader from "./sticky-header";
import Arrow from "../images/arrow-right.png";
import ArrowFlipped from "../images/arrow-right-flipped.png";
import BlueCheck from "../images/bluecheck.png";
import CoffeeLaptop from "../images/coffee-laptop.png";
import ImageTextContainer from "../components/ImageTextContainer";
import Confused from "../images/confused.png";
import Tips from "../images/tips.png";
import Thinking from "../images/thinking.png";
import Verified from "../images/benefits-set/expert.png";
import Free from "../images/benefits-set/free.png";
import Professionals from "../images/benefits-set/professionals.png";
import Support from "../images/benefits-set/support.png";
import HTWQuestions from "./questions-htw";
import Divider from "./divider";
import LocalTrades from "./local-trades";
import Footer from "./footer";
import Shakehands from "../images/shakehands.png";

const HowTradiyWorks = () => {
  const navigate = useNavigate();

  const readyToJoin = () => {
    window.open("/sign-up", "_blank");
  };

  const exploreMore = () => {
    navigate("/blogs");
  };

  const searchATrade = () => {
    navigate("/directory");
  };

  return (
    <>
      <StickyHeader />
      <div className="htw-how-tradiy-works">
        {/* Hero Section */}
        <section className="htw-hero">
          <div className="htw-overlay">
            <h1>Finding Tradespeople Has Never Been Easier</h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="htw-content">
          <h2>How Tradiy Works</h2>
          <p className="htw-subheading">
            <strong>
              Discover how Tradiy makes hiring trusted professionals in your
              area simple and stress-free.
            </strong>
          </p>

          {/* Steps Section */}
          <div className="htw-steps-container">
            <div className="htw-step">
              <h3>Sign Up and Verify Your Account</h3>
              <p>
                Create a free account, upload your ID for security, and unlock
                features like requesting quotes.
              </p>
            </div>

            <img src={Arrow} alt="arrow" className="htw-arrow" />

            <div className="htw-step">
              <h3>Find and Compare Tradespeople</h3>
              <p>
                Search by trade, location, and reviews. Bookmark profiles,
                compare quotes, and review qualifications and past work.
              </p>
            </div>

            <img src={ArrowFlipped} alt="arrow" className="htw-arrow" />

            <div className="htw-step">
              <h3>Submit Projects and Leave Reviews</h3>
              <p>
                Post job details, receive quotes, and hire the best match. After
                the job, leave a review to help others.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="htw-cta">
            <button className="htw-search-button" onClick={searchATrade}>
              Search for a Trade
            </button>
          </div>
        </section>

        <div className="htw-personal-dashboard">
          <div className="htw-text-wrapper">
            <div className="htw-dashboard-header">
              <h2>Your personal dashboard directly on your phone!</h2>
              <p>
                The Tradiy app will include a user-friendly dashboard to keep
                all your project details in one place. You’ll be able to:
              </p>
            </div>
            <div className="htw-check-text-container">
              <div className="htw-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="htw-check" />
                <p>
                  Manage multiple projects at once with clear timelines and
                  progress tracking.
                </p>
              </div>
              <div className="htw-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="htw-check" />
                <p>
                  Receive push notifications for new quotes, updates, and
                  deadlines.
                </p>
              </div>
              <div className="htw-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="htw-check" />
                <p>
                  Communicate directly with tradespeople through built-in
                  messaging.
                </p>
              </div>
            </div>
          </div>
          <img
            src={CoffeeLaptop}
            alt="coffee-laptop"
            className="htw-side-image"
          />
        </div>

        {/* HTW Divider */}
        <div className="htw-divider">
          <div className="htw-overlay">
            <h2>
              This dashboard is designed to give you full control over your
              projects, saving you time and keeping everything organised.
            </h2>
          </div>
        </div>

        {/* Homeowner's Resource */}
        <div className="htw-homeowner-resource">
          <div className="htw-homeowner-header">
            <h1>Homeowner's Resource</h1>
            <p>
              We’re here to help you make informed decisions about your home
              projects. Explore tips, insights, and advice tailored for
              homeowners:
            </p>
          </div>
          <div className="htw-link-wrapper">
            <ImageTextContainer
              imageSrc={Confused}
              headerText="How to Choose the Right Tradesperson"
              descriptionText="Learn what to look for when hiring."
            />
            <ImageTextContainer
              imageSrc={Tips}
              headerText="5 Tips for Getting Accurate Quotes"
              descriptionText="Make sure you’re getting the best value."
            />
            <ImageTextContainer
              imageSrc={Thinking}
              headerText="Why Verified Tradespeople Matter"
              descriptionText="See how Tradiy ensures a safe experience."
            />
          </div>
        </div>

        <div>
          <button className="htw-search-button" onClick={exploreMore}>
            Explore More
          </button>
        </div>

        {/* WHY CHOOSE TRADIY */}
        <div className="htw-choose-tradiy-container">
          <div className="htw-choose-tradiy">
            <div className="htw-choose-tradiy-overlay">
              <h1>Why Choose Tradiy?</h1>
            </div>
          </div>
          <div>
            <p>
              Tradiy offers homeowners a reliable way to find and hire trusted
              tradespeople, with benefits including:
            </p>
          </div>

          <div className="benefits-wrapper">
            <div className="htw-benefits-set">
              <img src={Verified} alt="verified" />
              <h3>Verified Tradespeople</h3>
              <p>
                All tradespeople are checked for qualifications and insurance.
              </p>
            </div>
            <div className="htw-benefits-set">
              <img src={Free} alt="free" />
              <h3>Free to Use</h3>
              <p>Browse, bookmark, and request quotes at no cost.</p>
            </div>
            <div className="htw-benefits-set">
              <img src={Professionals} alt="professionals" />
              <h3>Local Professionals</h3>
              <p>Connect with trusted tradespeople near you.</p>
            </div>
            <div className="htw-benefits-set">
              <img src={Support} alt="support" />
              <h3>Support Your Community</h3>
              <p>Help local tradespeople grow by hiring and leaving reviews.</p>
            </div>
          </div>

          <div>
            <button className="htw-search-button" onClick={searchATrade}>
              Search for a Trade
            </button>
          </div>
        </div>

        {/* FAQs */}
        <HTWQuestions />
        <div className="htw-coming-soon">
          <div className="htw-overlay-container">
            <img src={Shakehands} alt="Ready to Join?" />
            <div className="htw-overlay-coming-soon">
              <div className="htw-overlay-text">
                <h2>Ready to Join?</h2>
                <p>
                  Find and connect with verified professionals to bring your
                  next project to life.
                </p>
                <div>
                  <button className="htw-search-button" onClick={readyToJoin}>
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <LocalTrades />
        <Divider />
        <Footer />
      </div>
    </>
  );
};

export default HowTradiyWorks;
