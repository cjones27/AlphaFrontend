/* eslint-disable react/prop-types */
import React from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import cache from './cache';

const apolloClient = new ApolloClient({
  cache,
});

const ApolloWrapperProvider = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <>{children}</>
    </ApolloProvider>
  );
};

export default ApolloWrapperProvider;
