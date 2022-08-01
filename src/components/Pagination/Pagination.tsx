import React from 'react';

export interface PaginationProps {
  currentPage: number
  pages: Array<number>
  changePageHandler(page: number): void
}

export const Pagination = ({
  currentPage,
  pages,
  changePageHandler,
}: PaginationProps) => {
  return (
    <div className={"pagination-wrap flex justify-center"}>
      {pages.map((page) => {
        return (
          <button
            key={page}
            onClick={() => changePageHandler(page)}
            className={`
              ${currentPage === page ? 'bg-white border-black text-black' : 'bg-black border-white text-white'}
              border-2
              cursor-pointer
              hover:bg-white
              hover:border-black
              hover:text-black
              transition duration-300
              px-3
              py-2
            `}
          >{ page + 1 }</button>
        );
      })}
    </div>
  );
};

export default Pagination;