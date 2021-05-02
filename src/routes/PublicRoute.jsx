import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Layout from '../components/Layout';

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ exact, path, component: Component }) => {
  // if (isUserLogged()) return <Redirect to="/concessionaires" />;

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

export default PublicRoute;
