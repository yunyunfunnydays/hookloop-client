/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useCallback, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CustLayout from "@/components/Layout";
import Filter from "./Filter";
import List from "./List";

const Kanban: React.FC = () => {
  const [lists, setLists] = useState<IList1[]>([
    {
      id: "list-1",
      cards: [
        { id: "card-1", text: "Card 1" },
        // { id: "card-2", text: "Card 2" },
      ],
    },
    {
      id: "list-2",
      cards: [{ id: "card-2", text: "Card 2" }],
    },
    {
      id: "list-3",
      cards: [
        { id: "card-3-1", text: "Card 3-1" },
        { id: "card-3-2", text: "Card 3-2" },
        { id: "card-3-3", text: "Card 3-3" },
      ],
    },
    {
      id: "list-4",
      cards: [{ id: "card-4", text: "Card 4" }],
    },
    {
      id: "list-5",
      cards: [{ id: "card-5", text: "Card 5" }],
    },
  ]);

  // const moveCard = useCallback(
  //   (dragIndex, hoverIndex, sourceListId, targetListId) => {
  //     const newLists = JSON.parse(JSON.stringify(lists)); // deep copy
  //     const sourceListIndex = newLists.findIndex((list) => list.id === sourceListId);
  //     const targetListIndex = newLists.findIndex((list) => list.id === targetListId);
  //     const dragCard = newLists[sourceListIndex].cards[dragIndex];

  //     newLists[sourceListIndex].cards.splice(dragIndex, 1);

  //     if (sourceListId === targetListId) {
  //       newLists[sourceListIndex].cards.splice(hoverIndex, 0, dragCard);
  //     } else {
  //       newLists[targetListIndex].cards.splice(hoverIndex, 0, dragCard);
  //     }

  //     setLists(newLists);
  //   },
  //   [lists],
  // );
  const moveCard = useCallback((item, nowIndex) => {
    setLists((prev) => {
      const newLists = JSON.parse(JSON.stringify(prev)); // deep copy
      const sourceList = newLists.find((list: IList1) => list.id === item.listId);
      const sourceListIndex = newLists.findIndex((list: IList1) => list.id === item.listId);

      // Swap the cards
      [sourceList.cards[item.index], sourceList.cards[nowIndex]] = [
        sourceList.cards[nowIndex],
        sourceList.cards[item.index],
      ];

      newLists[sourceListIndex] = sourceList;

      return newLists;
    });

    // Update the index of the dragged item
  }, []);

  const moveList = (dragId: string, hoverId: string) => {
    const newLists = JSON.parse(JSON.stringify(lists)); // deep copy
    const dragIndex = newLists.findIndex((list: IList1) => list.id === dragId);
    const hoverIndex = newLists.findIndex((list: IList1) => list.id === hoverId);
    const dragList = newLists[dragIndex];

    newLists.splice(dragIndex, 1);
    newLists.splice(hoverIndex, 0, dragList);

    setLists(newLists);
  };
  useEffect(() => {
    console.log("lists = ", lists);
  }, [lists]);
  return (
    <CustLayout>
      <section className="flex h-full flex-col">
        <Filter />
        <DndProvider backend={HTML5Backend}>
          <div className="flex h-full w-full gap-5 overflow-x-auto bg-red-100 transition-all duration-500">
            {lists.map((list) => (
              <List
                key={list.id}
                list={list}
                lists={lists}
                setLists={setLists}
                moveCard={moveCard}
                moveList={moveList}
              />
            ))}
          </div>
        </DndProvider>
      </section>
    </CustLayout>
  );
};

export default Kanban;
