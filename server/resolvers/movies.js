
module.exports = {
  Query: {
    searchMovies: (_, { searchTerm, pageNum = 1 }, { dataSources }) => {
      return dataSources.MovieAPI.searchMovies({ searchTerm, pageNum });
    },
  },
};

