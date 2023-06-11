import React from "react";

interface IProps {
  c_kanbanId: string;
  c_Tags: ITag[];
  set_c_Tags: ISetStateFunction<ITag[]>;
  c_getAllTags: (kanbanId: string) => void;
  c_getKanbanByKey: () => void;
  sendMessage: any;
  lastMessage: any;
}

const KanbanContext = React.createContext<IProps>({
  c_kanbanId: "",
  c_Tags: [],
  set_c_Tags: () => {},
  c_getAllTags: () => {},
  c_getKanbanByKey: () => {},
  sendMessage: () => {},
  lastMessage: () => {},
});
export default KanbanContext;
