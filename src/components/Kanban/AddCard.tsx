import React, { useRef, useState, useEffect, useContext } from "react";
import type { InputRef } from "antd";
import { Input } from "antd";
import { addCard } from "@/service/apis/card";
import { PlusOutlined } from "@ant-design/icons";
import KanbanContext from "@/Context/KanbanContext";

type AddCardProps = {
  s_kanbanId: string;
  listData: IList;
};

const AddCard: React.FC<AddCardProps> = ({ s_kanbanId, listData }) => {
  const inputRef = useRef<InputRef>(null);
  const { c_getKanbanByKey } = useContext(KanbanContext);
  const [s_isAddingCard, set_s_isAddingCard] = useState(false);
  const [s_cardName, set_s_cardName] = useState<string>("");

  useEffect(() => {
    if (s_isAddingCard && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isAddingCard]);

  const handleAddCard = () => {
    set_s_isAddingCard(true);
  };

  const handleInputEnd = async () => {
    try {
      if (s_cardName === "" || s_cardName === null) return;
      if (s_kanbanId === "" || s_kanbanId === null) return;

      const res: AxiosResponse = await addCard({
        name: s_cardName,
        kanbanId: s_kanbanId,
        listId: listData._id,
      });
      const { status, message } = res.data as IApiResponse;
      if (status === "success") {
        c_getKanbanByKey();
      } else {
        console.error(message);
      }
      set_s_cardName("");
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isAddingCard(false);
    }
  };

  return s_isAddingCard ? (
    <Input
      ref={inputRef}
      value={s_cardName}
      name="listName"
      onChange={(e) => set_s_cardName(e.target.value)}
      onBlur={handleInputEnd}
      onPressEnter={handleInputEnd}
    />
  ) : (
    <div
      role="presentation"
      className="rounded-md p-2 text-base font-medium text-[#595959] hover:bg-[#d2d0d0]"
      onClick={handleAddCard}
    >
      <PlusOutlined />
      <span> Add a card</span>
    </div>
  );
};

export default AddCard;
