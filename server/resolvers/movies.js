
module.exports = {
  Query: {
    async getMovies() {
      try {
        console.log('get movies...');
        return [{movie_id: 4, overview: 'overview test'}];
      } catch (error) {
        throw new Error(error);
      }
    },
    searchMovies: (_, { searchTerm, pageNum = 1 }, { dataSources }) => {
      console.log('search Term', searchTerm);
      return dataSources.MovieAPI.searchMovies({ searchTerm, pageNum });
    },
  },
};

