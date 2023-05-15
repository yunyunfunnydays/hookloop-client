import React, { useState } from "react";
import Router from "next/router";
import { Layout, Menu, Button, notification, Modal, message as msg } from "antd";
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
import { logout } from "@/service/api";
import WorkSpaceModal from "@/components/Workspace/WorkspaceModal";

interface ISider {
  s_collapsed: boolean;
  set_s_collapsed: ISetStateFunction<boolean>;
}

const CustSider: React.FC<ISider> = ({ s_collapsed, set_s_collapsed }) => {
  // API 錯誤時用來讓使用者明確知道錯在哪裡
  const [api] = notification.useNotification();

  const [s_isShowModal, set_s_isShowModal] = useState(false);

  const menuItem = [
    {
      key: "1",
      icon: <DesktopOutlined />,
      className: "workspace",
      label: <div className="">Workapace 1</div>,
      children: [
        {
          label: <span className="kanbans">Kanbans</span>,
          key: "2",
          icon: <AppstoreOutlined />,
          children: [
            {
              key: "3",
              label: "Manage",
            },
            {
              key: "4",
              label: "Design",
            },
          ],
        },
        {
          label: <span className="members">Members</span>,
          key: "5",
          icon: <UserOutlined />,
        },
        {
          label: <span className="settings">Setting</span>,
          key: "6",
          icon: <SettingOutlined />,
          children: [
            {
              key: "7",
              label: "Archive workspace",
            },
            {
              key: "8",
              label: "Kanban setting",
            },
          ],
        },
      ],
    },

    {
      key: "9",
      icon: <DesktopOutlined />,
      className: "workspace",
      label: <div className="">Workapace 2</div>,
      children: [
        {
          label: <span className="kanbans">Kanbans</span>,
          key: "10",
          icon: <AppstoreOutlined />,
          children: [
            {
              key: "11",
              label: "Manage",
            },
            {
              key: "12",
              label: "Design",
            },
          ],
        },
        {
          label: <span className="members">Members</span>,
          key: "13",
          icon: <UserOutlined />,
        },
        {
          label: <span className="settings">Setting</span>,
          key: "14",
          icon: <SettingOutlined />,
          children: [
            {
              key: "15",
              label: "Archive workspace",
            },
            {
              key: "16",
              label: "Kanban setting",
            },
          ],
        },
      ],
    },
  ];

  const handleLogout = async () => {
    const res: AxiosResponse = await logout();
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
      Router.push("/");
    } else {
      api.info({
        message: res.data.message,
        duration: 10,
        placement: "topLeft",
      });
    }
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
      <Menu theme="light" mode="inline" selectable={false} items={menuItem} />

      {/* logout */}
      <section
        role="presentation"
        className="w-full py-5 px-7 text-[#595959] text-base cursor-pointer hover:bg-[#F5F5F5]"
        onClick={handleLogout}
      >
        <LogoutOutlined />
        <span className="font-medium ml-2">Log out</span>
      </section>

      <Modal title="Create new workspace" width="572px" open={s_isShowModal} footer={null}>
        <WorkSpaceModal />
      </Modal>
    </Layout.Sider>
  );
};

export default CustSider;
