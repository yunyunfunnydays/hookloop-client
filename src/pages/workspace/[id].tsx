import React from "react";
import { useRouter } from "next/router";

const Workspace = () => {
  const router = useRouter();

  return (
    <section className="h-full flex-center">
      <h1 className="text-[100px]">Workspace: {router.query.id}</h1>
    </section>
  );
};

export default Workspace;
