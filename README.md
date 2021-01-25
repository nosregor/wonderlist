# Wonderlist

![Node.js CI](https://github.com/nosregor/wonderlist/workflows/Node.js%20CI/badge.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![TypeScript compatible](https://img.shields.io/badge/typescript-compatible-brightgreen.svg)](https://www.typescriptlang.org)

## 🧰 Simple TypeScript Starter | 2021

The purpose of this repository is to show a good end-to-end project setup and workflow for writing **Mongoose, Node.js, Express code in TypeScript** complete with middleware, models, testing, routes and types.   

This project comes with a complete REST API to handle Authentication and CRUD features on Users as well as handle Lists and their corresponding Tasks.

### Features

- TypeScript v4
- Testing with Jest
- Linting with Eslint, Prettier and TypeScript
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon


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



#### Ressources

- Using ESLint and Prettier in a TypeScript Project: https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

#### Authentication

- https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195
- https://medium.com/swlh/everything-you-need-to-know-about-the-passport-jwt-passport-js-strategy-8b69f39014b0
- https://levelup.gitconnected.com/deriving-signing-and-verifying-a-jwt-json-web-token-with-node-js-f3d0d12b1fc9 -http://toon.io/understanding-passportjs-authentication-flow/
- https://mannhowie.com/auth

#### Update subdocuments Mongoose

- https://www.codegrepper.com/code-examples/javascript/mongoose+update+data+subdocument

#### Mongoose, Testing, Jest

- https://developer.aliyun.com/mirror/npm/package/mamodom-mongodb-memory-server
- https://dev.to/dyarleniber/parallel-tests-in-node-js-with-jest-and-mongodb-without-mocking-4jj2
- https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
- https://www.freecodecamp.org/news/end-point-testing/#part1
- https://zellwk.com/blog/endpoint-testing/
- https://hackmd.io/@abernier/SJrDZvRTB?type=view
- https://www.freecodecamp.org/news/end-point-testing/
- https://zellwk.com/blog/jest-and-mongoose/
- https://dev.to/ziishaned/open-multiple-mongodb-connection-in-express-js-app-36be

#### Seeding

- https://dev.to/ziishaned/open-multiple-mongodb-connection-in-express-js-app-36be

#### Deployment

- https://developer.mongodb.com/how-to/use-atlas-on-heroku
- https://medium.com/developer-rants/deploying-typescript-node-js-applications-to-heroku-81dd75424ce0

#### Advanced Node.js and TypeScript

- https://medium.com/swlh/typescript-with-mongoose-and-node-express-24073d51d2ee
<<<<<<< HEAD

### Architecture

- https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf#configs
=======
- https://khalilstemmler.com
>>>>>>> 2be4f01d71bbbc7fc1f1cf47cac3e7d18acc88f5
