import React, { memo } from 'react';
import { PostCard } from "@/components";
import { Post, Posts } from '@/types/Posts';
import { useTranslation } from "next-i18next";


export const NewPostsSection = memo(({ posts }: Posts) => {
  const { t } = useTranslation('common');

  return (
    <>
      <div className="grid grid-col-1 md:grid-cols-2 gap-4">
        { posts?.length
          ? posts.map((post: { node: Post }, index: number) => {
              return (
                <div
                  key={index}
                  className={"flex items-center col-span-1"}
                >
                  <PostCard
                    key={index}
                    post={post.node}
                    isSmall={false}
                    heightFull={true}
                  />
                </div>
              );
            })
        : <p className={"text-white text-base"}>{ t('no_posts') }</p>}
      </div>
    </>
  );
});

export default NewPostsSection;
