import { AxiosResponse as axiosRes } from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Dayjs } from "dayjs";
import { PlanOptions } from "./pageComponents/planAndPayment/Plan";

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

  interface IApiResponse<T = any> {
    status: "success" | "fail" | "error";
    message: string;
    data: T;
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
    cardCommentCount: number;
    notificationCommentCount: number;
    reporter: string;
    listId: string;
    kanbanId: string;
    // assignee: IUser[];
    assignee: string[];
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
    tag: string[];
    cardComment?: Icomment[];
  }

  interface ITag {
    _id?: string;
    name: string;
    icon: string;
    color: string;
    kanbanId: string;
  }

  type ITagRecord = Record<string, ITag>;

  interface IqueryType {
    reporters: string[];
    members: string[];
    tags: string[];
    priority: string;
    status: string;
    isMatch: boolean;
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
    userId: string;
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

  interface IPlanOrder {
    targetPlan: PlanOptions;
  }

  interface IPaymentTradeInfoType {
    MerchantID: string;
    RespondType: string;
    TimeStamp: string;
    Version: string;
    LoginType: string;
    MerchantOrderNo: string;
    Amt: number;
    ItemDesc: PlanOptions;
    TradeLimit: number;
    ReturnURL: string;
    NotifyURL: string;
    Email: string;
    EmailModify: number;
    WEBATM: number;
  }

  interface ICreateOrderReturnType {
    tradeInfo: IPaymentTradeInfoType;
    aesEncrypted: string;
    shaEncrypted: string;
  }
}
