import { InMemoryCache, makeVar } from '@apollo/client';

export const logged = makeVar(false);
export const username = makeVar(null);
export const isAdmin = makeVar(false);
export const selectedPropertyId = makeVar(null);

const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        logged: {
          read() {
            return logged();
          },
        },
      },
    },
  },
});

export default cache;
