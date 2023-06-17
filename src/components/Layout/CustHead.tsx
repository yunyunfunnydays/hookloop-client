import React, { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import GlobalContext from "@/Context/GlobalContext";

interface IProps {}

const CustHead: React.FC<IProps> = () => {
  const { c_workspaces } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    // const pathname = router.pathname;
    console.log("router.pathname = ", c_workspaces);
  }, [router.pathname]);

  return (
    <Head>
      <title>test</title>
    </Head>
  );
};

export default CustHead;
