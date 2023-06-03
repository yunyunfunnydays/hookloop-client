import React from "react";

interface IProps {
  c_Tags: ITag[];
  set_c_Tags: ISetStateFunction<ITag[]>;
  c_getAllTags: (kanbanId: string) => void;
}

const KanbanContext = React.createContext<IProps>({
  c_Tags: [],
  set_c_Tags: () => {},
  c_getAllTags: () => {},
});
export default KanbanContext;
