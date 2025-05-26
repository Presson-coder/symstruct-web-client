import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Home from "./home/page";

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen text-white flex flex-col items-center justify-center">
      <Home />
    </div>
  );
}
