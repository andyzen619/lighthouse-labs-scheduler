# Scheduler Project

React scheduler with up to five appointments per day. The information will be synced over multiple clients with the help of Web Sockets.

## Final Product

### Opening page

Landing page, with up to five appointments per day and dynamic counter for the remaining spots.

!["opening page"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/opening.png)

### Creating a new appointment

Allows the creation (or edition) of an appointment, by entering the name and selecting the interviewer.

!["create new appointment"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/creating.gif)

### Contextual warnings and Error handling

Warns the user if name field was left empty. As well as provides error when appointment cannot be set.

!["contextual error"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/error.gif)

### Adaptive design

Mobile ready platform.

!["adaptive design"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/mobile.png)

### Transition states

Saving and deleting animated transitions.

!["state transitions"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/transition.gif)

### Real time updates using websockets
Modifying and adding appoints update in realtime without refresh.

!["Real time updates"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/websocket.gif)

### Storybook Component Tests

Built-in [storybook](https://storybook.js.org/) components tests.

!["storybook tests"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/storybook.png)

### Cypress E2E Tests

Built-in [cypress](https://www.cypress.io/) end to end tests.

!["cypress tests"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/cypress.png)

### Jest Unit Tests

Built-in [jest](https://jestjs.io/) test coverage.

!["jest tests"](https://github.com/andyzen619/lighthouse-labs-scheduler/blob/master/Images/jestTest.png)


## Dependencies

- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts


## Dev Dependencies

  - "@babel/core": "^7.4.3",
  - "@storybook/addon-actions": "^5.0.10",
  - "@storybook/addon-backgrounds": "^5.0.10",
  - "@storybook/addon-links": "^5.0.10",
  - "@storybook/addons": "^5.0.10",
  - "@storybook/react": "^5.0.10",
  - "@testing-library/jest-dom": "^4.0.0",
  - "@testing-library/react": "^8.0.7",
  - "@testing-library/react-hooks": "^3.2.1",
  - "babel-loader": "^8.0.5",
  - "node-sass": "^4.11.0"

## Getting Started

- Install all dependencies (using the `npm install` command).
- Get and install the [server](https://github.com/lighthouse-labs/scheduler-api).
- Run both the server and the client.