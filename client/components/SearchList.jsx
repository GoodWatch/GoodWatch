import React from 'react';
import { useSelector } from 'react-redux';
import MovieCardSearched from './MovieCardSearched';

const SearchList = (props) => {
  const searchResults = useSelector((state) => {
    return state.searchResults.displayResults;
  });

  const feedItems = [];
  //
}