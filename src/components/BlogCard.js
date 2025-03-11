import React from "react";
import "../styles/BlogCard.css"; // Import CSS for styling

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-description">{blog.description}</p>
        <button className="read-more">Read More</button>
      </div>
    </div>
  );
};

export default BlogCard;
