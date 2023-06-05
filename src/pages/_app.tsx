/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// 順序很重要!!
import "../styles/globals.css";
import "../../public/antd.min.css";
import "../../public/custom.css";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";
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
  const [c_workspaces, set_c_workspaces] = useState<Iworkspace[]>([]);

  const [s_isLoading, set_s_isLoading] = useState(false);
  // 存登入人員的資訊
  const [c_user, set_c_user] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    avatar: "",
    userId: "",
  });

  // 取得所有 workspace
  const c_getAllWorkspace = async () => {
    set_s_isLoading(true);
    const res: AxiosResponse = await getWorkspacesByUserId();
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      // msg.success(message);

      const _data = data.filter((workspace: Iworkspace) => workspace.isArchived !== true);
      // // 根据 isPinned 属性对项目数组进行排序
      // _data.sort((a, b) => {
      //   // 如果 a 的 isPinned 为 true，而 b 的 isPinned 为 false，则 a 排在 b 前面
      //   if (a.isPinned && !b.isPinned) {
      //     return -1;
      //   }
      //   // 如果 a 的 isPinned 为 false，而 b 的 isPinned 为 true，则 b 排在 a 前面
      //   if (!a.isPinned && b.isPinned) {
      //     return 1;
      //   }
      //   // 其他情况下，保持原有顺序
      //   return 0;
      // });
      // console.log("c_workspaces = ", _data);
      set_c_workspaces(_data);
    }
    set_s_isLoading(false);
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
        set_c_user({
          ...data,
          userId: data._id,
        });
        return;
      }
      if (currentPath.includes("/resetPassword")) {
        Router.push(currentPath);
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
        userId: "",
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
      <Spin spinning={s_isLoading}>
        <Header />
        <Component {...pageProps} />
      </Spin>
    </GlobalContext.Provider>,
  );
}
