import React, { useEffect } from "react";
import { Divider, Button } from "antd";
// api
import { getUsers } from "@/service/api";
import ChooseMember from "./ChooseMember";

interface IProps {
  set_s_isShowMember: ISetStateFunction<boolean>;
}

const MemberModal: React.FC<IProps> = ({ set_s_isShowMember }) => {
  // 取得使用者資料
  const call_getUsers = async (userID = "") => {
    const res: AxiosResponse = await getUsers(userID);
    const { status } = res.data as IApiResponse;
    if (status === "success") {
      // console.log(data);
    }
  };

  useEffect(() => {
    call_getUsers();
  }, []);

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
