"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const page = ({
  searchParams,
}: {
  searchParams: {
    heading: string;
    description: string;
    email: string;
    id: string;
  };
}) => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();
  useEffect(() => {
    setHeading(searchParams.heading || "");
    setDescription(searchParams.description || "");
  }, [searchParams]);

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);
  const handleEdit = async (e: any) => {
    e.preventDefault();
    const updatedHeading = e.target[0].value;
    const updatedDescription = e.target[1].value;
    //call backend api to edit the post
    try {
      const res = await fetch("/api/editpost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          heading: updatedHeading,
          description: updatedDescription,
          email: searchParams.email,
          id: searchParams.id,
        }),
      });
      if (res.status === 400) {
        setError("Error while updating");
      } else if (res.status === 200) {
        setError("");
        router.push("/posts");
      }
    } catch (error: any) {
      setError("Error on Server");
    }
    setHeading("");
    setDescription("");
  };

  if (sessionStatus == "loading") {
    return (
      <div className="flex justify-center items-center font-semibold text-4xl ">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    sessionStatus === "authenticated" && (
      <div className="pt-20">
        <form
          className="max-w-lg mx-auto bg-white p-4 rounded shadow-lg"
          onSubmit={handleEdit}
        >
          <h1 className="text-xl font-bold mb-4">Edit Your Post</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="heading"
            >
              Heading
            </label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            type="submit"
          >
            Edit Post
          </button>
          <p className="text-red pt-2">{error && error}</p>
        </form>
      </div>
    )
  );
};

export default page;
