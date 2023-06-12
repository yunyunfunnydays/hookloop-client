import instance from "../instance";

export const getNotificationsByUserId = (userId: string) => {
  return instance.get(`notifications/user/${userId}`);
};

export const isReadNotification = (notificationId: string) => {
  return instance.patch(`/notifications/${notificationId}/read`);
};

export const markAllIsReadByUserId = (userId: string) => {
  return instance.patch(`notifications/user/${userId}`);
};
