## theme/index.tsx
這個程式碼是一個 React（React.js） 的檔案，主要是為了提供一個`「高階組件（Higher-Order Component, HOC）」`稱為 `withTheme`。這個高階組件使用了 `antd`（Ant Design）的 `ConfigProvider` 組件來自訂應用程式的主題。

1. **withTheme 函數**  
    `withTheme` 是一個函數，接受一個 JSX 元素（稱為 `node`）作為參數。這個函數返回一個包裹在 `ConfigProvider` 中的 JSX 元素。
   - **高階組件（Higher-Order Component, HOC）**
       - `withTheme` 是一個 HOC。在 React 中，HOC 是一個接受組件並返回新組件的函數。在這個例子中，`withTheme` 接受一個 JSX 元素（`node`），並將它包裹在一個 `ConfigProvider` 組件中。
   - **ConfigProvider**
       - `ConfigProvider` 是 Ant Design 提供的一個組件，用於全局配置 Ant Design 組件的行為。
       - 在這個程式碼裡，`ConfigProvider` 被用來自訂各種 UI 組件的主題，例如設定顏色、邊框、字體大小等。
2. **主題設定（Theme Configuration）**  
    在 `ConfigProvider` 內，
    - `token`: 這是一個更全局性的設定，例如主要的顏色（`colorPrimary`）和邊框（`borderRadius`）。
    - `components`: 這裡定義了各個 Ant Design 組件的特定設定。例如，`Menu` 的背景顏色、`Breadcrumb` 的文字顏色、`Select` 的選定項目背景顏色等。