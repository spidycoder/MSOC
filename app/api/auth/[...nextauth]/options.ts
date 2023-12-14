import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/users.model";
import { Account, User as AuthUser } from "next-auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Your Email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials: any) {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: credentials.email });

          if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (isPasswordCorrect) {
              return existingUser;
            } else {
              // return new NextResponse("User is not registered", {
              //   status: 400,
              // });
              throw new Error("User is not registered");
            }
          }
        } catch (error: any) {
          console.error("Error in authorization:", error);
          throw new Error("An error occurred during authorization");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: AuthUser;
      account: Account | null;
    }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
            });
            await newUser.save();
            return true;
          }
          return true;
        } catch (error: any) {
          console.log("Error saving user", error);
          return false;
        }
      }
      return false;
    },
  },
};
