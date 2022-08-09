import React, { memo } from 'react';
import Link from "next/link";

type LogoProps = {
  name: string
  blogText: string
};

export const Logo = memo(({ name, blogText }: LogoProps) => {
  return (
    <div className="flex justify-center align-baseline">
      <Link href={"/"}>
        <span className={"cursor-pointer font-bold text-4xl text-white"}>
          { name }
        </span>
      </Link>

      <Link href={"/"}>
        <span className={"cursor-pointer font-thin text-4xl text-white capitalize"}>
          { blogText }
        </span>
      </Link>
      <Link href={"/"}>
        <img
          src="/short_logo.jpg"
          alt={`Blog ${ name }`}
          className={"h-10 cursor-pointer"}
        />
      </Link>
    </div>
  );
});
