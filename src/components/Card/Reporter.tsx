import React, { useState } from "react";
import Image from "next/image";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Tooltip } from "antd";
import MemberSelect from "@/components/Member/MemberSelect";

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
          <Avatar
            onClick={() => set_s_showModal(true)}
            size={32}
            className="cursor-pointer"
            src={reporter.avatar.length > 0 && <Image src={reporter.avatar} alt="user1" />}
          >
            {reporter?.avatar.length === 0 ? reporter.username[0] : null}
          </Avatar>
        </Tooltip>
      ) : (
        <Button
          className="bg-[#D9D9D9] float-right text-white"
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
