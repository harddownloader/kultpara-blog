import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const { t } = useTranslation('common');

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
          placeholder={`${t('search')}...`}
          className={"p-2 bg-white text-base text-black"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => searchHandler()}
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        ><SearchIcon /></button>
      </div>
    </>
  );
};

export default Search;