import React, { useState, useContext } from "react";
import { Input, Divider, Button, Spin, message as msg } from "antd";
// context
import GlobalContext from "@/Context/GlobalContext";
import { addkanban } from "@/service/apis/kanban";

type CreateKanbanModalProps = {
  workspaceId: string;
  set_s_isShowModal: ISetStateFunction<boolean>;
};

type FieldLabelProps = {
  children: React.ReactNode;
};

// 可編輯欄位的 label
const FieldLabel: React.FC<FieldLabelProps> = ({ children }) => (
  <span className="text-base font-medium text-[#8C8C8C]">{children}</span>
);

const CreateKanbanModal: React.FC<CreateKanbanModalProps> = ({ workspaceId, set_s_isShowModal }) => {
  const { c_getAllWorkspace } = useContext(GlobalContext);
  const [messageApi, contextHolder] = msg.useMessage();
  const [s_isLoading, set_s_isLoading] = useState(false);

  // 要用來新建的 kanban 資料
  const [s_newDate, set_s_newData] = useState<Pick<Ikanban, "name" | "key" | "workspaceId">>({
    workspaceId: "",
    name: "",
    key: "",
  });

  const onSubmit = async () => {
    set_s_isLoading(true);
    if (s_newDate.name === "") {
      messageApi.warning("please type name");
      set_s_isLoading(false);
      return;
    }
    if (s_newDate.name.length < 2) {
      messageApi.warning("kanban name should be at least 2 characters");
      set_s_isLoading(false);
      return;
    }
    if (s_newDate.key === "") {
      messageApi.warning("please type key");
      set_s_isLoading(false);
      return;
    }
    if (s_newDate.key.length < 2) {
      messageApi.warning("kanban key should be at least 2 characters");
      set_s_isLoading(false);
      return;
    }
    s_newDate.workspaceId = workspaceId;
    const res: AxiosResponse = await addkanban(s_newDate);
    const { status, message, data } = res.data as IApiResponse;
    if (status === "success") {
      msg.success(message);
    } else if (data?.error) {
      msg.error(data?.error);
    } else {
      msg.error(message);
    }
    c_getAllWorkspace();
    set_s_isLoading(false);
    set_s_isShowModal(false);
  };

  return (
    <Spin spinning={s_isLoading}>
      {contextHolder}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col">
          <FieldLabel>key</FieldLabel>
          <Input
            value={s_newDate.key}
            onChange={(e) => {
              set_s_newData({
                ...s_newDate,
                key: e.target.value,
              });
            }}
            placeholder="Write kanban key"
          />
        </div>

        <div className="flex flex-col">
          <FieldLabel>name</FieldLabel>
          <Input
            value={s_newDate.name}
            onChange={(e) => {
              set_s_newData({
                ...s_newDate,
                name: e.target.value,
              });
            }}
            placeholder="Write kanban name"
          />
        </div>
        <Divider />

        <div className="flex justify-end gap-2">
          <Button className="text-black" onClick={() => set_s_isShowModal(false)}>
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

export default CreateKanbanModal;
