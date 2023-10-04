### 常用的 Markdown 語法

1. **標題（Headings）**
    ```
    # 一級標題
    ## 二級標題
    ### 三級標題
    ```
    # 一級標題
    ## 二級標題
    ### 三級標題
    
2. **粗體與斜體（Bold and Italics）**
    ```
    **粗體**
    *斜體*
    ```
    **粗體**
    *斜體*
3. **列表（Lists）**
    - **無序列表（Unordered Lists）**
      ```
      - 項目 1
      - 項目 2
      ```
      - 項目 1
      - 項目 2
    - **有序列表（Ordered Lists）**
      ```
      1. 項目 1
      2. 項目 2
      ```
       1. 項目 1
      2. 項目 2
4. **連結（Links）**
    ```
    [連結文字](https://www.example.com)
    ```
    [連結文字](https://www.example.com)
5. **圖片（Images）**
    ```
    ![圖片描述](https://www.example.com/image.jpg)
    ```
    ![圖片描述](https://www.example.com/image.jpg)
6. **代碼塊（Code Blocks）**
    - 單行代碼使用反引號（\`）
      ```
      `代碼`
      ```
      `代碼`
    - 多行代碼使用三個反引號（\`\`\`）
      ```javascript
      function helloWorld() {
        console.log("Hello, world!");
      }
      ```
      javascript
      
      function helloWorld() {
        console.log("Hello, world!");
      }
7. **引用（Blockquotes）**
    ```
    > 這是一個引用
    ```
    > 這是一個引用
8. **分隔線（Horizontal Lines）**
    ```
    ---
    或
    ***
    ```
    ---
9. **表格（Tables）**

    ```
    | 表頭1  | 表頭2  |
    |--------|--------|
    | 內容1  | 內容2  |
    ```
    | 表頭1  | 表頭2  |
    |--------|--------|
    | 內容1  | 內容2  |

10. **預格式文本 (Preformatted Text)**

    使用四個空格或一個製表符（tab）的縮進可以創建預格式文本。

    這是預格式文本

11. #### 任務清單 (Task Lists)

    在GitHub上，你可以創建任務清單來跟踪待辦事項。

    ```
    - [x] 已完成項目
    - [ ] 未完成項目
    ```
    - [x] 已完成項目
    - [ ] 未完成項目
12. #### 跳脫字元 (Escape Characters)

    如果你需要顯示一個通常會被解釋為Markdown語法的字元，你可以使用反斜線`\`來跳脫它。

    ```
    \*這不是斜體\*
    ```
    \*這不是斜體\*
13. #### 給標題或段落加上連結錨點 (Anchors)

    在GitHub上，每一個標題自動會有一個錨點，你可以直接鏈接到這個標題。

14. #### 行內HTML (Inline HTML)

    Markdown支持行內HTML，這樣你就可以插入那些Markdown本身不支持的功能。

    ```html
    <span style="color:red;">這是紅色文字。</span>
    ```
    <span style="color:red;">這是紅色文字。</span>
15. #### 表情符號 (Emoji)
    GitHub支持表情符號，你只需在文字中插入特定的代碼。

    ```
    :smile: :+1:
    ```
    :smile: :+1:


16. #### 無需特殊語法，Markdown 會自動將標準URL轉換為可點擊的連結。

    ```
    https://github.com
    ```
    https://github.com

17. #### 引用程式碼（Code References）
    你可以直接參考存儲庫（repository）中的程式碼。只需將存儲庫、路徑和文件行號放在反引號（back-ticks）中。
    ```
    `https://github.com/user/repo/blob/branch/file#L10`
    ```
    `https://github.com/user/repo/blob/branch/file#L10`

18. #### 標記用戶 (Mentioning Users)

    你可以使用`@username`語法在討論和發佈中提到其他GitHub用戶。

    ```
    @username
    ```
    @username
19. #### 生成目錄 (Table of Contents)

    雖然這不是Markdown的標準功能，但一些工具和編輯器支持自動生成目錄。

20. #### 注釋（Footnotes）

    一些Markdown的變種支持腳註，雖然GitHub本身不支持。

    ```
    這裡有一個腳註[^1]

    [^1]: 腳註的文字。
    ```
    這裡有一個腳註[^1]

    [^1]: 腳註的文字。

21. #### 定義列表 (Definition Lists)

    這也是Markdown變種中的功能。

    ```
    Apple
    :   這是一家公司。

    Orange
    :   這是一種水果。
    ```
    Apple
    :   這是一家公司。

    Orange
    :   這是一種水果。
22. #### 數學公式 (Math Equations)

    某些Markdown編輯器支持LaTeX數學公式，但GitHub不支持。

    ```
    \( E=mc^2 \)
    ```
    \( E=mc^2 \)