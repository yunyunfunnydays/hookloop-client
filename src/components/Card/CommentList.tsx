import React, { useContext } from "react";
// import Image from "next/image";
import { Input, Button, Avatar } from "antd";
// // image
// import User1 from "@/assets/user1.svg";
// context
import GlobalContext from "@/Context/GlobalContext";
// component
import Comment from "./Comment";

const CommentList = () => {
  const { c_user } = useContext(GlobalContext);

  return (
    <div className="flex flex-col">
      {/* 輸入 comment 的位置 */}
      <section className="w-full flex items-center gap-2">
        {/* <Image src={User1} className="w-8 h-8" alt="user1" /> */}
        <Avatar
          size={36}
          // src={c_user.avatar.length > 0 && <Image width={32} height={32} src={c_user.avatar} alt="user1" />}
          className="bg-gray-200"
          src={c_user.avatar.length > 0 && c_user.avatar}
        >
          {c_user?.avatar.length === 0 ? c_user.username[0] : null}
        </Avatar>

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
