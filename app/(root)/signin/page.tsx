"use client";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const gender = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    if (!isValidEmail(email)) {
      setError("Email is not Valid");
      return;
    }
    if (password.length < 8) {
      setError("Password is not valid, try a stronger password");
      return;
    }
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This Email is already in use");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      } else if (res.status === 500) {
        setError("An error occurred. Please try again.");
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
      <div className="flex flex-col items-center justify-center p-24">
        <div className="bg-[#212121] p-9 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 text-white">
            Register
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="" className="text-white">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your First Name"
              required
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
            />
            <label htmlFor="" className="text-white">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              required
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
            />
            <label htmlFor="" className="text-white">
              Gender
            </label>
            <input
              type="text"
              placeholder="Enter your gender"
              required
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
            />
            <label htmlFor="" className="text-white">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2 mb-2"
            />
            <label htmlFor="" className="text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 text-black rounded px-3 py-2 focus:outline mt-2"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="bg-white mt-1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-6"
            >
              Register
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
            <div className="text-center mt-4 text-gray-400">-OR-</div>
            <div className="mt-4 text-white">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:text-blue-600">
                login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default page;
