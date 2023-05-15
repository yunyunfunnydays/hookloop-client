import React from "react";
import { Divider, Space } from "antd";
import { DesktopOutlined, AppstoreOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import KanbanCard, { CreateKanbanCard } from "./KanbanCard";

interface IworkspaceProps {
  workspaceData: Iworkspace;
}

const Workspace: React.FC<IworkspaceProps> = ({ workspaceData }) => {
  const { kanbans = [], persons = [] } = workspaceData;

  return (
    <div className="flex flex-col justify-start">
      {/* 資訊欄部分 */}
      <section className="flex justify-between">
        <h5 className="text-[24px] text-[#595959] font-medium">
          <DesktopOutlined />
          <span className="ml-2">Workspace 1</span>
        </h5>

        <div className="flex items-center text-[16px]">
          <AppstoreOutlined />
          {/* 看板總數 */}
          <span className="ml-1 mr-2">{kanbans.length}</span>
          <UserOutlined />
          {/* 看板人員總數 */}
          <span className="ml-1 mr-2">{persons.length}</span>
          <SettingOutlined />
        </div>
      </section>

      <Divider className="mt-1" />

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
