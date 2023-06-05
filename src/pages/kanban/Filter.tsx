import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { Tooltip, Avatar, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
// init value
import { workspaceInitValue, kanbanInitValue } from "@/components/util/initValue";
import CustAvatar from "@/components/util/CustAvatar";

interface IProps {
  s_kanbanId: string;
  set_s_open: ISetStateFunction<boolean>;
}

const Filter: React.FC<IProps> = ({ s_kanbanId, set_s_open }) => {
  const { c_workspaces } = useContext(GlobalContext);

  const [s_members, set_s_members] = useState<Imember[]>([]);
  useEffect(() => {
    if (!s_kanbanId) return;
    // 目標看板
    const kanbanData: Ikanban =
      c_workspaces?.flatMap((workspace) => workspace.kanbans)?.find((kanban) => kanban._id === s_kanbanId) ||
      kanbanInitValue;
    const members: Imember[] =
      c_workspaces.find((workspace) => workspace.workspaceId === kanbanData?.workspaceId)?.members ||
      workspaceInitValue.members;

    set_s_members(members);
  }, [c_workspaces, s_kanbanId]);

  return (
    <div className="flex h-[90px] w-full items-center justify-end">
      <Button type="text" className="flex items-center" onClick={() => set_s_open(true)}>
        <FilterOutlined />
        Filter
      </Button>
      <Avatar.Group maxCount={3} size={42} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {s_members?.map((user: Imember) => (
          <Tooltip key={user?.username} title={user?.username}>
            {/* <Avatar size={42} src={user?.avatar?.length > 0 && user?.avatar} className="bg-gray-200">
              {user?.avatar?.length === 0 ? user?.username[0] : null}
            </Avatar> */}
            <CustAvatar info={user} />
          </Tooltip>
        ))}
      </Avatar.Group>
    </div>
  );
};

export default Filter;
