import instance from "./instance";

// 登入
export const login = (data: IUser) => {
  return instance.post(`auth/login`, data);
};

// 驗證 token 是否過期
export const verifyUserToken = () => {
  return instance.get("auth/verifyUserToken");
};

// 取得使用者
export const getUsers = (userID: string = "") => {
  return instance.get(`/users/${userID}`);
};

// 建立使用者
export const createUser = (data: IUser) => {
  return instance.post(`/users`, data);
};

export const getMe = () => {
  return instance.get("/users/me");
};

export const updateMe = (data: { name: string }) => {
  return instance.patch("/users/me", data);
};

// 修改密碼
export const updatePassword = (data: { oldPassword: string; newPassword: string }) => {
  return instance.patch("/users/me/password", data);
};
