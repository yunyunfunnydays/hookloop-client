## package.json
這是一個 `package.json` 檔案，主要用於配置 Node.js 專案。

### 基本資訊
- `name`: 專案名稱，叫做 "hookloop"。
- `version`: 專案版本，目前是 0.1.0。
- `private`: 設為 true 代表這個專案不會被公開到 npm。
- `description`: 專案描述，這是一個使用 Next.js 和 Typescript 的前端（Front-End）專案。
- `repository`: 專案的 GitHub 倉庫（Repository）位置。
- `author`: 專案的作者名稱。
- `engines`: 設定專案在哪個 Node 版本下執行。

### 腳本（Scripts）
這些是可以用 `npm run <script_name>` 執行的命令。
- `dev`: 這個命令用於啟動開發伺服器，使用 Next.js 的 `dev` 模式。Next.js 會自動查詢 pages 下的 index.js/ts 檔案作為進入點
- `predev`: 在啟動開發模式之前，用 `ts-node` 執行 `./scripts/genAntdCss.tsx`。為了在執行 ./scripts/genAntdCss.tsx 這個 TypeScript 檔案時，採用 tsconfig.node.json 中定義的編譯選項。這可能是為了生成某些 Ant Design 的 CSS。
- `prebuild`: 在建立生產版本前，設定環境變數（NODE_ENV）並執行相同的 `genAntdCss.tsx` 腳本。
- `build`: 建立生產版本。
- `start`: 啟動已經建立的生產版本。
- `lint`: 使用 Next.js 的內建 lint 命令進行代碼檢查。
- `format`: 使用 Prettier 進行代碼格式化。
- `commit`: 使用 Commitizen（簡寫為 `cz`）協助產生 commit 訊息。
- `changelog`: 使用 `conventional-changelog` 生成變更日誌（Changelog）。
- `prepare`: 安裝 Husky，可能用於 Git hooks。

### 依賴（Dependencies）
這裡列出了專案需要的 npm 套件。
- 例如：`antd` 是 Ant Design UI 框架，`axios` 用於 HTTP 請求。

### 開發依賴（DevDependencies）
這些套件在開發時使用，但在生產環境不需要。
- 例如：`eslint` 用於代碼檢查，`typescript` 是 TypeScript 編譯器。

- 與 commit 相關的依賴包括：
  - @commitlint/cli: 這是 CommitLint 的命令行界面（CLI），用於檢查 Git commit 訊息是否符合預定的格式規範。
  - @commitlint/config-conventional: 這是一個標準的 CommitLint 設定，通常用於檢查是否符合“傳統的”（conventional）commit 訊息格式。
  - commitizen: 這個工具協助用戶生成符合特定格式的 commit 訊息。
   -  cz-conventional-changelog: 這是一個用於 Commitizen 的 adapter，它協助生成符合“傳統的”commit 訊息格式。
  - commitlint: 這也是 CommitLint 的一部分，但通常用作本地或 CI/CD（持續整合/持續部署）環境中的一個模塊。
   -  husky: 雖然不是直接與 commit 訊息相關，但它允許你設定 Git hooks，這樣你可以在每次 commit 或 push 之前自動運行某些命令，例如代碼檢查或測試。
    > 這些工具在多人協作的專案中尤其有用，因為它們確保了 commit 訊息的一致性和可讀性，這對於代碼審查和版本控制非常重要。
### 設定（Config）
這部分主要用於設定 Commitizen，一個協助製作符合慣例的 Git commit 訊息的工具。





