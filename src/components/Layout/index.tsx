/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from "react";
import { Layout } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import GlobalContext from "@/Context/GlobalContext";
// component
import CustSider from "./CustSider";

interface IProps {
  children: React.ReactNode;
}

const Index: React.FC<IProps> = ({ children }) => {
  // 控制 Sider 收合的開關
  // const { portal } = useContext(GlobalContext);
  const [s_collapsed, set_s_collapsed] = useState(false);

  // TODO: 判斷是不是在 kanban 頁面，是的話要加上 overflow-y-hidden

  return (
    <Layout className="h-[calc(100vh_-_80px)] bg-white p-0">
      {/* Sider */}
      <CustSider s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />

      {/* content */}
      <Layout.Content className="relative overflow-x-auto overflow-y-hidden">
        {children}

        {/* 收合sider的按鈕，因使用絕對定位所以放在最下方 */}
        {s_collapsed && (
          <div
            role="presentation"
            className="flex-center absolute left-0 top-0 h-[64px] w-[64px] cursor-pointer bg-[#F5F5F5]"
            onClick={() => set_s_collapsed((prev: boolean) => !prev)}
          >
            <DoubleRightOutlined />
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default Index;
