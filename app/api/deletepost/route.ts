import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export const DELETE = async (request: any) => {
  const { email, id } = await request.json();
  try {
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("User is not registered", { status: 400 });
    }
    const existingPostIndex = await existingUser.posts.findIndex(
      (post: any) => post._id.toString() === id
    );
    if (existingPostIndex === -1) {
      return new NextResponse("No Post Found", { status: 400 });
    }
    existingUser.posts.splice(existingPostIndex, 1);
    await existingUser.save();
    return new NextResponse("Post Deleted Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse("Post is not delted", { status: 500 });
  }
};
