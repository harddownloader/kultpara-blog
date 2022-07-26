import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types/Posts';


export interface FeaturedPostCardProps {
  post: Post
}

export const FeaturedPostCard = ({ post }: FeaturedPostCardProps) => (
  <div className="relative h-72">
    <Image
      alt={post.slug}
      layout={'fill'}
      objectFit={'cover'}
      objectPosition={'center'}
      src={post.featuredImage.url}
    />
    <div className="absolute bg-center bg-gradient-to-b opacity-50 from-black-400 via-black-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">
        { moment(post.createdAt).format('MMM DD, YYYY') }
      </p>
      <p className="text-white mb-4 text-shadow font-semibold text-2xl text-center">
        { post.title }
      </p>
      <div className="flex items-center absolute bottom-5 w-full justify-center">
        <Image
          alt={post.author.name}
          height={20}
          width={22}
          className="align-middle drop-shadow-lg rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-white text-shadow ml-2 font-medium">
          { post.author.name }
        </p>
      </div>
    </div>
    <Link href={`/post/${post.slug}`}>
      <span className="cursor-pointer absolute w-full h-full" />
    </Link>
  </div>
);

