# 進入點

## 1. `import type { AppProps } from "next/app";`

這一行是從 `next/app` 匯入一個 TypeScript 的型別 (type) 叫做 `AppProps`。在 Next.js 中，`_app.tsx` 或 `_app.js` 檔案是一個特殊的文件，它允許你自定義一個 `App` 組件來覆蓋預設的 Next.js 的行為。`AppProps` 是該組件所接受的屬性 (props) 的型別。

## 2. `import Router, { useRouter } from "next/router";`

這一行是從 `next/router` 匯入 `Router` 和 `useRouter`。

- `Router`:
  - 這是 Next.js 的客戶端路由器 (client-side router) 的物件。
  - 你可以使用它來執行像是頁面轉址 (`Router.push('/path')`) 這樣的動作。提供客戶端路由的功能，如導航到新頁面或替換當前頁面。
  - 主要方法有：
    - push(url, as, options): 導航到新的URL。
    - replace(url, as, options): 替換當前的URL。
    - prefetch(url): 預加載給定的URL，這對於性能優化特別有用。

   ```tsx
     import Router from 'next/router';

     function redirectToHome() {
       Router.push('/home');
     }
     ```

- `useRouter`:
  - 這是一個 React 的 hook。它返回當前的路由對象。
  - 當你在一個組件內部想要存取當前的路由資訊時 (例如網址, 查詢參數等)，你可以使用這個 hook。提供當前的路由對象。
  - 其中包括了許多有用的屬性，如
    - pathname(當前的路徑)
    - query(查詢參數)
    - asPath(顯示在瀏覽器地址欄的實際路徑)等。

   ```tsx
     import { useRouter } from 'next/router';

     function MyComponent() {
       const router = useRouter();
       console.log(router.pathname);  // 當前的路徑
       console.log(router.query);    // 查詢參數，例如 { id: '123' } 
     }
     ```

## Next.js 的路由系統

在 Next.js 中，路由是基於 `pages` 資料夾內的檔案結構。例如，`pages/about.tsx` 會對應到 `/about` 的路徑。這種基於檔案系統的路由方法使得建立頁面非常直覺且簡單。

- 動態路由 (dynamic routes)：
  
  在 Next.js 中，動態路由允許你為變數路徑創建頁面。例如，如果你想要為每篇部落格文章創建一個頁面，你可以使用動態路由。

  **如何使用**: 在 `pages` 資料夾中，使用方括號 (`[]`) 包住動態部分。例如: `pages/posts/[id].tsx`。
  當用戶訪問 `/posts/123`，則 `[id].tsx` 將被渲染，並且你可以透過 `useRouter` 來獲取該 `id`。

  ``` ts
    import { useRouter } from 'next/router';
    function PostPage() {
      const router = useRouter();
      const { postId } = router.query;
      return <div>Post ID: {postId}</div>;
    }
  ```

- 捕獲路由 (catch-all routes)

  捕獲路由允許你匹配多段路徑。例如，如果你想要匹配所有 `/a/b/c` 形式的路徑，無論路徑有多少段。

  **如何使用**: 使用三個點 (`...`) 在方括號內。例如: `pages/[...params].tsx`。

  如果用戶訪問 `/a/b/c`，`[...params].tsx` 將被渲染，並且 `params` 會是一個陣列 `['a', 'b', 'c']`。

  當你在一個資料夾內使用捕獲路由，該路由會匹配該資料夾以下的所有路徑段。讓我透過一個範例來說明這個情境。

  假設在 `pages` 資料夾下，你有以下的檔案和資料夾結構：

  ``` md
  pages/
  ├── blog/
  │   ├── [...slug].tsx
  ```

    ### 範例
  1. **單一路徑段**:
     - 使用者訪問 `/blog/a`
     - `blog/[...slug].tsx` 被渲染
     - 在組件內部，`router.query.slug` 將返回 `['a']`
     
  2. **多個路徑段**:
      - 使用者訪問 `/blog/a/b/c`
      - `blog/[...slug].tsx` 被渲染
      - 在組件內部，`router.query.slug` 將返回 `['a', 'b', 'c']`
  
  3. **在組件中的使用**:

        ```tsx
        import { useRouter } from 'next/router';

        function BlogSlugPage() {
          const router = useRouter();
          const { slug } = router.query;

          return <div>Blog Slug: {slug?.join('/')}</div>;
        }
        ```

      在上述情況下，當使用者訪問任何 `/blog/*` 下的路徑時，`blog/[...slug].tsx` 都會被渲染，而且你可以透過 `router.query.slug` 獲取 `/blog/` 以下的所有路徑段。這種設置方法允許你在特定資料夾內使用捕獲路由，從而更加組織和細分你的路由結構。

## 沒有命名視圖 (Named Views)

在 Vue.js 中，當你有多個 `<router-view>` 在一個頁面上，並想在不同的 `<router-view>` 內展示不同的組件時，你會使用命名視圖。

Next.js 的路由系統與 Vue.js 的路由系統是有所不同的。在 Next.js 中，路由基於 `pages` 資料夾的檔案結構，並且每個路徑都對應到一個特定的頁面組件。因此，Next.js 本身不支援像 Vue.js 那樣的命名視圖。

但是，如果你想在 Next.js 中達到類似的效果，你可以採用以下方法：

1. **使用局部狀態 (Local State)**: 在頁面內部，你可以使用 React 的狀態來控制各個區塊的內容，例如使用 `useState` 或 `useReducer`。

2. **子路由**: 你可以使用 Next.js 的動態路由，並在頁面內部根據路由的參數來決定哪一部分的內容應該被展示或隱藏。
