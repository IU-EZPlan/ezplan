import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 

import './app.css';
import './styles/navbar.css';

import Home from './pages/home';
import Login from './pages/login';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo ml-2">EZ Plan</a>
            <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul class="right hide-on-med-and-down">
              <li>
                <Link to={ROUTES.LOGIN}>Login</Link>
              </li>
              <li>
                <Link to={ROUTES.HOME}>Home</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul class="sidenav" id="mobile-demo">
          <li>
            <Link to={ROUTES.LOGIN}>Login</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
        </ul>
        
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.LOGIN} component={Login} />
    </Router>
  );
}

export default App;
