"use client";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import google from "@/public/images/google.png";
import Image from "next/image";

const page = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!isValidEmail(email)) {
      setError("Email is not Valid");
      return;
    }
    if (password.length < 8) {
      setError("Password is not valid, try a stronger password");
      return;
    }
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.status === 401) {
      setError("Invalid email or password");
    } else {
      setError("");
      router.push("/");
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
      <div className="flex flex-col items-center bg-slate-300 min-h-screen justify-between p-24">
        <div className="bg-[#212121] p-9 rounded shadow-md w-96">
          <h1 className="text-4xl text-center font-semibold mb-8 text-white">
            Login
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
              Login
            </button>
            {/* <p className="text-white text-[16px] mb-2 mt-2">
              Forget Password?
              <Link
                href="/forgetpassword"
                className="text-blue-500 hover:underline ml-2"
              >
                Reset Here
              </Link>
            </p> */}
          </form>
          <button
            onClick={() => signIn("google")}
            className="w-full text-black bg-white py-2 mb-2 mt-6 rounded-md hover:bg-gray-200 "
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <Image src={google} alt="google" height={24} width={24} />
              <p>Log in with Google</p>
            </div>
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          <div className="text-center mt-4 text-gray-400">-OR-</div>
          <div className="mt-4 text-white">
            New User?{" "}
            <Link href="/signin" className="text-blue-400 hover:text-blue-600">
              register here
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default page;
