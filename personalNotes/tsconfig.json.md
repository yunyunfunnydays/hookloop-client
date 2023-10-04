## `tsconfig.json` 

這個 `tsconfig.json` 檔案是安裝 ts 時自動生成，用來設定 TypeScript 編譯器（Compiler）的選項。

#### `compilerOptions`
這是一個物件，內含多個 TypeScript 編譯器的設定選項。

- `target`: `es5`  
  目標 ECMAScript 版本。這個設定會將 TypeScript 編譯成 ES5 版本的 JavaScript。

- `lib`: `["dom", "dom.iterable", "esnext"]`  
  指定哪些程式庫（Library）的定義檔要被包含在編譯過程中。

- `allowJs`: `true`  
  允許 `.js` 檔案被編譯。

- `skipLibCheck`: `true`  
  跳過函式庫檔案的型別檢查（Type Checking）。

- `strict`: `true`  
  啟用所有嚴格的型別檢查選項。

- `forceConsistentCasingInFileNames`: `true`  
  強制檔名的大小寫必須一致。

- `noEmit`: `true`  
  不輸出任何編譯後的檔案。

- `esModuleInterop`: `true`  
  啟用 ECMAScript和 CommonJS 模組間的相容性。。
  > ECMAScript（簡稱 ES，JavaScript 的標準規格）中原生支援的模組系統。在 ES 模組中，你可以使用 import 和 export 語句來導入（import）和導出（export）變數、函數、類（class）等。

- `module`: `esnext`  
  告訴 TypeScript 編譯器要使用哪一種模組格式。"esnext" 表示使用最新的 ECMAScript 模組語法。

- `moduleResolution`: `node`  
  定義了 TypeScript 如何在文件系統中解析模組。設定為 "node" 表示遵循 Node.js 的模組解析算法，這對於大多數 JavaScript 項目來說是合適的。

- `resolveJsonModule`: `true`  
  允許導入 JSON 模組。

- `isolatedModules`: `true`  
  確保每個檔案都像獨立模組那樣被轉換。

- `jsx`: `preserve`  
  保留 JSX 語法，不會將其轉換。

- `incremental`: `true`  
  使用增量編譯。TypeScript 編譯器會儲存一些資訊，使得下一次編譯可以更快完成。這通常會增加一個 .tsbuildinfo 文件來儲存這些資訊。

- `paths`: `{ "@/": ["./src/*"] }`  
  為模組指定別名`alias`和路徑。

#### `include`
指定哪些檔案要被包含在編譯過程中。

#### `exclude`
指定哪些檔案要被排除在編譯過程之外。

