import Cookies from "js-cookie";
import instance from "../instance";

export const addList = (data: Pick<IList, "name" | "kanbanId">) => {
  return instance.post("lists", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

export const renameList = (data: { kanbanId: string; list: Pick<IList, "name" | "_id">; socketData: any }) => {
  return instance.patch(`lists/${data.list._id}/name`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

export const moveList = (data: { kanbanId: string; listOrder: string[] }) => {
  return instance.patch("lists/move", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

export const archiveList = (data: { kanbanId: string; id: string; socketData: any }) => {
  return instance.patch(
    `lists/${data.id}/archive`,
    {
      isArchived: true,
      kanbanId: data.kanbanId,
      socketData: data.socketData,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
      },
    },
  );
};
