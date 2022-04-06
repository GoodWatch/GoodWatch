import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

import MoviePage from './components/MoviePage.jsx';
import Dashboard from './components/Dashboard';
import Login from './components/LoginPage';
import Signup from './components/SignupPage';

const rootElement = document.getElementById('app');

render(
  // <h1>Testing</h1>,
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='movie/:movieId' element={<MoviePage />} />
      </Routes>
    </Provider>
  </BrowserRouter>,
  rootElement
);
