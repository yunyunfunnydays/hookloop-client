// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
import instance from "./instance";

// 登入
export const login = (data: IUser) => {
  return instance.post(`auth/login`, data);
};

// 登入
export const logout = () => {
  return instance.post("auth/logout");
};

// 驗證 token 是否過期
export const verifyUserToken = () => {
  return instance.get("auth/verifyUserToken", {
    headers: {
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};

// 取得使用者
export const getUsers = (userID: string = "") => {
  return instance.get(`/users/${userID}`);
};

// 取得 Member 下拉選單資料
export const getMember = (email: string = "") => {
  return instance.get(`/users/getMember/${email}`);
};

// 建立使用者
export const createUser = (data: IUser) => {
  return instance.post(`/users`, data);
};

export const getMe = () => {
  return instance.get("/users/me");
};

export const updateMe = (data: { username: string }) => {
  return instance.patch("/users/me", data);
};

export const updateAvatar = (data: any) => {
  return instance.patch("/users/me", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 修改密碼
export const updatePassword = (data: { oldPassword: string; newPassword: string }) => {
  return instance.patch("/users/me/password", data);
};

export const closeMe = () => {
  return instance.patch("/users/me/isActive");
};

// 忘記密碼
export const forgetPassword = (data: { email: string }) => {
  return instance.post(`/auth/forgetPassword`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });
};

// 驗證新密碼
export const verifyPassword = (data: { newPassword: string; resetPasswordToken: string }) => {
  return instance.post(`/auth/verifyPassword`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });
};

// 驗證新密碼
export const validateResetPasswordToken = (resetToken: string) => {
  return instance.get(`/${resetToken}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  });
};

// 建立方案付費訂單
export const createOrder = (data: IPlanOrder): Promise<AxiosResponse<IApiResponse<ICreateOrderReturnType>>> => {
  return instance.post("/plans/createOrder", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("hookloop-token")}`,
    },
  });
};
