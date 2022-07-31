import React, {useEffect, useState} from 'react';
import { Category } from "@/types/Category";
import Link from 'next/link';
import { BLOG_NAME } from "../../lib/const";
import { getCategories } from '../../services';
import { langsVar } from '../../lib/cache';
import { useReactiveVar } from '@apollo/client';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
//
// const cache = new InMemoryCache();
// const client = new ApolloClient({
//   cache,
//   resolvers: { /* ... */ },
// });
//
// cache.writeData({
//   data: {
//     todos: [],
//     visibilityFilter: 'SHOW_ALL',
//     networkStatus: {
//       __typename: 'NetworkStatus',
//       isConnected: false,
//     },
//   },
// });


export function Header({}) {
  const langs = useReactiveVar(langsVar);
  console.log({ langsVar: langs });
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className={`container mx-auto px-10 mb-8`}>
      <div className="w-full py-2 px-8 bg-black border-2 border-white">
        <div className="w-full inline-block py-2 bg-black">
          <span className={"text-white"}>Lang: {langs}</span>
          <button className={"bg-white h-4"} onClick={() => langsVar(langs !== 'UA' ? 'UA' : 'ENG')}>{langs}</button>
          <button onClick={() => setCount(count + 1)}> { count }</button>
        </div>

        <div className="w-full inline-block py-8 bg-black">
          <div className="md:float-left block">
            <Link href={"/"}>
              <span className={"cursor-pointer font-bold text-4xl text-white"}>
                { BLOG_NAME }
              </span>
            </Link>
          </div>
          <div className="hidden md:float-left md:contents">
            {categories.map((category: Category) => {
              return (
                // (url?: { hash?: string }) => ({ pathname: '/[channel]/[locale]/[sitemap]' as const, query: { channel, locale, sitemap }, hash: url?.hash })
                // <Link key={category.slug} href={`/en-US/category/${category.slug}`}>
                <Link key={category.slug} href={`/en-US/category/${category.slug}`}>

                  {/*// <Link key={category.slug} href={{*/}
                  {/*//   pathname: `/[locale]/category/[slug]` as const,*/}
                  {/*//   query: {*/}
                  {/*//     locale: 'en-US',*/}
                  {/*//     slug: category.slug*/}
                  {/*//   }*/}
                  {/*// }}>*/}
                  <span className={'md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'}>
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
