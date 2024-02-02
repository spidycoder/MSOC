"use client";
import React from "react";
import emailicon  from "@/public/images/emailIcon.png";
import homeIcon  from "@/public/images/homeIcon.png";
import callicon  from "@/public/images/callIcon.png";
import Image from "next/image";
import { Slide } from "react-awesome-reveal";
import { Fade } from "react-awesome-reveal";

const Address = () => {
  return (
    <div className="pb-8 pt-8">
      <div className="flex flex-row  sm:flex-col justify-evenly">
        <Slide direction="left">
          <div className="text-center">
            <Image
              src={homeIcon}
              alt="homeicon"
              height={122}
              width={122}
              className="mx-auto mt-6"
            />
            <h1 className="text-2xl text-gray-700 font-bold mt-2">Address</h1>
            <p className="text-gray-500 mt-5">
              Birla Institute of Technology, Mesra
              <br />
              Ranchi, Jharkhand 835215
            </p>
          </div>
        </Slide>
        <Fade>
          <div className="text-center mt-8">
            <Image
              src={callicon}
              alt="callicon"
              height={112}
              width={112}
              className="mx-auto"
            />
            <h1 className="text-2xl text-gray-700 font-bold mt-2">Call</h1>
            <p className="text-gray-500 mt-5">+91 XXXXX1234</p>
          </div>
        </Fade>
        <Slide direction="right">
          <div className="text-center mt-8">
            <Image
              src={emailicon}
              alt="emailicon"
              height={112}
              width={112}
              className="mx-auto"
            />
            <h1 className="text-2xl text-gray-700 font-bold mt-2">Email</h1>
            <p className="text-gray-500 mt-5">mathematica@gmail.com</p>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Address;
