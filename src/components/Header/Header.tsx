import React, { useEffect, useState, memo } from 'react';
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
import { Logo } from './Logo';


export const Header = memo(({}) => {
  const socials = useReactiveVar(socialsVar);
  const { t, i18n } = useTranslation('common');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (i18n?.language) getCategories(i18n.language).then((newCategories) => {
      setCategories(newCategories);
    });
  }, [i18n?.language]);


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
          <Logo name={BLOG_NAME} blogText={t('blog')} />

          <div className="flex justify-center md:contents"></div>
        </div>

        <div className="w-full py-2 md:py-8 bg-black md:flex md:justify-between">
          <div className="w-full py-2 md:py-0 md:w-auto">
            <MainMenu categories={categories} />
          </div>
          <div className="w-full flex justify-center md:w-auto">
            <Search placeholder={`${t('search')}...`} />
          </div>
        </div>
      </div>
    </div>
  );
});
