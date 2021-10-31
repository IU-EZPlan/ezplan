import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import { AuthProvider } from './context/AuthUserContext';
import { UserDataProvider } from './context/UserDataContext'

// importing pages
import Home from './pages/home';
import Landing from './pages/landing';
import Dashboard from './pages/dashboard';
import SignUp from './pages/signup';
import Login from './pages/login';
import ForgotPassword from './pages/forgotPassword';
import UpdateProfile from './pages/updateProfile';
import Search from './pages/search';


// importing components
import Navbar from './components/navbar';
import PrivateRoute from './components/PrivateRoute';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserDataProvider>
          <Navbar />
          <Route path={ROUTES.LANDING} exact component={Landing} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword} />
          <Route path={ROUTES.SEARCH} component={Search} />

          {/* Must have an account to see the following pages */}
          <PrivateRoute path={ROUTES.ACCOUNT} component={Dashboard} />
          <PrivateRoute path={ROUTES.UPDATE_PROFILE} component={UpdateProfile} />
        </UserDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
