import React from "react";
import { Input, Divider, Button } from "antd";
import ChooseMember from "./ChooseMember";

interface IProps {
  set_s_isShowModal: ISetStateFunction<boolean>;
}

const WorkspaceModal: React.FC<IProps> = ({ set_s_isShowModal }) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-base font-medium mb-1">Workspace name</p>
        <Input placeholder="type a name for your workspace" />
      </div>

      {/* 選擇 Member的 UI component */}
      <ChooseMember />

      <Divider />

      <div className="flex justify-end gap-2">
        <Button className="text-black" onClick={() => set_s_isShowModal(false)}>
          Cancel
        </Button>
        <Button type="primary">OK</Button>
      </div>
    </section>
  );
};

export default WorkspaceModal;
