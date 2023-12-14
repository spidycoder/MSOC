import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  const { password, email } = await request.json();
  await connectDB();
  const existingUser = await User.findOne({ email });
  const hashedPassword = await bcrypt.hash(password, 10);
  existingUser.password = hashedPassword;
  existingUser.resetToken = undefined;
  existingUser.resetTokenExpiry = undefined;
  try {
    await existingUser.save();
    return new NextResponse("User's password is changed", { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 400 });
  }
};
