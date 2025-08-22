import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import SearchResultCard from "../components/SearchResultsCard";
import MobileHeader from "../landing-page/mobile-header";

const Bookmarks = () => {
  const [bookmarkedTraders, setBookmarkedTraders] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBookmarksWithTraders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/bookmarks`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch bookmarks");

        const data = await response.json();

        // Fetch trader data for each bookmark
        const bookmarksWithTraders = await Promise.all(
          data.map(async (bookmark) => {
            try {
              const traderRes = await fetch(
                `${process.env.REACT_APP_API_URL}/tradespeople/${bookmark.trader_id}`
              );
              if (!traderRes.ok) throw new Error("Failed to fetch trader data");

              const traderData = await traderRes.json();
              return { ...traderData, bookmarkId: bookmark.id };
            } catch (err) {
              console.error(
                `Error fetching trader ${bookmark.trader_id}:`,
                err
              );
              return null; // Skip if trader fetch fails
            }
          })
        );

        setBookmarkedTraders(bookmarksWithTraders.filter(Boolean));
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
        setBookmarkedTraders([]);
      }
    };

    fetchBookmarksWithTraders();
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
      <div className="bookmark-results-container">
        <h1>Bookmarks</h1>

        {bookmarkedTraders.length > 0 ? (
          <div className="results-grid">
            {bookmarkedTraders.map((trader) => (
              <div
                key={trader.id}
                className="search-result-card"
                onClick={(e) => {
                  if (e.target.tagName !== "BUTTON")
                    navigate(`/trader/${trader.id}`);
                }}
              >
                <SearchResultCard result={trader} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f4f4fa",
                width: "250px",
                borderRadius: "10px",
                fontWeight: "600",
                color: "#423e3e",
              }}
            >
              You have no bookmarks yet.
            </p>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Bookmarks;
