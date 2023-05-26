import { AxiosResponse as axiosRes } from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dayjs } from "dayjs";

declare global {
  interface AxiosResponse extends axiosRes {}

  interface IUser {
    username: string;
    email: string;
    password: string;
    avatar: string;
    userId: string;
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
    _id: string;
    name: string;
    key: string;
    workspaceId: string;
    isPinned: boolean;
    isArchived: boolean;
  }

  interface Imember {
    username: string;
    userId: string;
    role: "Admin" | "Member" | "Owner";
    avatar: string;
    state: "create" | "delete";
  }

  interface Iworkspace {
    workspaceId: string;
    workspaceName: string;
    kanbans: Ikanban[];
    members: Imember[];
    isArchived: boolean;
  }

  interface ICard {
    id: string;
    name: string;
    description: string;
    reporter: string;
    assignee: string[];
    priority: string | null;
    targetDate?: Dayjs[];
    targetStartDate: Dayjs | null;
    targetEndDate: Dayjs | null;
    actualDate?: Dayjs[];
    actualStartDate: Dayjs | null;
    actualEndDate: Dayjs | null;
    status: string | null;
    tag: string[];
  }

  interface ICardBK {
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

  interface ITag {
    _id?: string;
    name: string;
    icon: string;
    color: string;
    kanbanId: string;
  }
}
