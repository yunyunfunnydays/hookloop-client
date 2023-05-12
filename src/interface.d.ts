import { AxiosResponse as axiosRes } from "axios";

declare global {
  interface AxiosResponse extends axiosRes {}

  interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: string;
  }

  interface IApiResponse {
    status: "success" | "fail" | "error";
    message: string;
    data: any;
  }
}
