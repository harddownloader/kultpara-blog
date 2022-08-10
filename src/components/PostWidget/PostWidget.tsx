import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { getSimilarPosts, getRecentPosts } from '@/services';
import { Post } from "@/types/Posts";
import { LocaleEnum } from '@/types/Locale';


export interface PostWidgetProps {
  categories?: Array<string> // Array with slugs of Category
  slug?: string
}

export const PostWidget = ({ categories=[], slug }: PostWidgetProps) => {
  const { t, i18n: { language } } = useTranslation('common');
  const langEnum: LocaleEnum = language as LocaleEnum;
  const [relatedPosts, setRelatedPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    if (slug && language) {
      getSimilarPosts(categories, slug, langEnum).then((result) => {
        setRelatedPosts(result);
      });
    } else if (language) {
      getRecentPosts(langEnum).then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug, language]);

  return (
    <div className="bg-black border-2 border-white shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-white text-xl mb-8 font-semibold border-b pb-4">
        {slug ? t('related-posts') : t('recent-posts')}
      </h3>

      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              loader={({ src }) => src}
              alt={post.title}
              height="60px"
              width="60px"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="text-white flex-grow ml-4">
            <p className="font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

