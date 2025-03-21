import React, { useState, useEffect } from "react";
import "../styles/Directory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import Footer from "../landing-page/footer";

const Directory = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const categories = [
    {
      name: "Building and Construction",
      services: [
        "Architectural Services",
        "Builder/Home Improvements",
        "Bathrooms",
        "Bedrooms",
        "Blacksmith/Ironwork",
        "Carpentry & Joinery",
        "Extensions & Conversions",
        "Garage & Outbuilding Construction",
        "Roofing & Guttering",
        "Tiling",
        "Window & Door Fitting",
      ],
    },
    {
      name: "Electrical and Technical Services",
      services: [
        "Electrical Installations",
        "Lighting Installation",
        "Wiring & Rewiring",
        "Fuse Box Replacement",
        "CCTV & Security Systems",
        "Smart Home Automation",
        "Solar Panel Installation",
        "Fire Alarm Systems",
        "Electric Car Charging Points",
      ],
    },
    {
      name: "Heating, Cooling and Ventilation",
      services: [
        "Boiler Installation & Repair",
        "Central Heating Installation",
        "Underfloor Heating",
        "Air Conditioning Services",
        "Heat Pump Installation",
        "Radiator Installation",
        "Ductwork & Ventilation Systems",
        "Gas Safety Inspections",
      ],
    },
    {
      name: "Flooring and Interior Design",
      services: [
        "Internal Painting",
        "Hardwood Flooring",
        "Carpet Fitting",
        "Laminate & Vinyl Flooring",
        "Wallpapering",
        "Plastering",
        "Home Staging",
        "Colour Consultation",
      ],
    },
    {
      name: "Maintenance and Repair",
      services: [
        "Plumbing Repairs",
        "Electrical Repairs",
        "Gutter Cleaning",
        "Locksmith Services",
        "General Handyman Services",
        "Furniture Assembly",
        "Drain Unblocking",
        "Window & Door Repairs",
      ],
    },
    {
      name: "Outdoor and Garden Services",
      services: [
        "Landscaping & Garden Design",
        "Lawn Care & Maintenance",
        "Tree Surgery & Pruning",
        "Decking & Patio Installation",
        "Fencing & Gates",
        "Garden Shed Construction",
        "Paving & Driveways",
        "Pressure Washing Services",
      ],
    },
    {
      name: "Specialised Services",
      services: [
        "Swimming Pool Installation & Maintenance",
        "Home Cinema Installation",
        "Bespoke Furniture Design",
        "Acoustic Soundproofing",
        "Stained Glass Window Repair",
        "Heritage & Conservation Work",
        "Luxury Home Automation",
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [openCategories, setOpenCategories] = useState({});

  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    navigate(`/search?query=${encodeURIComponent(serviceName)}`);
  };

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
        <MobileHeader handleSearch={handleServiceClick} />
      ) : (
        <StickyHeader handleSearch={handleSearch} />
      )}
      <div className="directory-container">
        <h1 className="directory-title">Directory</h1>
        <div className="directory-categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`directory-category ${
                openCategories[index] ? "open" : ""
              }`}
            >
              <div
                className="directory-category-header"
                onClick={() => toggleCategory(index)}
              >
                <span>{category.name}</span>
                <FontAwesomeIcon
                  icon={openCategories[index] ? faChevronUp : faChevronDown}
                />
              </div>
              {openCategories[index] && (
                <div className="directory-services">
                  {category.services.map((service, idx) => (
                    <div
                      className="directory-service-item"
                      key={idx}
                      onClick={() => handleServiceClick(service)}
                      style={{
                        cursor: "pointer",
                        color: "#14b8a6",
                        textDecoration: "underline",
                      }}
                    >
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Directory;
