import instance from "./instance";

// 取得使用者
export const getUsers = (userID = "") => {
  return instance.get(`/users/${userID}`);
};

// 建立使用者
export const createUser = (data: IUser) => {
  return instance.post(`/users`, data);
};

// 登入
export const login = (data: IUser) => {
  return instance.post(`auth/login`, data);
};
