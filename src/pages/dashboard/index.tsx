import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DesktopOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  HomeOutlined,
  DoubleLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CustContent from "./CustContent";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <Layout className="h-[calc(100vh_-_80px)] bg-white p-0">
      <Layout.Sider
        trigger={null}
        width={235}
        collapsedWidth={0}
        className="border-r-[1px] transition-all duration-500 overflow-hidden"
        collapsible
        collapsed={collapsed}
      >
        {/* Home */}
        <section className="w-full py-5 px-7 text-[#595959] text-base">
          <HomeOutlined />
          <span className="font-medium ml-2">Home</span>
          <DoubleLeftOutlined className="float-right mt-1 cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
        </section>
        {/* create workspace */}
        <section className=" w-full py-5 px-7 text-[#262626] bg-[#F5F5F5] text-base ">
          <DesktopOutlined />
          <span className="font-medium ml-2">Workspace</span>
          <Button
            className="bg-[#FFA940] float-right text-white"
            type="primary"
            size="small"
            shape="circle"
            icon={<PlusOutlined style={{ verticalAlign: "middle" }} />}
          />
        </section>
        {/* workspace */}
        <Menu theme="light" mode="inline" selectable={false} items={menuItem} />
        <div>Log out</div>
      </Layout.Sider>
      <Layout.Content className="px-[25px] py-[30px] relative">
        <CustContent setCollapsed={setCollapsed} />
      </Layout.Content>
    </Layout>
  );
};

export default Dashboard;
