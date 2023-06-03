/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useRouter } from "next/router";
import { moveCard, addCard } from "@/service/apis/card";
import { getKanban, getTags } from "@/service/apis/kanban";
import { addList, moveList, renameList } from "@/service/apis/list";
import CustLayout from "@/components/Layout";
import List, { AddList } from "./List";
import Filter from "./Filter";
// context
import KanbanContext from "../../Context/KanbanContext";

const Kanban: React.FC = () => {
  const router = useRouter();
  // const [s_ListsData, set_s_ListsData] = useState<IListsCards>(initialListsCards);
  const [s_ListsData, set_s_ListsData] = useState<IList[]>([]);
  const [s_kanbanId, set_s_kanbanId] = useState("");
  const [s_kanbanKey, set_s_kanbanKey] = useState("");
  const [c_Tags, set_c_Tags] = useState<ITag[]>([]);
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

        // 在同一個list移動
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
        console.log({
          newListId: destination.droppableId,
          oldListId: source.droppableId,
          newCardOrder: new_destination?.map((item) => item._id) || [],
          oldCardOrder: new_source?.map((item) => item._id) || [],
        });
        // return;
        const res: AxiosResponse = await moveCard({
          newListId: destination.droppableId,
          oldListId: source.droppableId,
          newCardOrder: new_destination?.map((item) => item._id) || [],
          oldCardOrder: new_source?.map((item) => item._id) || [],
        });
        const { status } = res.data as IApiResponse;
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

  const c_getAllTags = async (kanbanId = "") => {
    if (!kanbanId) return;
    const res: AxiosResponse = await getTags(s_kanbanId);
    const { status, data } = res.data as IApiResponse;
    if (status === "success") {
      console.log("Tags = ", data);
      set_c_Tags(data);
    }
  };
  // const c_getAllTags = useCallback(async (kanbanId = "") => {
  //   if (!kanbanId) return;
  //   const res: AxiosResponse = await getTags(s_kanbanId);
  //   const { status, data } = res.data as IApiResponse;
  //   if (status === "success") {
  //     // console.log("Tags = ", data);
  //     set_c_Tags(data);
  //   }
  // }, []);

  useEffect(() => {
    set_s_kanbanKey(router.query.id as string);
  }, [router.query.id]);

  useEffect(() => {
    // console.log("s_kanbanKey = ", s_kanbanKey);
    const call_getKanbanLists = async () => {
      if (!s_kanbanKey) return;
      const res: AxiosResponse = await getKanban(s_kanbanKey);
      const { status, data } = res.data as IApiResponse;
      if (status === "success") {
        // set_s_allComments(data);
        console.log("data = ", data);
        set_s_ListsData(data.listOrder);
        set_s_kanbanId(data._id);
      }
    };
    call_getKanbanLists();
  }, [s_kanbanKey]);

  useEffect(() => {
    c_getAllTags(s_kanbanId);
  }, [s_kanbanId]);

  // console.log("s_ListsData = ", s_ListsData);
  const contextValue = useMemo(() => ({ c_Tags, set_c_Tags, c_getAllTags }), [c_Tags, set_c_Tags, c_getAllTags]);
  return (
    <CustLayout>
      <KanbanContext.Provider value={contextValue}>
        <section className="h-full">
          <Filter />
          <section className="">
            <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
              <Droppable droppableId="all-lists" direction="horizontal" type="list">
                {(provided) => (
                  <div
                    className="flex items-start space-x-6 overflow-auto"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {s_ListsData?.map((listData: IList, index: number) => {
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
      </KanbanContext.Provider>
    </CustLayout>
  );
};

export default Kanban;
