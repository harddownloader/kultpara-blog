import {GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import React, { ReactElement } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  HomepageBlock,
  Layout
} from "@/components";
import { BaseSeo } from "@/components/seo/BaseSeo";
import {getPosts, getSeoDescription} from "@/services";
import { LocaleEnum } from "@/types/Locale";
import { PostWrap } from '@/types/Posts';


export interface HomeProps {
  posts: Array<PostWrap>
  pageSeoDescription: string
}

function Home({ posts, pageSeoDescription }: HomeProps) {
  return (
    <>
      <BaseSeo description={pageSeoDescription} />
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
  // const posts = (await getPosts(locale as LocaleEnum)) || [];
  console.log('index getStaticProps locale', locale)
  const posts = await getPosts(locale as LocaleEnum);
  const test = posts.map((post:any) => post)
  const description = await getSeoDescription('home') || '';

  return {
    props: {
      pageSeoDescription: description,
      posts,
      ...(await serverSideTranslations(
        locale as string,
        ['common', 'comments', 'header', 'footer']
      )),
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
