import React from "react";
import PostTemplate from "@/components/PostTemplate";
import Link from "next/link";
import {write} from "@/public/images/index.js"
import Image from "next/image";
import { getAllUsers } from "@/lib/action";

const page = async () => {
  const users = await getAllUsers();

  return (
    <div className="bg-slate-200">
      <h1 className="text-center text-3xl text-gray-700 pt-20 font-bold underline">
        Our Popular Blogs
      </h1>
      <div className="flex flex-row-reverse mr-6">
        <Link
          href="/posts/createpost"
          className="text-black py-3 px-6 hover:underline shadow-md sm:mt-3 flex flex-row gap-2"
        >
          <Image src={write} alt="write" height={24} width={24} className="" />
          Create
        </Link>
      </div>
      <div className="flex flex-wrap justify-evenly pb-10">
        {users?.map((user) =>
          user.posts.map((post: any) => (
            <PostTemplate
              key={post._id}
              heading={post.heading}
              description={post.description}
              userId={user._id.toString()}
              postId={post._id.toString()}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default page;
