import { Project } from '@/types'
import React from 'react'
import ProjectCard from './ProjectCard';


interface MoreProjectsByServiceProviderProps {
    projects: Project[];
}

const MoreProjectsByServiceProvider = ({projects}: MoreProjectsByServiceProviderProps) => {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard project={project} key={project._id} />
      ))}
    </div>
  );
}

export default MoreProjectsByServiceProvider
