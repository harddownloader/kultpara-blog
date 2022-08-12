import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import React, { ReactElement } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  HomepageBlock,
  Layout
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { getPosts } from "@/services";
import { LocaleEnum } from "@/types/Locale";
import { Posts } from '@/types/Posts';

function Home({ posts }: Posts) {
  return (
    <>
      <BaseSeo description={""} />
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


export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  const posts = (await getPosts(locale as LocaleEnum)) || [];

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'comments', 'header', 'footer'])),
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
