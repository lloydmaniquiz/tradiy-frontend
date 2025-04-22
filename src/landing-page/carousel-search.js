import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../App.css";
import builderIcon from "../images/carousel-search/builder.png";
import carpetFittingIcon from "../images/carousel-search/carpet.png";
import drivewaysIcon from "../images/carousel-search/driveways.png";
import electricianIcon from "../images/carousel-search/electrician.png";
import gardenerIcon from "../images/carousel-search/gardener.png";
import joinerIcon from "../images/carousel-search/joiner.png";
import painterIcon from "../images/carousel-search/painter.png";
import plastererIcon from "../images/carousel-search/plasterer.png";
import plumberIcon from "../images/carousel-search/plumber.png";
import rooferIcon from "../images/carousel-search/roofer.png";
import tilerIcon from "../images/carousel-search/tiler.png";
import welderIcon from "../images/carousel-search/welder.png";
import leftNext from "../images/carousel-search/left-next.png";
import rightNext from "../images/carousel-search/right-next.png";

const CarouselSearch = ({ handleSearch, label, disableAutoScroll }) => {
  const searches = useMemo(
    () => [
      { label: "Builder", icon: builderIcon },
      { label: "Carpet Fitting", icon: carpetFittingIcon },
      { label: "Driveways/Patios", icon: drivewaysIcon },
      { label: "Electrician", icon: electricianIcon },
      { label: "Gardener", icon: gardenerIcon },
      { label: "Joiner", icon: joinerIcon },
      { label: "Painter/Decorator", icon: painterIcon },
      { label: "Plasterer", icon: plastererIcon },
      { label: "Plumber", icon: plumberIcon },
      { label: "Roofer", icon: rooferIcon },
      { label: "Tiler", icon: tilerIcon },
      { label: "Welder", icon: welderIcon },
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
