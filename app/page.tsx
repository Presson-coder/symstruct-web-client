import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Home from "./home/page";
import Projects from "./projects/page";

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 px-20">
      <div className="min-h-screen text-white flex flex-col items-center justify-center">
        <Home />
      </div>
       <div className="min-h-screen pb-20">
        <Projects />
       </div>
    </div>
  );
}
