/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Grid, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
// logo
import logo from "@/assets/logo.svg";
// component
import Login from "../Login";

// login 完成後關閉彈窗
// 倒轉至 dashboard
// Header判斷有無token

const Header: React.FC = () => {
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
  const toggle = () => {
    set_s_showMenu(!s_showMenu);
  };

  useEffect(() => {
    if (screens.md && s_showMenu) {
      set_s_showMenu(false);
    }
  }, [screens]);

  return (
    <header className="box-border h-[80px] mx-[25px] border-b-[1px] flex justify-between items-center">
      <Image src={logo} alt="HOOK LOOP" />

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

      {/* 登入的彈窗 */}
      <Login open={s_showLogin} close={closeLogin} />
    </header>
  );
};

export default Header;
