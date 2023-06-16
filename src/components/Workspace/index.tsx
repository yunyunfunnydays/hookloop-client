import React, { useState } from "react";
import { Divider, Space, Modal } from "antd";
import { DesktopOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import CreateKanbanModal from "@/components/Kanban/CreateKanbanModal";
import KanbanCard, { CreateKanbanCard } from "./KanbanCard";

interface IProps {
  workspaceData: Iworkspace;
}

const Workspace: React.FC<IProps> = ({ workspaceData }) => {
  const { kanbans = [], members = [], workspaceName, workspaceId } = workspaceData;

  const [s_isShowModal, set_s_isShowModal] = useState(false);

  // 根據 isPinned 屬性對項目數組進行排序
  kanbans.sort((a, b) => {
    // 如果 a 的 isPinned 為 true，而 b 的 isPinned 為 false，則 a 排在 b 前面
    if (a.isPinned && !b.isPinned) return -1;

    // 如果 a 的 isPinned 為 false，而 b 的 isPinned 為 true，則 b 排在 a 前面
    if (!a.isPinned && b.isPinned) return 1;

    // 其他情况下，保持原有順序
    return 0;
  });

  return (
    <div className="flex flex-col justify-start">
      {/* 資訊欄區域 */}
      <section className="flex justify-between">
        <h5 className="text-[24px] font-medium text-[#595959]">
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
          {/* <SettingOutlined /> */}
        </div>
      </section>

      <Divider className="mt-1" />
      {/* 看板區域 */}
      <Space wrap size="middle">
        {kanbans
          // 濾掉封存的看板
          .filter((kanban: Ikanban) => !kanban.isArchived)
          .map((item: Ikanban) => (
            <KanbanCard key={item._id} kanbanData={item} />
          ))}
        {/* 先渲染已存在的看板最後再渲染建立看板的component */}
        <CreateKanbanCard onClick={() => set_s_isShowModal(true)} />
      </Space>

      {/* 建立 kanban 的 Modal */}
      <Modal
        title="Create new kanban"
        width="572px"
        open={s_isShowModal}
        onCancel={() => set_s_isShowModal(false)}
        footer={null}
      >
        {s_isShowModal && <CreateKanbanModal workspaceId={workspaceId} set_s_isShowModal={set_s_isShowModal} />}
      </Modal>
    </div>
  );
};

export default Workspace;
