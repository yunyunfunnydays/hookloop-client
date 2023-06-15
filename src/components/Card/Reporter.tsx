import React, { useState, useContext } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip, Select } from "antd";
import GlobalContext from "@/Context/GlobalContext";
import CustAvatar from "../util/CustAvatar";

interface IProps {
  reporter: string;
  afterChoose: (userId: string) => void;
}

const Reporter: React.FC<IProps> = ({ reporter, afterChoose }) => {
  const { c_memberMap } = useContext(GlobalContext);
  const [s_showModal, set_s_showModal] = useState(false);
  // 判斷卡片是否有owner
  const hasOwner = reporter?.length > 0;

  return (
    <>
      {hasOwner ? (
        <Tooltip title={c_memberMap[reporter]?.username}>
          <CustAvatar
            info={c_memberMap[reporter]}
            onClick={() => set_s_showModal(true)}
            className="cursor-pointer bg-gray-200"
          />
        </Tooltip>
      ) : (
        <Button
          className="float-right bg-[#D9D9D9] text-white"
          onClick={() => set_s_showModal(true)}
          type="primary"
          size="middle"
          shape="circle"
          icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
        />
      )}

      {/* 選擇owner的彈窗 */}
      <Modal
        title="choose owner"
        width="350px"
        open={s_showModal}
        destroyOnClose
        onCancel={() => set_s_showModal(false)}
        maskClosable={false}
        footer={null}
      >
        <Select
          className="w-full"
          value={null}
          onChange={(userId: string) => {
            // 判斷要新增的人員是否已存在
            if (!userId) return;
            afterChoose(userId);
            set_s_showModal(false);
          }}
          options={Object.values(c_memberMap).map((user: Imember) => ({
            value: user.userId,
            label: (
              <span className="flex items-center gap-2">
                <CustAvatar info={user} />
                {user.username}
              </span>
            ),
          }))}
        />
      </Modal>
    </>
  );
};

export default Reporter;
