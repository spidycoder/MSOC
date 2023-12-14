"use client";
import Image from "next/image";
import React from "react";
import feature from "@/public/images/feature.jpg";
import { Fade } from "react-awesome-reveal";

const Introduction = () => {
  return (
    <div className="flex flex-col mt-8 mb-12 justify-center items-center">
      <h1 className="text-3xl font-bold underline">MSOC</h1>
      <div className="flex flex-wrap sm:flex-col justify-between gap-4 mt-4">
        <Fade>
          <div className="flex-1 px-3">
            <Image
              src={feature}
              alt="feature"
              className="object-cover w-full h-full"
            />
          </div>
        </Fade>
        <div className="flex-1">
          <Fade>
            <div className="flex flex-col py-3 px-2">
              <h3 className="text-large font-semibold text-left">
                At MSOC, we believe in disseminating what we know and learning
                what we don't.
              </h3>
              <p className="text-small leading-[26px] text-left mt-2">
                The Mathematical Society is a dynamic community that serves as a
                hub for individuals with a shared passion for mathematics.
                Founded on the principles of curiosity, collaboration, and the
                celebration of mathematical beauty, this society brings together
                enthusiasts ranging from students to professionals. Through a
                myriad of engaging activities, the society fosters an
                environment where members can explore the diverse facets of
                mathematics, exchange ideas, and deepen their understanding of
                this fundamental field.
                <br />
                From hosting interactive workshops and seminars to organizing
                challenging competitions, the Mathematical Society provides its
                members with opportunities to enhance their mathematical skills
                and broaden their perspectives. The society also encourages
                collaborative projects, research endeavors, and outreach
                programs to promote the application of mathematics in various
                real-world contexts.
              </p>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
