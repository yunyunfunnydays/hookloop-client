import React, { useState } from "react";
import { Modal } from "antd";
import CreateKanbanModal from "@/components/Kanban/CreateKanbanModal";

type AddKanbanProps = {
  workspaceId: string;
};

const AddKanban: React.FC<AddKanbanProps> = ({ workspaceId }) => {
  const [s_isShowModal, set_s_isShowModal] = useState(false);

  return (
    <span className="add-kanban">
      <span role="presentation" onClick={() => set_s_isShowModal(true)}>
        Add kanban`
      </span>
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
    </span>
  );
};

export default AddKanban;
