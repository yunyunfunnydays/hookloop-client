import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface IApiResponse<T = any> {
  status: "success" | "fail" | "error";
  message: string;
  data: T;
}

export interface IApiSuccessResponse<T> extends IApiResponse {
  status: "success";
  message: string;
  data: T;
}

interface IApiFailResponse<T> extends IApiResponse {
  status: "fail";
  message: string;
  data: T;
}

interface IApiErrorResponse<T> extends IApiResponse {
  status: "error";
  message: string;
  data: T;
}

// 创建一个 Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  // 跨域存取cookies 等待後端設定 cors
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse<IApiResponse>) => {
    console.log("response = ", response);
    const { status } = response.data;
    if (status === "success") {
      const { data, message } = response.data as IApiSuccessResponse<unknown>;
      return {
        data,
        message,
        status,
      } as unknown as AxiosResponse<IApiSuccessResponse<unknown>>;
    }

    if (status === "fail") {
      const { message } = response.data as IApiFailResponse<unknown>;
      return {
        data: {},
        message,
        status: "fail",
      } as unknown as AxiosResponse<IApiFailResponse<unknown>>;
    }

    return {
      data: {},
      message: "程式錯誤",
      status: "fail",
    } as unknown as AxiosResponse<IApiErrorResponse<unknown>>;
  },
  (error) => {
    if (error.response) {
      const { message } = error.response.data as IApiFailResponse<unknown>;
      return {
        data: {},
        message,
        status: "fail",
      } as unknown as AxiosResponse<IApiErrorResponse<unknown>>;
    }

    return {
      data: {},
      message: "程式錯誤",
      status: "fail",
    } as unknown as AxiosResponse<IApiErrorResponse<unknown>>;
  },
);

export default instance;
