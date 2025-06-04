import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const BookingForm = () => {
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
        <Button
          type="submit"
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
