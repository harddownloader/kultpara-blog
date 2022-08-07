import React from 'react';
import { PostCard } from "@/components";
import { Posts } from '@/types/Posts';

export const NewPostsSection = ({ posts }: Posts) => {
  // const postsTmp = [...posts]; // [1,2,3,4,5,6,7,8,9]
  // const firstRow = postsTmp.splice(0, 3);
  // const secondRow = postsTmp.splice(0, 3);

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

  // return (
  //   <>
  //     <div className={'grid grid-cols-4 grid-rows-1 gap-4'}>
  //       {firstRow.map((post, index) => {
  //         const isSmall = Boolean(index !== 0);
  //
  //         return (
  //           <div className={`bg-green-300 flex items-center ${isSmall ? 'col-span-2' : ' row-span-2 col-span-2'}`}>
  //             <PostCard key={index} post={post.node} isSmall={isSmall} />
  //           </div>
  //         );
  //       })}
  //     </div>
  //
  //     <div className={'grid grid-cols-3 grid-rows-2 gap-4 my-2'}>
  //       {secondRow.map((post, index) => {
  //         const isSmall = Boolean(index !== secondRow.length - 1);
  //
  //         return (
  //           <div className={`bg-green-400  ${isSmall ? 'col-start-1 col-end-1' : 'col-start-2 col-end-4 row-start-1 row-end-3' }`}>
  //             <PostCard key={index} post={post.node} isSmall={isSmall} />
  //           </div>
  //         )
  //       })}
  //     </div>
  //   </>
  // );

};

export default NewPostsSection;