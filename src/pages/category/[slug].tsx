import React, {ReactElement} from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getCategories, getCategoryPost } from '../../../services';
import {PostCard, Categories, Loader, Layout} from '../../../components';
import { langsVar } from '@/lib/cache';
import Home from "../index";
import {useReactiveVar} from "@apollo/client";

const CategoryPost = ({ posts }) => {
  const router = useRouter();
  // const langs = useReactiveVar(langsVar);

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params, locale }) {

  const posts = await getCategoryPost(params.slug);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  console.log({langGetStaticPaths: langsVar()});

  return {
    paths: categories.map(({ slug }) => ({ params: { slug, locale: langsVar() } })),
    fallback: true,
  };
}

CategoryPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
