import React, { useState, useEffect, useCallback, useMemo } from "react";
import "../App.css";
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
import leftNext from "../images/carousel-search/left-next.png";
import rightNext from "../images/carousel-search/right-next.png";

const CarouselSearch = ({ handleSearch, label, disableAutoScroll }) => {
  const searches = useMemo(
    () => [
      {
        label: "Air Conditioning & Ventilation",
        icon: airConditioningAndVentilationIcon,
      },
      { label: "Alarms & Security", icon: alarmsAndSecurityIcon },
      { label: "Architectural Services", icon: architecturalServicesIcon },
      { label: "Artificial Grass", icon: artificialGrassIcon },
      { label: "Bathrooms", icon: bathroomsIcon },
      { label: "Blacksmith / Ironwork", icon: blacksmithIronworkIcon },
      {
        label: "Boiler Installation / Repairs",
        icon: boilerInstallationRepairsIcon,
      },
      { label: "Builder", icon: builderIcon },
      {
        label: "Carpet & Upholstery Cleaning",
        icon: carpetUpholsteryCleaningIcon,
      },
      { label: "Carpet Fitters", icon: carpetFittersIcon },
      { label: "Central Heating & Boilers", icon: centralHeatingBoilersIcon },
      { label: "Chimney Services", icon: chimneyServicesIcon },
      { label: "Chimney Sweep & Repairs", icon: chimneySweepRepairsIcon },
      {
        label: "Conservatories & Garden Rooms",
        icon: conservatoriesGardenRoomsIcon,
      },
      { label: "Curtain & Blind Fitters", icon: curtainBlindFittersIcon },
      { label: "Damp Proofing", icon: dampProofingIcon },
      { label: "Decking", icon: deckingIcon },
      { label: "Door & Lock Installers", icon: doorLockInstallersIcon },
      { label: "Domestic Cleaning", icon: domesticCleaningIcon },
      { label: "Drainage & Blockages", icon: drainageBlockagesIcon },
      { label: "Driveways & Patios", icon: drivewaysPatiosIcon },
      { label: "Electrician", icon: electricianIcon },
      { label: "Emergency Roofing Repairs", icon: emergencyRoofingRepairsIcon },
      { label: "End of Tenancy Cleaning", icon: endOfTenancyCleaningIcon },
      {
        label: "Exterior / Pressure Cleaning",
        icon: exteriorPressureCleaningIcon,
      },
      { label: "Exterior Wall Insulation", icon: exteriorWallInsulationIcon },
      { label: "Extensions & Conversions", icon: extensionsConversionsIcon },
      {
        label: "Fascia, Soffits & Guttering",
        icon: fasciaSoffitsGutteringIcon,
      },
      { label: "Fencing & Gates", icon: fencingGatesIcon },
      { label: "Fireplace / Log Burners", icon: fireplaceLogBurnersIcon },
      {
        label: "Flooring Fitters",
        icon: flooringFittersIcon,
      },
      { label: "Garage Conversions", icon: garageConversionsIcon },
      { label: "Garage Doors", icon: garageDoorsIcon },
      { label: "Garden Design", icon: gardenDesignIcon },
      { label: "Gardening / Maintenance", icon: gardeningMaintenanceIcon },
      {
        label: "Glass / Double Glazing Repairs",
        icon: glassDoubleGlazingRepairsIcon,
      },
      { label: "Gutter Cleaning", icon: gutterCleaningIcon },
      { label: "Home IT & Telecoms", icon: homeItTelecomsIcon },
      { label: "Insulation", icon: insulationIcon },
      { label: "Interior Design Support", icon: interiorDesignSupportIcon },
      { label: "Joinery & Carpentry", icon: joineryCarpentryIcon },
      { label: "Kitchens", icon: kitchensIcon },
      { label: "Landscaping", icon: landscapingIcon },
      { label: "Lighting Installation", icon: lightingInstallationIcon },
      { label: "Loft Conversions", icon: loftConversionsIcon },
      { label: "Outdoor Lighting", icon: outdoorLightingIcon },
      { label: "Painting & Decorating", icon: paintingDecoratingIcon },
      { label: "Pest Control", icon: pestControlIcon },
      { label: "Plastering", icon: plasteringIcon },
      { label: "Plumber", icon: plumberIcon },
      { label: "Powered Access / Lifts", icon: poweredAccessLiftsIcon },
      { label: "Renewable Energy", icon: renewableEnergyIcon },
      { label: "Roofing", icon: roofingIcon },
      { label: "Roughcasting & Rendering", icon: roughcastingRenderingIcon },
      { label: "Scaffolders", icon: scaffoldersIcon },
      { label: "Scaffolding", icon: scaffoldingIcon },
      { label: "Smart Home Systems", icon: smartHomeSystemsIcon },
      { label: "Stonework & Masonry", icon: stoneworkMasonryIcon },
      { label: "Tiling", icon: tilingIcon },
      {
        label: "Tool Hire / Accessory Supply",
        icon: toolHireAccessorySupplyIcon,
      },
      { label: "Tree Surgery", icon: treeSurgeryIcon },
      { label: "TV Aerials / Satellite", icon: tvAerialsSatelliteIcon },
      { label: "Underfloor Heating", icon: underfloorHeatingIcon },
      {
        label: "Window Fitters / UPVC Windows",
        icon: upvcWindowsWindowFittersIcon,
      },
      {
        label: "Wardrobes & Storage Solutions",
        icon: wardrobesStorageSolutionsIcon,
      },
      { label: "Waste Clearance", icon: wasteClearanceIcon },
      { label: "Weatherproof Coatings", icon: weatherproofCoatingsIcon },
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
