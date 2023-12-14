import User from "@/lib/models/users.model";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const POST = async (request: any) => {
  const { token } = await request.json();
  await connectDB();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return new NextResponse("Invalid token or has expired", { status: 400 });
  }
  
  return new NextResponse(JSON.stringify(user), { status: 200 });
};
