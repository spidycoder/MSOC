import Link from "next/link";
import React from "react";

interface OptionBoxProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  heading: string;
  description: string;
  email: string;
  id: string;
}

const OptionBox = ({
  onClose,
  onEdit,
  onDelete,
  heading,
  description,
  email,
  id,
}: OptionBoxProps) => {
  return (
    <div className="flex flex-col gap-2 text-left border-2 opacity-0.9 p-2 rounded-md">
      <Link
        href={{
          pathname: "/posts/editpost",
          query: {
            heading: heading,
            description: description,
            email: email,
            id: id,
          },
        }}
        onClick={onEdit}
        className="border-b py-1"
      >
        Edit
      </Link>
      <button onClick={onDelete} className="border-b py-1">
        Delete
      </button>
      <button onClick={onClose} >
        Close
      </button>
    </div>
  );
};

export default OptionBox;
