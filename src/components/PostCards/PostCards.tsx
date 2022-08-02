import React, { useMemo, useState } from 'react';
import { PostCard } from "@/components";
import { Pagination } from '@/components/Pagination';

type Props = {

};

export function PostCards({ posts }: Props) {
  const [page, setPage] = useState(0);
  const countPostsPerPage = 2;
  const postsLength = posts.length;
  const countPages = useMemo(() => postsLength / countPostsPerPage, [posts, postsLength, countPostsPerPage]);

  const postsPerPage = useMemo(() => {
    const postsTmp = [...posts];
    return postsTmp.splice(countPostsPerPage * page, countPostsPerPage);
  }, [page, posts, countPostsPerPage]);

  const pages = useMemo(() => Array.from({length: countPages}).fill(null).map((_, i) => i), [countPages]);
  // const pages = Array.from({length: countPages}).fill(null).map((_, i) => i);

  const MemoPagination = React.memo(Pagination);

  return (
    <>
      {postsPerPage.map((post, index) => (
        <PostCard key={index} post={post.node} />
      ))}

      <MemoPagination
        currentPage={page}
        pages={pages}
        changePageHandler={setPage}
      />
    </>
  );
};

export default PostCards;