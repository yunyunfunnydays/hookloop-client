import React, { useState } from "react";
// 順序很重要!!
import "../styles/globals.css";
import "../../public/antd.min.css";
import "../../public/custom.css";
import type { AppProps } from "next/app";
// component
import Header from "@/components/Layout/Header";
import withTheme from "../../theme/index";
// context
import GlobalContext from "../Context/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
  // 所有 workspace
  const [c_workspaces, set_c_workspaces] = useState<Iworkspace[]>([
    {
      id: "1",
      workspaceName: "Workspace 1",
      kanbans: [
        { id: "1", kanbanName: "kanban1" },
        { id: "2", kanbanName: "kanban2" },
        { id: "3", kanbanName: "kanban3" },
      ],
      members: ["user01", "user02"],
    },
    {
      id: "2",
      workspaceName: "Workspace 2",
      kanbans: [
        { id: "1", kanbanName: "kanban1" },
        { id: "2", kanbanName: "kanban2" },
        { id: "3", kanbanName: "kanban3" },
        { id: "4", kanbanName: "kanban4" },
        { id: "5", kanbanName: "kanban5" },
        { id: "6", kanbanName: "kanban6" },
        { id: "7", kanbanName: "kanban7" },
      ],
      members: ["user01", "user02", "user02"],
    },
  ]);

  // 存登入人員的資訊
  const [c_user, set_c_user] = useState<IUser>({} as IUser);

  return withTheme(
    <GlobalContext.Provider value={{ c_workspaces, set_c_workspaces, c_user, set_c_user }}>
      <Header />
      <Component {...pageProps} />
    </GlobalContext.Provider>,
  );
}
