import React, { useState, useEffect, useContext } from "react";
import { Avatar, Select, Button, Modal, Tooltip, message as msg, Divider } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import GlobalContext from "@/Context/GlobalContext";
import CustAvatar from "@/components/util/CustAvatar";

interface IProps {
  assignee: string[];
  afterChoose: (data: string[]) => void;
}

const Assignee: React.FC<IProps> = ({ assignee, afterChoose }) => {
  const { c_memberMap } = useContext(GlobalContext);
  const [s_showModal, set_s_showModal] = useState(false);
  const [s_tmpAssignee, set_s_tmpAssignee] = useState<string[]>([]);
  const [messageApi, contextHolder] = msg.useMessage();

  // 刪除 assignee
  const deleteAsignee = (del_assignee: string) => {
    const tmp_assignee: string[] = s_tmpAssignee.filter((userId) => userId !== del_assignee);
    set_s_tmpAssignee(tmp_assignee);
  };

  useEffect(() => {
    set_s_tmpAssignee(assignee);
  }, [assignee]);

  return (
    <div className="flex gap-2">
      {contextHolder}
      <Avatar.Group maxCount={2} size={32} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {/* {s_tmpAssignee?.map((userId) => (
          <Tooltip key={userId} title={c_memberMap[userId]?.username}>
            <CustAvatar info={c_memberMap[userId]} />
          </Tooltip>
        ))} */}
        {assignee?.map((userId) => (
          <Tooltip key={userId} title={c_memberMap[userId]?.username}>
            <CustAvatar info={c_memberMap[userId]} />
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
        <Select
          className="w-full"
          value={null}
          onChange={(userId) => {
            // 判斷要新增的人員是否已存在
            // console.log("data = ", data);
            const owner = s_tmpAssignee.find((id) => userId === id);

            if (owner) {
              messageApi.error("this user is exitied");
              return;
            }
            if (!userId) return;
            set_s_tmpAssignee((prev) => {
              return prev.concat([userId]);
            });
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
        {/* <MemberSelect
          className="w-full"
          value={null}
          placeholder="input email text"
          onChange={(_: any, data: IOwner) => {
            // 判斷要新增的人員是否已存在
            const owner = s_tmpAssignee.find((userId) => userId === data._id);

            if (owner) {
              messageApi.error("this user is exitied");
              return;
            }

            set_s_tmpAssignee((prev) => {
              return prev.concat([data._id as string]);
            });
            // afterChoose(_, data);
            // set_s_showModal(false);
          }}
        /> */}

        <div className="mt-2 flex flex-col gap-2">
          {s_tmpAssignee?.map((userId: string) => (
            <div key={userId} className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* <Avatar size={28} src={item?.avatar?.length > 0 && item?.avatar} className="bg-gray-200">
                  {item?.avatar?.length === 0 ? item?.username[0] : null}
                </Avatar> */}
                <CustAvatar info={c_memberMap[userId]} />
                {c_memberMap[userId]?.username}
              </div>
              <DeleteOutlined className="cursor-pointer text-base" onClick={() => deleteAsignee(userId)} />
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
