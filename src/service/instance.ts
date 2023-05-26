// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from "js-cookie";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface IApiResponse {
  status: "success" | "fail" | "error";
  message: string;
  data: any;
}
// const token = Cookies.get("hookloop-token");
// 创建一个 Axios instance
const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.rootUrl}/api/v1`,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("hookloop-token")}`, // 在標頭中設定 Authorization
  },
  // 跨域存取cookies 等待後端設定 cors
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status } = response.data as IApiResponse;

    if (status === "success") {
      const { data, message } = response.data;
      response.data = {
        data,
        message,
        status,
      };
    } else if (status === "fail") {
      const { message, data } = response.data;
      response.data = {
        data,
        message,
        status: "fail",
      };
    } else {
      response.data = {
        data: {},
        message: "程式錯誤",
        status: "fail",
      };
    }
    return response; // 返回修改後的 response
  },
  (error) => {
    if (error.response) {
      const { message, data } = error.response.data;
      const modifiedResponse: AxiosResponse<IApiResponse> = {
        ...error.response,
        data: {
          data,
          message,
          status: "fail",
        },
      };
      return modifiedResponse;
    }

    return {
      ...error.response,
      data: {
        data: {},
        message: "程式錯誤",
        status: "fail",
      },
    };
  },
);

export default instance;
