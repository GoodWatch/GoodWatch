![GoodWatch](https://github.com/GoodWatch/GoodWatch/blob/dev/client/Public/GoodWatchFilledSmall.png?raw=true)

# GoodWatch

An open source movie library platform for viewing movie info and saving movies for later.

## How to get started?
1. Fork and clone the repo.
1. Then add a .env file to your root directory with the following
    - You will need an api key from https://www.themoviedb.org/ and a posgtgres uri, we recommend https://www.elephantsql.com/
    ```
    SECRET_JWT =
    API_KEY=
    PG_URI = 
    SALT_WORK_FACTOR=10
    ```
1. Then `npm install && npm run dev` to get started
1. To build for production run `npm run build && npm start`

## Want to Contribute?
1. Clone the repo and make a new branch
1. Add a feature, fix a bug, or refactor some code :)
1. Make sure to lint your code!
1. Write/update tests for the changes you made, if necessary.
1. Run unit & integration tests and make sure all tests pass: npm test.
1. Open a Pull Request with a comprehensive description of changes to the dev branch

## Technologies
- React
- React Router
- Redux Toolkit
- Node
- Express
- Apollo
- bCrypt
- JSON Web Tokens
- Graphql
- PostgreSQL
- MaterialUI
- Jest
- React Testing Library
- Webpack

## Screenshots
![Screenshot](https://github.com/GoodWatch/GoodWatch/blob/dev/client/Public/Screenshot1.png?raw=true)
![Screenshot](https://github.com/GoodWatch/GoodWatch/blob/dev/client/Public/Screenshot2.png?raw=true)