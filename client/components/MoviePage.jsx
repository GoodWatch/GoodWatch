import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const imgPath = 'https://image.tmdb.org/t/p/w92';

  useEffect(async () => {
    const response = await axios({
      url: '/graphql',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        query,
        variables: {
          movieId: Number(movieId),
        },
      },
    });
    setMovieData(response.data.data.getMovieInfo);
    console.log(response.data.data.getMovieInfo);
  }, []);

  if (movieData) {
    return (
      <Box>
        <Link to='/dashboard'>
          <Button variant='contained'>BACK</Button>
        </Link>
        <img className='' src={imgPath + movieData.poster_path} />
        <img className='' src={imgPath + movieData.backdrop_path} />
        <Typography variant='h2'>{movieData.title}</Typography>
      </Box>
    );
  } else return <h1>Loading...</h1>;
};

export default MoviePage;

const query = `
query GetMovieInfo($movieId: Int!) {
  getMovieInfo(movie_id: $movieId) {
    adult
    genres {
      id
      name
    }
    id
    original_language
    original_title
    overview
    popularity
    poster_path
    release_date
    title
    video
    vote_average
    vote_count
    backdrop_path
    belongs_to_collection {
      id
      name
      poster_path
      backdrop_path
    }
    homepage
    imdb_id
    production_companies {
      id
      logo_path
      name
      origin_country
    }
    production_countries {
      iso_3166_1
      name
    }
    revenue
    spoken_languages {
      english_name
      iso_639_1
      name
    }
    runtime
    status
    rating
    tagline
    comment
    watched
  }
}
`;
