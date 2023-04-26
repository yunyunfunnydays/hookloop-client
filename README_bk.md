# hookloop-client

HOOKLOOP Side Project / Front-End :
This is a project tracking application by using **Next.js** and **Typescript**.

#### Project Status: Developing.

## What you can do in HOOKLOOP ?

- Dashboard : Overview all your workspaces and kanbans.
- Workspace : Overview all your kanbans.
- Kanban : Task tracking board with advanced filter, including public and private task list.
- Card : Task assignment, including task details, comments and file uploads.
- Notification : Instant notification when cards you included are updated.
- User Profile : Manage your personal user name and profile shot, overview all projects and team members you initiate.

## Prerequisites

- Node.js
- Yarn

## Installation

1. Clone this repository to your local machine.
2. Run `yarn install` in the project directory to install all required dependencies.
3. Create a `.env` file at the root directory of the project and add the necessary environment variables. See the `.env.example` file for reference.
4. Run `yarn start` or `yarn dev` to start the application.

## Core Skills

- [`Next.js`](https://nextjs.org/docs) : React framework for building server-side rendered (SSR) and statically generated (SSG) web applications.
- [`Ant Design`](https://ant.design/components/overview/) : React UI library.
- [`react-beautiful-dnd`](https://github.com/atlassian/react-beautiful-dnd) : Drag and drop lists for React library.
- [`MongoDB`](https://www.mongodb.com/) : NoSQL document-oriented database.
- [`Filestack`](https://www.filestack.com/) : File Uploader
- `WebSocket` : Real-time communication between the client and the server.

## Tools

- [`TypeScript`](https://www.typescriptlang.org/) : Strongly typed programming language builds on JavaScript.
- [`husky`](https://github.com/typicode/husky) : Unify git commit tools.
- [`commitlint`](https://github.com/conventional-changelog/commitlint#shared-configuration) : Lint git commit message.
- [`commitizen`](https://github.com/commitizen/cz-cli) : Auto generate commit followed by commitlint convention.
- [`conventional-changelog-cli`](https://github.com/conventional-changelog/conventional-changelog) : Generate a CHANGELOG from git metadata.
- [`eslint-config-airbnb`](https://github.com/airbnb/javascript): Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react).
- [`yup`](https://github.com/jquense/yup) : JavaScript schema validation library used to validate objects against defined schemas.

## Coding Style

- ### Naming Convention

  - Variable: 小駝峰命名
  - Constant: 使用全大寫，中間用底線分開
  - State: usestate 前綴 s* ，useContext 前綴 c*
  - Function: 小駝峰命名(不用底線隔開)
  - Type: 大駝峰
  - Interface: 開頭要用大寫 I

- ### Folder Structure

  - 每個資料夾都用 index export

- ### Others

  - import module 放置順序(eslint-plugin-simple-import-sort)
  - import 路徑（用小老鼠幫路徑取暱稱 🐭)(path alias)
  - 放置順序: uesState > Variable > pure function > API function > useEffect > render
  - 統一使用箭頭函示

- ### Commit Message Guidelines
  - [參考 Angular Commit Message Header](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header)

## Contributors

- [Ariean]()
- [Emi]()
- [Jason]()
- [Joanna](https://chen-chens.github.io/myWebsite/)
- [Yuna]()
- [Yun]()
