"use client";
import Image from "next/image";
import React from "react";
import { teacher1,teacher2,teacher3,teacher4,teacher5,teacher6 } from "@/public/images";
import { Slide } from "react-awesome-reveal";

const Contributors = () => {
  return (
    <div className="bg-slate-200">
      <h1 className="text-3xl font-bold border-b-2 underline text-center pt-8">
        Our Contributors
      </h1>
      <div className="mt-10 pb-10">
        {/* first row */}
        <div className="flex flex-row sm:flex-col sm:gap-6 justify-evenly">
            <div className="text-center">
              <Image
                src={teacher1}
                alt="teacher1"
                className="mx-auto rounded-full"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. Saral Kumar Jain</h1>
              <p className="text-medium">
                Professor and Head, Mathematics
                <br />
                M.Sc (Applied Mathematics), M.Phil, Ph.D
              </p>
            </div>
            <div className="text-center">
              <Image
                src={teacher2}
                alt="teacher2"
                className="mx-auto rounded-full w-[152px] h-[152px]"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. S. Padhi</h1>
              <p className="text-medium">
                Professor, Mathematics
                <br />
                M.Sc, M.Phil, Ph.D
              </p>
            </div>
            <div className="text-center">
              <Image
                src={teacher3}
                alt="teacher3"
                className="mx-auto rounded-full"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. Dinesh Kumar</h1>
              <p className="text-medium">
                Assistant Professor, Mathematics
                <br />
                Ph.D
              </p>
            </div>
        </div>
        {/* second row */}
        <div className="flex flex-row sm:flex-col sm:gap-6 justify-evenly mt-4">
            <div className="text-center">
              <Image
                src={teacher4}
                alt="teacher4"
                className="mx-auto rounded-full"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. Randhir Singh</h1>
              <p className="text-medium">
                Assistant Professor, Mathematics
                <br />
                Ph.D (IITKGP)
              </p>
            </div>
            <div className="text-center">
              <Image
                src={teacher5}
                alt="teacher5"
                className="mx-auto rounded-full"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. Abhinav Tandon</h1>
              <p className="text-medium">
                Assistant Professor, Mathematics
                <br />
                Ph.D
              </p>
            </div>
            <div className="text-center">
              <Image
                src={teacher6}
                alt="teacher6"
                className="mx-auto rounded-full"
              />
              <h1 className="font-bold text-2xl mt-2">Dr. Vandana</h1>
              <p className="text-medium">
                Assistant Professor, Mathematics
                <br />
                M.Tech (IIT Delhi), Ph.D (IITKGP)
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contributors;
