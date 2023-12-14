"use client";
import React from "react";
import mainPage from "@/public/images/bitmesra.jpg";
import Image from "next/image";

const MainPage = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Image
        src={mainPage}
        alt="mainpage"
        className="z-0 object-cover h-full w-full"
        style={{ filter: "brightness(0.8)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 sm:absolute sm:top-1/2 sm:left-1/2 text-center sm:z-10 z-10 transform -translate-x-1/2 -translate-y-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2
          "
      >
        <h1 className="text-white font-black sm:text-3xl text-4xl mb-3">
          The Mathematics Society
        </h1>
        <p className="text-white font-black sm:text-lg text-2xl">
          Cultivating curiosity, collaboration, and appreciation for the
          elegance of mathematics
        </p>
      </div>
    </div>
  );
};

export default MainPage;
