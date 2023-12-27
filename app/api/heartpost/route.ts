import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const { userId, postId, heartCnt } = await request.json();
    await connectDB();
    const existingUser = await User.findById({ _id: userId });
    if (!existingUser) {
      return new NextResponse("User not Fount", { status: 400 });
    }
    const existingPostIndex = await existingUser.posts.findIndex(
      (post: any) => post._id.toString() === postId
    );
    if (existingPostIndex === -1) {
      return new NextResponse("Post Not Found", { status: 400 });
    }
    const existingPost = existingUser.posts[existingPostIndex];
    existingPost.hearts += 1;
    await existingUser.save();
    return new NextResponse("Post Liked Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in Like", { status: 500 });
  }
};
