import React from "react";
import { useRouter } from "next/router";

const Workspace = () => {
  const router = useRouter();

  return (
    <section className="flex-center h-full">
      <h1 className="text-[100px]">Workspace: {router.query.slug?.toString()}</h1>
    </section>
  );
};

export default Workspace;
