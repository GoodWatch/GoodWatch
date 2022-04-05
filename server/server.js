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
const cookieParser = require('cookie-parser');

const dataSources = () => ({
  MovieAPI: new MovieAPI(),
});

async function startApolloServer(typeDefs, resolvers, dataSources) {
  const isProduction = process.env.NODE_ENV === 'production';
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    context: ({ req, res }) => {
      const token = req.cookies.access_token;
      try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        if (decoded.username !== undefined) {
          return { username: decoded.username, req, res };
        }
      } catch (e) {
        // console.log('no token found');
        return { req, res };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  !isProduction && app.set('trust proxy', 1);
  // app.use(cors());
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: ['https://studio.apollographql.com'],
      credentials: true,
    },
  });

  // app.use('/auth', authRouter);

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers, dataSources);
