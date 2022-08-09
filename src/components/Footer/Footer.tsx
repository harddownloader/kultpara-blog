import React, { useState, memo } from 'react';
import { BLOG_NAME } from '@/lib/const';
import { Subscribe } from "@/components/Subscribe";
import { Socials } from "@/components/Socials";
import { useReactiveVar } from "@apollo/client";
import { socialsVar } from "@/lib/cache";
import { useTranslation } from "next-i18next";


export const Footer = memo(({}) => {
  const socials = useReactiveVar(socialsVar);
  const [year] = useState(new Date().getFullYear());
  const { t } = useTranslation('common');

  return (
    <div className={"container mx-auto px-10" +
      "              bg-black\n" +
      "              border-2\n" +
      "              border-white" +
      "              text-white\n" +
      "              text-base\n" +
      "              font-medium"}
    >
      <div className="w-full my-4">
        <p className="text-lg capitalize text-center mb-1">{t('receive_news')}:</p>
        <Subscribe />
      </div>
      <div className="w-full flex justify-center">
        <Socials socials={socials} />
      </div>
      <div className="w-full text-center">
        <p className="p-2">
          ©{ year } { BLOG_NAME }
        </p>
      </div>
    </div>
  );
});
