"use client";
import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import profilePicture from "@/public/images/profilePicture.jpg";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-[#034694] py-4 text-white w-screen fixed top-0 left-0 z-10">
      <div className="flex flex-row justify-evenly">
        <Link href="/" className="text-lg font-semibold hover:text-black">
          Home
        </Link>
        <Link href="/posts" className="text-lg font-semibold hover:text-black">
          Posts
        </Link>
        <Link href="/about" className="text-lg font-semibold hover:text-black">
          About
        </Link>
        {!session ? (
          <Link
            href="/signin"
            className="text-lg font-semibold hover:text-black"
          >
            Register
          </Link>
        ) : (
          <div className="flex flex-row gap-2">
            <Link
              href={{
                pathname: "/profile",
                query: {
                  email: session?.user?.email,
                },
              }}
              className="text-lg font-semibold"
            >
              <Image
                src={profilePicture}
                alt="profile"
                height={32}
                width={32}
                className="bg-black rounded"
              />
            </Link>
            <button
              onClick={() => {
                signOut();
              }}
              className="text-lg font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
