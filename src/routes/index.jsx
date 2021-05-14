import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Home from '../views/Home';
import Signup from '../views/Signup';
import Login from '../views/Login';

const Routes = () => {
  return (
    <Switch>
      <PublicRoute exact path="/home" component={Home} />
      <PublicRoute exact path="/signup" component={Signup} />
      <PublicRoute exact path="/login" component={Login} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
