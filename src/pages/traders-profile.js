import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import "../styles/TraderProfile.css";

const TraderProfile = () => {
  const { id } = useParams();
  const traderId = Number(id);
  const navigate = useNavigate();
  const [trader, setTrader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("URL ID:", id);
  console.log("Converted traderId:", traderId);

  useEffect(() => {
    const fetchTraderData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tradespeople");
        const data = await response.json();
        console.log("Fetched Trader Data:", data);

        const foundTrader = data.find((t) => t.id === traderId);
        console.log("Found Trader:", foundTrader);

        if (foundTrader) {
          setTrader(foundTrader);
        } else {
          setError("Trader not found");
        }
      } catch (err) {
        setError("Failed to fetch trader data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTraderData();
  }, [traderId]);

  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!trader) {
    return <h2 className="text-center">Trader Not Found</h2>;
  }

  console.log("Trader Object:", trader);
  console.log("Services String:", trader?.services);

  // If services are a string, remove any unwanted characters (like brackets and quotes)
  const services =
    typeof trader?.services === "string"
      ? trader.services
          .replace(/[\[\]"']/g, "") // Remove square brackets and quotes
          .split(",")
          .map((service) => service.trim()) // Trim spaces
      : [];

  return (
    <>
      <StickyHeader handleSearch={handleSearch} />
      <div className="trader-profile">
        <div className="trader-details">
          <h1>{trader.businessName}</h1>
          <span className="badge">⭐ Tradiy Hero</span>
          <p className="trader-address">
            {trader.businessAddress || "Address not available"}
          </p>

          <div className="trader-features">
            {trader.emergencyHours === true && <span>✅ Emergency Hours</span>}
            <span>💳 Accept Cards</span>
            {trader.hasCalloutCharge === true && <span>📞 Callout Charge</span>}
          </div>

          <button className="quote-btn">Request a Quote</button>
        </div>

        <div className="trader-services">
          <h2>Services Offered</h2>
          {services.length > 0 ? (
            <ul>
              {services.map((service, index) => (
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
