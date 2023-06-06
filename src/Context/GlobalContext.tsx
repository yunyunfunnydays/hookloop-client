import React from "react";

interface IProps {
  c_memberMap: ImemberRecord;
  c_workspaces: Iworkspace[];
  set_c_workspaces: ISetStateFunction<Iworkspace[]>;
  c_user: IUser;
  set_c_user: ISetStateFunction<IUser>;
  c_getAllWorkspace: () => void;
}

const GlobalContext = React.createContext<IProps>({
  c_memberMap: {},
  c_workspaces: [],
  set_c_workspaces: () => {},
  c_user: {} as IUser,
  set_c_user: () => {},
  c_getAllWorkspace: () => {},
});
export default GlobalContext;
