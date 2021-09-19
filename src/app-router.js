import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 

import './app.css';

import Home from './pages/home';
import Login from './pages/login';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <div>This is the router.</div>
      <Route path={ROUTES.LOGIN} exact component={Login} />
      <Route path={ROUTES.HOME} component={Home} />
    </Router>
  );
}

export default App;
