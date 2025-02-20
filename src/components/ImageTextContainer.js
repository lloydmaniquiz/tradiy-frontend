import React from "react";
import "../styles/ImageTextContainer.css";

const ImageTextContainer = ({ imageSrc, headerText, descriptionText }) => {
  return (
    <div className="image-text-container">
      <div className="image-container">
        <img src={imageSrc} alt="imageContainer" className="image" />
      </div>
      <div className="text-container">
        <h3 className="image-header">{headerText}</h3>
        <p className="image-description">{descriptionText}</p>
      </div>
    </div>
  );
};

export default ImageTextContainer;
