const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers/index.js');
const MovieAPI = require('./datasources/movieAPI.js');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');

const dataSources = () => ({
  MovieAPI: new MovieAPI(),
});

const context = ({ req }) => {
  // get the user token from the headers
  const token = req.headers.authorization || '';
  console.log(req.cookies.access_token);
  const splitToken = token.split(' ')[1];
  try {
    jwt.verify(splitToken, process.env.SECRET_JWT);
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    );
  }
};

async function startApolloServer(typeDefs, resolvers, dataSources) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    context: ({ req }) => {
      const token = req.cookies.access_token;
      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        if (decoded.username !== undefined) {
          return { username: decoded.username };
        }
      } catch (e) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in'
        );
      }
    },
    // context,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  await server.start();
  server.applyMiddleware({ app });

  app.use('/auth', authRouter);

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers, dataSources);

// TODO: REPLACE WITH env FILE
const SECRET_KEY = process.env.SECRET_KEY;

/*
    Starting the app
*/
// app.listen(port, () =>
//   console.log(
//     `🔥🔥🔥 GraphQL + Express auth tutorial listening on port ${port}!`
//   )
// );
