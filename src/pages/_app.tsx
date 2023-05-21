/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// 順序很重要!!
import "../styles/globals.css";
import "../../public/antd.min.css";
import "../../public/custom.css";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { message as msg } from "antd";
// component
import Header from "@/components/Layout/Header";
// API
import { verifyUserToken } from "@/service/api";
import { getWorkspacesByUserId } from "@/service/apis/workspace";
import withTheme from "../../theme/index";
// context
import GlobalContext from "../Context/GlobalContext";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // 所有 workspace
  const [c_workspaces, set_c_workspaces] = useState<Iworkspace[]>([
    {
      id: "1",
      workspaceName: "Workspace 100",
      kanbans: [
        { id: "1", kanbanName: "kanban1" },
        { id: "2", kanbanName: "kanban2" },
        { id: "3", kanbanName: "kanban3" },
      ],
      members: ["user01", "user02"], // 還要存角色(ex: Admain、member)
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
  const [c_user, set_c_user] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  // 取得所有 workspace
  const c_getAllWorkspace = async () => {
    const res: AxiosResponse = await getWorkspacesByUserId();
    const { status, message } = res.data as IApiResponse;
    // console.log("message = ", message);
    // console.log("status = ", status);
    if (status === "success") {
      msg.success(message);
    }
  };

  // 第一次渲染判斷 token 是否過期並取得登入人員資訊
  useEffect(() => {
    (async () => {
      // step1 调用API检查token是否过期
      const res: AxiosResponse = await verifyUserToken();
      const { status, data } = res.data as IApiResponse;
      const currentPath = router.pathname;

      if (status === "success") {
        // 如果目前正在首頁登入後要直接導轉到 dashboard
        if (currentPath === "/") {
          Router.push("dashboard");
        }
        // 儲存使用者資訊
        set_c_user(data);
        return;
      }
      // 因為沒有驗證成功，所以要導轉到首頁
      if (currentPath !== "/") {
        Router.push("/");
      }
      set_c_user({
        username: "",
        email: "",
        password: "",
        avatar: "",
      });
    })();
  }, []);

  // 第一次渲染及 c_user 改變時執行, 監聽 c_user 是因為登入後前端會重新 set 一次 c_user
  useEffect(() => {
    // 沒有登入 or 驗證 token 的API還沒回來
    if (c_user?.email?.length === 0) return;

    c_getAllWorkspace();
  }, [c_user]);

  return withTheme(
    <GlobalContext.Provider value={{ c_workspaces, set_c_workspaces, c_user, set_c_user, c_getAllWorkspace }}>
      <Header />
      <Component {...pageProps} />
    </GlobalContext.Provider>,
  );
}
