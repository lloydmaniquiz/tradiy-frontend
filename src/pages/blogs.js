import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/BlogCard.js";
import "../styles/BlogPage.css";
import StickyHeader from "../landing-page/sticky-header.js";
import MobileHeader from "../landing-page/mobile-header.js";
import Footer from "../landing-page/footer.js";

const BlogsPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const [activeTab, setActiveTab] = useState("tradespeople");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/blogs/`);
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Fetched Blogs:", data);
        setBlogs(data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.categories.toLowerCase().includes(activeTab.toLowerCase()) &&
      (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  return (
    <>
      <Helmet>
        <title>Blogs | Tradiy</title>
        <meta name="description" content="Read insightful blogs on Tradify." />
        <meta property="og:title" content="Blogs | Tradify" />
        <meta
          property="og:description"
          content="Read insightful blogs on Tradify."
        />
        <meta
          property="og:image"
          content="/tradify-frontend/blog-thumbnail.jpg"
        />
      </Helmet>
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
        <div className="switch-container">
          <button
            className={`switch-btn ${
              activeTab === "homeowners" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("homeowners");
              setCurrentPage(1);
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
              setCurrentPage(1);
            }}
          >
            For Tradespeople
          </button>
        </div>
        <hr className="divider" />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>
        <div className="blogs-grid">
          {displayedBlogs.length > 0 ? (
            displayedBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p className="no-results">No blogs found.</p>
          )}
        </div>
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
