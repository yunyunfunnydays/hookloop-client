import React, { useState, useEffect, useRef, useContext } from "react";
import { Input, message as msg } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addList } from "@/service/apis/list";
import type { InputRef } from "antd";
import KanbanContext from "@/Context/KanbanContext";

type AddListProps = {};

const AddList: React.FC<AddListProps> = () => {
  const { c_kanbanId } = useContext(KanbanContext);
  const inputRef = useRef<InputRef>(null);
  const [s_isAddingList, set_s_isAddingList] = useState(false);
  const [s_listName, set_s_listName] = useState<string | null>(null);

  useEffect(() => {
    if (s_isAddingList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isAddingList]);

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_s_listName(e.target.value);
  };

  const handleAddList = () => {
    set_s_isAddingList(true);
  };

  const handleInputEnd = async () => {
    try {
      if (s_listName === "" || s_listName === null) return;
      if (c_kanbanId === "" || c_kanbanId === null) return;

      const res: AxiosResponse = await addList({
        name: s_listName,
        kanbanId: c_kanbanId,
      });
      const { status, message } = res.data as IApiResponse;

      if (status !== "success") msg.error(message);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_listName(null);
      set_s_isAddingList(false);
    }
  };

  return s_isAddingList ? (
    <Input
      ref={inputRef}
      value={s_listName || ""}
      name="listName"
      bordered={false}
      onChange={handleListNameChange}
      onBlur={handleInputEnd}
      onPressEnter={handleInputEnd}
      className="h-[56px] min-w-[330px] bg-[#F5F5F5] px-5 py-4 text-xl font-medium text-[#262626] text-['Roboto']"
    />
  ) : (
    <div role="presentation" className="min-w-[330px] bg-[#F5F5F5] px-5 py-4" onClick={handleAddList}>
      <div className="cursor-pointer text-base font-medium text-[#595959] text-['Roboto']">
        <PlusOutlined />
        <span> Add a list</span>
      </div>
    </div>
  );
};

export default AddList;
