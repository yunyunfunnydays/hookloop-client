/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Drawer, Spin, Button } from "antd";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import useWebSocket from "react-use-websocket";

import { moveCard } from "@/service/apis/card";
import { getKanbanByKey, getTags } from "@/service/apis/kanban";
import { moveList } from "@/service/apis/list";
import { AddList, List, Filter, FilterContainer } from "@/components/Kanban";
import CustLayout from "@/components/Layout";
// context
import KanbanContext from "../../Context/KanbanContext";

const Kanban: React.FC = () => {
  const router = useRouter();
  const wsUrl = process.env.wsUrl!;
  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);
  // const [s_listData, set_s_listData] = useState<IListsCards>(initialListsCards);
  const [s_listData, set_s_listData] = useState<IList[]>([]);
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

      set_s_listData(data.listOrder);
      set_c_kanbanId(data._id);

      c_getAllTags(data._id);
      set_s_spinning(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
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
        // console.log("s_listData = ", s_listData);
        // console.log("source = ", source);
        // console.log("destination = ", destination);
        // console.log("result = ", result);

        // 在同一個list移動
        if (source.droppableId === destination.droppableId) {
          const new_source = s_listData.find((listData) => listData._id === source.droppableId)?.cardOrder;
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
          c_getKanbanByKey();
          return;
        }
        const new_source = s_listData.find((listData) => listData._id === source.droppableId)?.cardOrder;
        // const target = new_source?.splice(source.index, 1)[0]; // 這裡應該使用 source.index，而不是 droppableId
        const new_destination = s_listData.find((listData) => listData._id === destination.droppableId)?.cardOrder;
        if (new_source && new_destination) {
          const target = new_source.splice(source.index, 1)[0];
          new_destination.splice(destination.index, 0, target);
        }

        // new_destination?.splice(destination.index, 0, target); // 這裡應該使用 destination.index，而不是 droppableId
        // console.log({
        //   newListId: destination.droppableId,
        //   oldListId: source.droppableId,
        //   newCardOrder: new_destination?.map((item) => item.name) || [],
        //   oldCardOrder: new_source?.map((item) => item.name) || [],
        // });
        // return;
        set_s_spinning(true);
        const res: AxiosResponse = await moveCard({
          newListId: destination.droppableId,
          oldListId: source.droppableId,
          newCardOrder: new_destination?.map((item) => item._id) || [],
          oldCardOrder: new_source?.map((item) => item._id) || [],
        });
        const { status } = res.data as IApiResponse;
        c_getKanbanByKey();
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
        const new_s_ListsData = JSON.parse(JSON.stringify(s_listData));

        [new_s_ListsData[source.index], new_s_ListsData[destination.index]] = [
          new_s_ListsData[destination.index],
          new_s_ListsData[source.index],
        ];
        // return;
        set_s_spinning(true);
        const res: AxiosResponse = await moveList({
          kanbanId: c_kanbanId,
          listOrder: new_s_ListsData.map((listData: IList) => listData._id),
        });
        const { status, data } = res.data as IApiResponse;

        if (status !== "success") return;
        console.log("data.listOrder = ", data.listOrder);
        // set_s_listData(data.listOrder);
        // c_getKanbanByKey();
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
      set_s_listData(data.result.listOrder);
    } else if (data.type === "createList") {
      console.log("socket: createList");
      // 更新 list
      // set_s_listData((prev) => [...prev, data.result]);
      // 上面會少了 key
    } else if (data.type === "renameList") {
      console.log("socket: renameList");
    } else if (data.type === "createCard") {
      c_getKanbanByKey();
    } else if (data.type === "moveCard") {
      console.log("socket: moveCard");
    } else if (data.type === "renameCard") {
      console.log("socket: renameCard");
    } else {
      console.log("socket: 不明 socket 事件");
    }
    set_s_spinning(false);
  }, [lastMessage]);

  useEffect(() => {
    set_s_kanbanKey(router.query.id as string);
  }, [router.query.id]);

  useEffect(() => {
    c_getKanbanByKey();
  }, [s_kanbanKey]);

  const contextValue = useMemo(
    () => ({ c_Tags, set_c_Tags, c_getAllTags, c_getKanbanByKey, c_kanbanId, sendMessage, lastMessage }),
    [c_Tags, set_c_Tags, c_getAllTags, c_getKanbanByKey, c_kanbanId],
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
                      {s_listData.map((list: IList, index: number) => (
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
