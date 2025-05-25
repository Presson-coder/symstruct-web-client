"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function HomeHero() {
  return (
    <div className="grid grid-cols-1 items-center text-center mt-10">
      <h4 className="font-semibold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-white">
        Accredited Construction Companies <br /> and professionals for
        <span
          className="typewrite text-yellow-500"
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
          className="typewrite text-yellow-500"
          repeat={Infinity}
          cursor={false}
        />
      </h4>
      <p className="text-white/70 text-lg max-w-xl mx-auto">
        Find the best construction companies and professionals for your
        projects. Whether it's building, painting, or any other construction
        needs, we have you covered with accredited experts.
      </p>

      <div className="mt-6">
        <form className="relative max-w-xl mx-auto">
          <input
            type="text"
            id="searchDomain"
            name="text"
            className="pt-4 pe-40 pb-4 ps-6 w-full h-12 outline-none text-black rounded-lg bg-white shadow"
            placeholder="Search Your Domain"
          />
          <button
            type="submit"
            className="absolute top-[0] end-[0] h-12 inline-flex items-center px-8 py-2.5 text-[16px] font-medium tracking-wide bg-sky-500 hover:bg-sky-600 border border-sky-500 hover:border-sky-600 text-white focus:ring-[3px] focus:ring-sky-500 focus:ring-opacity-25 focus:outline-none rounded-e-lg align-middle transition-all duration-500"
          >
            {/* <FaSearch className="me-1" /> Search */}
          </button>
        </form>
      </div>
    </div>
  );
}
