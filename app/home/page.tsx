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
      <span className=""></span>
     
    </div>
  );
};

export default Home;
