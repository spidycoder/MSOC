"use client";
import React from "react";
import { Slide } from "react-awesome-reveal";
import profilePicture from "@/public/images/profilePicture.jpg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  heading: string;
  description: string;
  id: string;
}
const PostTemplate = ({ heading, description, id }: Props) => {
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-white p-4 rounded shadow-lg">
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-xl font-bold mb-2">{heading}</h2>
          <div className="flex pb-3">
            <Link href={`/profile/${id}`}>
              <Image
                src={profilePicture}
                alt="profilepicture"
                height={24}
                width={24}
              />
            </Link>
          </div>
        </div>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default PostTemplate;
