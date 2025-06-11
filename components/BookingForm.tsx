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
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const libraries = ["places"];

const BookingForm = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const { loading, submitBooking } = useSubmitBooking();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_API_KEY || "",
    libraries: libraries as unknown as Library[],
  });
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [bookingData, setBookingData] = useState<ClientProject>({
    serviceProviderId: ownerId,
    clientId: userId ?? "",
    clientProjectDetails: { projectDescription: "", projectBudget: 0 },
    projectTargetDate: "WITHIN_NEXT_FEW_DAYS",
    projectLocation: {
      lat: 0,
      lng: 0,
      city: "",
      country: "",
      addressLine1: "",
    },
  });

  console.log("BookingForm rendered with bookingData ::", bookingData);

  const handleValidate = () => {
    if (!bookingData.clientProjectDetails.projectDescription) {
      toast.error("Please enter a project description.");
      return false;
    }
    if (bookingData.clientProjectDetails.projectBudget <= 0) {
      toast.error("Please enter a valid project budget.");
      return false;
    }
    if (!bookingData.projectLocation.lat || !bookingData.projectLocation.lng) {
      toast.error("Please select a valid project location on the map.");
      return false;
    }
    if (!bookingData.projectTargetDate) {
      toast.error("Please select a project target date.");
      return false;
    }
    if (!bookingData.clientId) {
      toast.error("Please log in to book a service provider.");
      router.push("/login");
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    if (!handleValidate()) return;
    e.preventDefault();
    if (loading) return;

    try {
      await submitBooking(bookingData);
      setBookingData({
        serviceProviderId: ownerId,
        clientId: userId ?? "",
        clientProjectDetails: { projectDescription: "", projectBudget: 0 },
        projectTargetDate: "WITHIN_NEXT_FEW_DAYS",
        projectLocation: {
          lat: 0,
          lng: 0,
          city: "",
          country: "",
          addressLine1: "",
        },
      });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
      console.error("Error submitting booking:", error);
    }
  };

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
    { label: "Within the next few days", value: "WITHIN_NEXT_FEW_DAYS" },
    { label: "Within the next week", value: "WITHIN_NEXT_WEEK" },
    { label: "In a month or more", value: "IN_A_MONTH_OR_MORE" },
    { label: "Not sure yet", value: "NOT_SURE_YET" },
  ];

  return (
    <div>
      <div>
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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Project Description
          </label>
          <textarea
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe your project"
            value={bookingData.clientProjectDetails.projectDescription}
            onChange={(e) =>
              onBookingDataChange({
                ...bookingData,
                clientProjectDetails: {
                  ...bookingData.clientProjectDetails,
                  projectDescription: e.target.value,
                },
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
                  projectTargetDate:
                    value as ClientProject["projectTargetDate"],
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Target Date" />
              </SelectTrigger>
              <SelectContent className="z-[2000]">
                {targetDateOptions.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
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
                clientProjectDetails: {
                  ...bookingData.clientProjectDetails,
                  projectBudget: parseFloat(e.target.value),
                },
              })
            }
            required
            min={0}
          />
        </div>

        <Button
          // type="submit"
          // variant="solid"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white hover:bg-gray-800 w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
