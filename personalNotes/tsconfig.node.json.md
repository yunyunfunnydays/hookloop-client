## tsconfig.node.json
這個檔案是由手動生成。
> 設定在 package.json 中，在執行 ./scripts/genAntdCss.tsx 這個 TypeScript 檔案時，採用 tsconfig.node.json 中定義的編譯選項。這是為了生成某些 Ant Design 的 CSS。

在這個 `tsconfig.node.json` 設定檔中，主要的 TypeScript 編譯選項如下：

- `strictNullChecks`: 啟用嚴格的 null 檢查。
- `module`: 設定模組系統，這裡是使用 `NodeNext`。是一個相對較新的模組系統設定，主要用於 Node.js 環境。它允許你使用最新的 ECMAScript 模組特性。
- `jsx`: JSX 的處理方式，這裡是使用 React。設為 react 會生成適用於 React 的 JSX 代碼。
- `esModuleInterop`: 允許更方便地與 CommonJS 模組互操作。

`include` 字段則指定哪些文件需要被 TypeScript 處理。

這樣做的可能原因：

1. **獨立設定**：這個 `tsconfig.node.json` 可能是專為執行 Node.js 腳本而設，與主專案有不同的 TypeScript 編譯需求。
2. **模組系統**：由於使用了 `NodeNext`，這可能暗示腳本需要使用一些 Node.js 獨有或最新的模組系統特性。
3. **嚴格檢查**：`strictNullChecks` 的啟用可能是為了確保腳本在執行時能更穩定、更少出錯。

### `strictNullChecks` 的限制

當你在 TypeScript 的 `tsconfig.json` 配置檔中設定了 `strictNullChecks: true`，編譯器會對 `null` 和 `undefined` 進行更嚴格的檢查。具體來說，`null` 和 `undefined` 將不會被認為是其他型別（如 `string`, `number`, `object` 等）的一部分，除非你明確地指定。

這會影響到以下幾個方面：

1. **變數初始化**：變數如果沒有初始化，你不能將 `null` 或 `undefined` 賦值給它，除非該型別明確包括了 `null` 或 `undefined`。

    ```typescript
    let a: string = null;  // 錯誤
    let b: string | null = null;  // 正確
    ```

2. **函數參數和回傳值**：函數的參數和回傳值也需要明確指出是否可以為 `null` 或 `undefined`。

    ```typescript
    function greet(name: string | null) {
      if (name === null) {
        return "Hello, Guest!";
      }
      return "Hello, " + name;
    }
    ```

3. **物件屬性**：對於物件的屬性也是一樣，需要明確指出是否可以為 `null`。

    ```typescript
    type User = {
      name: string;
      age: number | null;
    };
    ```

4. **選項性屬性和參數**：如果某個屬性或參數是選項性的，它會自動被賦予 `undefined` 型別。

    ```typescript
    type Config = {
      name: string;
      port?: number;  // 等價於 `number | undefined`
    };
    ```

5. **陣列和元組（Tuple）**：陣列和元組中的元素也需要明確指定是否可以包含 `null` 或 `undefined`。

    ```typescript
    let arr: (string | null)[] = ["a", "b", null];
    ```

開啟 `strictNullChecks` 主要是為了增加程式碼的可靠性，它能夠幫助開發者在編譯階段就捕捉到可能的 `null` 或 `undefined` 相關錯誤，減少運行時出錯的風險。
