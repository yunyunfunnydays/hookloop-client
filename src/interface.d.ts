import { AxiosResponse as axiosRes } from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dayjs } from "dayjs";

declare global {
  interface AxiosResponse extends axiosRes {}

  interface IUser {
    _id?: string;
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
    listOrder: IList[];
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

  type ImemberRecord = Record<string, Imember>;

  interface Iworkspace {
    workspaceId: string;
    workspaceName: string;
    kanbans: Ikanban[];
    members: Imember[];
    isArchived: boolean;
  }

  interface ICard {
    _id: string;
    name: string;
    description: string;
    reporter: IUser;
    listId: string;
    kanbanId: string;
    assignee: IUser[];
    webLink: ILink[];
    attachment?: string[];
    priority: "Medium" | "Low" | "High";
    targetDate?: Dayjs[];
    targetStartDate: Dayjs | null;
    targetEndDate: Dayjs | null;
    actualDate?: Dayjs[];
    actualStartDate: Dayjs | null;
    actualEndDate: Dayjs | null;
    status: string | null;
    tag: ITag[];
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

  interface IList {
    _id: string;
    name: string;
    cardOrder: ICard[];
    kanbanId: string;
    isArchived: boolean;
  }

  interface IOwner {
    _id?: string;
    username: string;
    avatar: string;
  }

  interface ILink {
    _id?: string;
    name: string;
    url: string;
  }

  interface Icomment {
    _id?: string;
    createdAt?: Dayjs;
    currentComment: string;
    userId: IUser;
  }

  interface IListsCards {
    cards: { [key: string]: ICard };
    lists: { [key: string]: IList };
    listOrder: string[];
  }

  interface ICard1 {
    id: string;
    text: string;
  }

  interface IList1 {
    id: string;
    cards: ICard1[];
  }
  interface IDragItem {
    private _id(arg0: number, length: number, _id: any, id: string): unknown;
    id: string;
    type: string;
    currentListId: string;
    currentCardIndex?: number;
  }
}
