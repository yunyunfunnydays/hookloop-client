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

  interface ISetStateFunction<T> {
    (newState: T | ((prevState: T) => T)): void;
  }

  interface Ikanban {
    id: string;
    kanbanName: string;
  }

  interface Iworkspace {
    id: string;
    workspaceName: string;
    kanbans: Ikanban[];
    members: string[];
  }

  interface ICard {
    id: string;
    title: string;
    preview: any;
    priority: string | null;
    status: string | null;
    tags: { id: string; name: string }[];
    reporter: { id: string; avatar: string } | null;
    assignees: { id: string; avatar: string }[];
    dueDate: {
      type: string;
      start?: string;
      end: string;
    } | null;
  }
}
