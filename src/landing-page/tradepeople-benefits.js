import "../App.css";
import free from "../images/benefits-set/free.png";
import trust from "../images/benefits-set/trust.png";
import expert from "../images/benefits-set/expert.png"
import connect from "../images/benefits-set/connect.png";
import comingSoon from "../images/coming-soon.png";
import ReviewSlider from "./landing-reviews";

const BenefitsTradespeople = () => {
  return (
    <div className="benefits-tradespeople">
      <h2>Benefits for Tradespeople</h2>
      <div className="shake-hands">
        <h3>Get Listed. Get Found. Get Hired</h3>
      </div>
      <div className="benefits-list">
        <h4>
          At Tradiy, we’re here to help you grow your business and reach more customers.
        </h4>
      </div>
      <div className="benefits-wrapper">
        <div className="benefits-set">
          <img src={free} alt="free"/>
          <h3>Free to Join</h3>
          <p>
            Create a profile and list your services for free. There are no hidden fees or
            commissions.
          </p>
        </div>
        <div className="benefits-set">
          <img src={trust} alt="trust"/>
          <h3>Build Trust with Verification</h3>
          <p>
            Upload your qualifications, insurance, and ID to get verified and stand out as a
            trusted professional.
          </p>
        </div>
        <div className="benefits-set">
          <img src={expert} alt="expert"/>
          <h3>Showcase Your Expertise</h3>
          <p>
            Add photos of your work, share customer testimonials, and highlight your skills to
            attract more clients.
          </p>
        </div>
        <div className="benefits-set">
          <img src={connect} alt="connect"/>
          <h3>Connect with Local Customers</h3>
          <p>
            Homeowners in your area can find your profile, contact you directly, and request
            quotes for their projects.
          </p>
        </div>
      </div>
      <button className="diy-button" onClick={() => window.open("/sign-up", "_blank")}>Be a Tradiy Trader </button>
      <div className="coming-soon">
        <div className="overlay-container">
          <img src={comingSoon} alt="Coming Soon" />
          <div className="overlay">
            <div className="overlay-text">
              <h2>Tradiy App Coming Soon!</h2>
              <p>With features like real-time messaging, project dashboards, and instant notifications, we’re making it even easier to connect and manage your projects. Stay tuned!</p>
            </div>
          </div>
        </div>
      </div>
      <div className="reviews-wrapper">
        <h1>Don’t Just Take our Word for It</h1>
      </div>
      <ReviewSlider />
    </div>
  );
};

export default BenefitsTradespeople;
