import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { firstName, lastName, gender, email, password } = await request.json();
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    gender,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User Registered Successfully", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
