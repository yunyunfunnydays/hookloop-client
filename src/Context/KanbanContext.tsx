import React from "react";

interface IProps {
  c_Tags: ITag[];
  set_c_Tags: ISetStateFunction<ITag[]>;
  c_getAllTags: (kanbanId: string) => void;
  c_getKanbanByKey: () => void;
}

const KanbanContext = React.createContext<IProps>({
  c_Tags: [],
  set_c_Tags: () => {},
  c_getAllTags: () => {},
  c_getKanbanByKey: () => {},
});
export default KanbanContext;
