import React from "react";
import Image from "next/image";
// import { Input, Button } from "antd";
// image
import User2 from "@/assets/user2.svg";
import User3 from "@/assets/user3.svg";

const Comment = () => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <section className="flex justify-between items-center">
          <h5 className="text-base font-bold flex items-center gap-1">
            <Image src={User2} className="w-8 h-8" alt="user2" />
            <span>Jane</span>
          </h5>
          <text className="text-sm font-normal text-[#8C8C8C]">2023/03/19 03:20</text>
        </section>

        <section className="border border-[#D9D9D9] p-2">
          A design system for enterprise-level products. Create an efficient and enjoyable work experience.
        </section>
      </div>
      <div className="flex flex-col gap-1">
        <section className="flex justify-between items-center">
          <h5 className="text-base font-bold flex items-center gap-1">
            <Image src={User3} className="w-8 h-8" alt="User3" />
            <span>Jane</span>
          </h5>
          <text className="text-sm font-normal text-[#8C8C8C]">2023/03/19 03:20</text>
        </section>

        <section className="border border-[#D9D9D9] p-2">
          A design system for enterprise-level products. Create an efficient and enjoyable work experience.
        </section>
      </div>
    </>
  );
};

export default Comment;
