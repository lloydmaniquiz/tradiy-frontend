import "../styles/Referral.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../landing-page/footer";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import referralBG from "../images/referral-bg.png";

const Referral = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  return (
    <>
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
      <div className="referral-container">
        <div className="referral-top-container">
          <img src={referralBG} alt="referral-background" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Referral;
