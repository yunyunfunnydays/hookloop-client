import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface IApiResponse {
  status: "success" | "fail" | "error";
  message: string;
  data: any;
}

export interface IApiSuccessResponse<T> extends IApiResponse {
  status: "success";
  message: string;
  data: T;
}

export interface IApiFailResponse<T> extends IApiResponse {
  status: "fail";
  message: string;
  data: T;
}

// interface IApiErrorResponse<T> extends IApiResponse {
//   status: "error";
//   message: string;
//   data: T;
// }

// 创建一个 Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.rootUrl}/api/v1`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  // 跨域存取cookies 等待後端設定 cors
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("response = ", response);
    const { status } = response.data;

    if (status === "success") {
      const { data, message } = response.data;
      return {
        data,
        message,
        status,
      } as unknown as AxiosResponse<IApiResponse>;
    }

    if (status === "fail") {
      const { message } = response.data;
      return {
        data: {},
        message,
        status: "fail",
      } as unknown as AxiosResponse<IApiResponse>;
    }

    return {
      data: {},
      message: "程式錯誤",
      status: "fail",
    } as unknown as AxiosResponse<IApiResponse>;
  },
  (error) => {
    if (error.response) {
      const { message, data } = error.response.data;
      return {
        data,
        message,
        status: "fail",
      } as unknown as AxiosResponse<IApiResponse>;
    }

    return {
      data: {},
      message: "程式錯誤",
      status: "fail",
    } as unknown as AxiosResponse<IApiResponse>;
  },
);

export default instance;
