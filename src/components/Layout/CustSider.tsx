// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import React, { useState, useContext } from "react";
import Router from "next/router";
import { Layout, Menu, Button, Modal, message as msg } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  DoubleLeftOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// API
// import { logout } from "@/service/api";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import WorkSpaceModal from "@/components/Workspace/WorkspaceModal";
import MemberModal from "../Workspace/MemberModal";

interface IProps {
  s_collapsed: boolean;
  set_s_collapsed: ISetStateFunction<boolean>;
}

const CustSider: React.FC<IProps> = ({ s_collapsed, set_s_collapsed }) => {
  const { c_workspaces } = useContext(GlobalContext);
  // API 錯誤時用來讓使用者明確知道錯在哪裡
  // const [api] = notification.useNotification();

  // 顯示新增 workspace 的開關
  const [s_isShowModal, set_s_isShowModal] = useState(false);

  // 顯示選擇 Member 的開關
  const [s_isShowMember, set_s_isShowMember] = useState(false);

  const menuItemX: MenuProps["items"] = c_workspaces?.map((workspace: Iworkspace) => {
    return {
      key: workspace.id,
      icon: <DesktopOutlined />,
      className: "workspace",
      label: <div className="">{workspace.workspaceName}</div>,
      children: [
        {
          label: <span className="kanbans">Kanbans</span>,
          key: `${workspace.id}Kanbans`,
          icon: <AppstoreOutlined />,
          children: workspace.kanbans.map((kanban) => ({
            key: workspace.workspaceName + kanban.id,
            label: kanban.kanbanName,
          })),
        },
        {
          label: <span className="members">Members</span>,
          key: `${workspace.id}members`,
          icon: <UserOutlined />,
          onClick: () => set_s_isShowMember(true),
        },
        {
          label: <span className="settings">Setting</span>,
          key: `${workspace.id}settings`,
          icon: <SettingOutlined />,
          children: [
            {
              key: `${workspace.id}Archive`,
              label: "Archive workspace",
            },
            {
              key: `${workspace.id}Kanban_setting`,
              label: "Kanban setting",
            },
          ],
        },
      ],
    };
  });

  const handleLogout = async () => {
    msg.success("Log out success");
    Cookies.set("hookloop-token", "");
    Router.push("/");
    // const res: AxiosResponse = await logout();
    // const { status, message } = res.data as IApiResponse;
    // if (status === "success") {
    //   msg.success(message);
    //   Cookies.set("hookloop-token", "");
    //   Router.push("/");
    // } else {
    //   api.info({
    //     message: res.data.message,
    //     duration: 10,
    //     placement: "topLeft",
    //   });
    // }
  };

  return (
    <Layout.Sider
      trigger={null}
      width={235}
      collapsedWidth={0}
      className="border-r-[1px] transition-all duration-500 overflow-hidden"
      collapsible
      collapsed={s_collapsed}
    >
      {/* Home */}
      <section className="w-full py-5 px-7 text-[#595959] text-base">
        <HomeOutlined />
        <span className="font-medium ml-2">Home</span>
        <DoubleLeftOutlined className="float-right mt-1 cursor-pointer" onClick={() => set_s_collapsed(!s_collapsed)} />
      </section>

      {/* create workspace */}
      <section className=" w-full py-5 px-7 text-[#262626] bg-[#F5F5F5] text-base">
        <DesktopOutlined />
        <span className="font-medium ml-2">Workspace</span>
        <Button
          className="bg-[#FFA940] float-right text-white"
          type="primary"
          size="small"
          shape="circle"
          icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
          onClick={() => set_s_isShowModal(true)}
        />
      </section>

      {/* workspace */}
      <Menu theme="light" mode="inline" selectable={false} items={menuItemX} />

      {/* logout */}
      <section
        role="presentation"
        className="w-full py-5 px-7 text-[#595959] text-base cursor-pointer hover:bg-[#F5F5F5]"
        onClick={handleLogout}
      >
        <LogoutOutlined />
        <span className="font-medium ml-2">Log out</span>
      </section>

      <Modal
        title="Create new workspace"
        width="572px"
        open={s_isShowModal}
        onCancel={() => set_s_isShowModal(false)}
        footer={null}
      >
        {s_isShowModal && <WorkSpaceModal set_s_isShowModal={set_s_isShowModal} />}
      </Modal>

      <Modal
        title="Choose Member"
        width="572px"
        open={s_isShowMember}
        onCancel={() => set_s_isShowMember(false)}
        footer={null}
      >
        {s_isShowMember && <MemberModal set_s_isShowMember={set_s_isShowMember} />}
      </Modal>
    </Layout.Sider>
  );
};

export default CustSider;
