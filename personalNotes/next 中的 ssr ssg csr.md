## SSR、SSG、CSR 比較

- **SSG (Static Site Generation, 靜態網頁生成)**
    - 在建置時生成頁面。
    - 使用建置時的資料來渲染 HTML。
    - 當頁面被請求時，伺服器會提供預先生成的 HTML。
    - 優點：極快的首屏渲染速度，SEO 優化良好。
    - 可以透過客戶端 JS 與 API 互動來更新或取得即時資料。

- **SSR (Server Side Rendering, 伺服器端渲染)**
    - 每次頁面被請求時，伺服器都會實時渲染 HTML。
    - 在伺服器端，每次都會打 API 來取得最新資料並用該資料渲染頁面。
    - 優點：總是提供最新的內容，SEO 優化良好。
    - 缺點：可能會增加伺服器的負擔，每次請求可能需要更長的時間。

- **CSR (Client Side Rendering, 客戶端渲染)**
    - 伺服器只提供基本的 HTML 和 JS。
    - 客戶端 (瀏覽器) 負責運行 JS，並在執行時動態地渲染內容。
    - 一旦 JS 載入並執行，它可以打 API 來取得最新資料並渲染頁面。
    - 優點：伺服器負擔輕，可利用客戶端資源進行渲染。
    - 缺點：首次完整內容的顯示速度可能較慢，可能不利於 SEO。

所有三種方法（SSG, SSR, CSR）都可以透過 API 取得最新的資訊，所以它們的主要差異在於第一次渲染的方法和時機。

## 如何在 next.js 中設定如何渲染

你可以在 **Next.js** 的頁面文件中設定：
`getServerSideProps`、`getStaticProps` ，且只能在 `pages` 目錄中的檔案裡使用。這是因為只有 `pages` 目錄中的檔案代表著真正的路由，因此只有它們能定義如何在建置時獲取資料。

1. **SSR (伺服器端渲染)** - 使用 `getServerSideProps` 函數。

    ```tsx
    // pages/somePage.tsx

    function SomePage(props) {
      return <div>...</div>;
    }

    export async function getServerSideProps(context) {
      // 取得資料
      return { props: { /* your data here */ } };
    }

    export default SomePage;
    ```

2. **SSG (靜態網頁生成)** - 使用 `getStaticProps` 函數。

    ```tsx
    // pages/somePage.tsx

    function SomePage(props) {
      return <div>...</div>;
    }

    export async function getStaticProps(context) {
      // 取得資料
      return { props: { /* your data here */ } };
    }

    export default SomePage;
    ```

3. **如果專案中有用到上述函式，但有的頁面沒有設別設定，那麼頁面將默認使用客戶端渲染 (CSR)。**

4. **如果專案中沒有用到上述函式，則整個專案的每個頁面都預設為SSG。**
   - 在 **Next.js** 中，有一個特性稱為 "Automatic Static Optimization"（自動靜態優化）。當你的頁面沒有使用任何伺服器端資料獲取方法，如 `getServerSideProps` 或 `getInitialProps` 時，Next.js 會默認該頁面為完全靜態的，並在建置時自動預渲染該頁面成 HTML。

    - 這意味著以下情況：
      1. 如果你的頁面只是基於本地數據或沒有任何外部依賴進行渲染，Next.js 會自動將它視為靜態頁面。
      2. 當這樣的頁面被請求時，伺服器會直接提供在建置時生成的 HTML，而不需要進行任何額外的計算或數據獲取。
      3. 你不需要特別地設定或指定一個頁面為靜態。只要不使用上述的伺服器端資料獲取方法，頁面就會自動地被優化。

      這個特性使得 Next.js 能夠在沒有任何額外配置的情況下，自動提供出色的性能和快速的頁面載入速度。

    所以，即使你沒有明確地使用 `getStaticProps` 或其他靜態生成方法，但只要你的頁面沒有使用 `getServerSideProps` 或 `getInitialProps`，Next.js 仍會自動地將它視為靜態頁面並進行優化。


## 哪些元件會受影響?
路由中的元件也可匯出給其他元件使用，而渲染方式會已被使用處的路由為主，故會因該路油的渲染方式，而影響其取得的資料( props 值)

## 如何判斷一個 next.js 專案 是用 ssg 還是 ssr
在 **Next.js** 專案中，你可以通過以下方式來判斷一個頁面是使用 SSG (靜態網頁生成) 還是 SSR (伺服器端渲染)：

1. **查看 `getStaticProps`**:
   - 如果頁面使用了 `getStaticProps` 函數，則該頁面使用 SSG。當建置你的應用時，此函數會被執行，並生成靜態頁面。

     ```tsx
     export async function getStaticProps() {
       // ...
     }
     ```

2. **查看 `getServerSideProps`**:
   - 如果頁面使用了 `getServerSideProps` 函數，則該頁面使用 SSR。每次該頁面被請求時，此函數都會在伺服器端運行。

     ```tsx
     export async function getServerSideProps() {
       // ...
     }
     ```

3. **查看 `getStaticPaths` (只有動態路由的頁面)**
   - 如果你的頁面使用動態路由，例如 `pages/posts/[id].tsx`，並且你還看到了 `getStaticPaths` 函數，這也意味著該頁面使用了 SSG。
   - `getStaticPaths` 會指定哪些路徑將在建置時間被預渲染。

     ```tsx
     export async function getStaticPaths() {
       // ...
     }
     ```

4. **沒有上述函數的頁面**:
   - 如果頁面沒有使用上述的任何一個函數，則它將默認使用客戶端渲染 (CSR)。當該頁面載入時，任何的數據請求都會在客戶端進行。

5. **查看 `_app.js` 或 `_app.tsx`**:
   - 如果 `_app.js` 或 `_app.tsx` 使用了 `getInitialProps`，則所有的頁面都將使用 SSR，除非明確指定了其他資料獲取方法。
   - 但要注意，使用 `_app` 的 `getInitialProps` 將禁用 Automatic Static Optimization，這是 Next.js 的一項功能，可以自動優化那些沒有使用資料獲取方法的頁面。

6. **建置日誌**:
   - 當你運行 `next build`，建置日誌會告訴你哪些頁面是靜態的 (SSG) 以及哪些頁面是伺服器端渲染的 (SSR)。
     - ○ (Static)：表示該頁面是靜態的，它在建置時就已經被渲染成 HTML，並在每次請求時提供相同的內容 (SSG)。例如，你的 /, /404, /dashboard 等頁面。
      - λ (Server)：表示該頁面在每次請求時都會在伺服器端進行渲染 (SSR)。這通常是因為該頁面使用了 getInitialProps 或 getServerSideProps。
    >  /api/v1/paymentReturn 是一個 API 路由，而不是一個頁面。API 路由在 Next.js 中會被預設當作伺服器端運行的，它們不是前端頁面，所以不會被靜態生成（SSG）。因此，當你看到建置日誌中 API 路由被標記為 λ (Server)，這是正確的。
通過以上方法，你應該可以輕鬆地確定 **Next.js** 專案中的每個頁面是使用 SSG 還是 SSR。