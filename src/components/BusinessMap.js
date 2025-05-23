import React, { useEffect, useState } from "react";

function Map({ businessAddress }) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        setIsMapLoaded(true); // Google Maps already loaded
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
        script.async = true; // Ensures the script is loaded asynchronously
        script.defer = true; // Ensures the script is executed after the document is parsed
        script.onload = () => setIsMapLoaded(true);
        script.onerror = () =>
          console.error("Google Maps script failed to load.");
        document.head.appendChild(script); // Append the script tag to load the Google Maps API
      }
    };

    loadGoogleMapsScript(); // Invoke the script loading function
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      const loadMap = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
          zoom: 13,
          mapTypeControl: false, // Disables map type control
        });

        const geocoder = new window.google.maps.Geocoder();

        // Check if businessAddress is provided
        if (businessAddress) {
          // Geocode the provided address
          geocoder.geocode({ address: businessAddress }, (results, status) => {
            if (status === "OK" && results[0]) {
              const location = results[0].geometry.location;
              map.setCenter(location);
              new window.google.maps.Marker({
                map,
                position: location,
                title: businessAddress, // Marker will show the address
              });
              // Save the location to state for later use
              setLocation(location);
            } else {
              console.error("Geocode failed: " + status);
            }
          });
        } else {
          // Sample location if no businessAddress is provided
          const sampleLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco
          map.setCenter(sampleLocation);
          new window.google.maps.Marker({
            map,
            position: sampleLocation,
            title: "Sample Location", // Sample title
          });
          // Save the sample location to state
          setLocation(sampleLocation);
        }
      };

      loadMap(); // Load the map once the script is ready
    }
  }, [isMapLoaded, businessAddress]);

  const openInGoogleMaps = () => {
    if (location) {
      const googleMapsUrl = `https://www.google.com/maps?q=${location.lat()},${location.lng()}`;
      window.open(googleMapsUrl, "_blank"); // Opens Google Maps in a new tab with the location
    }
  };

  return (
    <div>
      <div
        id="map"
        style={{
          height: "300px",
          minWidth: "50%",
          borderRadius: "8px",
        }}
      />
      <button
        className="gmaps-button"
        onClick={openInGoogleMaps}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid #423e3e",
          background: "white",
          color: "#423e3e",
          cursor: "pointer",
          fontFamily: "Hanken Grotesk",
          width: "300px",
          fontWeight: "bold",
        }}
      >
        Open in Google Maps
      </button>
    </div>
  );
}

export default Map;
