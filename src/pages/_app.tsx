import '../styles/globals.scss'
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/graphql";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <ApolloProvider client={apolloClient}>
      {getLayout(<Component {...pageProps} />)}
    </ApolloProvider>
  );
}

export default MyApp
