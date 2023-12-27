"use client";
import React from "react";
import profilePicture from "@/public/images/profilePicture.jpg";
import Image from "next/image";
import Link from "next/link";

interface Props {
  heading: string;
  description: string;
  userId: string;
  postId: string;
}
const PostTemplate = ({ heading, description, userId, postId }: Props) => {
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-white p-4 rounded shadow-lg">
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-xl font-bold mb-2">{heading}</h2>
          <div className="flex pb-3">
            <Link href={`/profile/${userId}`}>
              <Image
                src={profilePicture}
                alt="profilepicture"
                height={24}
                width={24}
              />
            </Link>
          </div>
        </div>
        <Link
          href={{
            pathname: `/posts/${postId}`,
            query: {
              userId: userId,
              postId: postId,
            },
          }}
        >
          <p className="text-sm text-gray-700">
            {description.substring(0, 400)}......
            <span className="hover:text-black hover:font-bold font-bold">read more</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PostTemplate;
