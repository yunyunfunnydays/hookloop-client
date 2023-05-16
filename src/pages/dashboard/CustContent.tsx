/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from "react";
import { DatePicker, Input } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import Workspace from "@/components/Workspace";

interface IProps {
  s_collapsed: boolean;
  set_s_collapsed: ISetStateFunction<boolean>;
}

const CustContent: React.FC<IProps> = ({ s_collapsed, set_s_collapsed }) => {
  const { c_workspaces } = useContext(GlobalContext);

  return (
    <div className="flex flex-col">
      <section className="flex justify-end gap-3">
        <DatePicker className="w-[250px]" />
        <Input.Search placeholder="input search text" enterButton style={{ width: 250 }} />
      </section>

      <section className="mt-5 flex flex-col gap-8">
        {/* <Workspace /> */}
        {c_workspaces?.map((workspace: Iworkspace) => {
          return <Workspace key={workspace.id} workspaceData={workspace} />;
        }) || []}
      </section>

      {/* 收合sider的按鈕，因使用絕對定位所以放在最下方 */}
      {s_collapsed && (
        <div
          className="w-[64px] h-[64px] bg-[#F5F5F5] absolute top-0 left-0 cursor-pointer flex-center"
          onClick={() => set_s_collapsed((prev: boolean) => !prev)}
        >
          <DoubleRightOutlined />
        </div>
      )}
    </div>
  );
};

export default CustContent;
