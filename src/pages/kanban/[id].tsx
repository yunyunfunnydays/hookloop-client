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
import user1 from "@/assets/user1.svg";
import user2 from "@/assets/user2.svg";
import user3 from "@/assets/user3.svg";
import user4 from "@/assets/user4.svg";
import user5 from "@/assets/user5.svg";
import fakeImage from "@/assets/fakeImage.svg";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { produce } from "immer";
import { Input } from "antd";
import { useRouter } from "next/router";
import { addList, renameList } from "@/service/apis/list";
import CustLayout from "@/components/Layout";

const initialData: IData = {
  cards: {
    "card-1": {
      id: "card-1",
      title: "[P03] 新增 HTTPS 憑證",
      preview: null,
      priority: "Low",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
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
    "card-2": {
      id: "card-2",
      title: "[P03] 更改模組名稱",
      preview: { src: fakeImage, filename: "fakeImage" },
      priority: "High",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
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
    "card-3": {
      id: "card-3",
      title: "[P02] 檔案對應錯誤",
      preview: null,
      priority: "Medium",
      status: "In Progress",
      tags: [
        { id: "p02", name: "P03" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user2", avatar: user2 },
      assignees: [
        { id: "user4", avatar: user4 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "daterange",
        start: "03/17",
        end: "03/20",
      },
    },
    "card-4": {
      id: "card-4",
      title: "[P02] 選單新增<optgroup>",
      preview: {
        src: fakeImage,
        filename: "fakeImage",
      },
      priority: "High",
      status: "Done",
      tags: [
        { id: "p02", name: "P02" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user5", avatar: user5 },
      assignees: [
        { id: "user2", avatar: user2 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "date",
        end: "02/22",
      },
    },
    "card-5": {
      id: "card-5",
      title: "[P02] 檔案對應錯誤",
      preview: {
        src: fakeImage,
        filename: "fakeImage",
      },
      priority: "Low",
      status: "Done",
      tags: [
        { id: "p02", name: "P02" },
        { id: "bug", name: "bug" },
        { id: "new", name: "new" },
        { id: "unknown", name: "unknown" },
      ],
      reporter: { id: "user2", avatar: user2 },
      assignees: [
        { id: "user4", avatar: user4 },
        { id: "user3", avatar: user3 },
      ],
      dueDate: {
        type: "date",
        end: "02/13",
      },
    },
    "card-6": {
      id: "card-6",
      title: "新增 Google Maps API",
      preview: null,
      priority: "Low",
      status: "Pending",
      tags: [
        { id: "p03", name: "P03" },
        { id: "new", name: "new" },
      ],
      reporter: { id: "user1", avatar: user1 },
      assignees: [],
      dueDate: {
        type: "date",
        end: "03/30",
      },
    },
    "card-7": {
      id: "card-7",
      title: "[P01] 新增待辦事項",
      preview: null,
      priority: null,
      status: null,
      tags: [],
      reporter: null,
      assignees: [],
      dueDate: null,
    },
  },
  lists: {
    "list-1": {
      _id: "list-1",
      name: "Pending",
      cardOrder: ["card-1", "card-2"],
    },
    "list-2": {
      _id: "list-2",
      name: "In Progress",
      cardOrder: ["card-3"],
    },
    "list-3": {
      _id: "list-3",
      name: "Done",
      cardOrder: ["card-4", "card-5"],
    },
    "list-5": {
      _id: "list-5",
      name: "Private",
      cardOrder: ["card-6"],
    },
    "list-6": {
      _id: "list-6",
      name: "Private",
      cardOrder: ["card-7"],
    },
  },
  listOrder: ["list-1", "list-2", "list-3", "list-5", "list-6"],
};

interface IData {
  cards: { [key: string]: ICard };
  lists: { [key: string]: IList };
  listOrder: string[];
}

type CardProps = {
  card: ICard;
  index: number;
};
const Card: React.FC<CardProps> = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided2) => (
        <div
          id="first-card"
          className="cursor-pointer bg-white px-3 py-4"
          key={card.id}
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
          <div className="text-base font-bold text-[#262626] text-['Roboto']">{card.name}</div>
          {(card.preview || card.priority || card.tags.length > 0 || card.reporter) && <div className="mt-4" />}
          {/* 預覽圖 */}
          {card.preview && <Image src={card.preview.src} alt={card.preview.filename} className="mb-4" />}
          {/* 優先度 */}
          {card.priority && (
            <div className="mb-3 flex gap-2">
              {card.priority === "High" && (
                <div className="rounded border border-[#CF1322] bg-[#FFF1F0] px-2 py-0.5">
                  <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#CF1322] text-['Roboto']">
                    Priority:&nbsp;High
                  </div>
                </div>
              )}
              {card.priority === "Medium" && (
                <div className="rounded border border-[#D46B08] bg-[#FFF7E6] px-2 py-0.5">
                  <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#D46B08] text-['Roboto']">
                    Priority:&nbsp;Medium
                  </div>
                </div>
              )}
              {card.priority === "Low" && (
                <div className="rounded border border-[#389E0D] bg-[#F6FFED] px-2 py-0.5">
                  <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#389E0D] text-['Roboto']">
                    Priority:&nbsp;Low
                  </div>
                </div>
              )}
              <div className="rounded border border-[#BFBFBF] bg-[#FAFAFA] px-2 py-0.5">
                <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#595959] text-['Roboto']">
                  Status:&nbsp;{card.status}
                </div>
              </div>
            </div>
          )}
          {/* 標籤 */}
          {card.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {card.tags.map((tag: { id: string; name: string }) => {
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
          )}
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

const AddCard: React.FC = () => {
  return (
    <div id="add-card" className="cursor-pointer">
      <PlusOutlined />
      <span> Add a card</span>
    </div>
  );
};

type IListProps = {
  list: IList;
  cards: ICard[];
  index2: number;
  setData: React.Dispatch<IData>;
};
const List: React.FC<IListProps> = ({ list, cards, index2, setData }) => {
  const [s_isEditingList, set_s_isEditingList] = useState(false);
  const [s_newData, set_s_newData] = useState<Pick<IList, "name" | "_id">>({
    name: "",
    _id: list._id,
  });
  const inputRef = useRef<Input>(null);

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
                    <span className="grow text-xl font-medium text-[#262626] text-['Roboto']" onClick={handleEditList}>
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
                <AddCard />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

type AddListProps = {
  kanbanId: string;
  setData: React.Dispatch<IData>;
};
const AddList: React.FC<AddListProps> = ({ kanbanId, setData }) => {
  const router = useRouter();
  const inputRef = useRef<Input>(null);
  const [s_isAddingList, set_s_isAddingList] = useState(false);
  const [s_newData, set_s_newData] = useState<Pick<IList, "name" | "kanbanId">>({
    name: "",
    kanbanId: router.query.id as string,
  });

  useEffect(() => {
    if (s_isAddingList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isAddingList]);

  useEffect(() => {
    set_s_newData({
      name: "",
      kanbanId: router.query.id as string,
    });
  }, [router.query.id]);

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_s_newData({
      ...s_newData,
      name: e.target.value,
    });
  };

  const handleAddList = () => {
    set_s_isAddingList(true);
  };

  const handleInputEnd = async () => {
    try {
      if (s_newData.name === "" || s_newData.kanbanId === "") return;

      const res: AxiosResponse = await addList(s_newData);
      const { status, message, data } = res.data as IApiResponse;

      if (status === "success") {
        setData((prevData: IData) =>
          produce(prevData, (draft) => {
            draft.lists[data._id] = data;
            draft.listOrder.push(data._id);
          }),
        );
      } else {
        console.error(message);
      }
      set_s_newData({
        name: "",
        kanbanId,
      });
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isAddingList(false);
    }
  };

  return s_isAddingList ? (
    <Input
      ref={inputRef}
      value={s_newData.name}
      name="listName"
      bordered={false}
      onChange={handleListNameChange}
      onBlur={handleInputEnd}
      onPressEnter={handleInputEnd}
      className="h-[56px] min-w-[330px] bg-[#F5F5F5] px-5 py-4 text-xl font-medium text-[#262626] text-['Roboto']"
    />
  ) : (
    <div className="min-w-[330px] bg-[#F5F5F5] px-5 py-4" onClick={handleAddList}>
      <div className="cursor-pointer text-base font-medium text-[#595959] text-['Roboto']">
        <PlusOutlined />
        <span> Add a list</span>
      </div>
    </div>
  );
};

const Kanban: React.FC = () => {
  const [data, setData] = useState<IData>(initialData);
  const router = useRouter();
  const kanbanId = router.query.id;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // 沒有任何移動
    if (!destination) {
      console.info("沒有任何移動");
      return;
    }

    // 移動到原本的位置
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      console.info("移動到原本的位置");
      return;
    }

    if (type === "card") {
      setData((prevData) =>
        produce(prevData, (draft) => {
          draft.lists[source.droppableId].cardOrder.splice(source.index, 1);
          draft.lists[destination.droppableId].cardOrder.splice(destination.index, 0, draggableId);
        }),
      );
    } else if (type === "list") {
      setData((prevData) =>
        produce(prevData, (draft) => {
          draft.listOrder.splice(source.index, 1);
          draft.listOrder.splice(destination.index, 0, draggableId);
        }),
      );
    }
  };

  // line 477 新增 mt-[64px] overflow-x-auto
  return (
    <CustLayout>
      <section className="flex flex-col">
        <div className="flex h-24 w-full justify-end bg-yellow-500">test</div>
        <section className="h-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {(provided) => (
                <div className="flex items-start space-x-6" ref={provided.innerRef} {...provided.droppableProps}>
                  {data.listOrder.map((listId: string, index2: number) => {
                    const list = data.lists[listId];
                    const cards = list.cardOrder.map((cardId: string) => data.cards[cardId]);
                    return <List key={list._id} list={list} cards={cards} index2={index2} setData={setData} />;
                  })}
                  {provided.placeholder}
                  <AddList kanbanId={kanbanId} setData={setData} />
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
