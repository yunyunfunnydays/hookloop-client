import React from "react";

type PriorityProps = {
  priority: "Low" | "Medium" | "High";
};

const PriorityBadge: React.FC<PriorityProps> = ({ priority }) => {
  if (priority === "High") {
    return (
      <div className="rounded border border-[#CF1322] bg-[#FFF1F0] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#CF1322] text-['Roboto']">
          Priority:&nbsp;High
        </div>
      </div>
    );
  }
  if (priority === "Medium") {
    return (
      <div className="rounded border border-[#D46B08] bg-[#FFF7E6] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#D46B08] text-['Roboto']">
          Priority:&nbsp;Medium
        </div>
      </div>
    );
  }
  if (priority === "Low") {
    return (
      <div className="rounded border border-[#389E0D] bg-[#F6FFED] px-2 py-0.5">
        <div className="whitespace-nowrap text-[14px] font-medium leading-[22px] tracking-tight text-[#389E0D] text-['Roboto']">
          Priority:&nbsp;Low
        </div>
      </div>
    );
  }
  return null;
};

export default PriorityBadge;
