import { getProjects } from "@/lib/getProjects";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/Project";
import ProjectCategoryFilter from "@/components/ProjectCategoryFilter";

interface ProjectsProps {
  searchParams: { category?: string };
}

const Projects = async ({ searchParams }: ProjectsProps) => {
  const projects: Project[] = await getProjects({
    category: searchParams.category,
  });

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-100 to-gray-50 px-10">
      <div className="pt">
        <form className="relative max-w-xl mx-auto">
          <input
            type="text"
            id="searchDomain"
            name="text"
            className="pt-4 pe-40 pb-4 ps-6 w-full h-12 outline-none text-black rounded-2xl bg-white shadow"
            placeholder="Search Your Domain"
          />
          <button
            type="submit"
            className="absolute top-[0] end-[0] h-12 inline-flex items-center px-8 py-2.5 text-[16px] font-medium tracking-wide bg-orange-500 hover:bg-orange-600 border border-orange-500 hover:border-orange-600 text-white focus:ring-[3px] focus:ring-orange-500 focus:ring-opacity-25 focus:outline-none rounded-e-2xl align-middle transition-all duration-500"
          >
            {/* <FaSearch className="me-1" /> Search */}
          </button>
        </form>
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <ProjectCategoryFilter />
      </div>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
