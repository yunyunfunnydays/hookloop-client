import React from "react";

interface IProps {
  c_Tags: ITagRecord;
  set_c_Tags: ISetStateFunction<ITagRecord>;
  c_getAllTags: (kanbanId: string) => void;
  c_getKanbanByKey: () => void;
  sendMessage: any;
  lastMessage: any;
  c_kanbanId: string;
  c_listData: IList[];
  set_c_listData: React.Dispatch<React.SetStateAction<IList[]>>;
}

const KanbanContext = React.createContext<IProps>({
  c_Tags: {},
  set_c_Tags: () => {},
  c_getAllTags: () => {},
  c_getKanbanByKey: () => {},
  sendMessage: () => {},
  lastMessage: () => {},
  c_kanbanId: "",
  c_listData: [],
  set_c_listData: () => {},
});
export default KanbanContext;
