import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './stylesheets/styles.css';

const App = props => {
  return (
    <div className="router">
      <main>
        <h1>Hello world</h1>
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
