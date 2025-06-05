import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Map from "./Map";
import { Library } from "@googlemaps/js-api-loader";
import { useLoadScript } from "@react-google-maps/api";
import { ClientProject } from "@/types";
import { useSubmitBooking } from "@/hooks/useSubmitBooking";
import { GOOGLE_API_KEY } from "@/constants/connection";

const libraries = ["places"];

const BookingForm = () => {
  const { loading, submitBooking } = useSubmitBooking();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY || "",
    libraries: libraries as unknown as Library[],
  });
  const [bookingData, setBookingData] = useState<ClientProject>({
    serviceProviderId: "",
    clientId: "",
    projectDescription: "",
    projectBudget: 0,
    projectTargetDate: "Within the next few days",
    projectLocation: {
      lat: 0,
      lng: 0,
      city: "",
      country: "",
      addressLine1: "",
    },
  });

  console.log("BookingForm rendered with bookingData ::", bookingData);

  const onBookingDataChange = (data: ClientProject) => {
    setBookingData(data);
  };

  const handlePlaceSelect = (details: {
    lat: number;
    lng: number;
    city: string;
    country: string;
    addressLine1: string;
  }) => {
    if (bookingData) {
      const updatedLocation = {
        ...bookingData.projectLocation,
        lat: details.lat,
        lng: details.lng,
        city: details.city,
        country: details.country,
        addressLine1: details.addressLine1,
      };
      onBookingDataChange({
        ...bookingData,
        projectLocation: updatedLocation,
      });
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (bookingData) {
      const updatedLocation = {
        ...bookingData.projectLocation,
        lat,
        lng,
      };
      onBookingDataChange({
        ...bookingData,
        projectLocation: updatedLocation,
      });
    }
  };

  const mapCoordinates = {
    lat: bookingData.projectLocation.lat || -18.9712,
    lng: bookingData.projectLocation.lng || 25.9749,
  };

  const targetDateOptions = [
    "Within the next few days",
    "Within the next week",
    "In a month or more",
    "Not sure yet",
  ];

  return (
    <div>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Description
          </label>
          <textarea
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe your project"
            value={bookingData.projectDescription}
            onChange={(e) =>
              onBookingDataChange({
                ...bookingData,
                projectDescription: e.target.value,
              })
            }
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Target Date
          </label>
          <div className="w-full">
            <Select
              value={bookingData.projectTargetDate}
              onValueChange={(value) =>
                onBookingDataChange({
                  ...bookingData,
                  projectTargetDate: value as ClientProject["projectTargetDate"],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Target Date" />
              </SelectTrigger>
              <SelectContent className="z-[2000]">
                {targetDateOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Budget
          </label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your budget"
            onChange={(e) =>
              onBookingDataChange({
                ...bookingData,
                projectBudget: parseFloat(e.target.value),
              })
            }
            required
            min={0}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-2">
            Project Location
          </label>
          <div className="w-full relative h-56">
            {isLoaded ? (
              <Map
                locationCoordinates={mapCoordinates}
                onLocationChange={handleMapClick}
                onPlaceSelect={handlePlaceSelect}
              />
            ) : (
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                Loading map...
              </div>
            )}
          </div>
        </div>
        <Button
          // type="submit"
          // variant="solid"
          className="bg-black text-white hover:bg-gray-800 w-full"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
