import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Link as MUILink,
} from '@mui/material';
import MoviePosterImg from './MoviePosterImg';
import { CircularProgress } from '@mui/material';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='caption' component='div' color='text.secondary'>
          {Math.round(props.value) + '%'}
        </Typography>
      </Box>
    </Box>
  );
}

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const imgPath = 'https://image.tmdb.org/t/p/original';

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
          <Button variant='contained' sx={{ zIndex: 2 }}>
            BACK
          </Button>
        </Link>
        <img className='MP-bg-img' src={imgPath + movieData.backdrop_path} />
        <Box
          className='MP-title'
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <MoviePosterImg
            style={{
              margin: '52px',
              padding: '30px',
              backgroundColor: 'white',
              height: '40rem',
              opacity: '1',
              zIndex: 2,
            }}
            src={imgPath + movieData.poster_path}
            movieId={movieData.id}
          />
          <Paper
            sx={{
              padding: '10px',
              zIndex: 2,
              height: '20rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              minWidth: '300px',
            }}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            <Typography variant='h2' style={{ fontWeight: '800' }}>
              {movieData.title} {`(${movieData.release_date.slice(0, 4)})`}
            </Typography>
            <Typography sx={{}} variant='h5'>
              {movieData.tagline}
            </Typography>
            <Typography sx={{}}>{movieData.overview}</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
              }}
            >
              <CircularProgressWithLabel
                color={movieData.popularity > 70 ? 'success' : 'error'}
                value={movieData.popularity > 100 ? 100 : movieData.popularity}
              />
              <MUILink sx={{ cursor: 'pointer' }}>{movieData.homepage}</MUILink>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  } else return <h1>Loading...</h1>;
};

export default MoviePage;

// <img className='' src={imgPath + movieData.backdrop_path} />

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
