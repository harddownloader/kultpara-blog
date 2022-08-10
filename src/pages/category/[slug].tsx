import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllCategories, getCategoryPost } from '@/services';
import { PostCard, Categories, Loader, Layout } from '@/components';
import { useTranslation } from "next-i18next";
import { Posts } from '@/types/Posts';
import { PathType } from "@/types/Pathes";
import { Category } from "@/types/Category";


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

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const posts = (params?.slug && typeof params.slug === 'string') ? await getCategoryPost(params.slug) : [];

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale as string, ['common', 'comments', 'header', 'footer'])),
    },
  };
}


export const getStaticPaths: GetStaticPaths = async (context) => {
  const { locales } = context;
  const languages: Array<string> = locales || [];
  const categories: Array<Category> = await getAllCategories();

  const paths: Array<PathType> = [];
  languages.forEach((locale) => {
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
