import HomeHero from "@/components/HomeHero";
import Navbar from "@/components/Navbar";
import React from "react";
import Projects from "../projects/page";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Navbar />
      <span className=""></span>
      <HomeHero />
      <Projects />
    </div>
  );
};

export default Home;
