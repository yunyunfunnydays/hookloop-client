import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { Drawer, Spin, message } from "antd";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import useWebSocket from "react-use-websocket";
import { produce } from "immer";

import { moveCard } from "@/service/apis/card";
import { getKanbanByKey, getTags } from "@/service/apis/kanban";
import { moveList } from "@/service/apis/list";
import { AddList, List, Filter, FilterContainer } from "@/components/Kanban";
import { queryTypeInitValue } from "@/components/util/initValue";
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
  const [c_Tags, set_c_Tags] = useState<ITagRecord>({});
  const [s_open, set_s_open] = useState(false);
  const [c_query, set_c_query] = useState<IqueryType>(queryTypeInitValue);
  const [c_clearMode, set_c_clearMode] = useState(false);

  const c_getAllTags = async (kanbanId = "") => {
    if (!kanbanId) return;
    const res: AxiosResponse = await getTags(kanbanId);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      if (data.length === 0) return;
      const tmp_tags = (data as ITag[]).reduce((prev: ITagRecord, curr) => {
        if (!curr._id) return prev;
        prev[curr._id] = curr;
        return prev;
      }, {});
      set_c_Tags(tmp_tags);
    }
  };

  const c_getKanbanByKey = async () => {
    try {
      if (!s_kanbanKey) return;
      set_s_spinning(true);
      const res: AxiosResponse = await getKanbanByKey(s_kanbanKey);
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        set_c_listData(data.listOrder);
        set_c_kanbanId(data._id);
        c_getAllTags(data._id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      set_s_spinning(false);
    }
  };

  const handleDragEnd = async (dropResult: DropResult) => {
    try {
      const { destination, source, type } = dropResult;

      if (!destination) return;

      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const prev_c_listData = c_listData;

      if (type === "card") {
        const new_c_listData = produce(c_listData, (draft) => {
          const sourceList = draft.find((list) => list._id === source.droppableId);
          const destinationList = draft.find((list) => list._id === destination.droppableId);

          if (sourceList && destinationList) {
            const card = sourceList.cardOrder.splice(source.index, 1)[0];
            destinationList.cardOrder.splice(destination.index, 0, card);

            moveCard({
              kanbanId: c_kanbanId,
              newListId: destination.droppableId,
              oldListId: source.droppableId,
              newCardOrder: destinationList.cardOrder.map((item) => item._id),
              oldCardOrder: sourceList.cardOrder.map((item) => item._id),
              socketData: draft,
            })
              .then((res) => {
                if (res.data.status !== "success") {
                  set_c_listData(prev_c_listData);
                  message.error("Update card failed");
                }
              })
              .catch((errorInfo) => {
                set_c_listData(prev_c_listData);
                console.error(errorInfo);
                message.error("Update card failed");
              });
          }
        });

        set_c_listData(new_c_listData);
      } else if (type === "list") {
        const new_c_listData = produce(c_listData, (draft) => {
          const [moved] = draft.splice(source.index, 1);
          draft.splice(destination.index, 0, moved);

          moveList({
            kanbanId: c_kanbanId,
            listOrder: draft.map((listData: IList) => listData._id),
          })
            .then((res) => {
              if (res.data.status !== "success") {
                set_c_listData(prev_c_listData);
                message.error("Update list failed");
              }
            })
            .catch((errorInfo) => {
              set_c_listData(prev_c_listData);
              console.error(errorInfo);
              message.error("Update list failed");
            });
        });

        set_c_listData(new_c_listData);
      }
    } catch (errorInfo) {
      console.error(errorInfo);
    }
  };

  // connect websocket
  useEffect(() => {
    sendMessage(JSON.stringify({ type: "enterKanban", id: c_kanbanId }));

    return () => {
      sendMessage(JSON.stringify({ type: "leaveKanban", id: c_kanbanId }));
    };
  }, [c_kanbanId]);

  useEffect(() => {
    if (!lastMessage || !lastMessage.data) return;
    const data = JSON.parse(lastMessage.data);

    if (data.type === "moveList") {
      set_c_listData(data.result.listOrder);
    } else if (data.type === "createList") {
      // TODO: CreateList
      c_getKanbanByKey();
    } else if (data.type === "renameList") {
      set_c_listData(data.result);
    } else if (data.type === "createCard") {
      // TODO: CreateCard
      c_getKanbanByKey();
    } else if (data.type === "moveCard") {
      set_c_listData(data.result);
    } else if (data.type === "renameCard") {
      // TODO: RenameCard
      c_getKanbanByKey();
    } else {
      console.error("socket: 不明 socket 事件");
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
      c_query,
      set_c_Tags,
      c_getAllTags,
      c_getKanbanByKey,
      c_kanbanId,
      c_listData,
      set_c_listData,
      sendMessage,
      lastMessage,
      c_clearMode,
      set_c_clearMode,
    }),
    [c_Tags, set_c_Tags, c_getAllTags, c_getKanbanByKey, c_kanbanId, c_listData, set_c_listData],
  );
  return (
    <CustLayout>
      <KanbanContext.Provider value={contextValue}>
        <Spin spinning={s_spinning}>
          <section id="board" className="h-[calc(100vh_-_80px)] overflow-y-hidden">
            <Filter set_s_open={set_s_open} />
            <section className="">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="all-lists" direction="horizontal" type="list">
                  {(provided) => (
                    <div className="flex items-start space-x-6" ref={provided.innerRef} {...provided.droppableProps}>
                      {c_listData?.map((list: IList, index: number) => (
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
