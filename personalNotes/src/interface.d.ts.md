## interface.d.ts

```
import { AxiosResponse as axiosRes } from "axios";
import { Dayjs } from "dayjs";
import { PlanOptions } from "./components/Plan";
```




```
declare global {}
```

```
interface AxiosResponse extends axiosRes {}
```
  ```
  interface IApiResponse<T = any> {
    status: "success" | "fail" | "error";
    message: string;
    data: T;
  }
  ```
  ```
  interface ISetStateFunction<T> {
    (newState: T | ((prevState: T) => T)): void;
  }
  ```
  ```
  type ImemberRecord = Record<string, Imember>;
  interface IListsCards {
    cards: { [key: string]: ICard };
    lists: { [key: string]: IList };
    listOrder: string[];
  }
  ```
  ```
  interface IList1 {
    id: string;
    cards: ICard1[];
  }
  ```

  ```
  interface IDragItem {
    private _id(arg0: number, length: number, _id: any, id: string): unknown;
    id: string;
    type: string;
    currentListId: string;
    currentCardIndex?: number;
  }
  ```
