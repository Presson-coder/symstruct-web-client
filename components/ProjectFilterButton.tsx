"use client";
import React from "react";
import { Button } from "./ui/button";
import { getProjects } from "@/lib/getProjects";
import { Category } from "@/types";

interface ProjectFilterButtonProps {
  category: Category;
}

const ProjectFilterButton: React.FC<ProjectFilterButtonProps> = ({
  category,
}) => {
  const handleFilter = (categoryId: string): void => {
    getProjects({ category: categoryId });
  };
  return (
    <Button
      className="bg-stone-200 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline cursor-pointer duration-300"
      onClick={() => {
        handleFilter(category._id);
      }}
    >
      {category.name}
    </Button>
  );
};

export default ProjectFilterButton;
