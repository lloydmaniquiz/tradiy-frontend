import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard.js";
import "../styles/BlogPage.css";
import StickyHeader from "../landing-page/sticky-header.js";
import MobileHeader from "../landing-page/mobile-header.js";
import Footer from "../landing-page/footer.js";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

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

  const [activeTab, setActiveTab] = useState("tradespeople"); // Default active tab
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Number of blogs per page

  const blogs = [
    {
      id: 1,
      title: "5 Tips to Build a Strong Trades Profile",
      description: "Learn how to stand out and attract more customers.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 2,
      title: "What Homeowners Look for in a Tradesperson",
      description: "Insights straight from the people hiring you.",
      image: "https://placehold.co/600x400",
      category: "homeowners",
    },
    {
      id: 3,
      title: "Why Verified Tradespeople Get Hired More",
      description:
        "Why verified profiles get more leads and build stronger trust.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 4,
      title: "How to Price Your Services Competitively",
      description: "Find out the best pricing strategies for tradespeople.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 5,
      title: "Top Marketing Strategies for Tradespeople",
      description: "Grow your business with smart marketing strategies.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 6,
      title: "Avoiding Common Mistakes as a Tradesperson",
      description: "Tips to ensure customer satisfaction and build trust.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 7,
      title: "How to Improve Customer Communication",
      description: "Better communication means better business.",
      image: "https://placehold.co/600x400",
      category: "homeowners",
    },
    {
      id: 8,
      title: "Best Tools for Tradespeople in 2024",
      description: "Stay ahead with the latest tools and technologies.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
    {
      id: 9,
      title: "Why Building a Portfolio is Important",
      description: "A strong portfolio attracts more clients.",
      image: "https://placehold.co/600x400",
      category: "homeowners",
    },
    {
      id: 10,
      title: "Best Tools for Tradespeople in 2024",
      description: "Stay ahead with the latest tools and technologies.",
      image: "https://placehold.co/600x400",
      category: "tradespeople",
    },
  ];

  // Filter blogs based on active tab and search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.category === activeTab &&
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Get blogs for the current page
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
      <div className="blogs-container">
        <h1 className="blogs-title">Blogs</h1>
        <p className="blogs-subtitle">
          Discover tools, guides, and materials to support your growth and
          journey—all in one place.
        </p>

        {/* Switch Button */}
        <div className="switch-container">
          <button
            className={`switch-btn ${
              activeTab === "homeowners" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("homeowners");
              setCurrentPage(1); // Reset to first page
            }}
          >
            For Homeowners
          </button>
          <button
            className={`switch-btn ${
              activeTab === "tradespeople" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("tradespeople");
              setCurrentPage(1); // Reset to first page
            }}
          >
            For Tradespeople
          </button>
        </div>

        {/* Divider */}
        <hr className="divider" />

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="search-input"
          />
        </div>

        {/* Blog Cards */}
        <div className="blogs-grid">
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="no-results">No blogs found.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="arrow"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              {"<"}
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`page-number ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="arrow"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BlogsPage;
