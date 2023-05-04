import React from "react";
import Head from "next/head";
// import Layout from "@/components/Layout";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Landing Page</title>
      </Head>
      {/* <Layout /> */}
      <section className="h-full flex-center">
        <h1 className="text-[100px]">Home Page</h1>
      </section>
    </>
  );
};

export default Home;
