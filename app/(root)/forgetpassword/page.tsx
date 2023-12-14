"use client";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);
  const [error, setError] = useState("");
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;

    if (!isValidEmail(email)) {
      setError("Email is not Valid");
      return;
    }
    try {
      const res = await fetch("/api/forgetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (res.status === 400) {
        setError("User with this email is not registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      } else if (res.status === 500) {
        setError("An error occurred on the server. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      setError("An Error Occured.Please try again");
    }
  };
  if (sessionStatus == "loading") {
    return (
      <div className="flex justify-center items-center font-semibold text-4xl ">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex flex-col min-h-screen items-center justify-between p-24">
        <div className="bg-[#212121] p-9 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 text-white">
            Forget Password
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className="text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-6"
            >
              Submit
            </button>
          </form>

          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          <div className="text-center mt-4 text-gray-400">-OR-</div>
          <div className="mt-4 text-white">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-600">
              login here
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
