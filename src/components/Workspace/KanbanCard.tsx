import React, { useState } from "react";
import { EllipsisOutlined, StarOutlined, StarFilled, PlusOutlined } from "@ant-design/icons";

interface IKanbanCardProps {
  kanbanData: Ikanban;
}

const CARD_BASICSTYLE = "w-[210px] h-[110px] rounded cursor-pointer";
const ICON_BASICSTYLE = "text-lg transition-all hover:scale-125";

const KanbanCard: React.FC<IKanbanCardProps> = ({ kanbanData }) => {
  const [s_favorites, set_s_favorites] = useState(false);
  // 加入我的最愛 or 取消我的最愛
  const toggleFavorites = (): void => {
    set_s_favorites((prev: boolean) => !prev);
  };
  return (
    <div className={`${CARD_BASICSTYLE} px-3 py-4 flex flex-col justify-between items-end border`}>
      <div className="w-full flex justify-between">
        <p className="text-[#262626] font-medium text-base">{kanbanData.kanbanName}</p>
        <EllipsisOutlined className={ICON_BASICSTYLE} />
      </div>

      {s_favorites ? (
        <StarFilled onClick={toggleFavorites} className={`${ICON_BASICSTYLE} text-[#FFA940]`} />
      ) : (
        <StarOutlined onClick={toggleFavorites} className={ICON_BASICSTYLE} />
      )}
    </div>
  );
};

// 建立看板的UI component
export const CreateKanbanCard: React.FC = () => {
  return (
    <div className={`${CARD_BASICSTYLE} group flex-center border-dashed border-2 border-[#BFBFBF]`}>
      <PlusOutlined className="group-hover:transition-all group-hover:scale-125 text-3xl text-[#595959]" />
    </div>
  );
};

export default KanbanCard;
// export const CreateKanbanCard: React.FC = () => {
//   return (
//     // <div className={`${CARD_BASICSTYLE} group flex-center border-dashed border-2`}>
//     <div className={`${CARD_BASICSTYLE} relative group flex-center bg-gradient-to-r`}>
//       <svg className="svg-content" viewBox="0 0 100% 100%" preserveAspectRatio="none">
//         <rect
//           className="svg-rect"
//           strokeDasharray="8,8"
//           strokeOpacity="0.9"
//           x="2"
//           y="2"
//           rx="6"
//           ry="6"
//           style={{ fill: "#fff", stroke: "#000", strokeWidth: "2px", fillOpacity: "0.1" }}
//           // style="fill: #fff;stroke: #000;stroke-width: 2px;fill-opacity: 0.1;"
//         />
//         <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="25" fill="#000">
//           +
//         </text>
//       </svg>
//     </div>
//   );
// };
