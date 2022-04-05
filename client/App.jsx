import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LoginPage from './components/loginPage';
import './stylesheets/styles.css';

const App = props => {
  return (
    <div className="router">
      {/* <main> */}
        <h1>Hello world</h1>
        {/* <LoginPage /> */}
      {/* </main> */}
    </div>
  );
};

export default App;
