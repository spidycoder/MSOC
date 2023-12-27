import LikeFeature from "@/components/LikeFeature";
import { findPostById } from "@/lib/action";

import React, { useState } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { postId: string; userId: string };
}) => {
  const post = await findPostById(searchParams.postId, searchParams.userId);

  return (
    <div className="bg-slate-200 min-h-screen">
      <h1 className="pt-20 text-center font-bold text-3xl sm:text-xl">
        {post.heading}
      </h1>
      <div className="text-center mt-5 px-6 pb-3">
        <p className="text-left">{post.description}</p>
        <LikeFeature
          userId={searchParams.userId}
          postId={searchParams.postId}
          likeCnt1={post.likes}
          heartCnt1={post.hearts}
        />
      </div>
    </div>
  );
};

export default page;
