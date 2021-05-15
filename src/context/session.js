import { createContext, useState } from 'react';

export const SessionContext = createContext();

export const SessionProvider = ({children}) => {
  const [logged, setLogged] = useState(false);

  return (
    <SessionContext.Provider value={{ logged, setLogged}}>
      {children}
    </SessionContext.Provider>
  );
};
