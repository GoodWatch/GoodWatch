const usersResolvers = require('./typeDefs');

const resolvers = {
  Query: {
    users: (root, args) => {
      return users;
    },
    user: (root, { id }) => {
      return users.find((user) => user.id === id);
    },
  },
};

module.exports = resolvers;
