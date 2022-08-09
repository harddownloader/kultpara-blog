import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllCategories, getCategoryPost } from '@/services';
import { PostCard, Categories, Loader, Layout } from '@/components';
import { useTranslation } from "next-i18next";
import { Posts } from '@/types/Posts';


const CategoryPost = ({ posts }: Posts) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {
            posts.length
              ? posts.map((post, index: number) => (
                    <PostCard key={index} post={post.node} />
                ))
              : <p className={"text-white text-lg"}>{ t('category_no_pots') }</p>
          }
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

// Fetch data at build time
export async function getStaticProps({ params, locale }) {

  const posts = await getCategoryPost(params.slug);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths(context) {
  const { locales } = context;
  const categories = await getAllCategories();

  const paths = [];
  locales.forEach((locale) => {
    categories.forEach((category) => {
      paths.push({
        params: {
          slug: category.slug,
          locale: locale
        }
      });
    });
  });

  return {
    paths,
    fallback: true,
  };
}

CategoryPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CategoryPost;
