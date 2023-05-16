import React from "react";
import { Divider, Button } from "antd";
import ChooseMember from "./ChooseMember";

interface IProps {
  set_s_isShowMember: ISetStateFunction<boolean>;
}

const MemberModal: React.FC<IProps> = ({ set_s_isShowMember }) => {
  return (
    <section className="flex flex-col">
      {/* 選擇 Member的 UI component */}
      <ChooseMember />

      <Divider />

      <div className="flex justify-end gap-2">
        <Button className="text-black" onClick={() => set_s_isShowMember(false)}>
          Cancel
        </Button>
        <Button type="primary">OK</Button>
      </div>
    </section>
  );
};

export default MemberModal;
