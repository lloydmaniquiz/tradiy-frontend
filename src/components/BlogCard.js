import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "../styles/BlogCard.css"; // Import CSS for styling
import PlaceholderNoImage from "../images/placeholder-noimage.png"; // Import the placeholder image

const BlogCard = ({ blog }) => {
  const extractText = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.innerText; // Extracts only visible text
  };

  const extractFirstImage = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const img = tempElement.querySelector("img");
    return img ? img.src : null; // Return the first image src or null if no image exists
  };

  // Use blog.image if available, else try to extract the first image from content, else use the placeholder image
  const blogImage =
    blog.image || extractFirstImage(blog.content) || PlaceholderNoImage;

  return (
    <div className="blog-card">
      <img src={blogImage} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-description">{extractText(blog.content)}</p>
        {/* Link that navigates to the blog detail page using the blog's ID */}
        <Link to={`/blog/${blog.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
