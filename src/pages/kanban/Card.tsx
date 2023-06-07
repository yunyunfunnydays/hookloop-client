/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState, useEffect, useContext } from "react";
import type { InputRef } from "antd";
import { Modal, Input, Avatar, Tooltip } from "antd";
import { addCard } from "@/service/apis/card";
import GlobalContext from "@/Context/GlobalContext";
import { BellFilled, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Draggable } from "@hello-pangea/dnd";
import CardModal from "@/components/Card/CardModal";
import IconRenderer from "@/components/util/IconRender";
import KanbanContext from "@/Context/KanbanContext";
import CustAvatar from "@/components/util/CustAvatar";

type CardProps = {
  s_kanbanId: string;
  card: ICard;
  index: number;
};

interface CardPriorityProps {
  priority: "Medium" | "Low" | "High";
}

const CardPriority: React.FC<CardPriorityProps> = ({ priority }) => {
  const style = {
    Low: "text-[#389E0D] bg-[#F6FFED] border-[#389E0D]",
    Medium: "text-[#D46B08] bg-[#FFF7E6] border-[#D46B08]",
    High: "text-[#CF1322] bg-[#FFF1F0] border-[#CF1322]",
  };
  return (
    <span className={`rounded-md border-2 p-1 font-['Roboto'] font-medium ${style[priority]}`}>
      Priority: {priority}
    </span>
  );
};

const Card: React.FC<CardProps> = ({ s_kanbanId, card, index }) => {
  const [s_showCard, set_s_showCard] = useState(false);
  const { c_memberMap } = useContext(GlobalContext);
  // console.log("card = ", card);
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
              {card.tag?.map((item: any) => (
                <span key={item._id} className={`${item.color} rounded-[50px] px-2 py-1`}>
                  <IconRenderer iconName={item.icon} />
                  <span className="ml-2">{item.name}</span>
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
        {s_showCard === true ? <CardModal s_kanbanId={s_kanbanId} card={card} set_s_showCard={set_s_showCard} /> : null}
      </Modal>
    </>
  );
};

type AddCardProps = {
  s_kanbanId: string;
  listData: IList;
  // set_s_ListsData: ISetStateFunction<IList[]>;
};

export const AddCard: React.FC<AddCardProps> = ({ s_kanbanId, listData }) => {
  const inputRef = useRef<InputRef>(null);
  const { c_getKanbanByKey } = useContext(KanbanContext);
  const [s_isAddingCard, set_s_isAddingCard] = useState(false);
  const [s_cardName, set_s_cardName] = useState<string>("");

  useEffect(() => {
    if (s_isAddingCard && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isAddingCard]);

  const handleAddCard = () => {
    set_s_isAddingCard(true);
  };

  const handleInputEnd = async () => {
    try {
      if (s_cardName === "" || s_cardName === null) return;
      if (s_kanbanId === "" || s_kanbanId === null) return;

      const res: AxiosResponse = await addCard({
        name: s_cardName,
        kanbanId: s_kanbanId,
        listId: listData._id,
      });
      const { status, message } = res.data as IApiResponse;
      // console.log("data = ", data);
      if (status === "success") {
        // set_s_ListsData(data.listOrder);
        c_getKanbanByKey();
      } else {
        console.error(message);
      }
      set_s_cardName("");
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isAddingCard(false);
    }
  };

  return s_isAddingCard ? (
    <Input
      ref={inputRef}
      value={s_cardName}
      name="listName"
      // bordered={false}
      onChange={(e) => set_s_cardName(e.target.value)}
      onBlur={handleInputEnd}
      onPressEnter={handleInputEnd}
      // className="h-[56px] min-w-[330px] bg-red-400 px-5 py-4 text-xl font-medium text-[#262626] text-['Roboto']"
    />
  ) : (
    <div
      role="presentation"
      className="rounded-md p-2 text-base font-medium text-[#595959] hover:bg-[#d2d0d0]"
      onClick={handleAddCard}
    >
      <PlusOutlined />
      <span> Add a card</span>
    </div>
    // <div role="presentation" className="min-w-[330px] bg-[#F5F5F5] px-5 py-4" onClick={handleAddCard}>
    //   <div className="cursor-pointer text-base font-medium text-[#595959] text-['Roboto']">
    //     <PlusOutlined />
    //     <span> Add a card</span>
    //   </div>
    // </div>
  );
};

export default Card;
