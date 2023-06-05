/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from "react";
// import { Avatar } from "antd";
import dayjs from "dayjs";
import CustAvatar from "@/components/util/CustAvatar";

interface IProps {
  comments: Icomment[];
}

const Comment: React.FC<IProps> = ({ comments }) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (divRef.current !== null) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [comments]);
  return (
    <div ref={divRef} className="flex h-[200px] flex-col gap-3 overflow-auto">
      {comments?.map((item) => (
        <div key={item._id} className="flex flex-col gap-1">
          <section className="flex items-center justify-between">
            <h5 className="flex items-center gap-1 text-base font-bold">
              {/* <Avatar size={36} className="bg-gray-200" src={item.userId?.avatar.length > 0 && item.userId?.avatar}>
                {item.userId?.avatar.length === 0 ? item.userId?.username[0] : null}
              </Avatar> */}
              <CustAvatar info={item.userId} />
              <span>{item.userId?.username || ""}</span>
            </h5>
            <text className="text-sm font-normal text-[#8C8C8C]">
              {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
            </text>
          </section>

          <section className="border border-[#D9D9D9] p-2">{item.currentComment}</section>
        </div>
      ))}
    </div>
  );
};

export default Comment;
