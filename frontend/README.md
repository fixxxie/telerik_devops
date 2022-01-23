# Sample frontend app which can be used to experiment with DevOps concepts

This app uses [React]((https://reactjs.org/), [MUI](https://mui.com/) and [Typescript](https://www.typescriptlang.org). In order to use it, it needs to be built first (compiling all necessary assets into a bundle, which can be used with an http server such as [Nginx](https://www.nginx.com/)).

To setup the project you need [Node.js](https://nodejs.org/en/), version 16.3. You can follow these steps:

1. Install the proper node.js version
2. Checkout the project source code
3. Run `npm install` in the source code directory
4. Run `npm start` to start a deveopment http server, which also reloads the app on code changes

## Configuration

In order to communicate with the backend the following environment variable needs to be set:

REACT_APP_API_ENDPOINT_URL

this should point to the HTTP endpoint that serves the [backend](https://github.com/ablagoev/devops-sample-backend). Example:

```
REACT_APP_API_ENDPOINT_URL=http://localhost:8000
```

Additionally another environment variabe can be passed to the build process, for the frontend version:

```
REACT_APP_APP_VERSION=git-short-sha
```

## Building

In order to build the project, so that it can be served with an http server:

1. Set the proper environment variables (refer to configuration)
2. Run `npm run build`
3. The bundle will be located in the *build* directory inside the projects base source directory

## Available Scripts

Additionally:

### `npm test`

Runs the tests for the project.

### `npm run lint`

Lints the projects' code base.

### `npm run format`

Checks the format of the projects' code base.
