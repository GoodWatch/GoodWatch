const usersResolvers = require('./users.js');
const movieResolvers = require('./movies.js');

const resolvers = {
  Query: {
    ...usersResolvers .Query,
    ...movieResolvers .Query,
  },
  Mutation: {
    ...usersResolvers .Mutation,
    ...movieResolvers .Mutation,
  },
};

module.exports = resolvers;
