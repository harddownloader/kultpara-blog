import React from 'react';
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { NewPostsSection } from './NewPostsSection';
import { Posts } from '@/types/Posts';


export const HomepageBlock = ({ posts }: Posts) => {
  return (
    <div className="container mx-auto mb-8 px-4 md:px-10">
      <NewPostsSection posts={posts}/>
      <div className="my-8 mt-12">
        <FeaturedPosts />
      </div>
    </div>
  );
};
