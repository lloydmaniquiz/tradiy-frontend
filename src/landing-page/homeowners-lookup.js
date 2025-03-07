import { useNavigate } from "react-router-dom";
import "../App.css";
import homeOwner from "../images/homeowner.png";
import browse from "../images/homeowners-steps/browse.png";
import done from "../images/homeowners-steps/done.png";
import location from "../images/homeowners-steps/location.png";
import need from "../images/homeowners-steps/need.png";
import vettedPeople from "../images/three-images/verified.png";
import fastAndEasy from "../images/three-images/fast-and-easy.png";
import supportBusiness from "../images/three-images/support-business.png";

const HowItWorks = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/how-tradiy-works");
  };

  return (
    <>
      {/* Additional Section */}
      <div className="triple-image">
        {[
          {
            img: vettedPeople,
            alt: "Verified and Vetted Tradespeople",
            text: "Verified and Vetted Tradespeople",
            desc: "We verify every tradesperson for their qualifications, public liability insurance, and ID, so you can hire with confidence.",
          },
          {
            img: fastAndEasy,
            alt: "Fast and Easy Search",
            text: "Fast and Easy Search",
            desc: "With Tradiy, you can find the right tradesperson quickly, and it’s 100% free to browse.",
          },
          {
            img: supportBusiness,
            alt: "Support Local Business",
            text: "Support Local Business",
            desc: "When you hire through Tradiy, you’re helping local tradespeople in your area thrive. It’s a win-win for your project and the community.",
          },
        ].map((item, idx) => (
          <div className="image-item" key={idx}>
            <img src={item.img} alt={item.alt} />
            <span className="image-text">{item.text}</span>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="how-it-works">
        <h2>How It Works for Homeowners</h2>
        <p>
          Finding the right tradesperson doesn’t have to be complicated. With
          Tradiy, it’s simple:
        </p>
        <div className="how-it-works-content">
          <img
            src={homeOwner}
            alt="Homeowner using phone"
            className="how-it-works-image"
          />
          <div className="steps">
            <div className="step">
              <img src={need} alt="Need" className="step-image" />
              <div className="step-text">
                <h3>Tell Us What You Need</h3>
                <p>
                  Choose the type of service you’re looking for, like a plumber,
                  electrician, or joiner.
                </p>
              </div>
            </div>
            <div className="step">
              <img src={location} alt="Location" className="step-image" />
              <div className="step-text">
                <h3>Add Your Location</h3>
                <p>Enter your postcode to find local professionals nearby.</p>
              </div>
            </div>
            <div className="step">
              <img src={browse} alt="Browse" className="step-image" />
              <div className="step-text">
                <h3>Browse for Free</h3>
                <p>
                  Explore a list of verified tradespeople at no cost. Read
                  reviews, check their work, and choose the right one for you.
                </p>
              </div>
            </div>
            <div className="step">
              <img src={done} alt="Done" className="step-image" />
              <div className="step-text">
                <h3>Get the Job Done</h3>
                <p>
                  Once the work is complete, you can leave a review to help
                  others in your community find great tradespeople.
                </p>
              </div>
            </div>
            <div className="step">
              <button
                className="how-it-works-button"
                onClick={handleNavigation}
              >
                How Tradiy Works
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
