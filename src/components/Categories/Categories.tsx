import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/services';
import { useTranslation } from "next-i18next";
import { Category } from '@/types/Category';


export const Categories = () => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const { t, i18n: { language } } = useTranslation('common');

  useEffect(() => {
    getCategories(language).then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  return (
    <div className="bg-black border-2 border-white shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-white text-xl mb-8 font-semibold border-b pb-4">{t('categories')}</h3>
      {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={`text-white cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>{category.name}</span>
        </Link>
      ))}
    </div>
  );
};

