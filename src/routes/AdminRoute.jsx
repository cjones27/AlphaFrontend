/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'components/ui';
import { isUserLogged } from 'utils/checkUserStatus';

const UserRoute = ({ exact, path, component: Component }) => {
  if (!isUserLogged()) return <Redirect to="/login" />;

  if (!isUserAdmin()) return <Redirect to="/home" />;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <Layout>
          <Component />
        </Layout>
      )}
    />
  );
};

export default UserRoute;
