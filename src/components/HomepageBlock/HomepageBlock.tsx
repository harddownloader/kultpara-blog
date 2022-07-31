// @flow
import React from 'react';
import { getPosts } from "../../services";
import {FeaturedPosts} from "../FeaturedPosts";
import {PostCard} from "../PostCard";
import {PostWidget} from "../PostWidget";
import {Categories} from "../Categories";

type Props = {
  posts: any
};



export const HomepageBlock = ({ posts }: Props) => {
  // console.log({posts})
  return (
    <div className="container mx-auto px-10 mb-8">
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};
