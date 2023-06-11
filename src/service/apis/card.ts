// eslint-disable-next-line import/no-extraneous-dependencies
import instance from "../instance";

// 新建 kanban
export const addCard = (data: Pick<ICard, "name" | "kanbanId" | "listId">) => {
  return instance.post("cards", data);
};

// 使用 cardId 取得卡片
export const getCardById = (cardId: string) => {
  return instance.get(`cards/${cardId}`);
};

// 使用 cardId 更新卡片
export const updateCard = (kanbanId: string, cardId: string, data: ICard) => {
  return instance.patch(`cards/${kanbanId}/${cardId}/update`, data);
};

// 上傳檔案
export const addAttachment = (cardId: string, data: any) => {
  return instance.post(`cards/${cardId}/attachment`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 刪除檔案
export const deleteAttachment = (cardId: string, attachmentId: string) => {
  return instance.delete(`cards/${cardId}/attachment/${attachmentId}`);
};

// 移動卡片
export const moveCard = (data: {
  newListId: string;
  oldListId: string;
  newCardOrder: string[];
  oldCardOrder: string[];
}) => {
  return instance.patch("cards/qwererqrw/move", data);
};

// 取得 card 上所有 commits
export const getComments = (cardId: string) => {
  return instance.get(`cards/${cardId}/comment`);
};

// 新增 card 留言
export const addComment = (cardId: string, data: { currentComment: string; userId: string }) => {
  return instance.post(`cards/${cardId}/comment`, data);
};
