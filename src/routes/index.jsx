import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Home from '../views/Home';

const Routes = () => {
  return (
    <Switch>
      <PublicRoute exact path="/home" component={Home} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
