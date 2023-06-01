/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Image from "next/image";
import { Grid, Button, Avatar, Switch } from "antd";
import { MenuOutlined, CloseOutlined, UserOutlined, NotificationOutlined } from "@ant-design/icons";
// logo
import logo_white from "@/assets/logo_white.svg";
import logo_black from "@/assets/logo_black.svg";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import Login from "../Login";

const Header: React.FC = () => {
  const { c_user } = useContext(GlobalContext);

  // 判斷是否有權限
  const hasAuth = c_user?.email?.length > 0;
  // antd 用來監聽畫面寬度變化的 API
  const screens = Grid.useBreakpoint();
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
      box-border flex h-[80px] 
      items-center justify-between border-b-[1px]
      ${hasAuth ? "bg-[#262626] px-[25px]" : "mx-[25px] bg-white"}
    `}
    >
      <Image
        src={hasAuth ? logo_white : logo_black}
        alt="HOOK LOOP"
        className="cursor-pointer"
        onClick={() => Router.push("/dashboard")}
      />

      {hasAuth ? (
        <div className="flex items-center gap-[24px]">
          <Switch className="h-[22px] w-[42px] bg-[#434343]" />
          <NotificationOutlined className="text-white" style={{ fontSize: 28 }} />
          {c_user.avatar ? (
            <Image
              src={`https://cdn.filestackcontent.com/${c_user.avatar}`}
              alt="avatar"
              style={{ borderRadius: "100%" }}
              onClick={() => Router.push("profile")}
              width="45"
              height="45"
            />
          ) : (
            <Avatar
              className="cursor-pointer bg-white text-black"
              size={32}
              onClick={() => Router.push("profile")}
              icon={<UserOutlined />}
            />
          )}
        </div>
      ) : (
        <>
          {/* 大尺寸螢幕使用的 menu */}
          <div className="hidden gap-[24px] md:flex">
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
              <CloseOutlined onClick={toggle} className="cursor-pointer text-[28px]" />
            ) : (
              <MenuOutlined onClick={toggle} className="cursor-pointer text-[28px]" />
            )}
          </div>

          {/* 小尺寸螢幕使用的 menu */}
          <section
            className={`${
              s_showMenu ? "visibile bg-opacity-20" : "invisible bg-opacity-0"
            } fixed left-0 right-0 top-[80px] h-screen bg-[#262626] transition-all`}
          >
            <div
              className={`flex items-center justify-end gap-[24px] overflow-hidden bg-white pr-[24px] transition-all ${
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
