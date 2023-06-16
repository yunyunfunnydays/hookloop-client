import React, { useContext } from "react";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import CustLayout from "@/components/Layout";
import Workspace from "@/components/Workspace";

interface IProps {}

const Dashboard: React.FC<IProps> = () => {
  // workspace 資料
  const { c_workspaces } = useContext(GlobalContext);

  return (
    <CustLayout>
      <div className="mt-5 flex flex-col py-[30px]">
        <section className="mt-5 flex flex-col gap-8">
          {/* Workspace */}
          {c_workspaces?.map((workspace: Iworkspace) => {
            return <Workspace key={workspace.workspaceId} workspaceData={workspace} />;
          }) || []}
        </section>
      </div>
    </CustLayout>
  );
};

export default Dashboard;
