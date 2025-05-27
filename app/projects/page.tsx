import { getProjects } from "@/lib/getProjects";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/Project";

const Projects = async () => {
  const projects: Project[] = await getProjects();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id } project={project} />
      ))}
    </div>
  );
};

export default Projects;
