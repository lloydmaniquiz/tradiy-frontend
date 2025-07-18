import React, { useState, useEffect } from "react";
import "../styles/Directory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import StickyHeader from "../landing-page/sticky-header";
import MobileHeader from "../landing-page/mobile-header";
import Footer from "../landing-page/footer";

// import of icons here

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

const serviceIcons = {
  "Air Conditioning & Ventilation": airConditioningAndVentilationIcon,
  "Alarms & Security": alarmsAndSecurityIcon,
  "Architectural Services": architecturalServicesIcon,
  "Artificial Grass": artificialGrassIcon,
  Bathrooms: bathroomsIcon,
  "Blacksmith / Ironwork": blacksmithIronworkIcon,
  "Boiler Installation / Repairs": boilerInstallationRepairsIcon,
  Builder: builderIcon,
  "Carpet & Upholstery Cleaning": carpetUpholsteryCleaningIcon,
  "Carpet Fitters": carpetFittersIcon,
  "Central Heating & Boilers": centralHeatingBoilersIcon,
  "Chimney Services": chimneyServicesIcon,
  "Chimney Sweep & Repairs": chimneySweepRepairsIcon,
  "Conservatories & Garden Rooms": conservatoriesGardenRoomsIcon,
  "Curtain & Blind Fitters": curtainBlindFittersIcon,
  "Damp Proofing": dampProofingIcon,
  Decking: deckingIcon,
  "Door & Lock Installers": doorLockInstallersIcon,
  "Domestic Cleaning": domesticCleaningIcon,
  "Drainage & Blockages": drainageBlockagesIcon,
  "Driveways & Patios": drivewaysPatiosIcon,
  Electrician: electricianIcon,
  "Emergency Roofing Repairs": emergencyRoofingRepairsIcon,
  "End of Tenancy Cleaning": endOfTenancyCleaningIcon,
  "Exterior / Pressure Cleaning": exteriorPressureCleaningIcon,
  "Exterior Wall Insulation": exteriorWallInsulationIcon,
  "Extensions & Conversions": extensionsConversionsIcon,
  "Fascia, Soffits & Guttering": fasciaSoffitsGutteringIcon,
  "Fencing & Gates": fencingGatesIcon,
  "Fireplace / Log Burners": fireplaceLogBurnersIcon,
  "Flooring Fitters": flooringFittersIcon,
  "Garage Conversions": garageConversionsIcon,
  "Garage Doors": garageDoorsIcon,
  "Garden Design": gardenDesignIcon,
  "Gardening / Maintenance": gardeningMaintenanceIcon,
  "Glass / Double Glazing Repairs": glassDoubleGlazingRepairsIcon,
  "Gutter Cleaning": gutterCleaningIcon,
  "Home IT & Telecoms": homeItTelecomsIcon,
  Insulation: insulationIcon,
  "Interior Design Support": interiorDesignSupportIcon,
  "Joinery & Carpentry": joineryCarpentryIcon,
  Kitchens: kitchensIcon,
  Landscaping: landscapingIcon,
  "Lighting Installation": lightingInstallationIcon,
  "Loft Conversions": loftConversionsIcon,
  "Outdoor Lighting": outdoorLightingIcon,
  "Painting & Decorating": paintingDecoratingIcon,
  "Pest Control": pestControlIcon,
  Plastering: plasteringIcon,
  Plumber: plumberIcon,
  "Powered Access / Lifts": poweredAccessLiftsIcon,
  "Renewable Energy": renewableEnergyIcon,
  Roofing: roofingIcon,
  "Roughcasting & Rendering": roughcastingRenderingIcon,
  Scaffolders: scaffoldersIcon,
  Scaffolding: scaffoldingIcon,
  "Smart Home Systems": smartHomeSystemsIcon,
  "Stonework & Masonry": stoneworkMasonryIcon,
  Tiling: tilingIcon,
  "Tool Hire / Accessory Supply": toolHireAccessorySupplyIcon,
  "Tree Surgery": treeSurgeryIcon,
  "TV Aerials / Satellite": tvAerialsSatelliteIcon,
  "Underfloor Heating": underfloorHeatingIcon,
  "Wardrobes & Storage Solutions": wardrobesStorageSolutionsIcon,
  "Waste Clearance": wasteClearanceIcon,
  "Weatherproof Coatings": weatherproofCoatingsIcon,
  "Window Fitters / UPVC Windows": upvcWindowsWindowFittersIcon,
};

const Directory = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const categories = [
    {
      name: "Emergency & Essential Services",
      services: [
        "Plumber",
        "Electrician",
        "Central Heating & Boilers",
        "Emergency Roofing Repairs",
        "Drainage & Blockages",
        "Alarms & Security",
        "Pest Control",
        "Damp Proofing",
      ],
    },
    {
      name: "Home Improvements & Renovations",
      services: [
        "Kitchens",
        "Bathrooms",
        "Extensions & Conversions",
        "Loft Conversions",
        "Garage Conversions",
        "Joinery & Carpentry",
        "Plastering",
        "Painting & Decorating",
        "Tiling",
        "Insulation",
        "Interior Design Support",
        "Architectural Services",
        "Builder",
      ],
    },
    {
      name: "Roofing, Walls & Exteriors",
      services: [
        "Roofing",
        "Fascia, Soffits & Guttering",
        "Roughcasting & Rendering",
        "Scaffolding",
        "Weatherproof Coatings",
        "Chimney Sweep & Repairs",
        "Exterior Wall Insulation",
        "Stonework & Masonry",
      ],
    },
    {
      name: "Windows, Doors & Glazing",
      services: [
        "Window Fitters / UPVC Windows",
        "Garage Doors",
        "Conservatories & Garden Rooms",
        "Glass / Double Glazing Repairs",
        "Door & Lock Installers",
      ],
    },
    {
      name: "Garden & Outdoor Projects",
      services: [
        "Landscaping",
        "Fencing & Gates",
        "Garden Design",
        "Tree Surgery",
        "Gardening / Maintenance",
        "Decking",
        "Driveways & Patios",
        "Artificial Grass",
        "Outdoor Lighting",
      ],
    },
    {
      name: "Cleaning & Waste Services",
      services: [
        "Domestic Cleaning",
        "Exterior / Pressure Cleaning",
        "Waste Clearance",
        "Gutter Cleaning",
        "Carpet & Upholstery Cleaning",
        "End of Tenancy Cleaning",
      ],
    },
    {
      name: "Heating, Energy & Smart Tech",
      services: [
        "Boiler Installation / Repairs",
        "Renewable Energy",
        "Air Conditioning & Ventilation",
        "Underfloor Heating",
        "Smart Home Systems",
        "TV Aerials / Satellite",
        "Home IT & Telecoms",
      ],
    },
    {
      name: "Floors, Fixtures & Finishes",
      services: [
        "Flooring Fitters",
        "Carpet Fitters",
        "Curtain & Blind Fitters",
        "Wardrobes & Storage Solutions",
        "Fireplace / Log Burners",
        "Lighting Installation",
      ],
    },
    {
      name: "Skilled & Specialist Trades",
      services: [
        "Blacksmith / Ironwork",
        "Scaffolders",
        "Powered Access / Lifts",
        "Chimney Services",
        "Tool Hire / Accessory Supply",
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
