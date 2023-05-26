// eslint-disable-next-line import/no-extraneous-dependencies
import instance from "../instance";

// 新建 kanban
export const addCard = (data: ICard) => {
  return instance.post("cards", data);
};

// 使用 cardId 取得卡片
export const getCardById = (cardId: string) => {
  return instance.get(`cards/${cardId}`);
};

// 使用 cardId 更新卡片
export const updateCard = (cardId: string, data: ICard) => {
  return instance.patch(`cards/${cardId}`, data);
};
