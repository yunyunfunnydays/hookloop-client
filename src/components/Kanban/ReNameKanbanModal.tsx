import React, { useState, useContext } from "react";
import { Input, Divider, Button, Spin, message as msg } from "antd";
// context
import GlobalContext from "@/Context/GlobalContext";
// api
import { renameKanban } from "@/service/apis/kanban";
import FieldLabel from "../util/FieldLabel";

interface IProps {
  kanbanData: Ikanban;
  set_s_showNameModal: ISetStateFunction<boolean>;
}

const ReNameKanbanModal: React.FC<IProps> = ({ kanbanData, set_s_showNameModal }) => {
  const { c_getAllWorkspace } = useContext(GlobalContext);
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_newName, set_s_newName] = useState("");
  const [s_isLoading, set_s_isLoading] = useState(false);

  const onSubmit = async () => {
    set_s_isLoading(true);
    if (s_newName === "") {
      messageApi.warning("please type name");
      set_s_isLoading(false);
      return;
    }

    const res: AxiosResponse = await renameKanban(kanbanData.key, s_newName);
    const { status, message } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_isLoading(false);
    set_s_showNameModal(false);
  };

  return (
    <Spin spinning={s_isLoading}>
      {contextHolder}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col">
          <FieldLabel>old name</FieldLabel>
          <Input value={kanbanData.name} disabled />
        </div>
        <div className="flex flex-col">
          <FieldLabel>new name</FieldLabel>
          <Input value={s_newName} onChange={(e) => set_s_newName(e.target.value)} placeholder="Write a new name" />
        </div>

        <Divider />

        <div className="flex justify-end gap-2">
          <Button className="text-black" onClick={() => set_s_showNameModal(false)}>
            Cancel
          </Button>
          <Button type="primary" onClick={onSubmit}>
            OK
          </Button>
        </div>
      </section>
    </Spin>
  );
};

export default ReNameKanbanModal;
