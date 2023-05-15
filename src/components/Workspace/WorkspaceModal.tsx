import React from "react";
import { Input } from "antd";

const WorkspaceModal = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <p className="text-base font-medium">Workspace name</p>
        <Input placeholder="type a name for your workspace" />
      </div>

      <div className="flex flex-col">
        <p className="text-base font-medium">Invite members</p>
        <Input.Search placeholder="input search text" enterButton style={{ width: 250 }} />
      </div>
    </div>
  );
};

export default WorkspaceModal;
