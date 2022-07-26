import React, { useState, memo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";


export interface SearchProps {
  placeholder: string
}

export const Search = memo(({ placeholder }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const searchHandler = () => {
      router.push({
          pathname: '/search',
          query: { search: search }
      })
  }

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          placeholder={placeholder}
          className={"p-2 bg-white text-base text-black"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          aria-label={"search"}
          onClick={() => searchHandler()}
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        ><SearchIcon /></button>
      </div>
    </>
  );
});

export default Search;
