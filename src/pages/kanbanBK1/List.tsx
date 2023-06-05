import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Card from "./Card";

interface ListProps {
  list: IList1;
  lists: IList1[];
  setLists: ISetStateFunction<IList1>;
  moveCard: (dragIndex: number, hoverIndex: number, sourceList: string, targetList: string) => void;
  moveList: (dragId: string, hoverId: string) => void;
}

const List: React.FC<ListProps> = ({ list, lists, setLists, moveCard, moveList }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ["card", "list"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    drop: (item: IDragItem, monitor) => {
      if (item.type === "card") {
        // moveCard(item.currentCardIndex!, list.cards.length, item._id, list.id);
      }

      if (item.type === "list") {
        // moveList(item.id, list.id);
      }
    },
    hover(item: IDragItem, monitor) {
      // console.log("item = ", item);
      if (item.type === "card") {
        if (item.listId !== list.id) {
          console.log("X 在不同list拖動 X");
        }
        // console.log("monitor = ", monitor);
        // moveCard(item.currentCardIndex!, list.cards.length, item._id, list.id);
      }
      if (!ref.current) {
        return;
      }

      if (item.type === "list") {
        moveList(item.id, list.id);
      }
    },
  });

  const [collected, drag] = useDrag(() => ({
    type: "list",
    item: {
      id: list.id,
      type: "list",
      currentListId: list.id,
    },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));
  // console.log("collected.isDragging = ", collected.isDragging);
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`flex h-full w-[300px] shrink-0 flex-col gap-3 bg-[#F5F5F5] p-5 transition-all duration-300
        ${collected.isDragging ? "z-50 bg-red-500" : "opacity-100"}
      `}
    >
      {/* 在拖拽预览中也使用同一个组件 */}
      <section className={`flex h-full w-full flex-col gap-3 ${collected.isDragging ? "hidden" : "block"}`}>
        {list.cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            index={index}
            lists={lists}
            setLists={setLists}
            moveCard={moveCard}
            listId={list.id}
          />
        ))}
      </section>
    </div>
  );
};

export default List;
