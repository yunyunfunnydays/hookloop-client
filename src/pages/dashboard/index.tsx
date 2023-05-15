import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import CustSider from "@/components/Layout/CustSider";
import CustContent from "./CustContent";

const Dashboard = () => {
  const [s_collapsed, set_s_collapsed] = useState(false);

  // 所有 workspace
  const [s_workspaces, set_s_workspaces] = useState<Iworkspace[]>([]);

  // call API 取得 workspace
  useEffect(() => {
    const _tmp: Iworkspace[] = [
      {
        id: "1",
        workspaceName: "Workspace 1",
        kanbans: [
          { id: "1", kanbanName: "kanban1" },
          { id: "2", kanbanName: "kanban2" },
          { id: "3", kanbanName: "kanban3" },
        ],
        persons: ["user01", "user02"],
      },
      {
        id: "2",
        workspaceName: "Workspace 2",
        kanbans: [
          { id: "1", kanbanName: "kanban1" },
          { id: "2", kanbanName: "kanban2" },
          { id: "3", kanbanName: "kanban3" },
          { id: "4", kanbanName: "kanban4" },
          { id: "5", kanbanName: "kanban5" },
          { id: "6", kanbanName: "kanban6" },
          { id: "7", kanbanName: "kanban7" },
        ],
        persons: ["user01", "user02", "user02"],
      },
    ];
    set_s_workspaces(_tmp);
  }, []);

  return (
    <Layout className="h-[calc(100vh_-_80px)] bg-white p-0">
      {/* Sider */}
      <CustSider s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />

      {/* content */}
      <Layout.Content className="px-[25px] py-[30px] relative overflow-auto">
        <CustContent s_workspaces={s_workspaces} s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
