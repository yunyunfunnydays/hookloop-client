// eslint-disable-next-line import/no-extraneous-dependencies
import instance from "../instance";

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
