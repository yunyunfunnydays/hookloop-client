import instance from "../instance";

export const addList = (data: Pick<IList, "name" | "kanbanId">) => {
  return instance.post("lists", data);
};
