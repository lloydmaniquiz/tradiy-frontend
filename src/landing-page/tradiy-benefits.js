import "../App.css";
import { useNavigate } from "react-router-dom";
import StickyHeader from "./sticky-header";
import BlueCheck from "../images/bluecheck.png";
import Construction from "../images/construction.png";
import ImageTextContainer from "../components/ImageTextContainer";
import Confused from "../images/confused.png";
import Tips from "../images/tips.png";
import Thinking from "../images/thinking.png";
import Free from "../images/benefits-set/free.png";
import Trust from "../images/benefits-set/trust.png";
import Expert from "../images/benefits-set/expert.png";
import Connect from "../images/benefits-set/connect.png";
import Grow from "../images/benefits-set/grow.png";
import Footer from "./footer";
import Shakehands from "../images/shakehands.png";
import FisherVan from "../images/fishervanbg.png";
import TBQuestions from "./questions-tb";
import { FaStar } from "react-icons/fa";

const TradiyBenefits = () => {
  const navigate = useNavigate();

  const exploreMore = () => {
    navigate("/blogs");
  };

  const signUp = () => {
    window.open("/sign-up", "_blank");
  };

  return (
    <>
      <StickyHeader />
      <div className="tb-tradiy-benefits">
        {/* Hero Section */}
        <section className="tb-hero">
          <div className="tb-overlay">
            <h1>A Better Way to Connect with Local Customers</h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="tb-content">
          <h2>Get More Jobs, Build Your Reputation, and Grow Your Business.</h2>
          <p className="tb-subheading">How Tradiy Supports Tradespeople</p>
        </section>

        <div className="tb-benefits-wrapper">
          <div className="tb-benefits-set">
            <img src={Free} alt="free" />
            <h3>Free to Join</h3>
            <p>
              Create a profile and list your services for free. There are no
              hidden fees or commissions.
            </p>
          </div>
          <div className="tb-benefits-set">
            <img src={Trust} alt="trust" />
            <h3>Build Trust with Verification</h3>
            <p>
              Upload your qualifications, insurance, and ID to get verified and
              stand out as a trusted professional.
            </p>
          </div>
          <div className="tb-benefits-set">
            <img src={Expert} alt="expert" />
            <h3>Showcase Your Expertise</h3>
            <p>
              Add photos of your work, share customer testimonials, and
              highlight your skills to attract more clients.
            </p>
          </div>
        </div>
        <div className="tb-benefits-wrapper-2">
          <div className="tb-benefits-set-2">
            <img src={Connect} alt="connect" />
            <h3>Connect with Local Customers</h3>
            <p>
              Homeowners in your area can find your profile, contact you
              directly, and request quotes for their projects.
            </p>
          </div>
          <div className="tb-benefits-set-2">
            <img src={Grow} alt="grow" />
            <h3>Grow Your Reputation</h3>
            <p>
              Deliver quality work to earn great reviews and grow your
              visibility on Tradiy. The better your profile, the more customers
              you’ll attract.
            </p>
          </div>
        </div>

        {/* FEATURES COMING SOON */}
        <div className="tb-personal-dashboard">
          <div className="tb-text-wrapper">
            <div className="tb-dashboard-header">
              <h2>Features Coming Soon with the Tradiy App</h2>
              <p>
                Launching this 2025, the Tradiy app will include powerful tools
                to make managing your business even easier:
              </p>
            </div>
            <div className="tb-check-text-container">
              <div className="tb-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="tb-check" />
                <div>
                  <p className="tb-bold">Job Management Dashboard</p>
                  <p className="tb-small">
                    Keep all your leads, quotes, and ongoing projects in one
                    organised place.
                  </p>
                </div>
              </div>
              <div className="tb-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="tb-check" />
                <div>
                  <p className="tb-bold">Real-Time Messaging</p>
                  <p className="tb-small">
                    Communicate with customers quickly and professionally.
                  </p>
                </div>
              </div>
              <div className="tb-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="tb-check" />
                <div>
                  <p className="tb-bold">Push Notifications</p>
                  <p className="tb-small">
                    Stay updated on new enquiries and messages instantly.
                  </p>
                </div>
              </div>
              <div className="tb-check-text-wrapper">
                <img src={BlueCheck} alt="blue-check" className="tb-check" />
                <div>
                  <p className="tb-bold">Project Tracking Tools</p>
                  <p className="tb-small">
                    Keep track of deadlines and deliverables to streamline your
                    workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src={Construction}
            alt="ConstructionImage"
            className="tb-side-image"
          />
        </div>

        {/* HTW Divider */}
        <div className="tb-divider">
          <div className="tb-overlay">
            <h2>
              The app will take Tradiy from a simple directory to an essential
              business tool for every tradesperson.
            </h2>
          </div>
        </div>

        {/* TRADES FOR TRADES */}
        <section className="tb-content-mid">
          <h2>A Platform Built by Trades, for Trades</h2>
          <div className="tb-text-image-wrapper">
            <img src={FisherVan} alt="Fisher Van" className="tb-content-img" />
            <div className="tb-p">
              <p>
                Tradiy is the brainchild of Edd Fisher, a painter and decorator
                who understands the challenges of the industry. Edd saw the need
                for a simpler, fairer way for tradespeople to connect with local
                customers and build their businesses. His hands-on experience
                drives Tradiy’s mission to make life easier for tradespeople and
                homeowners alike.
              </p>
              <p>
                Edd believes in supporting local businesses, and Tradiy reflects
                this value in every feature. From free profiles to a transparent
                verification process, Tradiy is designed with tradespeople at
                its heart.
              </p>
            </div>
          </div>
        </section>

        {/* TRADESPEOPLE FEEDBACK */}
        <div>
          <h1 style={{ marginBottom: "30px", color: "#000839" }}>
            Hear from Tradespeople Like You
          </h1>
          <div className="feedback-parent">
            <div className="tb-feedback-container">
              <div className="tb-stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="star-icon" />
                ))}
              </div>
              <p>
                “Since meeting Edd and joining tradiy we have seen massive
                amounts of improvements in our business, more Customers and the
                help and support has been amazing, definitely worth joining
                Tradiy.”
              </p>
              <p className="tb-regular">Stuart B</p>
            </div>
          </div>

          {/* Video Section */}
          <div className="video-section">
            <div className="video-placeholder">
              <iframe
                width="320"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-placeholder">
              <iframe
                width="320"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-placeholder">
              <iframe
                width="320"
                height="200"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Homeowner's Resource */}
        <div className="htw-homeowner-resource">
          <div className="htw-homeowner-header">
            <h1>Get Inspired!</h1>
            <p>
              We’re committed to helping you grow, not just as a tradesperson
              but as a business owner. Our blog features practical tips,
              industry news, and real stories from tradespeople in your area.
            </p>
          </div>
          <div className="htw-link-wrapper">
            <ImageTextContainer
              imageSrc={Confused}
              headerText="5 Tips to Build a Strong Trades Profile:"
              descriptionText="Learn how to stand out and attract more customers."
            />
            <ImageTextContainer
              imageSrc={Tips}
              headerText="What Homeowners Look for in a Tradesperson"
              descriptionText="Insights straight from the people hiring you."
            />
            <ImageTextContainer
              imageSrc={Thinking}
              headerText="Why Verified Tradespeople Get Hired More"
              descriptionText="Why verified profiles get more leads and build stronger trust."
            />
          </div>
        </div>

        <div>
          <button className="htw-search-button" onClick={exploreMore}>
            Explore More
          </button>
        </div>

        {/* FAQs */}
        <TBQuestions />
        <div className="htw-coming-soon">
          <div className="htw-overlay-container">
            <img src={Shakehands} alt="Ready to Join?" />
            <div className="htw-overlay-coming-soon">
              <div className="htw-overlay-text">
                <h2>Ready to Join?</h2>
                <p>
                  Tradiy is built to work for you. Sign up today to connect with
                  local customers, grow your reputation, and take your business
                  to the next level.
                </p>
                <div>
                  <button className="htw-search-button" onClick={signUp}>
                    Sign Up for Free
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TradiyBenefits;
