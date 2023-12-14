import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, heading, description } = await request.json();
  await connectDB();
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return new NextResponse("User is not registered", { status: 400 });
  }
  const newPost = {
    heading: heading,
    description: description,
  };
  try {
    existingUser.posts.push(newPost);
    // Save the user document
    await existingUser.save();
    return new NextResponse("Post Created Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in creating Post", { status: 500 });
  }
};
