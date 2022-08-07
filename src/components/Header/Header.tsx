import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BLOG_NAME, MAIN_WEBSITE } from "@/lib/const";
import { getCategories } from '@/services';
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import Socials from "@/components/Socials/Socials";
import { MainMenu } from './MainMenu';
import { Search } from './Search';
import { socialsVar } from '@/lib/cache';
import { useReactiveVar } from "@apollo/client";
// import short_logo from './../../../public/short_logo.jpg';

export function Header({}) {
  const socials = useReactiveVar(socialsVar);
  const { t } = useTranslation('common');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className={`mb-8 md:container md:mx-auto md:px-10`}>
      <div className="w-full py-4 px-2 bg-black border-2 border-white md:py-2 md:px-8">
        <div className="w-full md:py-2 bg-black md:flex md:justify-between">
          <div className={"flex justify-center"}>
            <LanguageSwitcher />
          </div>

          <div className="flex justify-center my-4 md:my-0">
            <Socials socials={socials} />
          </div>
        </div>

        <div className="w-full flex justify-center my-1 md:justify-between md:my-8 bg-black">
          <div className="flex justify-center align-baseline">
            <Link href={"/"}>
              <span className={"cursor-pointer font-bold text-4xl text-white"}>
                { BLOG_NAME }
              </span>
            </Link>

            <Link href={"/"}>
              <span className={"cursor-pointer font-thin text-4xl text-white capitalize"}>
                { t('blog') }
              </span>
            </Link>
            <Link href={"/"}>
              <img
                src="/short_logo.jpg"
                alt={`Blog ${BLOG_NAME}`}
                className={"h-10"}
              />
            </Link>
          </div>

          <div className="flex justify-center md:contents"></div>
        </div>

        <div className="w-full py-2 md:py-8 bg-black md:flex md:justify-between">
          <div className="w-full py-2 md:py-0 md:w-auto">
            <MainMenu categories={categories} />
          </div>
          <div className="w-full flex justify-center md:w-auto">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
