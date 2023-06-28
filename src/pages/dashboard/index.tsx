import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import CustLayout from "@/components/Layout";
import Workspace from "@/components/Workspace";
import { useRouter } from "next/router";
import { isPlanAndPayValid } from "@/utils";
import ExpiredOrInvalidPaymentModal from "@/components/ExpiredOrInvalidPaymentModal";

interface IProps {}

const Dashboard: React.FC<IProps> = () => {
  const router = useRouter();
  // workspace 資料
  const { c_workspaces, c_user } = useContext(GlobalContext);
  const [s_invalidPaymentModal_visible, set_s_invalidPaymentModal_visible] = useState(false);

  useEffect(() => {
    if (router.asPath === "/dashboard" && c_user.currentPlan) {
      const isValidforPayment = isPlanAndPayValid(c_user.currentPlan);
      if (!isValidforPayment) {
        set_s_invalidPaymentModal_visible(true);
      }
    }
  }, [router.asPath]);

  return (
    <CustLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="mt-5 flex flex-col py-[30px]">
        <section className="mt-5 flex flex-col gap-8">
          {/* Workspace */}
          {c_workspaces?.map((workspace: Iworkspace) => {
            return <Workspace key={workspace.workspaceId} workspaceData={workspace} />;
          }) || []}
        </section>
      </div>

      {/* 付費方案過期或未付費提示 */}
      <ExpiredOrInvalidPaymentModal
        targetPlan={c_user?.currentPlan?.name}
        open={s_invalidPaymentModal_visible}
        setOpen={set_s_invalidPaymentModal_visible}
      />
    </CustLayout>
  );
};

export default Dashboard;
