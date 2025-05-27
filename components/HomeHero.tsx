"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function HomeHero() {
  return (
    <div className="grid grid-cols-1 items-center text-center mb-10 ">
      <div>
        <span className="loading loading-bars loading-lg text-orange-400"></span>
      </div>
      <h4 className="font-semibold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-white">
        <span className="text-orange-400">
          Accredited Construction Companies{" "}
        </span>{" "}
        <br /> and professionals for
        <span
          className="typewrite text-black"
          data-period="2000"
          data-type='[ "Building", "Painting", "Startup", "Enterprise" ]'
        >
          {" "}
          <span className="wrap"></span>{" "}
        </span>
        <TypeAnimation
          sequence={[
            "Personal",
            2000,
            "Business",
            2000,
            "Startup",
            2000,
            "Enterprise",
            2000,
          ]}
          wrapper="span"
          speed={10}
          className="typewrite text-orange-400"
          repeat={Infinity}
          cursor={false}
        />
      </h4>
      <p className="text-white/70 text-lg max-w-xl mx-auto">
        Find the best construction companies and professionals for your
        projects. Whether it's building, painting, or any other construction
        needs, we have you covered with accredited experts.
      </p>
      <div className="mt-6"></div>
    </div>
  );
}
