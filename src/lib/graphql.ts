import { ApolloClient, NormalizedCacheObject, createHttpLink } from "@apollo/client";
// import { createFetch, createSaleorClient } from "@saleor/sdk";

import { API_URI } from "./const";
import { cache } from './cache';
// import { DEFAULT_CHANNEL } from "./regions";
// import { typePolicies } from "./typePolicies";

const httpLink = createHttpLink({
  uri: API_URI,
  // fetch: createFetch(),
});

const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: httpLink,
  // cache: new InMemoryCache({ typePolicies }),
  cache,
  ssrMode: typeof window === "undefined",
  connectToDevTools: true,
});

// export const saleorClient = createSaleorClient({
//   apiUrl: API_URI,
//   channel: DEFAULT_CHANNEL.slug,
// });

export default apolloClient;
