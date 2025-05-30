"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Project } from "@/types/Project";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "@/components/ui/button";

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
    <div className="w-[] h-96">
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition w-full h-full flex flex-col"
        onClick={() => setOpen(true)}
      >
        <div className="h-64 flex items-center justify-center bg-gray-100">
          <img
            src={project.Images[0] ?? "/heroImage.jpg"}
            alt={project.Name}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-700 text-lg">{project.Name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {project.Description}
          </p>
        </div>
      </div>
      <Dialog
        open={open}
        fullScreen
        onClose={() => setOpen(false)}
        slots={{
          transition: Transition,
        }}
        slotProps={{
          paper: {
            sx: {
              position: "fixed",
              m: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: "90vh",
              maxHeight: "90vh",
              width: "100vw",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
        hideBackdrop={false}
      >
        <div className="relative flex flex-col flex-1 overflow-hidden p-20">
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}
          >
            <CloseIcon />
          </IconButton>

          <div className="h-96 w-full bg-gray-100 flex items-center justify-center rounded-t-2xl overflow-hidden">
            <Carousel className="w-full h-full">
              <CarouselContent>
                {project.Images && project.Images.length > 0 ? (
                  project.Images.map((img: string, idx: number) => (
                    <CarouselItem
                      key={idx}
                      className="w-full h-96 flex items-center justify-center rounded-t-2xl"
                    >
                      <img
                        src={img}
                        alt={`${project.Name} image ${idx + 1}`}
                        className="object-cover w-full h-full rounded-t-2xl"
                      />
                    </CarouselItem>
                  ))
                ) : (
                  <CarouselItem className="w-full h-96 flex items-center justify-center rounded-t-2xl">
                    <img
                      src="/heroImage.jpg"
                      alt={project.Name}
                      className="object-cover w-full h-full rounded-t-2xl"
                    />
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white text-black rounded-full shadow p-2" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white text-black rounded-full shadow p-2" />
            </Carousel>
          </div>

          <div className="p-6 flex-1 overflow-y-auto bg-gray-50 rounded-b-2xl">
            <header className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                {project.Name}
              </h2>
            </header>

            <section className="prose prose-gray max-w-none mb-6">
              <p>{project.Description}</p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700 ">
              <dl className="flex flex-col">
                <dt className="font-medium text-gray-900">Location</dt>
                <dd>
                  {project.Location.city}, {project.Location.country}
                </dd>
              </dl>

              <dl className="flex flex-col">
                <dt className="font-medium text-gray-900">Duration</dt>
                <dd>{project.Duration} days</dd>
              </dl>

              <dl className="flex flex-col">
                <dt className="font-medium text-gray-900">Completion Date</dt>
                <dd>
                  {project.CompletionDate
                    ? new Date(project.CompletionDate).toLocaleDateString()
                    : "N/A"}
                </dd>
              </dl>

            </section>
            <section>
            
            </section>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectCard;
