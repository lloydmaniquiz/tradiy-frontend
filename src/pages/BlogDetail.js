import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/BlogsDetails.css";
import StickyHeader from "../landing-page/sticky-header.js";
import MobileHeader from "../landing-page/mobile-header.js";
import Footer from "../landing-page/footer.js";
import BlogCard from "../components/BlogCard.js";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date
      .toLocaleString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  }

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/blogs");
        const fetchedBlogs = await response.json();

        const foundBlog = fetchedBlogs.find((blog) => blog.id === parseInt(id));
        setBlog(foundBlog);

        // Filter out the current blog and remove duplicates
        const filteredBlogs = fetchedBlogs
          .filter((b) => b.id !== parseInt(id)) // Exclude current blog
          .reduce((unique, item) => {
            return unique.some((blog) => blog.id === item.id)
              ? unique
              : [...unique, item];
          }, [])
          .slice(0, 3); // Limit to 3 unique blogs

        setOtherBlogs(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="blog-detail">
      <Helmet>
        <title>{blog.title} | Blog</title>
        <meta
          name="description"
          content={blog.description || "Read this amazing blog post"}
        />
        <meta name="keywords" content={blog.tags || "blog, article"} />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.description || "Read this amazing blog post"}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:image" content={blog.image || "default-image.jpg"} />
      </Helmet>

      {isMobile ? (
        <MobileHeader handleSearch={handleSearch} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}

      <div className="blog-content-container">
        <h1>{blog.title}</h1>
        <div className="author-content">
          Posted by: {blog.author} · Published: {formatDate(blog.created_at)}
        </div>

        <div dangerouslySetInnerHTML={{ __html: blog.content }} />

        <hr className="blogs-divider" />

        {/* Read More Blogs Section */}
        {otherBlogs.length > 0 && (
          <div className="read-more-section">
            <h2>Read More Blogs</h2>
            <div className="blog-card-container">
              {otherBlogs.map((otherBlog) => (
                <BlogCard key={otherBlog.id} blog={otherBlog} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
