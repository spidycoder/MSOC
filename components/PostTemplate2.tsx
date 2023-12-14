"use client";
import React, { useState } from "react";
import OptionBox from "./OptionBox";
import { useRouter } from "next/navigation";

interface Props {
  heading: string;
  description: string;
  email: string;
  id: string;
  flag: Boolean;
}

const PostTemplate2 = ({ heading, description, email, id, flag }: Props) => {
  const router = useRouter();
  const [isOptionBoxOpen, setOptionBoxOpen] = useState(false);
  const handleButtonClick = () => {
    setOptionBoxOpen(true);
  };

  const handleEdit = () => {
    setOptionBoxOpen(false);
  };

  const handleDelete = async () => {
    //call the backend api to delete the post here
    try {
      const res = await fetch("/api/deletepost", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          id: id,
        }),
      });
      if (res.status === 200) {
        router.push("/posts");
      } else if (res.status === 200) {
        throw new Error("No Post Found");
      }
    } catch (error: any) {
      throw new Error(`Post is not deleted`);
    }
    setOptionBoxOpen(false);
  };

  const handleClose = () => {
    setOptionBoxOpen(false);
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-white p-4 rounded shadow-lg">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-bold mb-2 text-left">{heading}</h2>
          {flag && (
          <div className="flex">
            {isOptionBoxOpen ? (
              <OptionBox
                onClose={handleClose}
                onEdit={handleEdit}
                onDelete={handleDelete}
                heading={heading}
                description={description}
                email={email}
                id={id}
              />
            ) : (
              <button
                type="button"
                onClick={handleButtonClick}
                className="font-bold pb-3"
              >
                ...
              </button>
            )}
          </div>
          )}
        </div>

        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default PostTemplate2;
