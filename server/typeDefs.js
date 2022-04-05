const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    password: String!
    email: String!
  }

  type User_Movie {
    movie_id: Int!
    username: String!
    rating: Int
    comment: String
    watched: Boolean
  }

  type Movie {
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
    rating: Int
    comment: String
    watched: Boolean
  }

  type Movie_Results {
    movies: [Movie]
  }

  type moviePreferences {
    user: User
    favorites: [Favorite_Movies]
    watched: [Watched_Movies]
  }

  type Favorite_Movies {
    ID: Int!
  }
  type Watched_Movies {
    ID: Int!
  }

  type Query {
    getUser: [User]
    getMovies(username: String!): [Movie]
    searchMovies(searchTerm: String!, pageNum: Int): [Movie]
    getMovieInfo(movie_id: Int!, username: String!): Movie
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): User!
    editUser(name: String!, password: String!, email: String): User!
    deleteUser(username: String!): String!
    addMovie(
      username: String!
      movie_id: Int!
      rating: Int
      comment: String
      watched: Boolean
    ): User_Movie
    editMovie(
      username: String!
      movie_id: Int!
      rating: Int
      comment: String
      watched: Boolean
    ): User_Movie
    deleteMovie(
      username: String!
      movie_id: Int!
    ): String
  }
`;

module.exports = typeDefs;


