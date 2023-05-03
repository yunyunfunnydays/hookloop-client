import React, { useState } from "react";
import { Layout, Space, Typography, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import Login from "../Login";

const { Header } = Layout;
const { Title } = Typography;
const ICON_STYLE = "cursor-pointer text-3xl";

// 漢堡選單
const MenuIcon: React.FC<IHeader> = (props) => {
  const { is_collapsed, toggleCollapsed } = props;
  return is_collapsed ? (
    <MenuUnfoldOutlined className={ICON_STYLE} onClick={toggleCollapsed} />
  ) : (
    <MenuFoldOutlined className={ICON_STYLE} onClick={toggleCollapsed} />
  );
};

const MyHeader: React.FC<IHeader> = (props) => {
  const [s_showLogin, set_s_showLogin] = useState(false);

  // 關閉
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };

  return (
    <Header className="flex p-2 shadow-lg transition-all duration-500">
      <Space>
        <span className="flex">
          <MenuIcon {...props} />
        </span>
        <Title level={3} className="m-0">
          HookLoop
        </Title>
      </Space>
      <Space className="flex-1 flex justify-end" align="center">
        <Avatar size="large" className="cursor-pointer" icon={<UserOutlined />} onClick={() => set_s_showLogin(true)} />
      </Space>

      <Login open={s_showLogin} close={closeLogin} />
    </Header>
  );
};

export default MyHeader;
