import React from "react";

import UserDetails from "@/components/UserDetails";

const page = ({ searchParams }: { searchParams: { email: string } }) => {
  return (
    <div>
      <UserDetails email={searchParams.email} />
    </div>
  );
};

export default page;
