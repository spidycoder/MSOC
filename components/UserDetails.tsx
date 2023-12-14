import { findUserWithEmail } from "@/lib/action";
import React from "react";
import profileIcon from "@/public/images/profileIcon.png";
import Image from "next/image";
import PostTemplate2 from "@/components/PostTemplate2";

const UserDetails = async ({ email }: { email: string }) => {
  const user = await findUserWithEmail(email);

  return (
    <div className="flex flex-row sm:flex-col justify-evenly pt-20">
      <div className="flex flex-wrap">
        <div
          className={`flex flex-col items-center text-center ${
            user.firstName ? "pl-20" : "pl-12"
          }`}
        >
          <Image
            src={profileIcon}
            alt="profileIcon"
            className="rounded h-20 w-20"
          />
          {user.firstName && (
            <h1 className="pt-10 font-bold text-3xl">
              {user.firstName} {user.lastName}
            </h1>
          )}
          <h1 className="pt-5 font-semibold text-1xl">{user.email}</h1>
        </div>
      </div>
      <div className="sm:mt-7">
        <h1 className="font-bold text-2xl underline text-center">Posts</h1>
        {user.posts.length > 0 ? (
          user.posts.map((post: any) => (
            <PostTemplate2
              key={post._id}
              heading={post.heading}
              description={post.description}
              email={email}
              id={post._id.toString()}
              flag={true}
            />
          ))
        ) : (
          <div className="text-gray-600 text-1xl text-center mt-5 font-semibold">
            No Posts Created yet
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
