import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
  AdjacentPosts,
  Layout
} from '@/components';
import { getAllPosts, getPostDetails } from '@/services';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PostDetails, PostWrap } from '@/types/Posts';
import {PathType} from "@/types/Pathes";


export interface PostDetailsPageProps {
  post: PostDetails
}

const PostDetails = ({ post }: PostDetailsPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


// Fetch data at build time
export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  // @ts-ignore
  const postDetails = params?.slug ? await getPostDetails(params.slug) : null;

  return {
    props: {
      post: postDetails,
      // @ts-ignore
      ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { locales } = context;
  const languages: Array<string> = locales || [];
  const posts: Array<PostWrap> = await getAllPosts();

  const paths: Array<PathType> = [];
  languages.forEach((locale) => {
    posts.forEach((post) => {
      paths.push({
        params: {
          slug: post.node.slug,
          locale: locale
        }
      });
    });
  });

  return {
    // paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    paths,
    fallback: true,
  };
}

// @ts-ignore
PostDetails.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PostDetails;
