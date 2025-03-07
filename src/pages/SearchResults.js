import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StickyHeader from "../landing-page/sticky-header";
import Footer from "../landing-page/footer";
import { tradeServicesMap } from "../constants/tradeServicesMap";
import "../styles/SearchResults.css";
import SearchResultCard from "../components/SearchResultsCard";

// Mock data for search results
export const searchResults = [
  {
    name: "Fisher Decorating Services Ltd.",
    profileId: "fisher-decorating-1",
    address: "40 Churchill Drive, Ardrossan KA22 7HF, United Kingdom",
    services: [
      "Internal Painting",
      "Exterior Painting",
      "Decorating",
      "Wallpapering",
    ],
    rating: 4.9,
    reviews: 123,
    image: "path-to-image-1.jpg",
    badge: "Trady Hero",
  },
  {
    name: "ABC Home Improvements",
    profileId: "abc-home-improvements",
    address: "123 Main Street, London, UK",
    services: [
      "Building / Home Improvements",
      "Painting & Decorating",
      "Plastering",
      "Kitchen vinyl wrapping",
    ],
    rating: 4.8,
    reviews: 95,
    image: "path-to-image-2.jpg",
    badge: "Trady Hero",
  },
  {
    name: "Elite Decorators",
    profileId: "elite-decorators",
    address: "456 Park Ave, Manchester, UK",
    services: [
      "Interior Decorating",
      "Home Styling",
      "Colour Consultation",
      "Wallpapering",
    ],
    rating: 4.7,
    reviews: 110,
    image: "path-to-image-3.jpg",
    badge: "Trady Hero",
  },
];

const SearchResults = () => {
  const [searchLabel] = useState("");
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

  // Filter results to show only those that offer the searched service
  const filteredResults = searchResults.filter((result) => {
    const relatedServices = tradeServicesMap[searchQuery] || [];
    return result.services.some((service) => {
      return relatedServices.some((relatedService) =>
        service.toLowerCase().includes(relatedService.toLowerCase())
      );
    });
  });

  return (
    <>
      <StickyHeader handleSearch={handleSearch} />
      <div className="search-results-container">
        <h1>Search Results for: {searchLabel ? searchLabel : searchQuery}</h1>

        {filteredResults.length > 0 ? (
          <div className="results-grid">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className="search-result-card"
                onClick={() => navigate(`/trader/${result.profileId}`)}
              >
                <SearchResultCard result={result} />
              </div>
            ))}
          </div>
        ) : (
          <p>
            No results found for "{searchLabel ? searchLabel : searchQuery}".
          </p>
        )}

        <Footer />
      </div>
    </>
  );
};

export default SearchResults;
