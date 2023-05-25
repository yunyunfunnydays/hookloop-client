/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Layout } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
// component
import CustSider from "./CustSider";

interface IProps {
  children: React.ReactNode;
}

const Index: React.FC<IProps> = ({ children }) => {
  // 控制 Sider 收合的開關
  const [s_collapsed, set_s_collapsed] = useState(false);

  return (
    <Layout className="h-[calc(100vh_-_80px)] bg-white p-0">
      {/* Sider */}
      <CustSider s_collapsed={s_collapsed} set_s_collapsed={set_s_collapsed} />

      {/* content */}
      <Layout.Content className="px-[25px] relative overflow-auto">
        {children}

        {/* 收合sider的按鈕，因使用絕對定位所以放在最下方 */}
        {s_collapsed && (
          <div
            className="w-[64px] h-[64px] bg-[#F5F5F5] absolute top-0 left-0 cursor-pointer flex-center"
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
