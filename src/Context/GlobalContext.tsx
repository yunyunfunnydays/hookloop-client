import React from "react";

interface IProps {
  c_workspaces: Iworkspace[];
  set_c_workspaces: ISetStateFunction<Iworkspace[]>;
  c_user: IUser;
  set_c_user: ISetStateFunction<IUser>;
}

const GlobalContext = React.createContext<IProps>({
  c_workspaces: [],
  set_c_workspaces: () => {},
  c_user: {} as IUser,
  set_c_user: () => {},
});
export default GlobalContext;
