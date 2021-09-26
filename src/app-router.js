import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import { AuthProvider } from './context/AuthUserContext';

// importing pages
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

import SignUp from './components/signup';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <div>This is the router.</div>
      <AuthProvider>
      <Route path={ROUTES.HOME} exact component={Home} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      </AuthProvider>
    </Router>
  );
}

export default App;
