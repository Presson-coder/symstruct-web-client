import { getCategories } from "@/lib/getCategories";
import { Category } from "@/types";
import React from "react";

const ProjectCategoryFilter = async () => {
  const categories: Category[] = await getCategories();
  const handleFilter = (categoryId: string) => {};

  return (
    <div className="flex flex-row gap-4 overflow-x-auto p-4 py-10">
      {categories.map((category) => (
        <button
          key={category.id}
          className="bg-stone-200 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline cursor-pointer duration-300"
          // onClick={() => {
          //   // handleFilter(category.id);
          // }}
        >
          {category?.name}
        </button>
      ))}
    </div>
  );
};

export default ProjectCategoryFilter;
