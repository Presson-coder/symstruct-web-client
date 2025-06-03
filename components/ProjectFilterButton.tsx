import Link from "next/link";
import { Button } from "./ui/button";
import { Category } from "@/types";

interface ProjectFilterButtonProps {
  category: Category;
}

const ProjectFilterButton: React.FC<ProjectFilterButtonProps> = ({
  category,
}) => (
  <Link href={`/projects?category=${category._id}`}>
    <Button className="bg-stone-200 font-sans hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline cursor-pointer duration-300">
      {category.name}
    </Button>
  </Link>
);

export default ProjectFilterButton;
