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
              <span
                className={'mt-2 mr-4 pb-4 align-middle text-white text-start font-semibold cursor-pointer ' +
                'hover:border-b-4 hover:border-white' +
                  'md:pb-0'}
              >
                {category.name}
              </span>
          </Link>
        );
      })}
    </div>
  );
};