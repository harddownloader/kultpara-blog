import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { useTranslation } from "next-i18next";
import { Post } from '@/types/Posts';
import classes from './PostCard.module.scss';


export interface PostCardProps {
  post: Post
  isSmall?: boolean
  heightFull?: boolean
}

export const PostCard = ({ post, isSmall, heightFull }: PostCardProps) => {
  const { t } = useTranslation('common');

  return (
    <div className={`bg-black border-2 border-white shadow-lg p-0 lg:p-8 pb-12 ${heightFull ? 'h-full' : 'mb-8'}`}>
      <div className={`relative overflow-hidden shadow-md ${isSmall ? 'pb-40' : 'pb-80'} mb-6`}>
        <Link href={`/post/${post.slug}`}>
          <a href="pass">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              // width={30}
              // height={35}
              sizes="320 640 750"
              layout="fill"
              className={`object-top absolute w-full object-cover shadow-lg cursor-pointer rounded-t-lg lg:rounded-lg`}
            />
          </a>
        </Link>
      </div>

      <h1
        className={`text-white transition duration-700 text-center cursor-pointer hover:text-fuchsia-500 ${isSmall ? 'text-xl mb-4' : 'text-3xl mb-8'} font-semibold`}
      >
        <Link href={`/post/${post.slug}`}>
          { post.title }
        </Link>
      </h1>
      <div className={`block lg:flex text-center items-center justify-center ${isSmall ? 'mb-4' :'mb-8'} w-full`}>
        <div className={classes.author_image_wrap}>
          <Image
            loader={({ src }) => src}
            alt={post.author.name}
            height={20}
            width={22}
            // layout={'fill'}
            className={classes.author_image}
            src={post.author.photo.url}
          />
          <p className={`inline align-middle text-white ml-2 font-medium ${isSmall ? 'text-sm': 'text-lg'}`}>
            { post.author.name }
          </p>
        </div>
        <div className="font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`${isSmall ? 'h-4 w-4' : 'h-6 w-6'} inline mr-2 text-fuchsia-500`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className={`align-middle ${isSmall ? 'text-sm': 'text-base'}`}>
            { moment(post.createdAt).format('MMM DD, YYYY') }
          </span>
        </div>
      </div>
      <p
        className={`text-center ${isSmall ? 'text-base px-1 mb-4 lg:px-4': 'text-lg px-4 mb-8 lg:px-20'} text-white font-normal`}
      >
        { post.excerpt }
      </p>
      <div className="text-center">
        <Link href={`/post/${post.slug}`}>
          <span
            className={`transition duration-500 ease transform hover:-translate-y-1 inline-block bg-black ${isSmall ? 'text-base px-4 py-2': 'text-lg px-8 py-3'} border-2 border-white font-medium text-white cursor-pointer`}
          >
            { t('more') }
          </span>
        </Link>
      </div>
    </div>
  );
};

