import React, { useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
// logo
import logo from "@/assets/logo.svg";
// component
import Login from "../Login";

// login 完成後關閉彈窗
// 倒轉至 dashboard
// Header判斷有無token

const Header: React.FC = () => {
  // rwd 時控制要不要出現選單
  const [s_showList, set_s_showList] = useState(false);
  // 控制要不要顯示 Login 組件
  const [s_showLogin, set_s_showLogin] = useState(false);
  // Header 上按鈕的基礎樣式
  const BTN_STYLE = "h-[32px] w-[105px] font-bold";
  // 關閉 Login 組件時執行
  const closeLogin = (): void => {
    set_s_showLogin(false);
  };

  return (
    <header className="relative box-border h-[80px] mx-[24px] border-b-[1px] flex justify-between items-center">
      <Image src={logo} alt="HOOK LOOP" />

      <div className="hidden md:flex gap-[24px]">
        <Button className={`${BTN_STYLE} text-black`} onClick={() => set_s_showLogin(true)}>
          Log in
        </Button>
        <Button type="primary" className={BTN_STYLE}>
          Get Start
        </Button>
      </div>

      <div className="md:hidden">
        <MenuOutlined onClick={() => set_s_showList(!s_showList)} className="text-[28px] cursor-pointer" />
      </div>

      {/* <div className={`h-[80px] w-full absolute ${s_showList ? "top-[80px]" : "top-[-80px]"}`}>
        <Button className={BTN_STYLE} onClick={() => set_s_showLogin(true)}>
          Log in
        </Button>
        <Button type="primary" className={BTN_STYLE}>
          Get Start
        </Button>
      </div> */}

      <Login open={s_showLogin} close={closeLogin} />
    </header>
  );
};

export default Header;
