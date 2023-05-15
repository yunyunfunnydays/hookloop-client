/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import {
  BellFilled,
  BugOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  MessageOutlined,
  PlusOutlined,
  TagOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import user1 from "@/assets/user1.svg";
import user2 from "@/assets/user2.svg";
import user3 from "@/assets/user3.svg";
import user4 from "@/assets/user4.svg";
import user5 from "@/assets/user5.svg";
import fakeImage from "@/assets/fakeImage.svg";

interface IContent {
  setCollapsed: (value: any) => void;
}

const initialData = {
  cards: [
    {
      id: "card-1",
      title: "[P03] 新增 HTTPS 憑證",
      preview: null,
      priority: "Low",
      status: "Pending",
      tags: ["P03", "bug", "new", "unknown"],
      reporter: { id: "user1", avatar: user1 },
      assignees: [
        { id: "user2", avatar: user2 },
        { id: "user3", avatar: user3 },
        { id: "user4", avatar: user4 },
        { id: "user5", avatar: user5 },
      ],
      dueDate: {
        type: "daterange",
        start: "03/17",
        end: "03/20",
      },
    },
    {
      id: "card-2",
      title: "[P03] 更改模組名稱",
      preview: { src: fakeImage, filename: "fakeImage" },
      priority: "High",
      status: "Pending",
      tags: ["P03", "bug", "new", "unknown"],
      reporter: { id: "user3", avatar: user3 },
      assignees: [
        { id: "user1", avatar: user1 },
        { id: "user2", avatar: user2 },
      ],
      dueDate: {
        type: "date",
        end: "03/04",
      },
    },
  ],
  lists: [
    {
      id: "list-1",
      title: "Pending",
      cards: ["card-1", "card-2"],
    },
    {
      id: "list-2",
      title: "In Progress",
      cards: ["card3", "card-4"],
    },
  ],
};

const CustContent = ({ setCollapsed }: IContent) => {
  return (
    <section className="flex flex-col ">
      {/* <div
        className="w-[64px] h-[64px] bg-[#F5F5F5] absolute top-0 left-0 cursor-pointer flex-center"
        onClick={() => setCollapsed((prev: any) => !prev)}
      >
        <DoubleRightOutlined />
      </div> */}
      <section className="">
        <div className="w-full h-24 bg-yellow-500" />
        <div id="lists" className="flex gap-6 items-start">
          <div id="first-list" className="min-w-[330px] px-5 py-4 bg-[#F5F5F5]">
            {/* TODO: 可以將把手擴大 cursor-grab mx-[-20px] mt-[-16px] pt-[16px] px-[20px] */}
            <div className="flex justify-between items-center">
              <span className="text-['Roboto'] font-medium text-xl text-[#262626]">Pending</span>
              <EllipsisOutlined className="text-xl cursor-pointer" />
            </div>
            <div className="text-['Roboto'] font-medium text-sm text-[#8C8C8C] mb-2">5 Cards</div>
            <div id="first-cards" className="flex flex-col gap-6 mb-4">
              {initialData.cards.map((card: any) => (
                <div id="first-card" className="py-4 px-3 bg-white">
                  {/* 小鈴鐺 */}
                  <div className="flex gap-2 text-base mb-3">
                    <div className="flex items-center gap-1 text-[#FA541C]">
                      <BellFilled />
                      <span className="text-sm"> 3</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageOutlined />
                      <span className="text-sm"> 3</span>
                    </div>
                  </div>
                  {/* 標題 */}
                  <div className="text-['Roboto'] font-bold text-base text-[#262626] mb-4">{card.title}</div>
                  {/* 預覽圖 */}
                  {card.preview && <Image src={card.preview.src} alt={card.preview.filename} className="mb-4" />}
                  {/* 優先度 */}
                  <div className="flex gap-2 mb-3">
                    {card.priority === "High" && (
                      <div className="py-0.5 px-2 bg-[#FFF1F0] border rounded border-[#CF1322]">
                        <div className="text-['Roboto'] font-medium text-sm leading-[22px] text-[#CF1322]">
                          Priority: High
                        </div>
                      </div>
                    )}
                    {card.priority === "Low" && (
                      <div className="py-0.5 px-2 bg-[#F6FFED] border rounded border-[#389E0D]">
                        <div className="text-['Roboto'] font-medium text-sm leading-[22px] text-[#389E0D]">
                          Priority: Low
                        </div>
                      </div>
                    )}
                    <div className="py-0.5 px-2 bg-[#FAFAFA] border rounded border-[#BFBFBF]">
                      <div className="text-['Roboto'] font-medium text-sm leading-[22px] text-[#595959]">
                        Status: {card.status}
                      </div>
                    </div>
                  </div>
                  {/* 標籤 */}
                  <div className="flex gap-2 flex-wrap mb-6">
                    {card.tags.map((tag: any) => {
                      if (tag === "bug") {
                        return (
                          <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']">
                            <BugOutlined className="text-[13px]" />
                            <span className="text-sm leading-[22px]">{tag}</span>
                          </div>
                        );
                      }
                      if (tag === "new") {
                        return (
                          <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']">
                            <ThunderboltOutlined className="text-[13px]" />
                            <span className="text-sm leading-[22px]">{tag}</span>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-[#F5F5F5] py-0.5 px-3 rounded-[32px] flex gap-1 text-['Roboto']">
                          <TagOutlined className="text-[13px]" />
                          <span className="text-sm leading-[22px]">{tag}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between">
                    {/* 成員 */}
                    <div className="flex space-x-[-12px]">
                      <Image
                        src={card.reporter.avatar}
                        className="h-8 w-8 rounded-full z-40 outline outline-2 outline-[#FA8C16]"
                        alt="reporter"
                      />
                      {card.assignees.map((assignee: any, index: number) => (
                        <Image
                          key={assignee.id}
                          src={assignee.avatar}
                          className={`h-8 w-8 rounded-full border border-[#D9D9D9] z-${30 - index * 10}`}
                          alt="assignee"
                        />
                      ))}
                    </div>
                    {/* 時間 */}
                    <div className="flex gap-1 text-['Roboto'] text-[14px] leading-[22px] text-[#595959]">
                      <ClockCircleOutlined />
                      {card.dueDate.type === "daterange" && (
                        <span>
                          {card.dueDate.start} - {card.dueDate.end}
                        </span>
                      )}
                      {card.dueDate.type === "date" && <span>{card.dueDate.end}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id="add-card" className="cursor-pointer">
              <PlusOutlined />
              <span> Add a card</span>
            </div>
          </div>
          <div id="second-list" className="min-w-[330px] px-5 py-4 bg-[#F5F5F5]">
            <div className="flex justify-between items-center">
              <span className="text-['Roboto'] font-medium text-xl text-[#262626]">In Progress</span>
              <EllipsisOutlined className="text-xl" />
            </div>
            <div className="text-['Roboto'] font-medium text-sm text-[#8C8C8C] mb-2">1 Card</div>
            <div id="second-cards" className="flex flex-col gap-6">
              <div id="card" className="h-[230px] bg-white" />
            </div>
          </div>
          <div id="third-list" className="min-w-[330px] px-5 py-4 bg-[#F5F5F5] pb-0">
            <div className="flex justify-between items-center">
              <span className="text-['Roboto'] font-medium text-xl text-[#262626]">Done</span>
              <EllipsisOutlined className="text-xl" />
            </div>
            <div className="text-['Roboto'] font-medium text-sm text-[#8C8C8C] mb-2">0 Cards</div>
          </div>
          <div id="add-list" className="min-w-[330px] px-5 py-4 bg-[#F5F5F5]">
            <div className="text-['Roboto'] font-medium text-base text-[#595959] cursor-pointer">
              <PlusOutlined />
              <span> Add a list</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CustContent;
