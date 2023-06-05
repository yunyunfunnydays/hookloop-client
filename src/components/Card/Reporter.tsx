import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import MemberSelect from "@/components/Member/MemberSelect";
import CustAvatar from "../util/CustAvatar";

interface IProps {
  reporter: IOwner;
  afterChoose: (_: any, data: IOwner) => void;
}

const Reporter: React.FC<IProps> = ({ reporter, afterChoose }) => {
  const [s_showModal, set_s_showModal] = useState(false);
  // 判斷卡片是否有owner
  const hasOwner = reporter.username?.length > 0;

  return (
    <>
      {hasOwner ? (
        <Tooltip title={reporter.username}>
          <CustAvatar info={reporter} />
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
        <MemberSelect
          className="w-full"
          value={null}
          placeholder="input email text"
          onChange={(_: any, data: IOwner) => {
            afterChoose(_, data);
            set_s_showModal(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Reporter;
