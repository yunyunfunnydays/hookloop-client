import React from "react";

type CardPriorityProps = {
  priority: "Low" | "Medium" | "High";
};

const CardPriority: React.FC<CardPriorityProps> = ({ priority }) => {
  const style = {
    Low: "text-[#389E0D] bg-[#F6FFED] border-[#389E0D]",
    Medium: "text-[#D46B08] bg-[#FFF7E6] border-[#D46B08]",
    High: "text-[#CF1322] bg-[#FFF1F0] border-[#CF1322]",
  };
  return (
    <span className={`rounded-md border-2 p-1 font-['Roboto'] font-medium ${style[priority]}`}>
      Priority: {priority}
    </span>
  );
};

export default CardPriority;
