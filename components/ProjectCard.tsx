'use client';
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Project } from "@/types/Project";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition aspect-square flex flex-col"
        onClick={() => setOpen(true)}
      >
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          {project.Images && project.Images.length > 0 ? (
            <img
              src={project.Images[0]}
              alt={project.Name}
              className="object-cover h-full w-full"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-700 text-lg">{project.Name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.Description}
          </p>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            position: "fixed",
            m: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: "75vh",
            maxHeight: "75vh",
            width: "100%",
            margin: "0 auto",
            background: "#fff",
          },
        }}
        hideBackdrop={false}
        fullWidth
      >
        <div className="relative h-full flex flex-col">
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <div className="h-56 w-full bg-gray-100 flex items-center justify-center rounded-t-2xl overflow-hidden">
            {project.Images && project.Images.length > 0 ? (
              <img
                src={project.Images[0]}
                alt={project.Name}
                className="object-cover h-full w-full"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div className="p-6 overflow-y-auto flex-1">
            <h2 className="font-bold text-2xl mb-2">{project.Name}</h2>
            <p className="text-gray-700 mb-4">{project.Description}</p>
            <div className="text-sm text-gray-500">
              <div>
                <strong>Location:</strong>{`${project.Location.city} ${project.Location.country}`}
              </div>
              <div>
                <strong>Categories:</strong>{" "}
                {project.Categories?.join(", ") || "N/A"}
              </div>
              <div>
                <strong>Duration:</strong> {project.Duration} days
              </div>
              <div>
                <strong>Status:</strong> {project.Status || "N/A"}
              </div>
              <div>
                <strong>Completion Date:</strong>{" "}
                {project.CompletionDate
                  ? new Date(project.CompletionDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProjectCard;
