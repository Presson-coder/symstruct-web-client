import { useState } from "react";
import { ClientProject } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL, BOOKING_URL } from "@/constants/connection";

export const useSubmitBooking = () => {
  const [loading, setLoading] = useState(false);

  const submitBooking = (project: ClientProject) => {
    setLoading(true);
    axios
      .post(`${BOOKING_URL}booking`, project)
      .then((response) => {
        toast.success(
          response.data.message || "Booking submitted successfully!"
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message ||
              "An error occurred while submitting the booking."
          );
        } else {
          toast.error("An unexpected error occurred.");
        }
      });
  };

  return {
    loading,
    submitBooking,
  };
};
