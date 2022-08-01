import React from 'react';
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { PostWidget } from "@/components/PostWidget";
import { Categories } from "@/components/Categories";
import { PostCards } from "@/components/PostCards";

type Props = {
  posts: any
};


export const HomepageBlock = ({ posts }: Props) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          <PostCards posts={posts} />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
      <div className="my-8 mt-12">
        <FeaturedPosts />
      </div>
    </div>
  );
};
