import React from 'react';
import ApolloWrapperProvider from './apollo/provider';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const App = () => {
  return (
    <ApolloWrapperProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApolloWrapperProvider>
  );
};

export default App;
