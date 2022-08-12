import React from 'react';
import moment from 'moment';
import { PostDetails } from '@/types/Posts';
import Image from 'next/image';

export interface PostDetailProps {
  post: PostDetails
}

const getContentFragment = (index: number, text: any, obj: any, type: string="") => {
  let modifiedText: any = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = (<b key={index}>{text}</b>);
    }

    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }

    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
  }

  switch (type) {
    case 'heading-three':
      return (<h3 key={index} className="text-xl font-semibold mb-4">
                {modifiedText.map((item: any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}
              </h3>);
    case 'paragraph':
      return (<p key={index} className="mb-8">
                {modifiedText.map((item: any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}
              </p>);
    case 'heading-four':
      return (<h4 key={index} className="text-md font-semibold mb-4">
                {modifiedText.map((item: any, i: number) => <React.Fragment key={i}>{item}</React.Fragment>)}
              </h4>);
    case 'image':
      return (
        <Image
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      );
    default:
      return modifiedText;
  }
};


export const PostDetail = ({ post }: PostDetailProps) => {
  return (
    <>
      <div className="bg-black border-2 border-white shadow-lg lg:p-8 pb-12 mb-8">
        <div className="relative h-80 md:h-96 overflow-hidden shadow-md mb-6">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            layout='fill'
            className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <Image
                alt={post.author.name}
                height={30}
                width={30}
                className="align-middle rounded-full"
                src={post.author.photo.url}
              />
              <p className="inline align-middle text-white ml-2 font-medium text-lg">
                {post.author.name}
              </p>
            </div>
            <div className="font-medium text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 inline mr-2 text-pink-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                { moment(post.createdAt).format('MMM DD, YYYY') }
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-white text-3xl font-semibold">
            { post.title }
          </h1>
          <div className="content-wrap text-white">
            {post.content.raw.children.map((typeObj: any, index: number) => {
              const children = typeObj.children.map((item: any, itemIndex: number) => getContentFragment(itemIndex, item.text, item));

              return getContentFragment(index, children, typeObj, typeObj.type);
            })}
          </div>
        </div>
      </div>
    </>
  );
};

