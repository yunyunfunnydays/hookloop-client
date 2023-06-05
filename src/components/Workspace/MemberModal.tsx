import React, { useState, useContext } from "react";
import { Divider, Spin, Button, message as msg } from "antd";
// api
import { updateWorkspace } from "@/service/apis/workspace";
// context
import GlobalContext from "@/Context/GlobalContext";
import ChooseMember from "./ChooseMember";

interface IProps {
  s_workspace: Iworkspace;
  set_s_workspace: ISetStateFunction<Iworkspace>;
  set_s_isShowMember: ISetStateFunction<boolean>;
}

const MemberModal: React.FC<IProps> = ({ s_workspace, set_s_workspace, set_s_isShowMember }) => {
  const { c_getAllWorkspace } = useContext(GlobalContext);
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_isLoaging, set_s_isLoaging] = useState(false);

  // 新增 workspace 成員
  const addMember = (_: any, data: Imember) => {
    // console.log("123");
    const target = s_workspace.members?.find((member: Imember) => member.username === data.username) || {};

    if (Object.keys(target).length > 0) {
      messageApi.warning(
        <span>
          user <span className="font-bold text-red-500">{data.username}</span> is existing
        </span>,
      );
      return;
    }
    const _members: Imember[] = s_workspace.members?.concat([
      {
        avatar: data.avatar,
        role: "Member",
        state: "create",
        username: data.username,
        userId: data.userId,
      },
    ]);
    set_s_workspace({
      ...s_workspace,
      members: _members,
    });
  };

  // 刪除 workspace 成員
  const deleteMember = (username: Imember["username"]) => {
    const _members: Imember[] = s_workspace.members.map((member: Imember) => {
      if (member.username === username) {
        return {
          ...member,
          state: "delete",
        };
      }
      return member;
    });
    set_s_workspace({
      ...s_workspace,
      members: _members,
    });
    // const _members: Imember[] = s_workspace.members.filter((member: Imember) => member.username !== username);
    // set_s_workspace({
    //   ...s_workspace,
    //   members: _members,
    // });
  };

  // 改變 workspace 成員權限
  const changeRole = (username: string, newRole: Imember["role"]) => {
    const _members: Imember[] =
      s_workspace.members.map((member: Imember) => {
        if (member.username === username) {
          return {
            ...member,
            role: newRole,
          };
        }

        return member;
      }) || [];
    set_s_workspace({
      ...s_workspace,
      members: _members,
    });
  };

  // 確定修改 member
  const onSubmit = async () => {
    set_s_isLoaging(true);

    const res: AxiosResponse = await updateWorkspace(s_workspace.workspaceId, s_workspace);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_isLoaging(false);
    set_s_isShowMember(false);
  };

  return (
    <Spin spinning={s_isLoaging}>
      <section className="flex flex-col">
        {contextHolder}
        {/* 選擇 Member的 UI component */}
        <ChooseMember
          members={s_workspace.members}
          addMember={addMember}
          deleteMember={deleteMember}
          changeRole={changeRole}
        />

        <Divider />

        <div className="flex justify-end gap-2">
          <Button className="text-black" onClick={() => set_s_isShowMember(false)}>
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

export default MemberModal;
