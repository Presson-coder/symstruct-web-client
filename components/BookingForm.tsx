import React from "react";

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

const libraries = ["places"];

const BookingForm = () => {
  const google_api_key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: google_api_key || "",
    libraries: libraries as unknown as Library[],
  });

  const targetDateOptions = [
    "Within the next few days",
    "Within the next week",
    "In a month or more",
    "Not sure yet",
  ];
  

  return (
    <div>
      <form>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Location
          </label>
          <div className="w-full h-64 relative">
            <Map
              onPlaceSelect={handlePlaceSelect}
              locationCoordinates={mapCoordinates}
              onLocationChange={handleMapClick}
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
      </form>
    </div>
  );
};

export default BookingForm;
