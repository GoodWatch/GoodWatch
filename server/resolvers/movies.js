
module.exports = {
  Query: {
    async getMovies() {
      try {
        console.log('get movies...');
        return [{movie_id: 'test', overview: 'overview test'}];
      } catch (error) {
        throw new Error(error);
      }
    },
    searchMovies: (_, { searchTerm, pageNum }, { dataSources }) => {
      return dataSources.searchMovies({ searchTerm, pageNum });
    },
  },
};

