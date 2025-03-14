import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import { tradeServicesMap } from "../constants/tradeServicesMap";
import "../styles/SearchResults.css";
import SearchResultCard from "../components/SearchResultsCard";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]); // State to store fetched results
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const navigate = useNavigate();

  const handleSearch = (searchTerm, label) => {
    if (searchTerm) {
      navigate(
        `/search?query=${encodeURIComponent(
          searchTerm
        )}&label=${encodeURIComponent(label)}`
      );
    }
  };

  // Fetch data from the API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tradespeople");
        const data = await response.json();

        console.log("Fetched Search Results Data:", data); // Log the fetched data

        setSearchResults(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  // Filter results to show only those that offer the searched service
  const filteredResults = searchResults.filter((result) => {
    const relatedServices = tradeServicesMap[searchQuery] || [];

    // Parse services and traderCategory to arrays
    const services = JSON.parse(result.services || "[]");
    const traderCategory = JSON.parse(result.traderCategory || "[]");

    // Check if any of the services match the search query
    return (
      services.some((service) => {
        return relatedServices.some((relatedService) =>
          service.toLowerCase().includes(relatedService.toLowerCase())
        );
      }) ||
      traderCategory.some((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <>
      <StickyHeader handleSearch={handleSearch} />
      <div className="search-results-container">
        <h1>Search Results for: {searchQuery}</h1>

        {filteredResults.length > 0 ? (
          <div className="results-grid">
            {filteredResults.map((result) => {
              // Check if the trader status is "pending" or "suspended"
              if (
                result.status === "PENDING" ||
                result.status === "SUSPENDED"
              ) {
                return null; // Don't render if the status is "pending" or "suspended"
              }
              return (
                <div
                  key={result.id}
                  className="search-result-card"
                  onClick={() => navigate(`/trader/${result.id}`)} // Use profileId to navigate
                >
                  <SearchResultCard result={result} />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No results found for "{searchQuery}".</p>
        )}

        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
