const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers/index.js');
const movieAPI = require('./datasources/movieAPI.js');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      MovieAPI: new movieAPI()
    }),
    context: ({ req }) => {
      return { req };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

/*
    Requiring packages that we will 
    need for this tutorial
*/

/*
    Some constants
*/

// TODO: REPLACE WITH env FILE
const SECRET_KEY =
  'DPEZTPUaBiu5qUigB-hfAnR7U004i4UrfYPelwJ5Pfasdq5IaWZXKVl0lF-nbzCKs2bDTpbexhEJAmCdBMvZBuWrexdp89pLqzpZ_yOgdSY_3qd8WIjSMBpfqMCH52c8bLDpCL1NT_GcfcmA5UE052Qda-nBz8eOMcGeCBwfOCRNNXduRnwiOMEYgG-ZvKTwC7HP_jEC2zMN3ztL7yKKl4BT84qJfQd4fq280pqxZ5k6wQIdJ4xaugU96tNLdnL93FNosE80aVF1RI_DkbmLl0HaYjSZurEbsMWcDyXhp3iNr30IavqBhgA5pz257MLfFIT7FaRRAYbEUriAZijbYQ';

/*
    Creating the Express instance
*/

const app = express();

/*
    Adding middleware to Express
    This is necessary to get the post
    data from the request and to 
    access the API from a different 
    host 
*/

app.use(bodyParser.json());
app.use(cors());

/*
    Creating our Apollo context function
*/

// const context = ({ req }) => {
//   // get the user token from the headers
//   const token = req.headers.authorization || '';
//   const splitToken = token.split(' ')[1];
//   try {
//     jwt.verify(splitToken, SECRET_KEY);
//   } catch (e) {
//     throw new AuthenticationError(
//       'Authentication token is invalid, please log in'
//     );
//   }
// };

/*
    Creating the Apollo server
*/

// const server = new ApolloServer({ typeDefs, resolvers, context });

/*
    Creating a link between Express and Apollo
*/

// server.applyMiddleware({ app });

/*
    Express routes/endpoints
*/

// app.post('/get-token', async (req, res) => {
//   const { email, password } = req.body;
//   const user = users.find((user) => user.email === email);
//   if (user) {
//     //we use bcrypt to compare the hash in the database (mock.js) to the password the user provides
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       //we create the JWT for the user with our secret
//       //inside the token we encrypt some user data
//       //then we send the token to the user
//       const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);

//       res.send({
//         success: true,
//         token: token,
//       });
//     } else {
//       //return error to user to let them know the password is incorrect
//       res.status(401).send({
//         success: false,
//         message: 'Incorrect credentials',
//       });
//     }
//   } else {
//     //return error to user to let them know the account there are using does not exists
//     res.status(404).send({
//       success: false,
//       message: `Could not find account: ${email}`,
//     });
//   }
// });

// /*
//     Starting the app
// */
// app.listen(port, () =>
//   console.log(
//     `🔥🔥🔥 GraphQL + Express auth tutorial listening on port ${port}!`
//   )
// );
