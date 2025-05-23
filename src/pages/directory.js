import React, { useState, useEffect } from "react";
import "../styles/Directory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import Footer from "../landing-page/footer";

import alarmsIcon from "../images/directory-carousel/Alarms  Security.png";
import bathroomsIcon from "../images/directory-carousel/Bathrooms.png";
import builderIcon from "../images/directory-carousel/Builder.png";
import carpetFittingIcon from "../images/directory-carousel/carpet.png";
import centralHeatingIcon from "../images/directory-carousel/Central Heating.png";
import cleanerIcon from "../images/directory-carousel/Cleaner.png";
import conservatoriesIcon from "../images/directory-carousel/Conservatories & Garden Rooms.png";
import curtainblindIcon from "../images/directory-carousel/Curtain  Blind Fitters.png";
import dampProoferIcon from "../images/directory-carousel/Damp Proofer.png";
import drainageIcon from "../images/directory-carousel/Drainage.png";
import drivewaysIcon from "../images/directory-carousel/Driveways  Patios.png";
import electricianIcon from "../images/directory-carousel/electrician.png";
import exteriorCleaningIcon from "../images/directory-carousel/Exterior Cleaning.png";
import fasciaIcon from "../images/directory-carousel/Fascia  Soffits.png";
import fencingIcon from "../images/directory-carousel/Fencing  Gates.png";
import gardenerIcon from "../images/directory-carousel/Gardener.png";
import glassIcon from "../images/directory-carousel/glass.png";
import ITIcon from "../images/directory-carousel/IT Systems & Telecommunications.png";
import joinerIcon from "../images/directory-carousel/Joiner.png";
import kitchenIcon from "../images/directory-carousel/kitchen.png";
import landscapingIcon from "../images/directory-carousel/Landscaping.png";
import painterIcon from "../images/directory-carousel/Painter  Decorator.png";
import pestcontrolIcon from "../images/directory-carousel/pest-control.png";
import plastererIcon from "../images/directory-carousel/Plasterer.png";
import plumberIcon from "../images/directory-carousel/Plumber.png";
import poweredaccessIcon from "../images/directory-carousel/Powered Access.png";
import renewableEnergyIcon from "../images/directory-carousel/Renewable Energy.png";
import rooferIcon from "../images/directory-carousel/Roofer.png";
import roughcasterIcon from "../images/directory-carousel/Roughcaster & Renderer.png";
import scaffoldingIcon from "../images/directory-carousel/scaffolding.png";
import stoneWorkIcon from "../images/directory-carousel/Stone Work.png";
import stovesLogIcon from "../images/directory-carousel/Stoves  Log Burners.png";
import tilerIcon from "../images/directory-carousel/Tiler.png";
import treeSurgeonIcon from "../images/directory-carousel/Tree Surgeon.png";
import tvAerialsIcon from "../images/directory-carousel/TV Aerials  Satellite Services.png";
import upvcWindowsIcon from "../images/directory-carousel/UPVC Windows.png";
import wasteClearanceIcon from "../images/directory-carousel/Waste  Clearance.png";
import weatherCoatingsIcon from "../images/directory-carousel/Weather Coatings.png";

const serviceIcons = {
  "Alarms / Security": alarmsIcon,
  Bathrooms: bathroomsIcon,
  Builder: builderIcon,
  "Carpet Fitting": carpetFittingIcon,
  "Central Heating": centralHeatingIcon,
  Cleaner: cleanerIcon,
  "Conservatories & Garden Rooms": conservatoriesIcon,
  "Curtain / Blind Fitters": curtainblindIcon,
  "Damp Proofer": dampProoferIcon,
  Drainage: drainageIcon,
  "Driveways/Patios": drivewaysIcon,
  Electrician: electricianIcon,
  "Exterior Cleaning": exteriorCleaningIcon,
  "Fascia / Soffits": fasciaIcon,
  "Fencing / Gates": fencingIcon,
  Gardener: gardenerIcon,
  Glass: glassIcon,
  "IT Systems & Telecommunications": ITIcon,
  Joiner: joinerIcon,
  Kitchens: kitchenIcon,
  Landscaping: landscapingIcon,
  "Painter / Decorator": painterIcon,
  "Pest Control": pestcontrolIcon,
  Plasterer: plastererIcon,
  Plumber: plumberIcon,
  "Powered Access": poweredaccessIcon,
  "Renewable Energy": renewableEnergyIcon,
  Roofer: rooferIcon,
  "Roughcaster & Renderer": roughcasterIcon,
  Scaffolding: scaffoldingIcon,
  "Stone Work": stoneWorkIcon,
  "Stoves / Log Burners": stovesLogIcon,
  Tiler: tilerIcon,
  "Tree Surgeon": treeSurgeonIcon,
  "TV Aerials / Satellite Services": tvAerialsIcon,
  "UPVC Windows": upvcWindowsIcon,
  "Waste / Clearance": wasteClearanceIcon,
  "Weather Coatings": weatherCoatingsIcon,
};

const Directory = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const categories = [
    {
      name: "Home Infrastructure & Security",
      services: [
        "Alarms / Security",
        "Central Heating",
        "Electrician",
        "IT Systems & Telecommunications",
        "Plumber",
      ],
    },
    {
      name: "Interior Improvements",
      services: [
        "Bathrooms",
        "Carpet Fitting",
        "Curtain / Blind Fitters",
        "Glass",
        "Joiner",
      ],
    },
    {
      name: "Major Home Renovations",
      services: [
        "Builder",
        "Kitchens",
        "Painter / Decorator",
        "Plasterer",
        "Tiler",
      ],
    },
    {
      name: "Exterior Surfaces",
      services: [
        "Damp Proofer",
        "Drainage",
        "Driveways/Patios",
        "Fascia / Soffits",
        "UPVC Windows",
      ],
    },
    {
      name: "Roofing & Outdoor Structures",
      services: [
        "Roofer",
        "Roughcaster & Renderer",
        "Scaffolding",
        "Stone Work",
        "Weather Coatings",
      ],
    },
    {
      name: "Garden Services",
      services: [
        "Conservatories & Garden Rooms",
        "Fencing / Gates",
        "Gardener",
        "Landscaping",
        "Tree Surgeon",
      ],
    },
    {
      name: "Cleaning & Waste Management",
      services: ["Cleaner", "Exterior Cleaning", "Waste / Clearance"],
    },
    {
      name: "Specialised Home Services",
      services: [
        "Pest Control",
        "Powered Access",
        "Renewable Energy",
        "Stoves / Log Burners",
        "TV Aerials / Satellite Services",
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
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {serviceIcons[service] && (
                        <img
                          src={serviceIcons[service]}
                          alt={service}
                          style={{ width: "40px", height: "40px" }}
                        />
                      )}
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
