import React from "react";
import { Menu, Layout } from "antd";

const Sider: React.FC<ISider> = (props) => {
  const { is_collapsed } = props;
  const sliderItems = [
    {
      label: "ashboard",
      key: "/pds/abc-board",
      title: "xxx",
    },
  ];
  return (
    <Layout.Sider
      // className="shadow overflow-auto z-10 h-[100vh]"
      trigger={null}
      collapsible // 是否可收起
      theme="light"
      className="shadow transition-all duration-500"
      // collapsed={collapsedState}
      collapsed={is_collapsed}
      collapsedWidth={0}
      // onClick={stop_propagation}
    >
      {/* <div className="pl-8 pt-5 pb-3 w-full flex">
        <img src={SATLogo} className="w-full max-w-[150px]" alt="logo" />
      </div> */}

      <div className="flex flex-col">
        <Menu
          // mode="inline"
          className="flex flex-1 flex-col"
          // selectedKeys={[location.pathname]}
          items={sliderItems}
          // onClick={() => props.setNavbarState("close")}
        />
      </div>
    </Layout.Sider>
  );
};

export default Sider;
