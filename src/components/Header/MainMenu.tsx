import * as React from 'react';
import Link from "next/link";
import { Category } from "@/types/Category";

type MainMenuProps = {
  categories: Array<Category>
};

export const MainMenu = ({ categories }: MainMenuProps) => {
  return (
    <div className={'flex justify-center'}>
      {categories.map((category: Category) => {
        return (
          <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className={'mt-2 align-middle text-white text-start mr-4 font-semibold cursor-pointer ' +
                'hover:border-b-4 hover:border-white'}>
                {category.name}
              </span>
          </Link>
        );
      })}
    </div>
  );
};