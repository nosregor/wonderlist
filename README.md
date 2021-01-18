# wunderlist

# 🧰 Simple TypeScript Starter | 2020

> We talk about a lot of **advanced Node.js and TypeScript** concepts on [the blog](https://khalilstemmler.com), particularly focused around Domain-Driven Design and large-scale enterprise application patterns. However, I received a few emails from readers that were interested in seeing what a basic TypeScript starter project looks like. So I've put together just that.

### Features

- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

The main purpose of this repository is to show a good end-to-end project setup and workflow for writing a Node.js Express Mongoose code in TypeScript complete with middleware, models, routes and types.

This project comes with a complete REST API to handle Authentication and CRUD features on Users as well as handle Lists and their corresponding Tasks.

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.

### Ressources

- Using ESLint and Prettier in a TypeScript Project: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

### Authentication

- https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195
- https://medium.com/swlh/everything-you-need-to-know-about-the-passport-jwt-passport-js-strategy-8b69f39014b0
- https://levelup.gitconnected.com/deriving-signing-and-verifying-a-jwt-json-web-token-with-node-js-f3d0d12b1fc9 -http://toon.io/understanding-passportjs-authentication-flow/
- https://mannhowie.com/auth
- https://hackmd.io/@abernier/SJrDZvRTB?type=view

### Update subdocuments Mongoose

- https://www.codegrepper.com/code-examples/javascript/mongoose+update+data+subdocument

### Mongoose

- https://developer.aliyun.com/mirror/npm/package/mamodom-mongodb-memory-server
- https://dev.to/dyarleniber/parallel-tests-in-node-js-with-jest-and-mongodb-without-mocking-4jj2
- https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
- https://www.freecodecamp.org/news/end-point-testing/#part1

### Seeding

- https://dev.to/ziishaned/open-multiple-mongodb-connection-in-express-js-app-36be
