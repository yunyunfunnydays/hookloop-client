import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import type { InputRef } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { renameList } from "@/service/apis/list";
import { Droppable, Draggable } from "@hello-pangea/dnd";

import AddCard from "./AddCard";
import Cards from "./Cards";

type ListProps = {
  list: IList;

  cards: ICard[];
  index: number;
};

const List: React.FC<ListProps> = ({ list, cards, index }) => {
  const [s_isEditingList, set_s_isEditingList] = useState(false);
  const [s_newData, set_s_newData] = useState<Pick<IList, "name" | "_id">>({
    name: "",
    _id: list?._id,
  });
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (s_isEditingList && inputRef.current) {
      inputRef.current.focus();
    }
  }, [s_isEditingList]);

  const handleEditList = () => {
    set_s_newData({ name: list.name, _id: list?._id });
    set_s_isEditingList(true);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_s_newData({
      ...s_newData,
      name: e.target.value,
    });
  };

  const handleInputEnd = async () => {
    try {
      if (!s_newData) return;

      const res: AxiosResponse = await renameList(s_newData);
      const { status, message, data } = res.data as IApiResponse;

      console.info(status, message, data);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isEditingList(false);
    }
  };

  return (
    <Draggable draggableId={list._id} index={index} key={list._id}>
      {(provided2) => (
        <div
          ref={provided2.innerRef}
          {...provided2.draggableProps}
          {...provided2.dragHandleProps}
          className="cursor-pointer"
        >
          <Droppable droppableId={list._id} type="card">
            {(provided) => (
              <div
                className=" min-w-[330px] bg-[#F5F5F5] px-5 py-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {/* TODO: 可以將把手擴大 cursor-grab mx-[-20px] mt-[-16px] pt-[16px] px-[20px] */}
                {s_isEditingList ? (
                  <Input
                    ref={inputRef}
                    value={s_newData.name}
                    onChange={handleListNameChange}
                    onBlur={handleInputEnd}
                    onPressEnter={handleInputEnd}
                    className="h-[28px] min-w-[290px] bg-[#F5F5F5] p-0 text-xl font-medium text-[#262626] text-['Roboto']"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <span
                      role="presentation"
                      className="grow text-xl font-medium text-[#262626] text-['Roboto']"
                      onClick={handleEditList}
                    >
                      {list.name}
                    </span>
                    <EllipsisOutlined className="cursor-pointer text-xl" />
                  </div>
                )}
                <div className="mb-2 text-sm font-medium text-[#8C8C8C] text-['Roboto']">
                  {cards.length} {cards.length === 1 ? "card" : "cards"}
                </div>
                {cards.length > 0 && <Cards cards={cards} />}
                {provided.placeholder}
                <AddCard listData={list} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
