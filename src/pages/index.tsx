import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React, { ReactElement } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  HomepageBlock,
  Layout
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { getPosts } from "@/services";


function Home({ posts }) {
  return (
    <>
      <BaseSeo />
      <div className="py-10">
        <header className="mb-4">
          <div className="container" />
        </header>
        <main>
          <HomepageBlock posts={posts} />
        </main>
      </div>
    </>
  );
}


export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context;
  const posts = (await getPosts()) || [];

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
      posts,
    },
    revalidate: 60 * 60, // value in seconds, how often ISR will trigger on the server
  };
};

// export const getStaticPaths: GetStaticPaths = () => ({
//   paths: [],
//   fallback: "blocking",
// });

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;