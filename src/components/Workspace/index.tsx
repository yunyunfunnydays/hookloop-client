import React from "react";
import { Divider, Space } from "antd";
import { DesktopOutlined, AppstoreOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import KanbanCard, { CreateKanbanCard } from "./KanbanCard";

interface IProps {
  workspaceData: Iworkspace;
}

const Workspace: React.FC<IProps> = ({ workspaceData }) => {
  const { kanbans = [], members = [], workspaceName } = workspaceData;

  return (
    <div className="flex flex-col justify-start">
      {/* 資訊欄區域 */}
      <section className="flex justify-between">
        <h5 className="text-[24px] text-[#595959] font-medium">
          <DesktopOutlined />
          <span className="ml-2">{workspaceName}</span>
        </h5>

        <div className="flex items-center text-[16px]">
          <AppstoreOutlined />
          {/* 看板總數 */}
          <span className="ml-1 mr-2">{kanbans.length}</span>
          <UserOutlined />
          {/* 看板人員總數 */}
          <span className="ml-1 mr-2">{members.length}</span>
          <SettingOutlined />
        </div>
      </section>

      <Divider className="mt-1" />
      {/* 看板區域 */}
      <Space wrap size="middle">
        {kanbans.map((item: Ikanban) => (
          <KanbanCard key={item.id} kanbanData={item} />
        ))}
        {/* 先渲染已存在的看板最後再渲染建立看板的component */}
        <CreateKanbanCard />
      </Space>
    </div>
  );
};

export default Workspace;
