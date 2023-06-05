import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { Avatar, Button, Modal, Tooltip, message as msg, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CustAvatar from "@/components/util/CustAvatar";
import MemberSelect from "@/components/Member/MemberSelect";

interface IProps {
  assignee: IOwner[];
  afterChoose: (data: IOwner[]) => void;
}

const Assignee: React.FC<IProps> = ({ assignee, afterChoose }) => {
  const [s_showModal, set_s_showModal] = useState(false);
  const [s_tmpAssignee, set_s_tmpAssignee] = useState<IOwner[]>([]);
  const [messageApi, contextHolder] = msg.useMessage();

  // 刪除 assignee
  const deleteAsignee = (del_assignee: IOwner) => {
    const tmp_assignee: IOwner[] = s_tmpAssignee.filter((item) => item.username !== del_assignee.username);
    set_s_tmpAssignee(tmp_assignee);
  };

  useEffect(() => {
    set_s_tmpAssignee(assignee);
  }, [assignee]);

  return (
    <div className="flex gap-2">
      {contextHolder}
      <Avatar.Group maxCount={2} size={32} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {s_tmpAssignee.map((item) => (
          <Tooltip key={item.username} title={item.username}>
            {/* <Avatar
              size={32}
              src={item.avatar.length > 0 && `https://cdn.filestackcontent.com/${item.avatar}`}
              className="bg-gray-200"
            >
              {item?.avatar.length === 0 ? item.username[0] : null}
            </Avatar> */}
            <CustAvatar info={item} />
          </Tooltip>
        ))}
      </Avatar.Group>
      <Button
        className="float-right bg-[#D9D9D9] text-white"
        type="primary"
        size="middle"
        shape="circle"
        onClick={() => set_s_showModal(true)}
        icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
      />

      {/* 選擇 assignee 的彈窗 */}
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
            // 判斷要新增的人員是否已存在
            const owner = s_tmpAssignee.find((item) => item._id === data._id);

            if (owner) {
              messageApi.error("this user is exitied");
              return;
            }

            set_s_tmpAssignee((prev) => {
              return prev.concat([data]);
            });
            // afterChoose(_, data);
            // set_s_showModal(false);
          }}
        />

        <div className="mt-2 flex flex-col gap-2">
          {s_tmpAssignee?.map((item: IOwner) => (
            <div key={item.username} className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* <Avatar size={28} src={item.avatar.length > 0 && <Image src={item.avatar} alt="user1" />}> */}
                <Avatar size={28} src={item.avatar.length > 0 && item.avatar} className="bg-gray-200">
                  {item?.avatar.length === 0 ? item.username[0] : null}
                </Avatar>
                {item.username}
              </div>
              <DeleteOutlined className="cursor-pointer text-base" onClick={() => deleteAsignee(item)} />
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex justify-end">
          <Button
            onClick={() => {
              afterChoose(s_tmpAssignee);
              set_s_showModal(false);
            }}
          >
            ok
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Assignee;
