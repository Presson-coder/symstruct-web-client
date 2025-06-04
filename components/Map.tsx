import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";

interface MapProps {
  locationCoordinates: { lat: number; lng: number };
  onLocationChange: (lat: number, lng: number) => void;
  onPlaceSelect: (details: {
    lat: number;
    lng: number;
    city: string;
    country: string;
    addressLine1: string;
  }) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const zimbabweBounds = {
  north: -15.6093,
  south: -22.4178,
  west: 25.2373,
  east: 33.0688,
};

const Map: React.FC<MapProps> = ({
  locationCoordinates,
  onLocationChange,
  onPlaceSelect,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!autocompleteRef.current) {
      const input = document.getElementById("venue-search") as HTMLInputElement;
      autocompleteRef.current = new google.maps.places.Autocomplete(input, {
        bounds: zimbabweBounds,
        componentRestrictions: { country: "ZW" },
      });

      // Listener for the place changed event
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          const addressComponents = place.address_components || [];
          const city =
            addressComponents.find((comp) => comp.types.includes("locality"))
              ?.long_name || "";
          const country =
            addressComponents.find((comp) => comp.types.includes("country"))
              ?.long_name || "";
          const addressLine1 =
            addressComponents.find((comp) => comp.types.includes("route"))
              ?.long_name || "";

          // Update coordinates and place details
          onLocationChange(lat, lng);
          onPlaceSelect({
            lat,
            lng,
            city,
            country,
            addressLine1,
          });
        }
      });
    }
  }, [onLocationChange, onPlaceSelect]);

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
      onLocationChange(lat, lng);
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <input
        id="venue-search"
        type="text"
        placeholder="Search your location..."
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "80%",
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={locationCoordinates}
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{
          restriction: {
            latLngBounds: zimbabweBounds,
            strictBounds: true,
          },
        }}
      >
        <MarkerF
          position={locationCoordinates}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default Map;
