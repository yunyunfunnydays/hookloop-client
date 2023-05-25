import React from "react";
import Image from "next/image";
import { Input, Button } from "antd";
// image
import User1 from "@/assets/user1.svg";
// component
import Comment from "./Comment";

const CommentList = () => {
  return (
    <div className="flex flex-col">
      {/* 輸入 comment 的位置 */}
      <section className="w-full flex items-center gap-2">
        <Image src={User1} className="w-8 h-8" alt="user1" />
        <Input className="flex-1" placeholder="Write a comment..." />
        <Button size="large" className="text-black font-medium">
          Send
        </Button>
      </section>

      <section className="w-full pt-5 flex flex-col gap-3">
        <Comment />
      </section>
    </div>
  );
};

export default CommentList;
