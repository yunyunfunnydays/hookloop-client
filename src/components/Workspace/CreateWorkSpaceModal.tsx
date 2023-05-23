import React, { useState, useContext } from "react";
import { Input, Divider, Button, Spin, message as msg } from "antd";
// context
import GlobalContext from "@/Context/GlobalContext";
// api
import { addWorkspace } from "@/service/apis/workspace";
import ChooseMember from "./ChooseMember";

interface IProps {
  set_s_isShowModal: ISetStateFunction<boolean>;
}

const WorkspaceModal: React.FC<IProps> = ({ set_s_isShowModal }) => {
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_isLoaging, set_s_isLoaging] = useState(false);
  // 目前登入人員的資訊
  const { c_user, c_getAllWorkspace } = useContext(GlobalContext);
  // 要用來新建的 workspace 資料
  const [s_newDate, set_s_newData] = useState<Pick<Iworkspace, "workspaceName" | "members">>({
    workspaceName: "",
    // default 自己是 Owner
    members: [
      {
        avatar: c_user.avatar,
        role: "Owner",
        state: "create",
        username: c_user.username,
        userId: c_user.userId,
      },
    ],
  });

  // 新增 workspace 成員
  const addMember = (_: any, data: Imember) => {
    const target = s_newDate.members?.find((member: Imember) => member.username === data.username) || {};

    if (Object.keys(target).length > 0) {
      messageApi.warning(
        <span>
          user <span className="text-red-500 font-bold">{data.username}</span> is existing
        </span>,
      );
      return;
    }
    const _members: Imember[] = s_newDate.members?.concat([
      {
        avatar: data.avatar,
        role: "Member",
        username: data.username,
        userId: data.userId,
        state: "create",
      },
    ]);
    set_s_newData({
      ...s_newDate,
      members: _members,
    });
  };

  // 刪除 workspace 成員
  const deleteMember = (username: Imember["username"]) => {
    const _members: Imember[] = s_newDate.members.map((member: Imember) => {
      if (username === member.username) {
        return {
          ...member,
          state: "delete",
        };
      }
      return member;
    });
    set_s_newData({
      ...s_newDate,
      members: _members,
    });
    // const _members: Imember[] = s_newDate.members.filter((member: Imember) => member.username !== username);
    // set_s_newData({
    //   ...s_newDate,
    //   members: _members,
    // });
  };

  // 改變 workspace 成員權限
  const changeRole = (username: string, newRole: Imember["role"]) => {
    const _members: Imember[] =
      s_newDate?.members.map((member: Imember) => {
        if (member.username === username) {
          return {
            ...member,
            role: newRole,
          };
        }

        return member;
      }) || [];
    set_s_newData({
      ...s_newDate,
      members: _members,
    });
  };

  const onSubmit = async () => {
    set_s_isLoaging(true);
    if (s_newDate.workspaceName === "") {
      messageApi.warning("please type workspaceName");
      set_s_isLoaging(false);
      return;
    }
    const res: AxiosResponse = await addWorkspace(s_newDate);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_isLoaging(false);
    set_s_isShowModal(false);
  };

  return (
    <Spin spinning={s_isLoaging}>
      <section className="flex flex-col">
        {contextHolder}
        <div className="flex flex-col">
          <p className="text-base font-medium mb-1">Workspace name</p>
          <Input
            value={s_newDate.workspaceName}
            onChange={(e) => {
              set_s_newData({
                ...s_newDate,
                workspaceName: e.target.value,
              });
            }}
            placeholder="type a name for your workspace"
          />
        </div>

        {/* 選擇 Member的 UI component */}
        <ChooseMember
          members={s_newDate.members}
          addMember={addMember}
          deleteMember={deleteMember}
          changeRole={changeRole}
        />

        <Divider />

        <div className="flex justify-end gap-2">
          <Button className="text-black" onClick={() => set_s_isShowModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={onSubmit}>
            OK
          </Button>
        </div>
      </section>
    </Spin>
  );
};

export default WorkspaceModal;
