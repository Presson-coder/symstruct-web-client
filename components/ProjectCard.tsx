"use client";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import BookingForm from "./BookingForm";
import { getProjectsByServiceProvider } from "@/lib/getProjects";
import MoreProjectsByServiceProvider from "./MoreProjectsByServiceProvider";

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
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [moreProjectsByServiceProvider, setMoreProjectsByServiceProvider] =
    useState<Project[]>();

  const getMoreProjects = async () => {
    try {
      const projects = await getProjectsByServiceProvider({
        id: project?.owner?._id,
      });
      setMoreProjectsByServiceProvider(projects);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getMoreProjects();
  }, []);

  console.log("ProjectCard rendered with project ::", project);
  const handleBookingFormOpen = () => {
    setBookingFormOpen(true);
  };

  const handleBookingFormClose = () => {
    setBookingFormOpen(false);
  };

  return (
    <div className="w-[] min-h-96">
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
      {open && (
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "fixed",
            top: 32,
            right: 32,
            zIndex: 1401,
            background: "#fff",
            boxShadow: 3,
            "&:hover": { background: "#f3f4f6" },
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
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
        <div className="relative flex flex-col flex-1 p-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={100}
                height={100}
                className="rounded-full w-20 h-20 object-contain"
              />{" "}
              <p>Available For Work</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="bg-white text-gray-800 hover:bg-gray-100 border-gray-300 rounded-full p-2 shadow-sm w-10 h-10 flex items-center justify-center cursor-pointer transition duration-300 hover:shadow-md"
              >
                <FaBookmark />
              </Button>
              <Button
                variant="outline"
                className="bg-black text-white hover:bg-gray-800 hover:text-white rounded-2xl cursor-pointer"
                onClick={handleBookingFormOpen}
                // style={{ padding: "10px 20px" }}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          <div className="min-h-96 w-full bg-gray-100 flex items-center justify-center rounded-t-2xl overflow-visible">
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

          <div className="p-6  bg-gray-50 rounded-b-2xl">
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
            <section></section>
          </div>
          <div className="flex items-center my-8">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-lg text-gray-800 whitespace-nowrap">
              More Projects by {project.owner.name || "Service Provider"}
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <MoreProjectsByServiceProvider
            projects={
              moreProjectsByServiceProvider ? moreProjectsByServiceProvider : []
            }
          />
        </div>
      </Dialog>
      {bookingFormOpen && (
        <Dialog
          open={bookingFormOpen}
          onClose={handleBookingFormClose}
          fullWidth
          maxWidth="sm"
          className="rounded-2xl"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Get In Touch</h2>
            <BookingForm />
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectCard;
