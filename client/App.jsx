import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import './stylesheets/styles.css';
import { Outlet, Link } from 'react-router-dom';

const light = {
  palette: {
    primary: {
      main: '#1061E4',
    },
    secondary: {
      main: '#F5AEBC',
    },
  },
};

const App = (props) => {
  return (
    <ThemeProvider theme={createTheme(light)}>
      {/* <CssBaseline /> */}
      <div className='router'>
        <main>
          {/* <h1>GoodWatch</h1> */}
          <Link to='/login'> </Link>
          <Link to='/dashboard'> </Link>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
