import React from "react";

type PriorityBadgeProps = {
  priority: "Low" | "Medium" | "High";
};

type PriorityStyleType = {
  [K in PriorityBadgeProps["priority"]]: React.CSSProperties;
};

const priorityStyle: PriorityStyleType = {
  Low: {
    color: "#389E0D",
    backgroundColor: "#F6FFED",
    borderColor: "#389E0D",
  },
  Medium: {
    color: "#D46B08",
    backgroundColor: "#FFF7E6",
    borderColor: "#D46B08",
  },
  High: {
    color: "#CF1322",
    backgroundColor: "#FFF1F0",
    borderColor: "#CF1322",
  },
};

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const style = priorityStyle[priority];

  return (
    <div className="rounded px-2 py-0.5" style={{ backgroundColor: style.backgroundColor, borderColor: style.color }}>
      <div
        className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-['Roboto']"
        style={{ color: style.color }}
      >
        Priority:&nbsp;{priority}
      </div>
    </div>
  );
};

export default PriorityBadge;
