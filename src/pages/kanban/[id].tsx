/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Drawer, Spin } from "antd";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import useWebSocket from "react-use-websocket";

import { moveCard } from "@/service/apis/card";
import { getKanbanByKey, getTags } from "@/service/apis/kanban";
import { moveList } from "@/service/apis/list";
import { AddList, List, Filter, FilterContainer } from "@/components/Kanban";
import CustLayout from "@/components/Layout";

import KanbanContext from "@/Context/KanbanContext";

const Kanban: React.FC = () => {
  const router = useRouter();
  const wsUrl = process.env.wsUrl!;
  const { sendMessage, lastMessage } = useWebSocket(wsUrl);
  const [c_listData, set_c_listData] = useState<IList[]>([]);
  const [c_kanbanId, set_c_kanbanId] = useState("");
  const [s_spinning, set_s_spinning] = useState(false);
  const [s_kanbanKey, set_s_kanbanKey] = useState("");
  const [c_Tags, set_c_Tags] = useState<ITag[]>([]);
  const [s_open, set_s_open] = useState(false);
  const [s_isDragging, set_s_isDragging] = useState<boolean>(false);
  const [c_query, set_c_query] = useState({});

  const handleDragStart = () => {
    set_s_isDragging(true);
  };

  const c_getAllTags = async (kanbanId = "") => {
    if (!kanbanId) return;
    const res: AxiosResponse = await getTags(kanbanId);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      set_c_Tags(data);
    }
  };

  const c_getKanbanByKey = async () => {
    if (!s_kanbanKey) return;
    set_s_spinning(true);
    const res: AxiosResponse = await getKanbanByKey(s_kanbanKey, c_query);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      // set_s_allComments(data);

      set_c_listData(data.listOrder);

      // console.log("data.listOrder", data.listOrder);
      // [
      //   {
      //     _id: "6485d557f60e78828e78074d",
      //     name: "list2",
      //     kanbanId: "6485d539f60e78828e78071c",
      //     cardOrder: [
      //       {
      //         _id: "6485d563f60e78828e780769",
      //         name: "Card 2",
      //         assignee: [],
      //         priority: "Medium",
      //         status: "Pending",
      //         tag: [],
      //         isArchived: false,
      //         cardCommentCount: 0,
      //       },
      //     ],
      //     isArchived: false,
      //     createdAt: "2023-06-11T14:08:23.765Z",
      //     updatedAt: "2023-06-11T15:02:59.446Z",
      //   },
      //   {
      //     _id: "6485d606f60e78828e7807ef",
      //     name: "list 4",
      //     kanbanId: "6485d539f60e78828e78071c",
      //     cardOrder: [
      //       {
      //         _id: "6485f6d111af2dbdfd661ea4",
      //         name: "Card 8",
      //         assignee: [],
      //         priority: "Medium",
      //         status: "Pending",
      //         tag: [],
      //         isArchived: false,
      //         actualEndDate: "2023-06-11T16:31:19.159Z",
      //         actualStartDate: "2023-06-11T16:31:19.159Z",
      //         targetEndDate: "2023-06-11T16:31:19.159Z",
      //         targetStartDate: "2023-06-11T16:31:19.159Z",
      //         cardCommentCount: 0,
      //       },
      //     ],
      //     isArchived: false,
      //     createdAt: "2023-06-11T14:11:18.142Z",
      //     updatedAt: "2023-06-11T16:31:13.267Z",
      //   },
      // ];

      set_c_kanbanId(data._id);

      c_getAllTags(data._id);
      set_s_spinning(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    console.log("result", result);
    try {
      const { destination, source, draggableId, type } = result;
      // console.log("result", result);
      // {
      //   "draggableId": "64848edccfcdf01ded2935de", 移動的元素
      //   "type": "card", 移動的類型 'card' | 'list'
      //   "source": { 移動前的位置
      //       "index": 0,
      //       "droppableId": "64844a6087532678e71e20e2"
      //   },
      //   "reason": "DROP",
      //   "mode": "FLUID",
      //   "destination": { 移動後的位置，如果沒有則為 null
      //       "droppableId": "64844a6387532678e71e20e7",
      //       "index": 0
      //   },
      //   "combine": null
      // }

      // 沒有取得到 c_kanbanId
      if (!c_kanbanId) return;

      // 沒有移動後的位置，即放的地方不是有效區域
      if (!destination) return;

      // 移動前和移動後的位置相等，不進行任何邏輯計算
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const newListData = Array.from(c_listData);

      if (type === "card") {
        const sourceList = newListData.find((list) => list._id === source.droppableId);
        const destinationList = newListData.find((list) => list._id === destination.droppableId);

        if (sourceList && destinationList) {
          const card = sourceList.cardOrder.splice(source.index, 1)[0];
          destinationList.cardOrder.splice(destination.index, 0, card);

          set_c_listData(newListData);

          moveCard({
            kanbanId: c_kanbanId,
            newListId: destination.droppableId,
            oldListId: source.droppableId,
            newCardOrder: destinationList.cardOrder.map((item) => item._id),
            oldCardOrder: sourceList.cardOrder.map((item) => item._id),
            socketData: newListData,
          });
        }
      } else if (type === "list") {
        const [removed] = newListData.splice(source.index, 1);
        newListData.splice(destination.index, 0, removed);

        set_c_listData(newListData);

        moveList({
          kanbanId: c_kanbanId,
          listOrder: newListData.map((listData: IList) => listData._id),
        });
      }
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isDragging(false);
    }
  };

  // 連接 websocket
  useEffect(() => {
    console.log(`enterKanban: ${c_kanbanId}`);
    sendMessage(JSON.stringify({ type: "enterKanban", id: c_kanbanId }));

    return () => {
      console.log(`leaveKanban: ${c_kanbanId}`);
      sendMessage(JSON.stringify({ type: "leaveKanban", id: c_kanbanId }));
    };
  }, [c_kanbanId]);

  // websocket 收到訊息時重新取得 kanban
  useEffect(() => {
    // 檢視 WebSocket 訊息
    // console.log("lastMessage: ", lastMessage?.data);

    if (!lastMessage || !lastMessage.data) return;
    const data = JSON.parse(lastMessage.data);
    console.log("=".repeat(64));
    console.log("lastMessage.data = ", data);

    if (data.type === "moveList") {
      set_c_listData(data.result.listOrder);
    } else if (data.type === "createList") {
      console.log("socket: createList");
      // 更新 list
      // set_c_listData((prev) => [...prev, data.result]);
      // 上面會少了 key
      c_getKanbanByKey();
    } else if (data.type === "renameList") {
      console.log("socket: renameList");
      c_getKanbanByKey();
    } else if (data.type === "createCard") {
      c_getKanbanByKey();
    } else if (data.type === "moveCard") {
      console.log("data.result.socketData", data.result.socketData);
      // set_c_listData(data.result.socketData);
      set_c_listData(data.result);
    } else if (data.type === "renameCard") {
      console.log("socket: renameCard");
      c_getKanbanByKey();
    } else {
      console.log("socket: 不明 socket 事件");
    }
  }, [lastMessage]);

  useEffect(() => {
    set_s_kanbanKey(router.query.id as string);
  }, [router.query.id]);

  useEffect(() => {
    c_getKanbanByKey();
  }, [s_kanbanKey]);

  const contextValue = useMemo(
    () => ({
      c_Tags,
      set_c_Tags,
      c_getAllTags,
      c_getKanbanByKey,
      c_kanbanId,
      c_listData,
      set_c_listData,
      sendMessage,
      lastMessage,
    }),
    [c_Tags, set_c_Tags, c_getAllTags, c_getKanbanByKey, c_kanbanId, c_listData, set_c_listData],
  );
  return (
    <CustLayout>
      <KanbanContext.Provider value={contextValue}>
        <Spin spinning={s_spinning}>
          <section className="h-full">
            <Filter set_s_open={set_s_open} />
            <section className="">
              <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                  {(provided) => (
                    <div className="flex items-start space-x-6" ref={provided.innerRef} {...provided.droppableProps}>
                      {c_listData.map((list: IList, index: number) => (
                        <List key={list._id} list={list} cards={list.cardOrder} index={index} />
                      ))}
                      {provided.placeholder}
                      <AddList />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Drawer
                title="Filter"
                placement="right"
                closable
                onClose={() => set_s_open(false)}
                open={s_open}
                getContainer={false}
              >
                <FilterContainer c_Tags={c_Tags} c_query={c_query} set_c_query={set_c_query} />
              </Drawer>
            </section>
          </section>
        </Spin>
      </KanbanContext.Provider>
    </CustLayout>
  );
};

export default Kanban;
