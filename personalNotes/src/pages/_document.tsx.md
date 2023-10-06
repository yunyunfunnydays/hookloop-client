## Front Page

``` typescript
import Head from "next/head";
import Image from "next/image";
```
1. `Head`：
   - `Head` 元件 (component) 用於在 Next.js 的 React 應用中插入 `<head>` 標籤內的元素，如 `<meta>`, `<link>` 等。
   - Next.js 不需要 HTML 檔案作為進入點是因為它主要是基於 React，並使用 JavaScript 來描述 UI，因此不需要單獨的 HTML 文件。

2. `Image`：
   - `Image` 元件是 Next.js 提供的一個特性，可以自動優化圖片加載的效能。
   - `Image` 元件會參考 `nextConfig` 中的 `images` 設定。本專案的設定是允許從特定的遠端伺服器加載圖片。
  ***
```typescript
import type { MenuProps } from "antd"
```
- `import type`：
  - 
   - 使用 `import type` : 在 TypeScript 中，當你只想引入一個型別，而不是真正的值或模組時，你可以使用 import type。使用此方法可以確保 TypeScript 只將它視為型別，而不是實際的值。這在編譯後的 JavaScript 代碼中，不會有任何的副作用，因為型別在編譯過程中會被移除。

   - **類型 vs 值**：
     - **類型 (Type)**：在 TypeScript 中，類型是描述變量、函數等的形狀或數據結構。例如，`string`、`number` 和 `boolean` 都是基本的類型。當你有一個自定義的物件或函數，你也可以定義它的類型。
     - **值 (Value)**：是代碼中的實際數據或功能。例如，`const name = "John";` 中的 `"John"` 就是一個值，而 `name` 的類型是 `string`。
   使用 `import type` 可以僅僅導入一個模組的類型，而不是它的值。這在你只需要用到某些類型信息時很有用。
    - **有類型又有值的型別**：在 TypeScript 中，大多數型別設計都是在編譯時期進行檢查，並且不會轉換成 JavaScript 運行時的代碼。但是，有些 TypeScript 語言結構不僅僅提供型別資訊，還會在編譯成 JavaScript 時產生運行時的代碼。以下是主要的幾個：

        1. **`enum`**:
           - 如前所述，`enum` 會在 TypeScript 轉換成 JavaScript 時產生運行時的對象。這個對象可以用於查找枚舉名稱和值。

        2. **`class`**:
           - TypeScript 的 `class` 結構在編譯時不僅僅是型別。它還會轉換為 JavaScript 的 `class` 或相對應的原型鍊，具體取決於目標 ECMAScript 版本。

        3. **`namespace`** (以前稱為 `module`):
           - 在 TypeScript 中，`namespace` 可以用來組織程式碼。當編譯成 JavaScript 時，它會變成一個即時執行的函數（IIFE）或其他模組模式，具體取決於配置。

        其他常見的 TypeScript 語言特性，如 `interface`、`type` 定義等，僅在編譯時存在，不會產生運行時的 JavaScript 代碼。

        要注意的是，當編譯 TypeScript 成 JavaScript 時，只有真正具有運行時行為的語言結構（例如 `class` 和 `enum`）才會出現在輸出的 JavaScript 中。

   - **為什麼要用 type**?
      - 清晰性: 顯式地使用 import type 使得程式碼閱讀者知道這是一個型別的引入，而不是值。

      - 編譯優化: 
        - 在 TypeScript 中，型別是在編譯時進行檢查的，並且不會出現在編譯後的 JavaScript 輸出中。所以，不論你使用哪種導入方法，MyType 都不會在編譯後的 JavaScript 中出現。
        - 但使用 import type 可以確保 TypeScript 編譯器不會將 MyType 視為運行時的值。這意味著如果你不小心在程式碼中嘗試使用它作為運行時的值，`例如將 import type 引入的 class 做 extend，或將 num 作為物件取值時`，TypeScript 會報告一個錯誤。
  
          ```ts
          // colors.ts
          export enum Colors {
            Red = "#FF0000",
            Green = "#00FF00",
            Blue = "#0000FF"
          }

          // main.ts
          import { Colors } from './colors';
          function setBackgroundColor(color: Colors) {
            document.body.style.backgroundColor = color;
          }
          setBackgroundColor(Colors.Blue);// 輸出: #0000FF

          import type { Colors } from './colors';
          setBackgroundColor(Colors.Blue); // 報錯
          ```
***
```ts
const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.info("click", e);
  };

const items: MenuProps["items"] = [
  {
    label: "English",
    key: "en",
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};
```
``` tsx
  <Dropdown menu={menuProps} className="w-[210px] md:w-[140px]">
    <Button className="flex items-center justify-between">
      English
      <DownOutlined />
    </Button>
  </Dropdown>
```
- `menuProps`：
  - 
  - 進到 menuProps >> RcMenuProps 的檔案
    ```ts
    export interface MenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onClick' | 'onSelect' | 'dir'> {
    prefixCls?: string;
    rootClassName?: string;
    items?: ItemType[];
    /** @deprecated Please use `items` instead */
    children?: React.ReactNode;
    disabled?: boolean;
    /** @private Disable auto overflow. Pls note the prop name may refactor since we do not final decided. */
    }
    declare const Menu: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<MenuRef>>;
    export default Menu;
    ```
    ---

    ### 1. `MenuProps extends Omit<...>`

    #### `Omit`

    `Omit` 是 TypeScript 中的一個工具類型 (utility type)，它可以用來創建一個省略特定屬性的物件類型。這允許你從一個既有的類型中創建一個新的類型，而新的類型中不會有某些指定的屬性。

    例如：

    ```typescript
    type OldType = {
      a: string;
      b: number;
      c: boolean;
    };

    type NewType = Omit<OldType, 'b'>;
    ```

    在這裡，`NewType` 就會是 `{ a: string; c: boolean; }`，它省略了 `b` 屬性。

    #### `<React.HTMLAttributes<HTMLUListElement>, 'onClick' | 'onSelect' | 'dir'>`

    這是在使用 `Omit` 時所提供的參數。

    - `React.HTMLAttributes<HTMLUListElement>`: 這是一個 React 的類型，它描述了一個 HTML 元素（在這裡是 `<ul>` 列表元素）的所有標準屬性。
      
    - `'onClick' | 'onSelect' | 'dir'`: 這些是你想要從上面的類型中省略的屬性名稱。

    所以，`MenuProps` 透過 `extends Omit<...>` 表示它是一個繼承了 `<ul>` 的所有屬性（除了 `onClick`, `onSelect`, `dir`）的新類型，並且還可以加入額外的屬性。

    ---

    ### 2. 註解 `/** @... */`

    這些註解是 JSDoc 格式，它們不僅提供說明，還可以被某些工具（如 TypeScript 或 IDE）解讀，以提供更好的開發體驗。

    - `@deprecated`: 表示這個屬性已被棄用，建議不要再使用。在上面的例子中，`children` 屬性已被棄用，建議使用 `items` 屬性代替。

    - `@private`: 表示這是一個私有屬性，通常是只供庫或框架的内部使用，不建議外部使用。

    ---

    ### 3. `declare const`

    #### `declare`

    在 TypeScript 中，`declare` 關鍵字用於聲明變量、類型、函數等的形狀或存在，但不實際為其提供具體的實現。這通常在 `.d.ts` 声明文件中看到，用於描述 JavaScript 库的類型信息。

    #### `const`

    在這裡的 `const` 不同於常見的常量宣告。當與 `declare` 一起使用時，它表示該值是不可變的。在這裡，`declare const Menu: ...` 是在說 `Menu` 是一個具有特定類型的不可變值，但不給出具體的實現或值。
    對的，這個 `Menu` 不是一個類型，而是一個具體的值或物件的宣告，並且該值或物件具有特定的類型。

    當我們使用 `declare` 是因為這裡只是宣告 `Menu` 的存在和其類型，但不提供具體的實現。這是一種在 TypeScript 中告知編譯器某物的存在，但實際的定義和實現可能在其他地方或非 TypeScript 的 JavaScript 檔案中。

    考慮以下情境：
    1. 你有一個現有的 JavaScript 库或模塊，這個庫提供了一個 `Menu` 函數或組件。
    2. 為了在 TypeScript 中使用這個 `Menu` 並獲得優質的類型檢查，你需要為它提供一個類型定義，但不需要（也不應該）重新定義或實現這個 `Menu`。
    3. 這時你就會使用 `declare const Menu: ...` 來告知 TypeScript：“這個 `Menu` 存在，它的類型是這樣... 但我不會在這裡提供它的具體實現”。

    如果你直接使用 `const Menu: ...` 而不加 `declare`，TypeScript 編譯器會期望你在當前的作用域中為 `Menu` 提供一個具體的值或實現。

    使用 `declare` 就是為了告知 TypeScript：“我知道這個東西存在，只是在這裡你看不到它的具體實現或值”。這讓你可以在 TypeScript 中描述和使用那些已經存在但不在當前檔案或作用域中的事物。

- `MenuProps["onClick"]`：
  - 
  - 在 TypeScript 中，當我們想要取得物件、類型、或接口內某一個屬性的類型時，可以使用 `TypeOrInterface["propertyName"]` 這種語法，這被稱為**索引類型查詢** (Indexed Type Query)。

    在此例子中：

    ```typescript
    const handleMenuClick: MenuProps["onClick"] = (e) => {
        console.info("click", e);
    };
    ```

    `MenuProps["onClick"]` 會取得 `MenuProps` 接口中 `onClick` 屬性的類型。由於在你給出的 `MenuProps` 中並沒有直接定義 `onClick`，但 `MenuProps` 擴展了 `RcMenuProps` 且省略了 `items` 屬性。因此，如果 `RcMenuProps` 中有一個 `onClick` 屬性，那麼 `MenuProps["onClick"]` 就會取得該屬性的類型。

    這種語法非常有用，特別是當你想要重用某一個接口或類型中特定屬性的類型時。

    舉個例子：

    ```typescript
    interface Person {
      name: string;
      age: number;
    }

    function printName(person: { name: Person["name"] }) {
      console.log(person.name);
    }
    ```

    在上面的例子中，`printName` 函數的參數只需要一個 `name` 屬性，且該屬性的類型要和 `Person` 接口中的 `name` 屬性相同。而不是直接使用 `Person` 接口，我們使用 `{ name: Person["name"] }` 這種方式來精確地描述我們想要的形狀。

    總之，這是 TypeScript 提供的一種方式，允許我們更精確地引用和重用既有類型中的特定屬性類型。