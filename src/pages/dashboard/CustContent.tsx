/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import { DatePicker, Input } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

// component
import Workspace from "@/components/Workspace";

interface IContent {
  s_collapsed: boolean;
  set_s_collapsed: ISetStateFunction<boolean>;
}

const CustContent = ({ s_collapsed, set_s_collapsed }: IContent) => {
  // 所有 workspace
  const [s_workspaces, set_s_workspaces] = useState<Iworkspace[]>([]);

  // call API 取得 workspace
  useEffect(() => {
    const _tmp: Iworkspace[] = [
      {
        id: "1",
        workspaceName: "Workspace 1",
        kanbans: [
          { id: "1", kanbanName: "kanban1" },
          { id: "2", kanbanName: "kanban2" },
          { id: "3", kanbanName: "kanban3" },
        ],
        persons: ["user01", "user02"],
      },
      {
        id: "2",
        workspaceName: "Workspace 1",
        kanbans: [
          { id: "1", kanbanName: "kanban1" },
          { id: "2", kanbanName: "kanban2" },
          { id: "3", kanbanName: "kanban3" },
          { id: "4", kanbanName: "kanban4" },
          { id: "5", kanbanName: "kanban5" },
          { id: "6", kanbanName: "kanban6" },
          { id: "7", kanbanName: "kanban7" },
        ],
        persons: ["user01", "user02", "user02"],
      },
    ];
    set_s_workspaces(_tmp);
  }, []);

  return (
    <div className="flex flex-col">
      <section className="flex justify-end gap-3">
        <DatePicker className="w-[250px]" />
        <Input.Search placeholder="input search text" enterButton style={{ width: 250 }} />
      </section>

      <section className="mt-5 flex flex-col gap-8">
        {/* <Workspace /> */}
        {s_workspaces.map((item: Iworkspace) => (
          <Workspace key={item.id} workspaceData={item} />
        ))}
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
