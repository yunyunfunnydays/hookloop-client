/* eslint-disable no-console */
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface CardProps {
  id: string;
  text: string;
  index: number;
  listId: string;
  moveCard: any;
  lists: IList1[];
  setLists: ISetStateFunction<IList1>;
}

const Card: React.FC<CardProps> = ({ moveCard, lists, setLists, id, text, index, listId }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      if (item.listId === listId) {
        console.log("index = ", index);
        console.log("item.index = ", item.index);
        if (index === item.index) return;
        console.log("O 在同一個list拖動 O");
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // console.log("hoverMiddleY = ", hoverMiddleY);
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        console.log("hoverMiddleY = ", hoverMiddleY);
        console.log("hoverClientY = ", hoverClientY);
        if (item.index < index && hoverClientY > hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (item.index > index && hoverClientY < hoverMiddleY) {
          return;
        }

        moveCard(item, index);
      }
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { id, index, type: "card", listId, currentCardIndex: index },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.2 : 1 }}
      className="h-[200px] w-full bg-orange-300"
      data-handler-id={handlerId}
    >
      {text}
    </div>
  );
};

export default Card;

// const Card: React.FC<CardProps> = ({ id, text, index, listId }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "card",
//     item: { id, type: "card", currentListId: listId, currentCardIndex: index },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   const [, drop] = useDrop({
//     accept: "card",
//     hover(item: ICard, monitor) {
//       if (!ref.current) {
//         return;
//       }

//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }

//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }

//       moveCard(dragIndex, hoverIndex, item.listId, listId);
//       item.index = hoverIndex;
//     },
//   });

//   drag(drop(ref));

//   return (
//     <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="h-[200px] w-full bg-orange-300">
//       {text}
//     </div>
//   );
// };
