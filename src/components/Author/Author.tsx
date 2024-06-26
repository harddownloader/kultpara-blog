import React from 'react';
import Image from 'next/image';
import { Author as AuthorType } from '@/types/Posts';

export interface AuthorProps {
  author: AuthorType
}

export const Author = ({ author }: AuthorProps) => (
  <div className="text-center mt-20 mb-8 p-12 relative bg-black bg-opacity-40 border-white border-2">
    <div className="absolute left-0 right-0 -top-14">
      <Image
        unoptimized
        loader={({ src }) => src}
        alt={author.name}
        height={100}
        width={100}
        className="align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
);

export default Author;
