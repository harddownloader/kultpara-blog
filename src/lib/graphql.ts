import { ApolloClient, NormalizedCacheObject, createHttpLink } from "@apollo/client";

import { API_URI } from "./const";
import { cache } from './cache';

const httpLink = createHttpLink({
  uri: API_URI,
  // fetch: createFetch(),
});

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  cache,
  ssrMode: typeof window === "undefined",
  connectToDevTools: true,
});

export default apolloClient;
