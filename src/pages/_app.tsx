/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import whyDidYouRender from "@welldone-software/why-did-you-render";

// 順序很重要!!
import "../styles/protal.css";
import "../styles/globals.css";
import "../../public/antd.min.css";
import "../../public/custom.css";
// import Head from "next/head";

import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { Spin, notification } from "antd";
// component
import Header from "@/components/Layout/Header";
// API
import { verifyUserToken } from "@/service/api";
import { getWorkspacesByUserId } from "@/service/apis/workspace";
import usePortal from "@/hooks/useLogo";
import CustAvatar from "@/components/util/CustAvatar";
import withTheme from "../../theme/index";
import { userInitValue } from "../components/util/initValue";
// context
import GlobalContext from "../Context/GlobalContext";
// Tracking unnecessary re-renders
if (process.env.NODE_ENV === "development") {
  whyDidYouRender(React);
}

export default function App({ Component, pageProps }: AppProps) {
  const [api, contextHolder] = notification.useNotification();
  // 登入時強迫 user 看我做的動畫
  const { setShowPortal, portal } = usePortal();
  const router = useRouter();
  // 所有 workspace
  const [c_workspaces, set_c_workspaces] = useState<Iworkspace[]>([]);
  // 存目前 workspace 上的成員
  const [c_memberMap, set_c_memberMap] = useState<ImemberRecord>({});
  const [s_isLoading, set_s_isLoading] = useState(false);

  // 存登入人員的資訊
  const [c_user, set_c_user] = useState<IUser>(userInitValue);

  // 當 socket 吐資料回來時告訴使用者是哪位仁兄在改東西
  // TODO Convert to a standalone component ：popup notification
  const c_socketNotification = (userId: string, description: React.ReactNode) => {
    api.info({
      message: <span className="ml-3 mt-5 text-lg">{c_memberMap[userId]?.username}</span>,
      icon: <CustAvatar info={c_memberMap[userId]} size={32} />,
      description: <span className="ml-3 text-base font-semibold">{description}</span>,
      placement: "topLeft",
      className: "p-2 rounded-lg bg-orange-50 border-0 border-l-[10px] border-c border-orange-400",
    });
  };

  // 取得所有 workspace
  const c_getAllWorkspace = async () => {
    set_s_isLoading(true);
    const res: AxiosResponse = await getWorkspacesByUserId();
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      // msg.success(message);

      const _data = data.filter((workspace: Iworkspace) => workspace.isArchived !== true);

      set_c_workspaces(_data);
    }
    set_s_isLoading(false);
    // End the animation after get workspace data
    setShowPortal(false);
  };

  // 第一次渲染判斷 token 是否過期並取得登入人員資訊
  useEffect(() => {
    (async () => {
      // showPortal();
      // step1 调用API检查token是否过期
      const res: AxiosResponse = await verifyUserToken();
      const { status, data } = res.data as IApiResponse;
      const currentPath = router.asPath;

      if (status === "success") {
        // 如果目前正在首頁登入後要直接導轉到 dashboard
        if (currentPath === "/") {
          Router.replace("dashboard");
        }
        // 儲存使用者資訊
        set_c_user({
          ...data,
          userId: data._id || data.id,
        });
        return;
      }
      // FIXME forget Passwords
      if (currentPath.includes("/resetPassword")) {
        Router.push(currentPath);
        return;
      }
      // 因為沒有驗證成功，所以要導轉到首頁
      if (currentPath !== "/") {
        Router.push("/");
      }
      set_c_user(userInitValue);
    })();
  }, []);

  // 第一次渲染及 c_user 改變時執行, 監聽 c_user 是因為登入後前端會重新 set 一次 c_user
  useEffect(() => {
    // 沒有登入 or 驗證 token 的API還沒回來
    if (c_user?.email?.length === 0) return;

    c_getAllWorkspace();
  }, [c_user]);

  return withTheme(
    <GlobalContext.Provider
      value={{
        set_c_showPortal: setShowPortal,
        set_c_memberMap,
        c_memberMap,
        c_workspaces,
        set_c_workspaces,
        c_user,
        set_c_user,
        c_getAllWorkspace,
        c_socketNotification,
      }}
    >
      {portal}
      {contextHolder}
      <Spin spinning={s_isLoading}>
        <Header />
        <Component {...pageProps} />
      </Spin>
    </GlobalContext.Provider>,
  );
}
App.whyDidYouRender = true;
