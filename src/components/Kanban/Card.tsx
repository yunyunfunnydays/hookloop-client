/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState, useEffect, useContext } from "react";
import type { InputRef } from "antd";
import { Modal, Input, Avatar, Tooltip } from "antd";
import { addCard } from "@/service/apis/card";
import * as AntdIcons from "@ant-design/icons";
import GlobalContext from "@/Context/GlobalContext";
import KanbanContext from "@/Context/KanbanContext";
import { BellFilled, MessageOutlined } from "@ant-design/icons";
import { Draggable } from "@hello-pangea/dnd";
import CardPriority from "@/components/Kanban/CardPriority";
import CardModal from "@/components/Card/CardModal";
import IconRenderer from "@/components/util/IconRender";
import CustAvatar from "@/components/util/CustAvatar";

type CardProps = {
  card: ICard;
  index: number;
};

const Card: React.FC<CardProps> = ({ card, index }) => {
  const [s_showCard, set_s_showCard] = useState(false);
  const { c_memberMap } = useContext(GlobalContext);
  const { c_Tags } = useContext(KanbanContext);

  // console.log("card.tag = ", card.tag);
  if (!card) return null;
  return (
    <>
      <Draggable draggableId={card._id} index={index} key={card._id}>
        {(provided2) => (
          <div
            id="first-card"
            role="presentation"
            className="cursor-pointer bg-white px-3 py-4"
            key={card._id}
            onClick={() => set_s_showCard(true)}
            ref={provided2.innerRef}
            {...provided2.draggableProps}
            {...provided2.dragHandleProps}
          >
            {/* 小鈴鐺 */}
            <div className="mb-3 flex gap-2 text-base">
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
            <div className="mb-2 text-lg font-bold text-[#262626]">{card.name}</div>
            {/* 優先度、狀態 */}
            <div className="my-5">
              <CardPriority priority={card.priority} />
              <span className="ml-2 rounded-md border-2 border-[#BFBFBF] bg-[#F5F5F5] p-1 font-['Roboto'] font-medium text-[#595959] ">
                Status: {card.status}
              </span>
            </div>
            {/* 標籤 */}
            <div className="flex gap-2">
              {Object.keys(c_Tags).length > 0 &&
                card.tag?.map((tagId: string) => (
                  <span key={tagId} className={`${c_Tags[tagId].color} rounded-[50px] px-2 py-1`}>
                    <IconRenderer iconName={c_Tags[tagId].icon as keyof typeof AntdIcons} />
                    <span className="ml-2">{c_Tags[tagId]?.name}</span>
                  </span>
                ))}
            </div>
            <div className="mt-5 flex justify-between">
              {/* 成員 */}
              <Avatar.Group maxCount={5} size={32} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                {card.reporter && (
                  <Tooltip key={card.reporter} title={c_memberMap[card.reporter]?.username}>
                    <CustAvatar info={c_memberMap[card.reporter]} className="border-2 border-orange-400 bg-gray-200" />
                  </Tooltip>
                )}

                {card.assignee?.map((userId) => (
                  <Tooltip key={userId} title={c_memberMap[userId]?.username}>
                    <CustAvatar info={c_memberMap[userId]} />
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
            {/* {(card.preview || card.priority || card.tag.length > 0 || card.reporter) && <div className="mt-4" />} */}
            {/* 預覽圖 */}
            {/* {card.preview && <Image src={card.preview.src} alt={card.preview.filename} className="mb-4" />} */}
            {/* 優先度 */}
            {/* {card.priority && (
            <div className="mb-3 flex gap-2">
              <PriorityBadge priority={card.priority} />
              <div className="rounded border border-[#BFBFBF] bg-[#FAFAFA] px-2 py-0.5">
                <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#595959] text-['Roboto']">
                  Status:&nbsp;{card.status}
                </div>
              </div>
            </div>
          )} */}
            {/* 標籤 */}
            {/* {card.tag.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {card.tag.map((tag: { id: string; name: string }) => {
                if (tag.name === "bug") {
                  return (
                    <div className="flex gap-1 rounded-[32px] bg-[#F5F5F5] px-3 py-0.5 text-['Roboto']" key={tag.id}>
                      <BugOutlined className="text-[13px]" />
                      <span className="text-sm leading-[22px]">{tag.name}</span>
                    </div>
                  );
                }
                if (tag.name === "new") {
                  return (
                    <div className="flex gap-1 rounded-[32px] bg-[#F5F5F5] px-3 py-0.5 text-['Roboto']" key={tag.id}>
                      <ThunderboltOutlined className="text-[13px]" />
                      <span className="text-sm leading-[22px]">{tag.name}</span>
                    </div>
                  );
                }
                return (
                  <div className="flex gap-1 rounded-[32px] bg-[#F5F5F5] px-3 py-0.5 text-['Roboto']" key={tag.id}>
                    <TagOutlined className="text-[13px]" />
                    <span className="text-sm leading-[22px]">{tag.name}</span>
                  </div>
                );
              })}
            </div>
          )} */}
            <div className="flex items-center justify-between">
              {/* 成員 */}
              {/* {card.reporter && (
              <div className="flex space-x-[-12px]">
                <Image
                  src={card.reporter.avatar}
                  className="z-40 h-8 w-8 rounded-full outline outline-2 outline-[#FA8C16]"
                  alt="reporter"
                />
                {card.assignees.map((assignee: any, index2: number) => (
                  <Image
                    key={assignee.id}
                    src={assignee.avatar}
                    className="h-8 w-8 rounded-full border border-[#D9D9D9]"
                    style={{ zIndex: 30 - index2 * 10 }}
                    alt="assignee"
                  />
                ))}
              </div>
            )} */}
              {/* 時間 */}
              {/* {card.dueDate && (
              <div className="flex gap-1 text-[14px] leading-[22px] text-[#595959] text-['Roboto']">
                <ClockCircleOutlined />
                {card.dueDate.type === "daterange" && (
                  <span>
                    {card.dueDate.start} - {card.dueDate.end}
                  </span>
                )}
                {card.dueDate.type === "date" && <span>{card.dueDate.end}</span>}
              </div>
            )} */}
            </div>
          </div>
        )}
      </Draggable>
      <Modal
        title="Add Card"
        width="572px"
        open={s_showCard}
        style={{
          top: 20,
        }}
        destroyOnClose
        onCancel={() => set_s_showCard(false)}
        footer={null}
      >
        {/* {s_showCard && <CardModal set_s_showCard={set_s_showCard} />} */}
        {s_showCard === true ? <CardModal card={card} set_s_showCard={set_s_showCard} /> : null}
      </Modal>
    </>
  );
};

export default Card;
