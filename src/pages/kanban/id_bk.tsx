/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
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
import type { InputRef } from "antd";
// import user1 from "@/assets/user1.svg";
// import user2 from "@/assets/user2.svg";
// import user3 from "@/assets/user3.svg";
// import user4 from "@/assets/user4.svg";
// import user5 from "@/assets/user5.svg";
// import fakeImage from "@/assets/fakeImage.svg";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { produce } from "immer";
import { Input } from "antd";
import { useRouter } from "next/router";
import { moveCard, addCard } from "@/service/apis/card";
import { getKanban } from "@/service/apis/kanban";
import { addList, moveList, renameList } from "@/service/apis/list";
import CustLayout from "@/components/Layout";
import Filter from "./Filter";

type PriorityBadgeProps = {
  priority: "High" | "Medium" | "Low";
};
const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  if (priority === "High") {
    return (
      <div className="rounded border border-[#CF1322] bg-[#FFF1F0] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#CF1322] text-['Roboto']">
          Priority:&nbsp;High
        </div>
      </div>
    );
  }
  if (priority === "Medium") {
    return (
      <div className="rounded border border-[#D46B08] bg-[#FFF7E6] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#D46B08] text-['Roboto']">
          Priority:&nbsp;Medium
        </div>
      </div>
    );
  }
  if (priority === "Low") {
    return (
      <div className="rounded border border-[#389E0D] bg-[#F6FFED] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#389E0D] text-['Roboto']">
          Priority:&nbsp;Low
        </div>
      </div>
    );
  }
  return null;
};

type CardProps = {
  card: ICard;
  index: number;
};
const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={card._id} index={index} key={card._id}>
      {(provided2) => (
        <div
          id="first-card"
          role="presentation"
          className="cursor-pointer bg-white px-3 py-4"
          key={card._id}
          onClick={() => alert("123")}
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
          <div className="text-base font-bold text-[#262626]">{card.name}</div>
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
            {card.reporter && (
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
            )}
            {/* 時間 */}
            {card.dueDate && (
              <div className="flex gap-1 text-[14px] leading-[22px] text-[#595959] text-['Roboto']">
                <ClockCircleOutlined />
                {card.dueDate.type === "daterange" && (
                  <span>
                    {card.dueDate.start} - {card.dueDate.end}
                  </span>
                )}
                {card.dueDate.type === "date" && <span>{card.dueDate.end}</span>}
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

type AddCardProps = {
  s_kanbanId: string;
  listData: IList;
  set_s_ListsData: ISetStateFunction<IList[]>;
};
const AddCard: React.FC<AddCardProps> = ({ s_kanbanId, listData, set_s_ListsData }) => {
  const inputRef = useRef<InputRef>(null);
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
      const { status, message, data } = res.data as IApiResponse;
      // console.log("data = ", data);
      if (status === "success") {
        set_s_ListsData(data.listOrder);
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

type IListProps = {
  list: IList;
  s_kanbanId: string;
  cards: ICard[];
  index2: number;
  s_ListsData: IList[];
  set_s_ListsData: ISetStateFunction<IList[]>;
};

const List: React.FC<IListProps> = ({ list, s_ListsData, set_s_ListsData, cards, index2, s_kanbanId }) => {
  const [s_isEditingList, set_s_isEditingList] = useState(false);
  const [s_newData, set_s_newData] = useState<Pick<IList, "name" | "_id">>({
    name: "",
    _id: list._id,
  });
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (s_isEditingList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isEditingList]);

  const handleEditList = () => {
    set_s_newData({ name: list.name, _id: list._id });
    set_s_isEditingList(true);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_s_newData({
      ...s_newData,
      name: e.target.value,
    });
  };

  const handleInputEnd = async () => {
    try {
      if (s_newData.name === "" || s_newData._id === "") return;

      const res: AxiosResponse = await renameList(s_newData);
      const { status, message, data } = res.data as IApiResponse;

      console.log(status, message, data);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isEditingList(false);
    }
  };

  return (
    <Draggable draggableId={list._id} index={index2}>
      {(provided2) => (
        <div
          ref={provided2.innerRef}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          className="cursor-pointer"
        >
          <Droppable droppableId={list._id} type="card">
            {(provided) => (
              <div
                className="min-w-[330px] bg-[#F5F5F5] px-5 py-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* TODO: 可以將把手擴大 cursor-grab mx-[-20px] mt-[-16px] pt-[16px] px-[20px] */}
                {s_isEditingList ? (
                  <Input
                    ref={inputRef}
                    value={s_newData.name}
                    onChange={handleListNameChange}
                    onBlur={handleInputEnd}
                    onPressEnter={handleInputEnd}
                    className="h-[28px] min-w-[290px] bg-[#F5F5F5] p-0 text-xl font-medium text-[#262626] text-['Roboto']"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <span
                      role="presentation"
                      className="grow text-xl font-medium text-[#262626] text-['Roboto']"
                      onClick={handleEditList}
                    >
                      {list.name}
                    </span>
                    <EllipsisOutlined className="cursor-pointer text-xl" />
                  </div>
                )}
                <div className="mb-2 text-sm font-medium text-[#8C8C8C] text-['Roboto']">
                  {cards.length} {cards.length === 1 ? "card" : "cards"}
                </div>
                {cards.length > 0 && (
                  <div className="mb-4 flex flex-col space-y-6">
                    {cards.map((card: ICard, index: number) => (
                      <Card key={card.id} card={card} index={index} />
                    ))}
                  </div>
                )}
                {provided.placeholder}
                <AddCard s_kanbanId={s_kanbanId} listData={list} set_s_ListsData={set_s_ListsData} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

type AddListProps = {
  s_kanbanId: string;
  set_s_ListsData: ISetStateFunction<IList[]>;
};
const AddList: React.FC<AddListProps> = ({ s_kanbanId, set_s_ListsData }) => {
  const inputRef = useRef<InputRef>(null);
  const [s_isAddingList, set_s_isAddingList] = useState(false);
  const [s_listName, set_s_listName] = useState<string | null>(null);

  useEffect(() => {
    if (s_isAddingList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isAddingList]);

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_s_listName(e.target.value);
  };

  const handleAddList = () => {
    set_s_isAddingList(true);
  };

  const handleInputEnd = async () => {
    try {
      if (s_listName === "" || s_listName === null) return;
      if (s_kanbanId === "" || s_kanbanId === null) return;

      const res: AxiosResponse = await addList({
        name: s_listName,
        kanbanId: s_kanbanId,
      });
      const { status, message, data } = res.data as IApiResponse;

      if (status === "success") {
        set_s_ListsData(data.listOrder);
      } else {
        console.error(message);
      }
      set_s_listName(null);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isAddingList(false);
    }
  };

  return s_isAddingList ? (
    <Input
      ref={inputRef}
      value={s_listName || ""}
      name="listName"
      bordered={false}
      onChange={handleListNameChange}
      onBlur={handleInputEnd}
      onPressEnter={handleInputEnd}
      className="h-[56px] min-w-[330px] bg-[#F5F5F5] px-5 py-4 text-xl font-medium text-[#262626] text-['Roboto']"
    />
  ) : (
    <div role="presentation" className="min-w-[330px] bg-[#F5F5F5] px-5 py-4" onClick={handleAddList}>
      <div className="cursor-pointer text-base font-medium text-[#595959] text-['Roboto']">
        <PlusOutlined />
        <span> Add a list</span>
      </div>
    </div>
  );
};

const Kanban: React.FC = () => {
  const router = useRouter();
  // const [s_ListsData, set_s_ListsData] = useState<IListsCards>(initialListsCards);
  const [s_ListsData, set_s_ListsData] = useState<IList[]>([]);
  const [s_kanbanId, set_s_kanbanId] = useState("");
  const [s_isDragging, set_s_isDragging] = useState<boolean>(false);

  const handleDragStart = () => {
    set_s_isDragging(true);
  };
  const handleDragEnd = async (result: DropResult) => {
    try {
      const { destination, source, draggableId, type } = result;
      // designation：移動到的位置，沒有則為null：{droppableId: "6461fc9dd15e2103a1ae1f60", index: 1}
      // source：移動前的位置，沒有則為null：{droppableId: "6461fc9dd15e2103a1ae1f60", index: 0}
      // draggableId：移動的元素
      // type：移動的類型

      // 沒有取得到 s_kanbanId
      if (!s_kanbanId) return;

      // 沒有任何移動
      if (!destination) return;

      // 移動到原本的位置
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      if (type === "card") {
        // TODO: ENDPOINT cards/move，傳到後端的資料格式如下
        //   {
        //     "newListId": "64621508d474bd1535ae76d7",
        //     "oldListId": "646201bf97acc5268322d8f5",
        //     "newCardOrder":[
        //         "6462191cfc88d32944beb8e6"
        //     ],
        //     "oldCardOrder":[
        //         "646219c0fc88d32944beb8f1"
        //     ]
        // }
        console.log("s_ListsData = ", s_ListsData);
        console.log("source = ", source);
        console.log("destination = ", destination);
        console.log("result = ", result);
        // const listIds = s_ListsData.map((item) => item._id);

        // const new_destination = s_ListsData.find((listData) => listData._id === destination.droppableId)?.cardOrder;

        // moving to same list
        if (source.droppableId === destination.droppableId) {
          const new_source = s_ListsData.find((listData) => listData._id === source.droppableId)?.cardOrder;
          if (new_source) {
            [new_source[source.index], new_source[destination.index]] = [
              new_source[destination.index],
              new_source[source.index],
            ];
          }
          const res: AxiosResponse = await moveCard({
            newListId: source.droppableId,
            oldListId: source.droppableId,
            newCardOrder: new_source?.map((item) => item._id) || [],
            oldCardOrder: new_source?.map((item) => item._id) || [],
          });
          const { status } = res.data as IApiResponse;
          return;
        }
        const new_source = s_ListsData.find((listData) => listData._id === source.droppableId)?.cardOrder;
        const target = new_source?.[source.index] || {};

        // return;
        const new_destination = s_ListsData.find((listData) => listData._id === destination.droppableId)?.cardOrder;
        new_destination?.splice(destination.droppableId as unknown as number, 0, target as ICard);
        new_source?.splice(source.droppableId as unknown as number, 1);

        // const res: AxiosResponse = await moveCard({
        //   newListId: destination.droppableId,
        //   oldListId: source.droppableId,
        //   newCardOrder: s_ListsData.lists[destination.droppableId].cardOrder,
        //   oldCardOrder: s_ListsData.lists[source.droppableId].cardOrder,
        // });
        // const res: AxiosResponse = await moveCard({
        //   newListId: destination.droppableId,
        //   oldListId: source.droppableId,
        //   newCardOrder: destination.index,
        //   oldCardOrder: source.index,
        // });

        // const { status } = res.data as IApiResponse;

        // if (status !== "success") return;

        // set_s_ListsData((prevData) =>
        //   produce(prevData, (draft) => {
        //     draft.lists[source.droppableId].cardOrder.splice(source.index, 1);
        //     draft.lists[destination.droppableId].cardOrder.splice(destination.index, 0, draggableId);
        //   }),
        // );
      } else if (type === "list") {
        // TODO: ENDPOINT lists/move，傳到後端的資料格式如下
        //   {
        //     "kanbanId": "6461fc9dd15e2103a1ae1f60",
        //     "listOrder":[
        //         "646241e1d28f1972ffc34c5a",
        //         "646201bf97acc5268322d8f5",
        //         "64621508d474bd1535ae76d7"
        //     ]
        // }
        const new_s_ListsData = JSON.parse(JSON.stringify(s_ListsData));

        [new_s_ListsData[source.index], new_s_ListsData[destination.index]] = [
          new_s_ListsData[destination.index],
          new_s_ListsData[source.index],
        ];
        // return;
        const res: AxiosResponse = await moveList({
          kanbanId: s_kanbanId,
          listOrder: new_s_ListsData.map((listData: IList) => listData._id),
        });
        const { status, data } = res.data as IApiResponse;

        if (status !== "success") return;
        set_s_ListsData(data.listOrder);
      }
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isDragging(false);
    }
  };

  useEffect(() => {
    const call_getKanbanLists = async () => {
      if (!s_kanbanId) return;
      const res: AxiosResponse = await getKanban(s_kanbanId);
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        // set_s_allComments(data);
        set_s_ListsData(data.listOrder);
      }
    };
    call_getKanbanLists();
  }, [s_kanbanId]);

  useEffect(() => {
    set_s_kanbanId(router.query.id as string);
  }, [router.query.id]);
  console.log("s_ListsData = ", s_ListsData);
  return (
    <CustLayout>
      <section className="flex flex-col">
        <Filter />
        <section className="h-full">
          <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {(provided) => (
                <div className="flex items-start space-x-6" ref={provided.innerRef} {...provided.droppableProps}>
                  {s_ListsData?.map((listData: IList, index: number) => {
                    // const list = s_ListsData?.lists[listId];
                    // const cards = listData.cardOrder?.map((cardId: string) => s_ListsData.cards[cardId]);
                    return (
                      <List
                        key={listData._id}
                        list={listData}
                        cards={listData.cardOrder}
                        index2={index}
                        s_kanbanId={s_kanbanId}
                        s_ListsData={s_ListsData}
                        set_s_ListsData={set_s_ListsData}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <AddList s_kanbanId={s_kanbanId} set_s_ListsData={set_s_ListsData} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </section>
    </CustLayout>
  );
};

export default Kanban;
