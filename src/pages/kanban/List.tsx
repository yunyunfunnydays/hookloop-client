/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { renameList, addList } from "@/service/apis/list";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { InputRef } from "antd";

import { AddCard } from "@/components/Kanban";
import Card from "./Card";

type IListProps = {
  list: IList;
  s_kanbanId: string;
  cards: ICard[];
  index2: number;
  s_ListsData: IList[];
  set_s_ListsData: ISetStateFunction<IList[]>;
};

const List: React.FC<IListProps> = ({ list, s_ListsData, set_s_ListsData, cards, index2, s_kanbanId }) => {
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

      console.log(status, message, data);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
      set_s_isEditingList(false);
    }
  };

  if (!list) return null;

  return (
    <Draggable draggableId={list._id} index={index2}>
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
                className=" min-w-[330px] overflow-auto bg-[#F5F5F5] px-5 py-4"
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
                  <div className="flex items-center justify-between overflow-auto">
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
                {cards.length > 0 && (
                  <div className="mb-4 flex h-[calc(100vh_-_230px_-_90px)] flex-col space-y-6 overflow-auto">
                    {cards.map((card: ICard, index: number) => (
                      <Card key={card._id} s_kanbanId={s_kanbanId} card={card} index={index} />
                    ))}
                  </div>
                )}
                {provided.placeholder}
                <AddCard s_kanbanId={s_kanbanId} listData={list} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

type AddListProps = {
  s_kanbanId: string;
  set_s_ListsData: ISetStateFunction<IList[]>;
};

export const AddList: React.FC<AddListProps> = ({ s_kanbanId, set_s_ListsData }) => {
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
      if (s_kanbanId === "" || s_kanbanId === null) return;

      const res: AxiosResponse = await addList({
        name: s_listName,
        kanbanId: s_kanbanId,
      });
      const { status, message, data } = res.data as IApiResponse;

      if (status === "success") {
        set_s_ListsData(data.listOrder);
      } else {
        console.error(message);
      }
      set_s_listName(null);
    } catch (errorInfo) {
      console.error(errorInfo);
    } finally {
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

export default List;
