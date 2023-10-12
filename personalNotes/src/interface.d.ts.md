## interface.d.ts
 TypeScript 的定義檔（通常具有 .d.ts 擴展名），主要用來聲明（declare）多個全域（global）介面（interface）和類型（type）。

在 TypeScript 中，文件被分成兩種：模組和全域腳本。

1. **模組 (Modules)**:
    - 任何文件中只要包含了 `import` 或 `export` 語句，這個文件就被視為模組。
    - 在模組中，你所定義的所有東西（變數、類型、函數等）都是局部的，除非你明確地導出它們。
    - 要在模組中添加全域的類型宣告，你必須使用 `declare global` 區塊。

2. **全域腳本 (Global Scripts)**:
    - 沒有 `import` 或 `export` 的文件被視為全域腳本。
    - 在全域腳本中，你所定義的所有東西都是全域的。
    - 在這種腳本中，你不需要使用 `declare global` 來進行全域類型宣告，你可以直接進行宣告。  

    只要一個文件中有 `import`（不論是導入類型、函數還是其他），它就是一個模組，而在這樣的模組中進行全域的類型宣告，你就需要使用 `declare global` 區塊。

    這種設計有助於明確區分模組作用域和全域作用域，以及在哪裡進行全域的類型宣告
***

``` typescript
declare global {
  '注意其中不是'
}
```
#### 擴展全域命名空間
- 使用 `declare global {}`，是在擴展全域命名空間（global namespace）。在這個命名空間內部定義的類型和變量將成為全域可用，**無需進行 import**。
  
  - 在 TypeScript 中，interface 可以被多次宣告，且它們會自動合併。所以，當要**為已存在的類型（例如 Window）添加新的屬性，可以重新宣告那個 interface** 並添加你想要的屬性，不會覆蓋原有的`(介面合併 Interface Merging)`。
  
  - 或是當使用某些 JS 函式庫，這些函式庫可能在執行時添加了一些全域的物件或函數但沒有設定 ts。故在 TypeScript 中，需要有相應的類型定義來告訴編譯器這些物件或函數的存在和它們的類型。
***
```typescript
interface AxiosResponse extends axiosRes {}
```
  #### 讓 AxiosResponse 變成全域
  - 繼承（extends）axios原有的`AxiosResponse`，但沒有額外添加屬性。 進行了擴展（extends），這麼做的目的可能是為了讓 AxiosResponse 變成全域的 interface 不用 import 就可以使用。
***
  ``` typescript
  interface IApiResponse<T = any> {
    status: "success" | "fail" | "error";
    message: string;
    data: T;
  }
  ```
#### IApiResponse 定義 API 回應的結構。
- `status`: 描述請求狀態，可能是 "success"、"fail" 或 "error"。
- `message`: 回應的訊息。
- `data`: 回應的資料，是泛型（generic）。意味著它可以是任何類型。這樣做的好處是，同一個介面可以用於多種不同的 API 回應格式。
***
  ```typescript
  interface ISetStateFunction<T> {
    (newState: T | ((prevState: T) => T)): void;
  }
  ```
#### ISetStateFunction 定義 設定狀態（state）的函數 的結構。
這個 `interface` 定義了一個泛型函數 interface，名稱叫做 `ISetStateFunction`。被定義的函數功能和使用模式非常像 React 中的 `setState` 函數。

  1. **函數型態**:
     - 這個介面其實定義了一個函數的型態。
     - 此函數會接受一個參數 `newState`，並沒有回傳值`void`。
  2. **泛型 `<T>`**:
     - `ISetStateFunction` 是一個泛型介面，這意味著當你使用這個介面時，你可以為其指定一個特定的類型。
     - 舉例：`ISetStateFunction<number>` 表示這是一個處理數字型態的 `setState` 函數。
  3. **參數 `newState`**:
     - `newState` 可以是兩種類型中的一種：
       1. `T`: 這是直接設定新的狀態值。
       2. `(prevState: T) => T`: 這是一個函數，它接受先前的狀態 `prevState` 作為參數，並回傳新的狀態。這通常在你的新狀態依賴於先前的狀態時使用。
     - 函數的回傳型態是 `void`，表示這個函數不回傳任何值。

      #### 使用情境
      假設你有一個狀態更新函數和一個數字狀態，你可以這樣使用這個介面：
      ```typescript
      let myState: number = 5;

      const updateState: ISetStateFunction<number> = (newState) => {
          if (typeof newState === "function") {
              myState = newState(myState);
          } else {
              myState = newState;
          }
      }

      // 使用直接值更新狀態
      updateState(10);

      // 使用函數更新狀態
      updateState((prev) => prev + 5);
      ```
***
  ```typescript
  interface Imember {
  username: string;
  userId: string;
  role: "Admin" | "Member" | "Owner";
  avatar: string;
  state: "create" | "delete";
  }
  type ImemberRecord = Record<string, Imember>;
  //取代  
  interface ImemberRecord {
    [key: string]: Imember 
    }
  ```

  這是一個 TypeScript 的類型別名（type alias），使用了 TypeScript 內建的工具型別 `Record`。

#### Record<K, T>

- `Record` 是 TypeScript 的一個工具型別，用於建立一個物件型別，該物件的鍵（keys）是 `K`，每個鍵的值的型別是 `T`。

- 此例中，`Record<string, Imember>` 表示一個物件，其中：
  - 每個鍵（key）都是 `string` 類型。
  - 每個值（value）都是 `Imember` 類型。

  #### 使用情境
  `ImemberRecord` 可能代表以下這種物件：

  ```typescript

  const members: ImemberRecord = {
      member1: { name: "Alice", userId: 30 ... },
      member2: { name: "Bob", userId: 25 ... },
      // ... 更多成員
  };
  ```

  其中，`member1`、`member2` 等都是字串鍵 `string`，而每個鍵對應的值都符合 `Imember` 的型別。

  使用 `Record` 工具型別可以快速地建立這種鍵-值對映的物件型別，而不需要使用索引簽章（如 `{ [key: string]: Imember }`）。

  ```typescript
  interface IListsCards {
    cards: { [key: string]: ICard };
    lists: { [key: string]: IList };
    listOrder: string[];
  }
  ```
    相當於
    ```typescript
    interface IListsCards {
      cards: Record<string, ICard>;
      lists: Record<string, IList>;
      listOrder: string[];
    }
    ```
***
  ```typescript
  interface IList1 {
    id: string;
    cards: ICard1[];
  }
  ```
- ICard1[] 表示一個 ICard1 型別物件的陣列。換句話說，cards 是一個陣列，其中的每一個元素都是 ICard1 類型。

- 假設 ICard1 介面定義如下：
  ```typescript

  interface ICard1 {
      title: string;
      description: string;
      // ... 其他屬性
  }
  ```
    那麼，cards 可能看起來像這樣：
  ```typescript

  const cards: ICard1[] = [
      { title: "Card 1", description: "This is the first card." },
      { title: "Card 2", description: "This is the second card." },
      // ... 其他卡片
  ];
  ```
***
```typescript
  interface IDragItem {
    private _id(arg0: number, length: number, _id: any, id: string): unknown;
    id: string;
    type: string;
    currentListId: string;
    currentCardIndex?: number;
  }
  ```
### IDragItem
定義拖拉項目的資料結構。

沒用到且 private 設定不明白。
  
