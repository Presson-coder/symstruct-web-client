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
import Autocomplete from "react-google-autocomplete";

// const libraries = ["places"];

const BookingForm = () => {
  const { loading, submitBooking } = useSubmitBooking();

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
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Target Date
          </label>
          <div className="w-full">
            <Select>
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
            required
            min={0}
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-2">
            Project Location
          </label>
          <div className="w-full relative">
            <Autocomplete
              apiKey={GOOGLE_API_KEY || ""}
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              className="w-full border border-gray-200 rounded p-2"
            />
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
