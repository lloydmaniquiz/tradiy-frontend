import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../App.css";
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
import leftNext from "../images/carousel-search/left-next.png";
import rightNext from "../images/carousel-search/right-next.png";

const CarouselSearch = ({ handleSearch, label, disableAutoScroll }) => {
  const searches = useMemo(
    () => [
      { label: "Alarms / Security Services", icon: alarmsIcon },
      { label: "Bathroom Services", icon: bathroomsIcon },
      { label: "Builder", icon: builderIcon },
      { label: "Carpet Fitting", icon: carpetFittingIcon },
      { label: "Central Heating", icon: centralHeatingIcon },
      { label: "Cleaning Services", icon: cleanerIcon },
      { label: "Conservatories & Garden Rooms", icon: conservatoriesIcon },
      { label: "Curtain / Blind Fitters", icon: curtainblindIcon },
      { label: "Damp Proofer", icon: dampProoferIcon },
      { label: "Drainage", icon: drainageIcon },
      { label: "Driveways/Patios", icon: drivewaysIcon },
      { label: "Electrician", icon: electricianIcon },
      { label: "Exterior Cleaning", icon: exteriorCleaningIcon },
      { label: "Fascia / Soffits", icon: fasciaIcon },
      { label: "Fencing / Gates", icon: fencingIcon },
      { label: "Gardener", icon: gardenerIcon },
      { label: "Glass", icon: glassIcon },
      { label: "IT Systems & Telecommunications", icon: ITIcon },
      { label: "Joiner", icon: joinerIcon },
      { label: "Kitchens", icon: kitchenIcon },
      { label: "Landscaping", icon: landscapingIcon },
      { label: "Painter/Decorator", icon: painterIcon },
      { label: "Plasterer", icon: plastererIcon },
      { label: "Plumber", icon: plumberIcon },
      { label: "Pest Control", icon: pestcontrolIcon },
      { label: "Powered Access", icon: poweredaccessIcon },
      { label: "Renewable Energy", icon: renewableEnergyIcon },
      { label: "Roofer", icon: rooferIcon },
      { label: "Roughcaster & Renderer", icon: roughcasterIcon },
      { label: "Scaffolding", icon: scaffoldingIcon },
      { label: "Stone Work", icon: stoneWorkIcon },
      { label: "Stoves / Log Burners", icon: stovesLogIcon },
      { label: "Tiler", icon: tilerIcon },
      { label: "Tree Surgeon", icon: treeSurgeonIcon },
      { label: "UPVC Windows", icon: upvcWindowsIcon },
      { label: "Waste / Clearance", icon: wasteClearanceIcon },
      { label: "Weather Coatings", icon: weatherCoatingsIcon },
      { label: "TV Aerials", icon: tvAerialsIcon },
    ],
    []
  );

  const totalItems = searches.length;
  const itemWidth = 120; // Adjust if needed

  const extendedSearches = useMemo(
    () => [...searches, ...searches, ...searches],
    [searches]
  );

  const [index, setIndex] = useState(0);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const handlePrevious = useCallback(() => {
    setIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (disableAutoScroll) return; // Skip setting interval if disabled

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [handleNext, disableAutoScroll]);

  return (
    <div className="carousel-combine">
      <div className="recent-searches-carousel">
        <button className="carousel-button" onClick={handlePrevious}>
          <img src={leftNext} alt="←" />
        </button>
        <div className="carousel-wrapper">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {extendedSearches.map((search, idx) => (
              <button
                className="carousel-item-button"
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(search.label, search.label); // Pass only the trade name
                }}
              >
                <img
                  src={search.icon}
                  alt={search.label}
                  className="carousel-item-image"
                />
                <span className="carousel-item-label">{search.label}</span>
              </button>
            ))}
          </div>
        </div>
        <button className="carousel-button" onClick={handleNext}>
          <img src={rightNext} alt="→" />
        </button>
      </div>
    </div>
  );
};

export default CarouselSearch;
