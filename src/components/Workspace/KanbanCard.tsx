/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext } from "react";
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
import { pinKanban, archiveKanban } from "@/service/apis/kanban";
import ReNameKanbanModal from "@/components/Kanban/ReNameKanbanModal";

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

  const TITlESTYLE = "p-1 cursor-pointer hover:bg-zinc-200 hover:rounded-md transition-all";

  // 加入我的最愛 or 取消我的最愛
  const toggleFavorites = async () => {
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
    <div className="w-52 border-0 border-t pt-3">
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

      <Typography.Title className={`${TITlESTYLE} mt-2 `} level={5}>
        <TagsOutlined className="pr-2" />
        Tag setting
      </Typography.Title>
    </div>
  );

  return (
    <Spin spinning={s_isLoaging}>
      <div className={`${CARD_BASICSTYLE} px-3 py-4 flex flex-col justify-between items-end border`}>
        {contextHolder}
        <div className="w-full flex justify-between">
          <p className="text-[#262626] font-medium text-base">{kanbanData.name}</p>
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
          <StarFilled onClick={toggleFavorites} className={`${ICON_BASICSTYLE} text-[#FFA940]`} />
        ) : (
          <StarOutlined onClick={toggleFavorites} className={ICON_BASICSTYLE} />
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
        {s_showNameModal && <ReNameKanbanModal kanbanData={kanbanData} set_s_showNameModal={set_s_showNameModal} />}
      </Modal>
    </Spin>
  );
};

// 建立看板的UI component
export const CreateKanbanCard: React.FC<CreateKanbanCardProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className={`${CARD_BASICSTYLE} group flex-center border-dashed border-2 border-[#BFBFBF]`}>
      <PlusOutlined className="group-hover:transition-all group-hover:scale-125 text-3xl text-[#595959]" />
    </div>
  );
};

export default KanbanCard;
