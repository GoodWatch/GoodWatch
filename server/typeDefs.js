const gql = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    password: String!
  }
`;

module.exports = typeDefs;
