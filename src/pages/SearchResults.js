import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import { tradeServicesMap } from "../constants/tradeServicesMap";
import "../styles/SearchResults.css";
import SearchResultCard from "../components/SearchResultsCard";

const SearchResults = ({ handleFilter }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSort, setSelectedSort] = useState("relevance"); // Default sorting
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
        setSearchResults(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]); // Set to empty array on error
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Filter results to match search query
  const filteredResults = searchResults.filter((result) => {
    const relatedServices = tradeServicesMap[searchQuery] || [];
    const services = JSON.parse(result.services || "[]");
    const traderCategory = JSON.parse(result.traderCategory || "[]");

    return (
      services.some((service) =>
        relatedServices.some((relatedService) =>
          service.toLowerCase().includes(relatedService.toLowerCase())
        )
      ) ||
      traderCategory.some((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  // Sort the filtered results based on the selected sorting option
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (selectedSort === "top-reviews") {
      return b.rating - a.rating; // Sort by highest rating
    }
    if (selectedSort === "top-services") {
      return (
        JSON.parse(b.services || "[]").length -
        JSON.parse(a.services || "[]").length
      ); // Sort by number of services
    }
    return 0; // Default (Relevance) - no sorting applied
  });

  return (
    <>
      <StickyHeader
        handleSearch={handleSearch}
        disableAutoScroll={true}
        showFilterButton={true} // Enables filter button only in SearchResults
        handleFilter={handleFilter}
      />

      <div className="search-results-container">
        <h1>Search Results for: {searchQuery}</h1>

        {/* Sorting Buttons */}
        <div className="sort-buttons">
          <span>Sort by</span>
          <button
            className={selectedSort === "relevance" ? "active" : ""}
            onClick={() => handleSortChange("relevance")}
          >
            Relevance
          </button>
          <button
            className={selectedSort === "top-reviews" ? "active" : ""}
            onClick={() => handleSortChange("top-reviews")}
          >
            Top Reviews
          </button>
          <button
            className={selectedSort === "top-services" ? "active" : ""}
            onClick={() => handleSortChange("top-services")}
          >
            Top Services
          </button>
        </div>

        {/* Display Sorted Results */}
        {sortedResults.length > 0 ? (
          <div className="results-grid">
            {sortedResults.map((result) => {
              if (
                result.status === "PENDING" ||
                result.status === "SUSPENDED"
              ) {
                return null;
              }
              return (
                <div
                  key={result.id}
                  className="search-result-card"
                  onClick={(e) => {
                    if (e.target.tagName !== "BUTTON") {
                      navigate(
                        `/trader/${result.id}?query=${encodeURIComponent(
                          searchQuery
                        )}`
                      );
                    }
                  }}
                >
                  <SearchResultCard result={result} />
                </div>
              );
            })}
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
                width: "200px",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              No results found for "{searchQuery}".
            </p>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
