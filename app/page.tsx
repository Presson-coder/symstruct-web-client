import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Home from "./home/page";
import Projects from "./projects/page";
import ProjectCategoryFilter from "@/components/ProjectCategoryFilter";

export default function Index() {
  return (
    <div className="">
      <div className="min-h-screen text-white flex flex-col items-center justify-center bg-[url('/homeHero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative min-h-screen text-white flex flex-col items-center justify-center z-10">
          <Home />
        </div>
      </div>
      <div className="min-h-screen py-20 bg-gradient-to-b from-gray-100 to-gray-50 px-20">
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

        <Projects />
      </div>
    </div>
  );
}
