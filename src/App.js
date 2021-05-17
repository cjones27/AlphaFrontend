import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { SessionProvider } from './context/session';

const App = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
