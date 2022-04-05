const { RESTDataSource } = require('apollo-datasource-rest');
const api_key = 'c8b6a411fa661f7f14dc3d147bc07f60';

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.themoviedb.org/3/';
  }

  async searchMovies({ searchTerm, page }) {
    page = page ?? 1;
    const response = await this.get('search/movie', {
      query: searchTerm,
      page,
      language: 'en-US',
      api_key,
    });
    // console.log('response', response);
    // return this.searchReducer(response.results);
    return response.results.map((movie) => this.searchReducer(movie));
  }

  searchReducer(searchResult) {
    // console.log(searchResult.id);
    return {
      id: searchResult.id,
      overview: searchResult.overview,
      title: searchResult.title,
    };
    // return movie;
  }
}

//https://api.themoviedb.org/3/movie/121?api_key=c8b6a411fa661f7f14dc3d147bc07f60

// https://developers.themoviedb.org/3/search/search-companies
// https://api.themoviedb.org/3/search/movie?api_key=c8b6a411fa661f7f14dc3d147bc07f60&language=en-US&query=text&page=1

//https://github.com/apollographql/apollo-server/tree/main/packages/apollo-datasource-rest

// method to fetch ~25 on search

// method to fetch favorites on login

module.exports = MovieAPI;
