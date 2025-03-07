import { useParams } from "react-router-dom";
import { searchResults } from "../pages/SearchResults"; // Demo data
import { useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import "../styles/TraderProfile.css";

const TraderProfile = () => {
  const { profileId } = useParams();
  const trader = searchResults.find((t) => t.profileId === profileId);

  // Move the `useNavigate` hook to the top level
  const navigate = useNavigate();

  if (!trader) {
    return <h2 className="text-center">Trader Not Found</h2>;
  }

  console.log("Trader Data:", trader); // Debugging: Check if `services` exists

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
      <StickyHeader handleSearch={handleSearch} />
      <div className="trader-profile">
        {/* Trader Details */}
        <div className="trader-details">
          <h1>{trader.name}</h1>
          <span className="badge">⭐ Tradiy Hero</span>
          <p className="trader-address">
            {trader.address || "Address not available"}
          </p>

          {/* Features */}
          <div className="trader-features">
            <span>✅ 24 hours</span>
            <span>💳 Accept Cards</span>
            <span>📞 Callout Charge</span>
          </div>

          <button className="quote-btn">Request a Quote</button>
        </div>

        {/* Services Section */}
        <div className="trader-services">
          <h2>Services Offered</h2>
          {Array.isArray(trader.services) && trader.services.length > 0 ? (
            <ul>
              {trader.services.map((service, index) => (
                <li key={index}>✅ {service}</li>
              ))}
            </ul>
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TraderProfile;
