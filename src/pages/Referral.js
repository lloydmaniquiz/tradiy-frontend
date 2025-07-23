import "../styles/Referral.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../landing-page/footer";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import IconTell from "../images/group.png";
import IconShare from "../images/social-media.png";
import IconEarn from "../images/coins.png";

const Referral = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [copied, setCopied] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // check if user is logged in
  const navigate = useNavigate();

  const referralLink = "https://tradiyhero.com/referral/FMFcgzQbff";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // example: assume login token is stored in localStorage
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  const handleJoinClick = () => {
    navigate("/sign-up");
  };

  return (
    <>
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}

      <div className="referral-container">
        <div className="referral-bg"></div>

        <div className="referral-content">
          <h1>Refer a Trader and get rewarded!</h1>

          {isLoggedIn ? (
            <>
              <p>
                Invite other traders to Tradiy Hero and score{" "}
                <span style={{ fontWeight: "bold" }}>5 points</span> per
                referral.
              </p>

              <div className="referral-link-container">
                <input type="text" value={referralLink} readOnly />
                <button onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy Link"}
                </button>
              </div>

              <div className="header-text">
                <p className="share-text">
                  You may also directly share your referral link via these
                  social networking sites.
                </p>

                <div className="social-buttons">
                  <button className="facebook">Facebook</button>
                  <button className="instagram">Instagram</button>
                  <button className="linkedin">LinkedIn</button>
                  <button className="tiktok">TikTok</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>
                Sign up today and invite other traders to Tradiy Hero and score{" "}
                <span style={{ fontWeight: "bold" }}>5 points</span> per
                referral.
              </p>
              <button className="join-button" onClick={handleJoinClick}>
                Join Tradiy Hero
              </button>
            </>
          )}
        </div>
      </div>

      <section className="how-it-works">
        <div className="how-it-works-inner">
          <h2>How it Works?</h2>
          <div className="steps-container">
            <div className="step-card">
              <img src={IconTell} alt="Tell your Co-Traders" />
              <div className="step-text-content">
                <h3>Tell your Co-Traders</h3>
                <p>
                  Tell other traders about the uses and benefits of Tradify
                  Hero.
                </p>
              </div>
            </div>
            <div className="step-card">
              <img src={IconShare} alt="Share your Referral Link" />
              <div className="step-text-content">
                <h3>Share Your Referral Link</h3>
                <p>
                  You may share your referral by copying your link or by sharing
                  it directly through the social networking sites.
                </p>
              </div>
            </div>
            <div className="step-card">
              <img src={IconEarn} alt="Earn Credits" />
              <div className="step-text-content">
                <h3>Earn Credits</h3>
                <p>
                  Earn 5 points credits when you successfully invited other
                  traders to sign up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Referral;
