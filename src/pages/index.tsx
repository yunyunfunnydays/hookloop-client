import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Layout />
    </>
  );
};

export default Home;
