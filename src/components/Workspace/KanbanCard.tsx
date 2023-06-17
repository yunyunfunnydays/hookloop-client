/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useState, useContext } from "react";
import Router from "next/router";
import { message as msg, Spin, Popover, Typography, Modal } from "antd";
import {
  EllipsisOutlined,
  StarOutlined,
  StarFilled,
  PlusOutlined,
  ExclamationCircleFilled,
  EditOutlined,
  MinusCircleOutlined,
  TagsOutlined,
} from "@ant-design/icons";
// context
import GlobalContext from "@/Context/GlobalContext";
// api
import RenameKanbanModal from "@/components/Kanban/RenameKanbanModal";
import { pinKanban, archiveKanban } from "@/service/apis/kanban";
import TagWrapper from "./TagWrapper";

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

interface IProps {
  kanbanData: Ikanban;
}

interface CreateKanbanCardProps {
  onClick: () => void;
}

const CARD_BASICSTYLE = "w-[210px] h-[110px] rounded cursor-pointer";
const ICON_BASICSTYLE = "text-lg transition-all hover:scale-125";

const KanbanCard: React.FC<IProps> = ({ kanbanData }) => {
  const { c_getAllWorkspace } = useContext(GlobalContext);
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_isLoaging, set_s_isLoaging] = useState(false);
  // 改變名稱的彈窗的開關
  const [s_showNameModal, set_s_showNameModal] = useState(false);
  const [s_showTagModal, set_s_showTagModal] = useState(false);

  const TITlESTYLE = "p-1 cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all";

  // 加入我的最愛 or 取消我的最愛
  const toggleFavorites = async (event: ClickEvent) => {
    set_s_isLoaging(true);
    const res: AxiosResponse = await pinKanban(kanbanData.key, { isPinned: !kanbanData.isPinned });
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      messageApi.success(message);
    } else {
      messageApi.error(message);
    }
    c_getAllWorkspace();
    set_s_isLoaging(false);
    event.stopPropagation();
  };

  const archived = async () => {
    const res: AxiosResponse = await archiveKanban(kanbanData.key, { isArchived: true });
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
      c_getAllWorkspace();
    }
  };

  // popver 內容
  const popoverContent = () => (
    <div className="w-52 border-0 border-t pt-3" role="presentation" onClick={(e) => e.stopPropagation()}>
      <Typography.Title className={TITlESTYLE} level={5} onClick={() => set_s_showNameModal(!s_showNameModal)}>
        <EditOutlined className="pr-2" />
        rename {kanbanData.name}
      </Typography.Title>
      <Typography.Title
        className={`${TITlESTYLE} mt-2 `}
        level={5}
        onClick={() =>
          Modal.confirm({
            title: "Do you Want to Archive kanbans?",
            icon: <ExclamationCircleFilled />,
            okButtonProps: {
              className: "bg-[#262626] rounded-sm",
            },
            cancelButtonProps: {
              className: "rounded-sm hover:border-[#262626] text-[#262626]",
            },
            onOk() {
              archived();
            },
          })
        }
      >
        <MinusCircleOutlined className="pr-2" />
        Archived {kanbanData.name}
      </Typography.Title>

      <Typography.Title className={`${TITlESTYLE} mt-2 `} level={5} onClick={() => set_s_showTagModal(true)}>
        <TagsOutlined className="pr-2" />
        Tag setting
      </Typography.Title>
    </div>
  );

  return (
    <Spin spinning={s_isLoaging}>
      <div
        className={`${CARD_BASICSTYLE} flex flex-col items-end justify-between border px-3 py-4`}
        role="presentation"
        onClick={(e) => {
          if (e.target instanceof HTMLElement && e.target.className !== ICON_BASICSTYLE) {
            Router.push(`/kanban/${kanbanData.key}`);
            e.stopPropagation();
          }
        }}
      >
        {contextHolder}
        <div className="flex w-full justify-between" role="presentation" onClick={(e) => e.stopPropagation()}>
          <p className="text-base font-medium text-[#262626]">{kanbanData.name}</p>
          <Popover
            placement="bottomLeft"
            trigger="hover"
            title={<Typography.Title level={5}>kanban setting</Typography.Title>}
            content={popoverContent}
          >
            <EllipsisOutlined className={ICON_BASICSTYLE} />
          </Popover>
        </div>

        {kanbanData.isPinned ? (
          <StarFilled onClick={(e: ClickEvent) => toggleFavorites(e)} className={`${ICON_BASICSTYLE} text-[#FFA940]`} />
        ) : (
          <StarOutlined onClick={(e: ClickEvent) => toggleFavorites(e)} className={ICON_BASICSTYLE} />
        )}
      </div>

      {/* 建立 workspace 的 Modal */}
      <Modal
        title="rename kanban"
        width="572px"
        open={s_showNameModal}
        onCancel={() => set_s_showNameModal(false)}
        footer={null}
      >
        {s_showNameModal && <RenameKanbanModal kanbanData={kanbanData} set_s_showNameModal={set_s_showNameModal} />}
      </Modal>

      {/* tags 的 Modal */}
      <Modal
        title="Tags setting"
        width="472px"
        open={s_showTagModal}
        destroyOnClose
        onCancel={() => set_s_showTagModal(false)}
        maskClosable={false}
        footer={null}
      >
        {s_showTagModal && <TagWrapper kanbanId={kanbanData._id} />}
      </Modal>
    </Spin>
  );
};

// 建立看板的UI component
export const CreateKanbanCard: React.FC<CreateKanbanCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      role="presentation"
      className={`${CARD_BASICSTYLE} flex-center group border-2 border-dashed border-[#BFBFBF]`}
    >
      <PlusOutlined className="text-3xl text-[#595959] group-hover:scale-125 group-hover:transition-all" />
    </div>
  );
};

export default KanbanCard;
