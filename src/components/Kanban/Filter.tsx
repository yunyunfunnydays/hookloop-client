import React, { useContext } from "react";
import GlobalContext from "@/Context/GlobalContext";
import { Tooltip, Avatar, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import CustAvatar from "@/components/util/CustAvatar";

type FilterProps = {
  set_s_open: ISetStateFunction<boolean>;
};

const Filter: React.FC<FilterProps> = ({ set_s_open }) => {
  const { c_memberMap } = useContext(GlobalContext);

  // const [s_members, set_s_members] = useState<Imember[]>([]);
  // useEffect(() => {
  //   if (!c_kanbanId) return;
  //   // 目標看板
  //   const kanbanData: Ikanban =
  //     c_workspaces?.flatMap((workspace) => workspace.kanbans)?.find((kanban) => kanban._id === c_kanbanId) ||
  //     kanbanInitValue;
  //   const members: Imember[] =
  //     c_workspaces.find((workspace) => workspace.workspaceId === kanbanData?.workspaceId)?.members ||
  //     workspaceInitValue.members;

  //   set_s_members(members);
  // }, [c_workspaces, c_kanbanId]);

  return (
    <div className="flex h-[90px] w-full items-center justify-end fixed right-6">
      <Button type="text" className="flex items-center" onClick={() => set_s_open(true)}>
        <FilterOutlined />
        Filter
      </Button>
      <Avatar.Group maxCount={3} size={42} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
        {Object.values(c_memberMap)?.map((user: Imember) => (
          <Tooltip key={user?.username} title={user?.username}>
            <CustAvatar size={42} info={user} />
          </Tooltip>
        ))}
      </Avatar.Group>
    </div>
  );
};

export default Filter;
