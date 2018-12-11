# GraphQL Tutorial

### Project Description

Working through the following tutorials:
* [Node.js/Prisma](https://www.howtographql.com/graphql-js/0-introduction/)
* [React/Apollo](https://www.howtographql.com/react-apollo/0-introduction/)

This project is a Hackernews clone, that first builds the backend, a GraphQL API, and then the frontend, using React and Apollo.

### Installation

To install, first clone this repository. Then in terminal navigate to the project's root directory, and run the following commands:

```
$ yarn install
$ cd server
$ yarn install
$ prisma deploy
$ node src/index.js
```
This will install all project dependencies, deploy the latest version of the database to prisma, and finally start the GraphQL server. Then, open another terminal window, again navigate to the project's root directory, and run
```
$ yarn start
```
To launch the GraphQL playground (write custom queries and mutations and see result from the server), in browser navigate to http://localhost:4000. To open the app, in browser navigate to http://localhost:3000.

#### Legal

Copyright 2018 [Joseph Friesen](mailto:friesen.josephc@gmail.com)
