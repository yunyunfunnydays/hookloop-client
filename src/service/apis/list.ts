import instance from "../instance";

export const addList = (data: Pick<IList, "name" | "kanbanId">) => {
  return instance.post("lists", data);
};

export const renameList = (data: { kanbanId: string; list: Pick<IList, "name" | "_id">; socketData: any }) => {
  return instance.patch(`lists/${data.list._id}/name`, data);
};

export const moveList = (data: { kanbanId: string; listOrder: string[] }) => {
  return instance.patch("lists/move", data);
};

export const archiveList = (data: { kanbanId: string; id: string; socketData: any }) => {
  return instance.patch(`lists/${data.id}/archive`, {
    isArchived: true,
    kanbanId: data.kanbanId,
    socketData: data.socketData,
  });
};
