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
    rating: Int!
    overview: String!
  }

  type Movie {
    genre_ids: [Int]
    id: Int!
    original_language: String
    original_title: String
    overview: String
    popularity: Int
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Int
    vote_count: Int
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
    getMovies: [Movie]
    searchMovies(searchTerm: String!, pageNum: Int): [Movie]
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): User!
    editUser(name: String!, password: String!, email: String): User!
    deleteUser(username: String!): String!
  }
`;

module.exports = typeDefs;

/*
extra shytttt

type Movie {
    adult: Boolean,
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Int
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Int
    vote_count: Int
  }


*/
