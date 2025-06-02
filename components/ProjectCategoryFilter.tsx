import { getCategories } from "@/lib/getCategories";
import { Category } from "@/types";
import React from "react";
import ProjectFilterButton from "./ProjectFilterButton";

const ProjectCategoryFilter = async () => {
  const categories: Category[] = await getCategories();

  return (
    <div className="flex flex-row gap-4 overflow-x-auto p-4 py-10">
      {categories.map((category) => (
        <ProjectFilterButton category={category} key={category._id}/>
      ))}
    </div>
  );
};

export default ProjectCategoryFilter;
