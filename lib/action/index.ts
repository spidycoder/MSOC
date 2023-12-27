"use server";
import User from "@/lib/models/users.model";
import { connectDB } from "../mongoose";
import { Ruthie } from "next/font/google";

export async function getAllUsers() {
  try {
    await connectDB();
    const users = await User.find();
    return users;
  } catch (error: any) {
    throw new Error(`Failed to fetch Users: ${error.message}`);
  }
}

export async function findUserWithEmail(email: string) {
  try {
    await connectDB();
    const user = User.findOne({ email });
    if (!user) return;
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch Users: ${error.message}`);
  }
}

export async function findUserWithId(userId: string) {
  try {
    await connectDB();
    const user = await User.findById({ _id: userId });
    if (!user) return;
    return user;
  } catch (error: any) {
    throw new Error(`Failed to fetch Users: ${error.message}`);
  }
}

export async function findPostById(postId: string, userId: string) {
  try {
    const user = await findUserWithId(userId);
    const existingPostIndex = await user.posts.findIndex(
      (post: any) => post._id.toString() === postId
    );
    if (existingPostIndex === -1) return;
    const existingPost = user.posts[existingPostIndex];
    return existingPost;
  } catch (error: any) {
    throw new Error(`Failed to Fetch Post Details: ${error.message}`);
  }
}
