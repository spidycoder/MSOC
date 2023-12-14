"use server";
import User from "@/lib/models/users.model";
import { connectDB } from "../mongoose";

export async function getAllUsers() {
  try {
    await connectDB();
    const users = await User.find();
    return users;
  } catch (error:any) {
    throw new Error(`Failed to fetch Users: ${error.message}`);
  }
}

export async function findUserWithEmail(email:string){
    try {
        await connectDB();
        const user = User.findOne({email});
        if(!user)return;
        return user;
    } catch (error:any) {
        throw new Error(`Failed to fetch Users: ${error.message}`);
    }
}

export async function findUserWithId(userId:string){
  try {
    await connectDB();
    const user = await User.findById({_id:userId});
    if(!user)return;
    return user;
  } catch (error:any) {
    throw new Error(`Failed to fetch Users: ${error.message}`);
  }
}