import React from "react";
import { queryTypeInitValue } from "@/components/util/initValue";

interface IProps {
  c_Tags: ITagRecord;
  c_clearMode: boolean;
  set_c_clearMode: ISetStateFunction<boolean>;
  set_c_Tags: ISetStateFunction<ITagRecord>;
  c_getAllTags: (kanbanId: string) => void;
  c_getKanbanByKey: () => void;
  sendMessage: any;
  c_query: IqueryType;
  lastMessage: any;
  c_kanbanId: string;
  c_listData: IList[];
  set_c_listData: React.Dispatch<React.SetStateAction<IList[]>>;
}

const KanbanContext = React.createContext<IProps>({
  c_Tags: {},
  c_query: queryTypeInitValue,
  c_clearMode: false,
  set_c_clearMode: () => {},
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
