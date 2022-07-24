import '../styles/globals.scss'
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import type { AppProps } from 'next/app'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp
