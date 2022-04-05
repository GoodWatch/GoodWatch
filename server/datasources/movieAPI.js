const { RESTDataSource } = require('apollo-datasource-rest');
const api_key = process.env.API_KEY;

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async searchMovies({ searchTerm, page = 1 }) {
    const response = await this.get('search/movie', {
      query: searchTerm,
      page,
      language: 'en-US',
      api_key,
    });
    return response.results;
  }

  async getMovieInfo({ movie_id }) {
    const response = await this.get(`/movie/${movie_id}`, {
      api_key,
    });
    return response;
  }
  async getMovieRecs({ movie_id }) {
    try {
      const response = await this.get(`/movie/${movie_id}/recommendations`, {
        language: 'en-US',
        api_key,
        page: 1,
      });
      return response.results;
    } catch (err) {
      throw new Error(err);
    }
  }
}

//https://api.themoviedb.org/3/movie/121?api_key=c8b6a411fa661f7f14dc3d147bc07f60

// https://developers.themoviedb.org/3/search/search-companies
// https://api.themoviedb.org/3/search/movie?api_key=c8b6a411fa661f7f14dc3d147bc07f60&language=en-US&query=text&page=1

//https://github.com/apollographql/apollo-server/tree/main/packages/apollo-datasource-rest

// method to fetch ~25 on search

// method to fetch favorites on login

module.exports = MovieAPI;
