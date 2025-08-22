import React, { useState, forwardRef, useRef, useEffect } from "react";
import "../App.css";
import SearchIcon from "../images/search-white.png";
import SearchDropdown from "../images/search-dropdown.png";
import airConditioningAndVentilationIcon from "../images/icons/Heating, Energy & Smart Tech/airConditioning.png";
import alarmsAndSecurityIcon from "../images/icons/Emergency & Essential Services/alarmsSecurity.png";
import architecturalServicesIcon from "../images/icons/Home Improvements & Renovations/architecturalServices.png";
import artificialGrassIcon from "../images/icons/Garden & Outdoor Projects/artificialGrass.png";
import bathroomsIcon from "../images/icons/Home Improvements & Renovations/bathrooms.png";
import blacksmithIronworkIcon from "../images/icons/Skilled & Specialist Trades/blacksmith.png";
import boilerInstallationRepairsIcon from "../images/icons/Heating, Energy & Smart Tech/boilerInstallation.png";
import builderIcon from "../images/icons/Home Improvements & Renovations/builder.png";
import carpetUpholsteryCleaningIcon from "../images/icons/Cleaning & Waste Services/carpetUpholstry.png";
import carpetFittersIcon from "../images/icons/Floors, Fixtures & Finishes/carpet.png";
import centralHeatingBoilersIcon from "../images/icons/Emergency & Essential Services/centralHeating.png";
import chimneyServicesIcon from "../images/icons/Skilled & Specialist Trades/chimneyServices.png";
import chimneySweepRepairsIcon from "../images/icons/Roofing, Walls & Exteriors/chimneySweepRepairs.png";
import conservatoriesGardenRoomsIcon from "../images/icons/Windows, Doors & Glazing/conservatoriesGardenRooms.png";
import curtainBlindFittersIcon from "../images/icons/Floors, Fixtures & Finishes/curtainBlindFitters.png";
import dampProofingIcon from "../images/icons/Emergency & Essential Services/dampProofer.png";
import deckingIcon from "../images/icons/Garden & Outdoor Projects/decking.png";
import doorLockInstallersIcon from "../images/icons/Windows, Doors & Glazing/doorLockInstallers.png";
import domesticCleaningIcon from "../images/icons/Cleaning & Waste Services/domesticCleaning.png";
import drainageBlockagesIcon from "../images/icons/Emergency & Essential Services/drainage.png";
import drivewaysPatiosIcon from "../images/icons/Garden & Outdoor Projects/drivewaysPatios.png";
import electricianIcon from "../images/icons/Emergency & Essential Services/electrician.png";
import emergencyRoofingRepairsIcon from "../images/icons/Emergency & Essential Services/emergencyRoofingRepairs.png";
import endOfTenancyCleaningIcon from "../images/icons/Cleaning & Waste Services/endOfTenancyCleaning.png";
import exteriorPressureCleaningIcon from "../images/icons/Cleaning & Waste Services/exteriorCleaning.png";
import exteriorWallInsulationIcon from "../images/icons/Roofing, Walls & Exteriors/exteriorWallInsulation.png";
import extensionsConversionsIcon from "../images/icons/Home Improvements & Renovations/extensionsConversions.png";
import fasciaSoffitsGutteringIcon from "../images/icons/Roofing, Walls & Exteriors/fasciaSoffits.png";
import fencingGatesIcon from "../images/icons/Garden & Outdoor Projects/fencingGates.png";
import fireplaceLogBurnersIcon from "../images/icons/Floors, Fixtures & Finishes/fireplaceLogBurners.png";
import flooringFittersIcon from "../images/icons/Floors, Fixtures & Finishes/flooringFitters.png";
import garageConversionsIcon from "../images/icons/Home Improvements & Renovations/garageConversions.png";
import garageDoorsIcon from "../images/icons/Windows, Doors & Glazing/garageDoors.png";
import gardenDesignIcon from "../images/icons/Garden & Outdoor Projects/gardenDesign.png";
import gardeningMaintenanceIcon from "../images/icons/Garden & Outdoor Projects/gardener.png";
import glassDoubleGlazingRepairsIcon from "../images/icons/Windows, Doors & Glazing/glass.png";
import gutterCleaningIcon from "../images/icons/Cleaning & Waste Services/gutterCleaning.png";
import homeItTelecomsIcon from "../images/icons/Heating, Energy & Smart Tech/itSystemsTelecoms.png";
import insulationIcon from "../images/icons/Home Improvements & Renovations/insulation.png";
import interiorDesignSupportIcon from "../images/icons/Home Improvements & Renovations/interiorDesignSupport.png";
import joineryCarpentryIcon from "../images/icons/Home Improvements & Renovations/joiner.png";
import kitchensIcon from "../images/icons/Home Improvements & Renovations/kitchen.png";
import landscapingIcon from "../images/icons/Garden & Outdoor Projects/landscaping.png";
import lightingInstallationIcon from "../images/icons/Floors, Fixtures & Finishes/lightingInstallation.png";
import loftConversionsIcon from "../images/icons/Home Improvements & Renovations/loftConversions.png";
import outdoorLightingIcon from "../images/icons/Garden & Outdoor Projects/outdoorLighting.png";
import paintingDecoratingIcon from "../images/icons/Home Improvements & Renovations/painterDecorator.png";
import pestControlIcon from "../images/icons/Emergency & Essential Services/pestControl.png";
import plasteringIcon from "../images/icons/Home Improvements & Renovations/plasterer.png";
import plumberIcon from "../images/icons/Emergency & Essential Services/plumber.png";
import poweredAccessLiftsIcon from "../images/icons/Skilled & Specialist Trades/poweredAccess.png";
import renewableEnergyIcon from "../images/icons/Heating, Energy & Smart Tech/renewableEnergy.png";
import roofingIcon from "../images/icons/Roofing, Walls & Exteriors/Roofer.svg";
import roughcastingRenderingIcon from "../images/icons/Roofing, Walls & Exteriors/roughcasterRenderer.png";
import scaffoldersIcon from "../images/icons/Skilled & Specialist Trades/scaffolders.png";
import scaffoldingIcon from "../images/icons/Roofing, Walls & Exteriors/scaffolding.png";
import smartHomeSystemsIcon from "../images/icons/Heating, Energy & Smart Tech/smartHomeSystems.png";
import stoneworkMasonryIcon from "../images/icons/Roofing, Walls & Exteriors/stoneWork.png";
import tilingIcon from "../images/icons/Home Improvements & Renovations/tiler.png";
import toolHireAccessorySupplyIcon from "../images/icons/Skilled & Specialist Trades/toolHire.png";
import treeSurgeryIcon from "../images/icons/Garden & Outdoor Projects/treeSurgeon.png";
import tvAerialsSatelliteIcon from "../images/icons/Heating, Energy & Smart Tech/tvAerialsSatelliteServices.png";
import underfloorHeatingIcon from "../images/icons/Heating, Energy & Smart Tech/underfloorHeating.png";
import upvcWindowsWindowFittersIcon from "../images/icons/Windows, Doors & Glazing/upvcWindows.png";
import wardrobesStorageSolutionsIcon from "../images/icons/Floors, Fixtures & Finishes/wardrobesStorageSolution.png";
import wasteClearanceIcon from "../images/icons/Cleaning & Waste Services/wasteClearance.png";
import weatherproofCoatingsIcon from "../images/icons/Roofing, Walls & Exteriors/weatherCoatings.png";

// Forward ref to root div
const SearchBar = forwardRef(({ handleSearch }, ref) => {
  const [service, setService] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to get time difference in a human-readable format
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp; // Difference in milliseconds

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (service && postcode) {
      const timestamp = new Date();
      const newSearch = {
        service,
        postcode,
        time: getTimeAgo(timestamp),
        timestamp: timestamp.toISOString(),
      };

      const storedSearches =
        JSON.parse(localStorage.getItem("recentSearches")) || [];
      storedSearches.unshift(newSearch);

      localStorage.setItem("recentSearches", JSON.stringify(storedSearches));

      handleSearch(service, postcode);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar" ref={ref}>
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <div className="dropdown-wrapper">
          <div ref={dropdownRef}>
            <div
              className="custom-dropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="dropdown-selected">
                {service || "What service do you need?"}
              </div>
              <img
                src={SearchDropdown}
                alt="Dropdown"
                className="custom-dropdown-icon"
              />
            </div>
            {dropdownOpen && (
              <div className="dropdown-options">
                {/* Alphabetically sorted dropdown options */}
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Air Conditioning & Ventilation");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={airConditioningAndVentilationIcon}
                    alt="Air Conditioning & Ventilation"
                  />
                  <span>Air Conditioning & Ventilation</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Alarms & Security");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={alarmsAndSecurityIcon} alt="Alarms & Security" />
                  <span>Alarms & Security</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Architectural Services");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={architecturalServicesIcon}
                    alt="Architectural Services"
                  />
                  <span>Architectural Services</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Artificial Grass");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={artificialGrassIcon} alt="Artificial Grass" />
                  <span>Artificial Grass</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Bathrooms");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={bathroomsIcon} alt="Bathrooms" />
                  <span>Bathrooms</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Blacksmith / Ironwork");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={blacksmithIronworkIcon}
                    alt="Blacksmith / Ironwork"
                  />
                  <span>Blacksmith / Ironwork</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Boiler Installation / Repairs");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={boilerInstallationRepairsIcon}
                    alt="Boiler Installation / Repairs"
                  />
                  <span>Boiler Installation / Repairs</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Builder");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={builderIcon} alt="Builder" />
                  <span>Builder</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Carpet & Upholstery Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={carpetUpholsteryCleaningIcon}
                    alt="Carpet & Upholstery Cleaning"
                  />
                  <span>Carpet & Upholstery Cleaning</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Carpet Fitters");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={carpetFittersIcon} alt="Carpet Fitters" />
                  <span>Carpet Fitters</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Central Heating & Boilers");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={centralHeatingBoilersIcon}
                    alt="Central Heating & Boilers"
                  />
                  <span>Central Heating & Boilers</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Chimney Services");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={chimneyServicesIcon} alt="Chimney Services" />
                  <span>Chimney Services</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Chimney Sweep & Repairs");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={chimneySweepRepairsIcon}
                    alt="Chimney Sweep & Repairs"
                  />
                  <span>Chimney Sweep & Repairs</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Conservatories & Garden Rooms");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={conservatoriesGardenRoomsIcon}
                    alt="Conservatories & Garden Rooms"
                  />
                  <span>Conservatories & Garden Rooms</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Curtain & Blind Fitters");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={curtainBlindFittersIcon}
                    alt="Curtain & Blind Fitters"
                  />
                  <span>Curtain & Blind Fitters</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Damp Proofing");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={dampProofingIcon} alt="Damp Proofing" />
                  <span>Damp Proofing</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Decking");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={deckingIcon} alt="Decking" />
                  <span>Decking</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Door & Lock Installers");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={doorLockInstallersIcon}
                    alt="Door & Lock Installers"
                  />
                  <span>Door & Lock Installers</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Domestic Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={domesticCleaningIcon} alt="Domestic Cleaning" />
                  <span>Domestic Cleaning</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Drainage & Blockages");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={drainageBlockagesIcon} alt="Drainage & Blockages" />
                  <span>Drainage & Blockages</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Driveways & Patios");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={drivewaysPatiosIcon} alt="Driveways & Patios" />
                  <span>Driveways & Patios</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Electrician");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={electricianIcon} alt="Electrician" />
                  <span>Electrician</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Emergency Roofing Repairs");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={emergencyRoofingRepairsIcon}
                    alt="Emergency Roofing Repairs"
                  />
                  <span>Emergency Roofing Repairs</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("End of Tenancy Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={endOfTenancyCleaningIcon}
                    alt="End of Tenancy Cleaning"
                  />
                  <span>End of Tenancy Cleaning</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Exterior / Pressure Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={exteriorPressureCleaningIcon}
                    alt="Exterior / Pressure Cleaning"
                  />
                  <span>Exterior / Pressure Cleaning</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Exterior Wall Insulation");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={exteriorWallInsulationIcon}
                    alt="Exterior Wall Insulation"
                  />
                  <span>Exterior Wall Insulation</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Extensions & Conversions");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={extensionsConversionsIcon}
                    alt="Extensions & Conversions"
                  />
                  <span>Extensions & Conversions</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Fascia, Soffits & Guttering");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={fasciaSoffitsGutteringIcon}
                    alt="Fascia, Soffits & Guttering"
                  />
                  <span>Fascia, Soffits & Guttering</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Fencing & Gates");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={fencingGatesIcon} alt="Fencing & Gates" />
                  <span>Fencing & Gates</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Fireplace / Log Burners");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={fireplaceLogBurnersIcon}
                    alt="Fireplace / Log Burners"
                  />
                  <span>Fireplace / Log Burners</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Flooring Fitters (Wood, Laminate, Vinyl)");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={flooringFittersIcon}
                    alt="Flooring Fitters (Wood, Laminate, Vinyl)"
                  />
                  <span>Flooring Fitters (Wood, Laminate, Vinyl)</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Garage Conversions");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={garageConversionsIcon} alt="Garage Conversions" />
                  <span>Garage Conversions</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Garage Doors");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={garageDoorsIcon} alt="Garage Doors" />
                  <span>Garage Doors</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Garden Design");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={gardenDesignIcon} alt="Garden Design" />
                  <span>Garden Design</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Gardening / Maintenance");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={gardeningMaintenanceIcon}
                    alt="Gardening / Maintenance"
                  />
                  <span>Gardening / Maintenance</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Glass / Double Glazing Repairs");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={glassDoubleGlazingRepairsIcon}
                    alt="Glass / Double Glazing Repairs"
                  />
                  <span>Glass / Double Glazing Repairs</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Gutter Cleaning");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={gutterCleaningIcon} alt="Gutter Cleaning" />
                  <span>Gutter Cleaning</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Home IT & Telecoms");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={homeItTelecomsIcon} alt="Home IT & Telecoms" />
                  <span>Home IT & Telecoms</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Insulation");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={insulationIcon} alt="Insulation" />
                  <span>Insulation</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Interior Design Support");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={interiorDesignSupportIcon}
                    alt="Interior Design Support"
                  />
                  <span>Interior Design Support</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Joinery & Carpentry");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={joineryCarpentryIcon} alt="Joinery & Carpentry" />
                  <span>Joinery & Carpentry</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Kitchens");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={kitchensIcon} alt="Kitchens" />
                  <span>Kitchens</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Landscaping");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={landscapingIcon} alt="Landscaping" />
                  <span>Landscaping</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Lighting Installation");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={lightingInstallationIcon}
                    alt="Lighting Installation"
                  />
                  <span>Lighting Installation</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Loft Conversions");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={loftConversionsIcon} alt="Loft Conversions" />
                  <span>Loft Conversions</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Outdoor Lighting");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={outdoorLightingIcon} alt="Outdoor Lighting" />
                  <span>Outdoor Lighting</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Painting & Decorating");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={paintingDecoratingIcon}
                    alt="Painting & Decorating"
                  />
                  <span>Painting & Decorating</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Pest Control");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={pestControlIcon} alt="Pest Control" />
                  <span>Pest Control</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Plastering");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={plasteringIcon} alt="Plastering" />
                  <span>Plastering</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Plumber");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={plumberIcon} alt="Plumber" />
                  <span>Plumber</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Powered Access / Lifts");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={poweredAccessLiftsIcon}
                    alt="Powered Access / Lifts"
                  />
                  <span>Powered Access / Lifts</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Renewable Energy");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={renewableEnergyIcon} alt="Renewable Energy" />
                  <span>Renewable Energy</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Roofing");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={roofingIcon} alt="Roofing" />
                  <span>Roofing</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Roughcasting & Rendering");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={roughcastingRenderingIcon}
                    alt="Roughcasting & Rendering"
                  />
                  <span>Roughcasting & Rendering</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Scaffolders");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={scaffoldersIcon} alt="Scaffolders" />
                  <span>Scaffolders</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Scaffolding");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={scaffoldingIcon} alt="Scaffolding" />
                  <span>Scaffolding</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Smart Home Systems");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={smartHomeSystemsIcon} alt="Smart Home Systems" />
                  <span>Smart Home Systems</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Stonework & Masonry");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={stoneworkMasonryIcon} alt="Stonework & Masonry" />
                  <span>Stonework & Masonry</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Tiling");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={tilingIcon} alt="Tiling" />
                  <span>Tiling</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Tool Hire / Accessory Supply");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={toolHireAccessorySupplyIcon}
                    alt="Tool Hire / Accessory Supply"
                  />
                  <span>Tool Hire / Accessory Supply</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Tree Surgery");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={treeSurgeryIcon} alt="Tree Surgery" />
                  <span>Tree Surgery</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("TV Aerials / Satellite");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={tvAerialsSatelliteIcon}
                    alt="TV Aerials / Satellite"
                  />
                  <span>TV Aerials / Satellite</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Underfloor Heating");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={underfloorHeatingIcon} alt="Underfloor Heating" />
                  <span>Underfloor Heating</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Wardrobes & Storage Solutions");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={wardrobesStorageSolutionsIcon}
                    alt="Wardrobes & Storage Solutions"
                  />
                  <span>Wardrobes & Storage Solutions</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Waste Clearance");
                    setDropdownOpen(false);
                  }}
                >
                  <img src={wasteClearanceIcon} alt="Waste Clearance" />
                  <span>Waste Clearance</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Weatherproof Coatings");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={weatherproofCoatingsIcon}
                    alt="Weatherproof Coatings"
                  />
                  <span>Weatherproof Coatings</span>
                </div>

                <div
                  className="dropdown-option"
                  onClick={() => {
                    setService("Window Fitters / UPVC Windows");
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={upvcWindowsWindowFittersIcon}
                    alt="Window Fitters / UPVC Windows"
                  />
                  <span>Window Fitters / UPVC Windows</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <input
          type="text"
          placeholder="What is your postcode?"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          style={{
            color: "#423e3e",
            fontWeight: "400",
            fontSize: window.innerWidth <= 1024 ? "16px" : "20px",
          }}
        />
        <button className="search-button" type="submit">
          <img src={SearchIcon} alt="🔍" />
          <p>Search</p>
        </button>
      </form>
    </div>
  );
});

export default SearchBar;
