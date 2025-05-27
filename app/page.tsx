import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Home from "./home/page";
import Projects from "./projects/page";

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
        <Projects />
      </div>
    </div>
  );
}
