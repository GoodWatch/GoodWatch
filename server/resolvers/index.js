const usersResolvers = require('./users.js');
const movieResolvers = require('./movies.js');
const usersMovieResolvers = require('./usersMovies.js');

const resolvers = {
  Query: {
    ...usersResolvers .Query,
    ...movieResolvers .Query,
    ...usersMovieResolvers .Query,
  },
  Mutation: {
    ...usersResolvers .Mutation,
    ...usersMovieResolvers .Mutation,
  },
};

module.exports = resolvers;
