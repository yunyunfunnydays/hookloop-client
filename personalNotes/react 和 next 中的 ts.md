## React 和 Next.js 中 TypeScript 型別介紹：

1. **基礎型別 (Basic Types)**
    - `string`: 字串型別
    - `number`: 數字型別
    - `boolean`: 布林型別
    - `any`: 任何型別，盡量避免使用它，因為它會跳過型別檢查
    ```tsx
    let myString: string = "Hello, World!";
    let myNumber: number = 12345;
    let myBoolean: boolean = true;
    let myAny: any = "可以是任何型別";
    ```

2. **React 中常見的型別**
    - `ReactNode`(React 節點): 一個可渲染的 React 子元素，它可能是一個元素、字串、數字等
    - `ReactElement`: 一個在 React 中的元素
    - `FC<Props>` 或 `FunctionComponent<Props>`: 函式型元件的型別
      - ### React.FC
        `React.FC` 或 `React.FunctionComponent` 是一個泛型（generic）接口，用於描述函數組件的形狀和屬性。這個接口接受一個泛型參數，即組件的 `props` 的型別。

        它會自動加上兒童（children）屬性，並確保你的組件接受一個 `props` 參數，並返回一個 JSX 元素。

        ```tsx
        const MyComponent: React.FC<{ name: string }> = ({ name, children }) => {
          return (
            <div>
              Hello, {name}!
              {children}
            </div>
          );
        };
        ```

    - `ChangeEvent<HTMLInputElement>`: 通常用在輸入元件 (input element) 的事件處理
    ```tsx
    import React, { FC, ReactNode } from "react";

    interface Props {
      children: ReactNode;
    }

    const MyComponent: FC<Props> = ({ children }) => {
      return <div>{children}</div>;
    };
    ```
3. **Next.js 型別**
    - `NextPage`: 用於頁面的函式型元件
    - `GetServerSidePropsContext`, `GetStaticPropsContext`: 分別用於 `getServerSideProps` 和 `getStaticProps` 的上下文型別
    - `InferGetServerSidePropsType<typeof getServerSideProps>`: 可以用於推論 `getServerSideProps` 的回傳型別
    ```tsx
    import { NextPage } from "next";

    const HomePage: NextPage = () => {
      return <div>Welcome to Next.js!</div>;
    };

    export default HomePage;
    ```

    若使用 `getServerSideProps` 或 `getStaticProps`:

    ```tsx
    import { GetServerSideProps } from "next";

    export const getServerSideProps: GetServerSideProps = async (context) => {
      // ...
      return {
        props: {
          // ...
        }
      };
    };
    ```
  
4. **陣列與物件**
    - `Array<Type>` 或 `Type[]`: 陣列型別，例如 `string[]` 代表字串陣列
    - `{ key: Type }`: 物件型別
    ```tsx
    let stringArray: string[] = ["apple", "banana", "cherry"];
    let userObject: { id: number; name: string } = { id: 1, name: "John Doe" };
    ```

5. **自訂型別 (Custom Types)**
    - 你可以使用 `interface` 或 `type` 建立自己的型別。例如：
    ```tsx
    interface User {
      id: number;
      name: string;
    }

    const printUserName = (user: User) => {
      console.log(user.name);
    };

    const myUser: User = { id: 2, name: "Jane Doe" };
    printUserName(myUser);
    ```

## ReactNode (React 節點)

ReactNode 是 React 中的一個抽象概念，用於描述可以被渲染的東西。它不是一個具體的類型，而是一個聯合類型（Union Type），包括以下幾種可能性：

1. **ReactChild (React 孩子)**: 是一個較窄的類型，包括 `ReactElement`（React 元素）和 `ReactText`（React 文本，即 string 或 number）。
2. **ReactFragment (React 片段)**: 這是一個物件的類型，其 key 是 string，而 value 是 `ReactNode`。
3. **ReactPortal (React 傳送門)**: 用於將子節點渲染到存在於父組件之外的 DOM 節點。
4. **string (字串)**
5. **number (數字)**
6. **boolean (布林值)**: 通常用於 conditional rendering (條件渲染)。
7. **null (空值)**
8. **undefined (未定義)**

在實際的 JSX 代碼中，當你撰寫一個元件並返回某些 UI，你實際上返回的就是 `ReactNode`。

#### 舉例：
  - 考慮以下元件：

    ```jsx
    function ExampleComponent() {
      return <div>Hello, world!</div>;
    }
    ```

    這裡，`<div>Hello, world!</div>` 是一個 `ReactElement`，也可以被認為是一個 `ReactNode`。

  - 使用：
    ```jsx
    const c_socketNotification = (userId: string, description: React.ReactNode) => {}
    ```


## React 事件型別


React 事件型別都是基於 JavaScript 原生的 DOM 事件，但包裹在 React 的合成事件系統 (`SyntheticEvent`) 內。
### 常見的 React 事件型別：
1. **Change 事件**
   - `ChangeEvent`: 用於 `onChange` 事件，如輸入框或選擇框的值更改時。
2. **Mouse 事件**
   -  `MouseEvent`: 用於鼠標事件，如 `onClick`, `onMouseDown`, `onMouseMove` 等。
3. **Keyboar 事件**
   -  `KeyboardEvent`: 用於鍵盤事件，如 `onKeyDown`, `onKeyPress` 等。
4. **Focus 事件**
    - `FocusEvent`: 用於 `onFocus` 和 `onBlur` 事件。

5. **Form 事件**
    - `FormEvent`: 用於表單的 `onSubmit` 事件。

6. **Drag 事件**
    - `DragEvent`: 用於拖放事件，如 `onDrag`, `onDrop` 等。

7. **Wheel 事件**
    - `WheelEvent`: 用於滾輪事件 `onWheel`。

8. **Touch 事件**
    - `TouchEvent`: 用於觸控事件，如 `onTouchStart`, `onTouchMove`, `onTouchEnd` 等。


### 關於 `HTMLInputElement`

`HTMLInputElement` 是 TypeScript 的內建 DOM 型別，所以你不需要對它進行 `import`。它代表了 HTML 中的 `<input>` 元素。

這些型別的存在，讓 TypeScript 可以提供對原生 DOM API 的良好型別支援，無需開發者額外安裝或引入。

### 常見的 DOM 型別：

1. `HTMLElement`: 通用的 HTML 元素型別，可用於不特定的元素上
2. `HTMLInputElement`:用於 `<input>` 元素
3. `HTMLButtonElement` :用於 `<button>` 元素
4. `HTMLSelectElement` :用於 `<select>` 元素
5. `HTMLDivElement`: 代表 `<div>` 元素。
6. `HTMLAnchorElement`: 代表 `<a>` 元素。
7. `HTMLTextAreaElement`: 代表 `<textarea>` 元素。
8. `HTMLSelectElement`: 代表 `<select>` 元素。
9. `HTMLOptionElement`: 代表 `<option>` 元素。
10. `HTMLImageElement`: 代表 `<img>` 元素。
11. `HTMLFormElement`: 代表 `<form>` 元素。

### 使用範例：

1. **Focus 事件**

```tsx
import React, { FocusEvent, FC } from "react";

const InputWithFocus: FC = () => {
  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    console.log("Input focused");
  };

  return <input onFocus={handleFocus} />;
};
```

2. **Form 事件**

```tsx
import React, { FormEvent, FC } from "react";

const SimpleForm: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
};
```

3. **輸入框 `onChange` 事件**

```tsx
import React, { ChangeEvent, FC } from "react";

const InputComponent: FC = () => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input onChange={handleChange} />;
};
```

4. **按鈕 `onClick` 事件**

```tsx
import React, { MouseEvent, FC } from "react";

const ButtonComponent: FC = () => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log("Button was clicked");
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

# 其他常忘的 ts

## !非空斷言操作符(Non-null assertion operator)
在 TypeScript (TS) 中, `!` 號後置操作符被稱為「非空斷言操作符」(Non-null assertion operator)。當你確定某個值不會是 `null` 或 `undefined`，但 TypeScript 推斷不能確定此事時，你可以使用此操作符來告訴 TypeScript：「我確定這個值不會是 `null` 或 `undefined`」。

### 使用場景

假設我們有一個接口 (interface) 和一個函數，這個函數可能會回傳該接口的值或者 `null`。

```typescript
interface User {
  name: string;
  age: number;
}

function getUser(): User | null {
  // ... 取得 user 資料
}
```

在某些情況下，你可能已經確定 `getUser` 函數回傳的不是 `null`，但 TypeScript 仍然會警告你，因為它不確定。此時，你可以使用 `!` 號操作符：

```typescript
const user = getUser();
console.log(user!.name);  // 使用 ! 號斷言 user 不是 null 或 undefined
```

### 注意事項

雖然 `!` 號操作符可以很有用，但應該謹慎使用。如果在執行時該值確實是 `null` 或 `undefined`，那麼你會得到一個執行時錯誤。因此，在使用非空斷言之前，應該確保你真的很確定該值不會是 `null` 或 `undefined`。



## 類型斷言(Type Assertions)
在 TypeScript 中，「類型斷言」(Type Assertion) 是一種語法，允許你指定一個變數的類型。當你比 TypeScript 更了解某個變數的確實類型，或者你需要明確地轉換該變數的類型時，你可以使用類型斷言。

在 TypeScript 中，有兩種主要的類型斷言語法：

1. **尖括號語法**:
```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

2. **`as` 語法**:
```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

**在 JSX 中，只有 `as` 語法是允許的，因為尖括號語法會與 JSX 標籤混淆。**

### 使用場景和注意事項

1. **確定變數的類型**：當你確定某個變數的類型，但 TypeScript 無法正確推斷時，可以使用類型斷言。

2. **轉換類型**：在某些情況下，你可能想將一個類型轉換為另一個類型。例如，將 `any` 類型轉換為具體的類型。

3. **謹慎使用**：過度或不正確地使用類型斷言可能會導致未預期的錯誤。使用類型斷言意味著你告訴 TypeScript 你知道更多的資訊，所以確保你真的知道更多。

## 類型注釋(Type Annotation)
在 TypeScript (TS) 中，「類型注釋」(Type Annotation) 是一種明確指定變數、函數參數或函數回傳值等的類型的方式。使用類型注釋，你可以讓 TypeScript 知道你期望的特定類型，並讓它幫助你檢查這些期望是否被滿足
### 使用場景

1. **明確類型**: 在不確定變數的類型或希望明確表達意圖時使用類型注釋。
 
2. **輔助工具**: 使用類型注釋可以讓編輯器提供更多的輔助工具，如自動完成和即時錯誤檢查。

3. **文檔替代**: 良好的類型註釋可以部分替代文檔，讓代碼更具可讀性。
   
以下是一些常見的類型注釋的範例：

1. **變數的類型注釋**:
    ```typescript
    let age: number = 30;
    let firstName: string = "John";
    let isActive: boolean = true;
    let ids: number[] = [1, 2, 3];
    ```
1. **對象 (Object) 的類型注釋**:
    ```typescript
    let person: { name: string, age: number } = {
        name: "John",
        age: 30
    };
    ```
1. **函數參數和回傳值的類型注釋**:

    當然可以。在 TypeScript 中，對於函式 (Function) 的類型注釋 (Type Annotation) 要考慮到不僅僅是參數和回傳值，還有可能涉及到可選參數、默認參數、剩餘參數等。

    讓我列舉一些常見的函式注釋的方式：

    #### 1. 基本的函式注釋

    參數跟回傳值分別注釋

    ```typescript
    function add(a: number, b: number): number {
        return a + b;
    }
    ```

    #### 2. 函式表達式的類型注釋

    先注釋後賦值 (function....)

    ```typescript
    const multiply: (x: number, y: number) => number = function(x, y) {
        return x * y;
    };
    ```
    箭頭函式
    ```ts
    const add: (a: number, b: number) => number = (a, b) => a + b;
    ```
    
    #### 3. 可選參數

    使用 `?` 來標記一個函式的參數為可選的：

    ```typescript
    function printName(firstName: string, lastName?: string): void {
        if (lastName) {
            console.log(`${firstName} ${lastName}`);
        } else {
            console.log(firstName);
        }
    }
    ```

    #### 4. 默認參數

    默認參數自動被視為可選的，且不需要使用 `?`：

    ```typescript
    function greet(name: string = "User"): void {
        console.log(`Hello, ${name}!`);
    }
    ```

    #### 5. 剩餘參數 (Rest Parameters)

    JS可以使用 `...` 來指定一個剩餘參數，該參數將收集多餘的參數成為一個陣列 (Array)，由於「剩餘參數」永遠是一個陣列，所以類型注釋將會是某種陣列類型：

    ```typescript
    function sumAll(...values: number[]): number {
        return values.reduce((prev, current) => prev + current, 0);
    }
    ```

    #### 6. 函式重載(Function Overloading)

    TypeScript 允許你為單個函式定義多種類型，這稱為函式重載：

    ```typescript
    function display(value: string): void;
    function display(value: number): void;
    function display(value: any): void {
        console.log(value);
    }
    ```
    
    TypeScript 中的函式重載在概念上與 Java 和其他多數的物件導向程式語言非常相似。在這些語言中，你可以為同一函式名稱提供多個定義，但這些定義的參數類型或數量必須有所不同。當你呼叫這個函式時，編譯器或執行環境會基於提供的參數選擇合適的定義來執行。
    
    在 TypeScript 中，函式重載 (Function Overloading) 允許你為單一函式名稱定義多種簽名 (signatures)，這意味著你可以根據不同的參數列表提供多個函式版本。函式重載允許我們設計更靈活的 API 和函式，以處理不同類型或數量的參數。

    不過，要注意的是，TypeScript 的函式重載有些微妙的差異。在 TypeScript 中，**你提供的所有函式定義只是簽名，真正的實作只能有一個，並且需要透過條件檢查來處理不同的參數情況**。
    - #### 如何使用函式重載

      1. **定義函式的所有簽名**  
      首先，我們會先定義函式的所有可能的簽名，但不會給它們提供具體的實現。

      2. **提供一個總的函式實現**  
      接著，我們提供一個函式實現，這個實現通常具有 `any` 類型的參數，並根據不同的參數類型或數量進行不同的操作。

     - #### 函式重載的範例

        ```typescript
        // 定義簽名
        function display(value: number): void;
        function display(value: string): void;
        function display(value: boolean): void;

        // 提供總的函式實現
        function display(value: any): void {
            if (typeof value === "number") {
                console.log(`Your number is: ${value}`);
            } else if (typeof value === "string") {
                console.log(`Your string is: "${value}"`);
            } else if (typeof value === "boolean") {
                console.log(`Your boolean is: ${value}`);
            }
        }

        // 使用函式重載
        display(42);          // 輸出: Your number is: 42
        display("Hello");    // 輸出: Your string is: "Hello"
        display(true);       // 輸出: Your boolean is: true
        ```

    - #### 注意事項

      1. **簽名的順序**：當多個簽名都可以符合呼叫時，TypeScript 會選擇第一個匹配的重載。因此，通常你應該將最具體的重載放在最前面，將最不具體的重載放在最後面。

      2. **實際函式的參數類型**：實際函式（也就是最後提供的那個函式）的參數類型通常是 `any` 或是其他簽名的聯合類型。
  你提到的是一個很好的問題。確實，在 TypeScript 中，我們可以使用聯合類型 (Union Types, 透過 `|` 符號) 來表達一個值可能是多種類型之一。然而，使用函式重載和使用聯合類型有其各自的場景和優勢。

   - #### 函式重載與聯合類型比較：

      當一個參數或變數可以是多種類型之一，而你的函式內部邏輯會基於該類型來做不同的處理時，聯合類型很有用。例如：

      ```typescript
      function processInput(input: string | number) {
          if (typeof input === "string") {
              // 處理字串
          } else {
              // 處理數字
          }
      }
      ```


      函式重載在以下情況可能更有優勢：

      1. **清晰的 API 設計**：當你希望你的函式根據不同的參數類型或數量有完全不同的行為時，函式重載提供了一種明確和有組織的方式來定義這些行為。

      2. **不同的回傳類型**：使用函式重載，你可以根據提供的參數類型指定不同的回傳類型。使用聯合類型做不到這一點。例如：

      ```typescript
      function getValue(key: "name"): string;
      function getValue(key: "age"): number;

      function getValue(key: string): any {
          if (key === "name") {
              return "Alice";
          } else if (key === "age") {
              return 30;
          }
      }
      ```

      3. **提供更多的靜態檢查**：當你的函式支援多種簽名時，使用函式重載可以確保每個簽名都被正確地使用。

      儘管在某些情況下，使用聯合類型可能更簡單和直接，但函式重載提供了更多的彈性和明確性，尤其是在設計複雜的 API 或庫時。當然，選擇使用哪種方法取決於特定的需求和場景。

##  TypeScript 中較常見的高級特性：

1. **Enum（列舉型別）**
   - 定義一組命名的常數。
   ```typescript
   enum Color {
       Red,
       Green,
       Blue
   }
   let c: Color = Color.Green;
   ```

2. **Union Types（聯合類型）**
   - 讓一個值可以是多種類型之一。
   ```typescript
   let value: string | number | boolean;
   ```

3. **Type Aliases（類型別名）**
   - 提供給現有模型一個不同的名稱。
   ```typescript
   type StringOrNumber = string | number;
   ```

4. **Literal Types（文字類型）**
   - 具體定義值必須是某個確切的值。
   ```typescript
   type Direction = "North" | "South" | "East" | "West";
   ```

5. **Intersection Types（交叉類型）**
   - 讓一個值同時滿足多個類型。
   ```typescript
   type CombinedType = TypeA & TypeB;
   ```

6. **Mapped Types（映射類型）**
   - 根據已存在的類型，創建新類型的方式。這是通過「對原始類型的每一個屬性進行某種操作」來完成的。
    考慮以下代碼：
    ```typescript
    type mapType <T> = {
       [P in keyof T]: T[P];
    }
    ```

    1. **`T`**：這是一個泛型參數，代表你將要轉換的原始類型。
    2. **`[P in keyof T]`**：這是映射類型的核心。`keyof T` 會獲取 `T` 的所有屬性的名稱，然後我們用 `P in ...` 來迭代每一個屬性。
    3. **`: T[P]`**：這會「查詢」T 中屬性 P 的類型。例如，假設 T 是 { name: string, age: number }，且 P 為 name，那麼 T[P] 就會是 string。
   - 範例1：
        ```typescript
        type ReadOnly<T> = {
            readonly [P in keyof T]: T[P];
        }

        type Person = {
            name: string;
            age: number;
        }

        type ReadOnlyPerson = ReadOnly<Person>;
        ```

        `ReadOnlyPerson` 會是以下的形式：

        ```typescript
        type ReadOnlyPerson = {
            readonly name: string;
            readonly age: number;
        }
        ```

        所以，`ReadOnly` 映射類型允許你從任何類型 `T` 創建一個新類型，新類型的每個屬性都是只讀的，但其他方面與原始類型相同。
    - 範例2：
        ```typescript
        type toString<T> = {
            readonly [P in keyof T]: string;
        }
        type Person = {
            name: string;
            age: number;
        }

        type newPerson = ReadOnly<Person>;
        ```

        `newPerson` 會是以下的形式：

        ```typescript
        type newPerson = {
            readonly name: string;
            readonly age: string;
        }
        ```

7. **Conditional Types（條件類型）**
   - 在類型級別上使用條件表達式。
   ```typescript
   type TypeName<T> =
       T extends string ? "string" :
       T extends number ? "number" :
       "object";
   ```

8. **Utility Types（工具類型）**
   - TypeScript 提供了一系列的內建工具類型，這些工具類型可以幫助你進行常見的類型轉換。 

    - **`Partial<T>`**: 使 `T` 中的所有屬性變為可選。
      ```typescript
      type SomeType = { a: number, b: string };
      type SomeTypePartial = Partial<SomeType>;  // { a?: number, b?: string }
      ```

    - **`Readonly<T>`**: 使 `T` 中的所有屬性變為 `readonly`。
      ```typescript
      type SomeTypeReadonly = Readonly<SomeType>;  // { readonly a: number, readonly b: string }
      ```

    - **`Record<K, T>`**: 創建一個類型，其屬性名稱為 `K`，且值的類型為 `T`。
      ```typescript
      type StringDictionary = Record<string, string>; // {[key:string]: string}
      ```

    - **`Pick<T, K>`**: 從 `T` 中選擇一組屬性 `K`。
      ```typescript
      type SomeTypePick = Pick<SomeType, 'a'>;  // { a: number }
      ```

9.  **Generics（泛型）**
       - 讓你定義可重用的組件，這些組件可以與多種類型一起工作，而不是單一的類型。
    ```typescript
    function identity<T>(arg: T): T {
        return arg;
    }
    ```

10. **Type Guards（類型保護）**

    在 TypeScript 中，類型保護是一種在特定範疇或條件分支內確定變數類型的方式。它對於縮小聯合類型（例如：`Fish | Bird`）非常有用，使你能夠明確知道某個範疇中的變數是什麼類型。

    #### 類型保護的方法：

    a. **`typeof` 類型保護**：當你需要區分基本類型（例如 `string`, `number`, `boolean`）時。

    ```typescript
    if (typeof someVariable === "string") {
        // 在這裡, someVariable 是 string 類型
    }
    ```

    b. **`instanceof` 類型保護**：當你要區分類的實例時。

    ```typescript
    class Fish {
        swim() {}
    }
    
    class Bird {
        fly() {}
    }
    
    if (pet instanceof Fish) {
        pet.swim();  // 在這裡, pet 是 Fish 類型
    }
    ```

    c. **用函式實現類型保護**：自定義類型保護函式，當內建的方法不足夠時，可以使用更複雜的邏輯來確定類型。
    
    定義一個函式，該函式的返回類型使用了類型預測（Type Predicate）。

    ```typescript
    // 範例1
    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
    }
    
    if (isFish(pet)) {
        pet.swim();  // 在這裡，TypeScript 知道 pet 是 Fish 類型
    } else {
        pet.fly();   // 在這裡，TypeScript 知道 pet 是 Bird 類型
    }
    
    // 範例2
    function hasSwimMethod(obj: any): obj is { swim: Function } {
        return !!obj && typeof obj.swim === 'function';
    }
    
    if (hasSwimMethod(pet)) {
        pet.swim();  // 在這裡, pet 有 swim 方法
    }
    ```
    範例1代碼中有兩個重要概念：類型斷言和類型預測（Type Predicate）。
    - **(pet as Fish).swim**: 
      - 這是類型斷言。試圖確定 pet 是否是 Fish 類型。
      - `(pet as Fish)` 我們假設 pet 是 Fish 並嘗試訪問 .swim 屬性。
      - `(pet as Fish).swim !== undefined` 如果 pet 有 swim 屬性，這個函式就會返回 true。
     - **pet is Fish**: 
       - 類型預測（Type Predicate）。如果此函式返回 true，則表示 pet 確實是一個 Fish。
       - 這表示該函式的返回值將「保護」pet 是 Fish 類型。

    d. **使用 Literal 類型**：這是當你有一個屬性或值，它可以用來確定變數的具體類型。

    ```typescript
    type Animal = { kind: "fish", swim: Function } | { kind: "bird", fly: Function };
    
    if (animal.kind === "fish") {
        animal.swim();  // 在這裡, animal 是 { kind: "fish", swim: Function } 類型
    }
    ```
       
## 判斷事件類型
在 React 與 TypeScript 的結合使用中，有幾種常用的方式來判斷事件類型：

- ### `instanceof`

  通過 `instanceof` 來判斷對象是否是某個構造函數的實例。但需要注意的是，在 React 中，原生的 DOM 事件和 React 的合成事件（Synthetic Event）不是同一個類型，所以這個方法不適用於 React 的合成事件。

  ```tsx
  if (e instanceof MouseEvent) {
    // ...
  } else if (e instanceof KeyboardEvent) {
    // ...
  }
  ```

- ### 屬性檢查（Property Checking）

  使用 `in` 運算符來檢查某個屬性是否存在於事件對象中。

  ```tsx
  if ('button' in e) {
    // MouseEvent
  } else if ('key' in e) {
    // KeyboardEvent
  }
  ```

- ### `type` 屬性

  某些事件對象會有一個 `type` 屬性，這個屬性會包含一個字串，用來表示事件的類型。

  ```tsx
  if (e.type === 'click') {
    // MouseEvent
  } else if (e.type === 'keydown') {
    // KeyboardEvent
  }
  ```

- ### `nativeEvent`

  React 的合成事件對象包含一個 `nativeEvent` 屬性，這個屬性會指向原生的 DOM 事件對象。你可以透過這個屬性來進一步判斷事件類型。

  ```tsx
  if (e.nativeEvent instanceof MouseEvent) {
    // ...
  } else if (e.nativeEvent instanceof KeyboardEvent) {
    // ...
  }
  ```

- ### 自定義屬性（Custom Attributes）

  在某些情況下，你也可以在 JSX 元素上添加自定義的 data 屬性，然後在事件處理函式中使用這些屬性來判斷事件的類型或來源。

  ```tsx
  <button data-event-type="mouse" onClick={handleEvent}>Click Me</button>
  <input data-event-type="keyboard" onKeyDown={handleEvent} />
  ```

  在 `handleEvent` 中：

  ```tsx
  const eventType = e.currentTarget.getAttribute('data-event-type');
  if (eventType === 'mouse') {
    // MouseEvent
  } else if (eventType === 'keyboard') {
    // KeyboardEvent
  }
  ```

### 最推薦的方法取決於你的具體需求，但一般來說，**`屬性檢查（Property Checking）`** 是一個相對簡單和可靠的方法。

### 優點：

- 這個方法不依賴於實例的具體類型，因此即使在 React 的合成事件（Synthetic Event）和原生 DOM 事件之間，也能正確工作。
- 它的實現也相對簡單，不需要對事件對象進行過多的檢查或操作。

### 範例：

```tsx
if ('button' in e) {
  // 處理鼠標事件（MouseEvent）
} else if ('key' in e) {
  // 處理鍵盤事件（KeyboardEvent）
}
```

這種方法在多數情況下都能夠有效地區分不同類型的事件，而且實現起來也相對簡單。







