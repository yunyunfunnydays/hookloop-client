// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import instance from "../instance";

// 取得看板資料
export const getKanbanByKey = (kanbanId: string, query?: any, userId?: string) => {
  return instance.get(`kanbans/${kanbanId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

// 新建 kanban
export const addkanban = (data: Pick<Ikanban, "name" | "key" | "workspaceId">) => {
  return instance.post("kanbans", data);
};

// 加入 or 取消我的最愛
export const pinKanban = (key: string, data: Pick<Ikanban, "isPinned">) => {
  return instance.patch(`kanbans/${key}/pin`, data);
};

// 修改 kanban 名稱
export const renameKanban = (key: string, newName: string) => {
  return instance.patch(`kanbans/${key}/name`, { name: newName });
};

// 封存 or 取消封存看板
export const archiveKanban = (key: string, data: Pick<Ikanban, "isArchived">) => {
  return instance.patch(`kanbans/${key}/archive`, data);
};

// 取得所有 Tags
export const getTags = (kanbanId: string) => {
  return instance.get(`kanbans/${kanbanId}/tag`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

// 新增 Tag
export const createTag = (kanbanId: string, data: Pick<ITag, "name" | "color" | "icon">) => {
  return instance.post(`kanbans/${kanbanId}/tag`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

// 更新 Tag
export const updateTag = (kanbanId: string, data: Pick<ITag, "name" | "color" | "icon">, tagId: string = "") => {
  return instance.patch(`kanbans/${kanbanId}/tag/${tagId}`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

// 取得看板下所有 lists
// export const getKanbanLists = (kanbanId: string) => {
//   return instance.get(`kanbans/${kanbanId}/lists`);
// };
