"use client";
import React, { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BlogForm = () => {

  const [heading, setHeading] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  //for securing route if user is not authenticated then he should not be allowed to access this url
  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const heading = e.target[0].value;
    const description = e.target[1].value;
    try {
      const res = await fetch("/api/createpost", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          heading,
          description,
        }),
      });
      if (res.status == 200) {
        setError("");
        router.push("/posts");
      } else if (res.status == 400) {
        setError("signin to create your Post");
      }
    } catch (error: any) {
      console.error(error);
      setError("An Error Occured.Please try again");
    }
    setHeading("");
    setDescription("");
  };
  if (sessionStatus == "loading") {
    return (
      <div className="flex justify-center items-center font-semibold text-4xl pt-20">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    sessionStatus === "authenticated" && (
      <div className="pt-20">
        <Fade>
          <form
            className="max-w-lg mx-auto bg-white p-4 rounded shadow-lg"
            onSubmit={handleSubmit}
          >
            <h1 className="text-xl font-bold mb-4">Create a Blog Post</h1>
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
              Create Post
            </button>
            <p className="text-red pt-2">{error && error}</p>
          </form>
        </Fade>
      </div>
    )
  );
};

export default BlogForm;
