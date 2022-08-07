import React from 'react';
import { PostCard } from "@/components";
import { Posts } from '@/types/Posts';

export const NewPostsSection = ({ posts }: Posts) => {
  return (
      <>
        <div className="grid grid-col-1 md:grid-cols-2 gap-4">
          {posts.map((post, index) => {
            return (
                <div className={"flex items-center col-span-1"} >
                  <PostCard
                      key={index}
                      post={post.node}
                      isSmall={false}
                      heightFull={true}
                  />
                </div>
            );
          })}
        </div>
      </>
  );
};

export default NewPostsSection;