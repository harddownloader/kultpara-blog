import React, { useState, useEffect } from 'react';
import { AdjacentPostCard } from '@/components';
import { getAdjacentPosts } from '@/services';
import { useTranslation } from "next-i18next";
import { Post } from '@/types/Posts';


export interface AdjacentPostType {
  previous: Post | null
  next: Post | null
}

export interface AdjacentPostsProps {
  createdAt: string
  slug: string
}

export const AdjacentPosts = ({ createdAt, slug }: AdjacentPostsProps) => {
  const { i18n: { language } } = useTranslation('common');
  const [adjacentPost, setAdjacentPost] = useState<AdjacentPostType | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentPosts(createdAt, slug, language).then((result) => {
      setAdjacentPost(result);
      setDataLoaded(true);
    });
  }, [slug]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
      {dataLoaded && (
        <>
          {adjacentPost?.previous && (
            <div className={`${adjacentPost.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPost.previous} position="LEFT" />
            </div>
          )}
          {adjacentPost?.next && (
            <div className={`${adjacentPost.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-72`}>
              <AdjacentPostCard post={adjacentPost.next} position="RIGHT" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

