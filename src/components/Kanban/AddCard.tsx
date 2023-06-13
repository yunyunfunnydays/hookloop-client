import React, { useRef, useState, useEffect, useContext } from "react";
import type { InputRef } from "antd";
import { Input } from "antd";
import { addCard } from "@/service/apis/card";
import { PlusOutlined } from "@ant-design/icons";
import KanbanContext from "@/Context/KanbanContext";
import { produce } from "immer";

type AddCardProps = {
  listData: IList;
};

const AddCard: React.FC<AddCardProps> = ({ listData }) => {
  const inputRef = useRef<InputRef>(null);
  const { c_kanbanId, c_listData, set_c_listData } = useContext(KanbanContext);
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
      if (!s_cardName) return;
      if (!c_kanbanId) return;

      addCard({
        name: s_cardName,
        kanbanId: c_kanbanId,
        listId: listData._id,
      });

      produce(c_listData, (draft) => {
        const targetList = draft.find((list) => list._id === listData._id);

        if (targetList) {
          // @ts-ignore
          targetList.cardOrder.push({
            _id: "123",
            name: s_cardName,
            listId: listData._id,
          });
        }
      });

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
