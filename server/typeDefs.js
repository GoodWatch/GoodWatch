const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    email: String!
  }

  type Movie {
    adult: Boolean
    genre_ids: [Int]
    id: Int!
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  type MovieExt {
    adult: Boolean
    genres: [Genre]
    id: Int!
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
    backdrop_path: String
    belongs_to_collection: Collection
    homepage: String
    imdb_id: String
    production_companies: [ProductionCompany]
    production_countries: [ProductionCountries]
    revenue: Int
    runtime: Int
    spoken_languages: [SpokenLanguage]
    status: String
    tagline: String
    rating: Int
    comment: String
    watched: Boolean
  }

  type SpokenLanguage {
    english_name: String
    iso_639_1: String
    name: String
  }

  type ProductionCountries {
    iso_3166_1: String
    name: String
  }

  type ProductionCompany {
    id: Int
    logo_path: String
    name: String
    origin_country: String
  }

  type Collection {
    id: Int
    name: String
    poster_path: String
    backdrop_path: String
  }

  type Genre {
    id: Int
    name: String
  }

  type Response {
    success: Boolean!
    message: String!
    username: String
    data: [MovieExt]
  }


  type Query {
    login(username: String!, password: String!): Response!
    getMovies(pageNum: Int): Response
    searchMovies(searchTerm: String!, pageNum: Int): [Movie]
    getMovieInfo(movie_id: Int!): MovieExt
    logout: String!
    getMovieRecs: [Movie]
  }

  type Mutation {
    signUp(username: String!, password: String!, email: String!): Response!
    editUser(password: String!, email: String): Response
    deleteUser: String
    addMovie(
      movie_id: Int!
      rating: Int
      comment: String
      watched: Boolean!
    ): Response
    editMovie(
      movie_id: Int!
      rating: Int
      comment: String
      watched: Boolean
    ): Response
    deleteMovie(movie_id: Int!): String
  }
`;

module.exports = typeDefs;
