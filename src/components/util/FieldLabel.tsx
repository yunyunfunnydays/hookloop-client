import React from "react";

interface IFieldProps {
  children: React.ReactNode;
}
// 可編輯欄位的 label
const FieldLabel: React.FC<IFieldProps> = ({ children }) => (
  <span className="text-base font-medium text-[#8C8C8C]">{children}</span>
);

export default FieldLabel;
