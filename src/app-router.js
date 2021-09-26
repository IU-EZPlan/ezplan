import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import { AuthProvider } from './context/AuthUserContext';

// importing pages
import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ForgotPassword from './pages/forgotPassword';
import UpdateProfile from './pages/updateProfile';

import SignUp from './components/signup';
import PrivateRoute from './components/PrivateRoute';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <div>This is the router.</div>
      <AuthProvider>
        <Route path={ROUTES.HOME} exact component={Home} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <PrivateRoute path={ROUTES.DASHBOARD} component={Dashboard} />
        <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
        <PrivateRoute path={ROUTES.UPDATE_PROFILE} component={UpdateProfile} />
      </AuthProvider>
    </Router>
  );
}

export default App;
