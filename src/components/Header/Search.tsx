import React, { useState } from 'react';
import { getSearchResults } from "@/services";
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          placeholder={"Search..."}
          className={"p-2 bg-white text-base text-black"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => getSearchResults(search)}
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        ><SearchIcon /></button>
      </div>
    </>
  );
};

export default Search;