import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const { heading, description, email, id } = await request.json();
    await connectDB();
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new NextResponse("User is not registered", { status: 400 });
    }
    const existingPostIndex = existingUser.posts.findIndex(
      (post: any) => post._id.toString() == id
    );
    if (existingPostIndex === -1) {
      return new NextResponse("No Post Exist With this Id", { status: 400 });
    }
    const existingPost = existingUser.posts[existingPostIndex];
    existingPost.heading = heading;
    existingPost.description = description;
    await existingUser.save();
    return new NextResponse("Post Updated Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error while Updating the Post", { status: 400 });
  }
};
