/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { Grid, Button, Avatar, Switch } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined, NotificationOutlined } from "@ant-design/icons";
// API
import { verifyUserToken } from "@/service/api";
// logo
import logo_white from "@/assets/logo_white.svg";
import logo_black from "@/assets/logo_black.svg";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import Login from "../Login";

const Header: React.FC = () => {
  const { c_user, set_c_user } = useContext(GlobalContext);
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  // rwd 時控制要不要出現選單
  const [s_showMenu, set_s_showMenu] = useState(false);
  // 控制要不要顯示 Login 組件
  const [s_showLogin, set_s_showLogin] = useState(false);

  // Header 上按鈕的基礎樣式
  const BTN_STYLE = "h-[32px] w-[105px] font-bold";

  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };
  // click 漢堡選單的事件
  const toggle = (): void => {
    set_s_showMenu(!s_showMenu);
  };

  // // 第一次渲染判斷 token 是否過期並取得登入人員資訊
  useEffect(() => {
    (async () => {
      if (s_showLogin) return;
      // step1 调用API检查token是否过期
      const res: AxiosResponse = await verifyUserToken();
      const { status, data } = res.data as IApiResponse;
      const currentPath = router.pathname;
      if (status === "success") {
        if (currentPath === "/") {
          Router.push("dashboard");
        }
        set_c_user(data);
        return;
      }
      if (currentPath !== "/") {
        Router.push("/");
      }
      set_c_user({} as IUser);
    })();
  }, [s_showLogin, router.asPath]);

  // 螢幕變成md以上的尺寸時替使用者關閉漢堡選單
  useEffect(() => {
    if (screens.md && s_showMenu) {
      set_s_showMenu(false);
    }
  }, [screens]);

  // 切換 px-[25px] 跟 mx-[25px] 是要符合設計師版型
  return (
    <header
      className={`
      box-border h-[80px] border-b-[1px] 
      flex justify-between items-center
      ${c_user ? "bg-[#262626] px-[25px]" : "bg-white mx-[25px]"}
    `}
    >
      <Image
        src={c_user ? logo_white : logo_black}
        alt="HOOK LOOP"
        className="cursor-pointer"
        onClick={() => Router.push("/dashboard")}
      />

      {c_user ? (
        <div className="flex items-center gap-[24px]">
          <Switch className="bg-[#434343] w-[42px] h-[22px]" />
          <NotificationOutlined className="text-white" style={{ fontSize: 28 }} />
          <Avatar
            className="bg-white text-black cursor-pointer"
            size={32}
            onClick={() => Router.push("profile")}
            icon={<UserOutlined />}
          />
        </div>
      ) : (
        <>
          {/* 大尺寸螢幕使用的 menu */}
          <div className="hidden md:flex gap-[24px]">
            <Button className={`${BTN_STYLE} text-black`} onClick={() => set_s_showLogin(true)}>
              Log in
            </Button>
            <Button type="primary" className={BTN_STYLE}>
              Get Start
            </Button>
          </div>

          {/* 漢堡選單 */}
          <div className="md:hidden">
            {s_showMenu ? (
              <CloseOutlined onClick={toggle} className="text-[28px] cursor-pointer" />
            ) : (
              <MenuOutlined onClick={toggle} className="text-[28px] cursor-pointer" />
            )}
          </div>

          {/* 小尺寸螢幕使用的 menu */}
          <section
            className={`${
              s_showMenu ? "visibile bg-opacity-20" : "invisible bg-opacity-0"
            } h-screen fixed top-[80px] left-0 right-0 bg-[#262626] transition-all`}
          >
            <div
              className={`bg-white flex justify-end items-center gap-[24px] pr-[24px] overflow-hidden transition-all ${
                s_showMenu ? "h-[80px]" : "h-[0px]"
              }`}
            >
              <Button className={`${BTN_STYLE} text-black`} onClick={() => set_s_showLogin(true)}>
                Log in
              </Button>
              <Button type="primary" className={BTN_STYLE}>
                Get Start
              </Button>
            </div>
          </section>
        </>
      )}

      {/* 登入的彈窗 */}
      <Login open={s_showLogin} close={closeLogin} />
    </header>
  );
};

export default Header;
