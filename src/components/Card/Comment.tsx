/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from "react";
import { Avatar } from "antd";
import dayjs from "dayjs";

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
              {/* <Image src={User2} className="w-8 h-8" alt="user2" /> */}
              <Avatar size={36} className="bg-gray-200" src={item.userId?.avatar.length > 0 && item.userId?.avatar}>
                {item.userId?.avatar.length === 0 ? item.userId?.username[0] : null}
              </Avatar>
              <span>{item.userId?.username || ""}</span>
            </h5>
            <text className="text-sm font-normal text-[#8C8C8C]">
              {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm")}
            </text>
          </section>

          <section className="border border-[#D9D9D9] p-2">{item.currentComment}</section>
        </div>
      ))}
      {/* <div className="flex flex-col gap-1">
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
      </div> */}
    </div>
  );
};

export default Comment;
