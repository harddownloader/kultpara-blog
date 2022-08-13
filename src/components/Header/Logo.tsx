import React, { memo } from 'react';
import Link from "next/link";
import Image from "next/image";
import short_logo from '../../../public/short_logo.jpg';


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

      <div className="h-10 w-12 relative">
        <Link href={"/"}>
          <a href="pass">
            <Image
              src={short_logo}
              alt={`Blog ${ name }`}
              layout="fill"
              sizes="(min-width: 75em) 3rem,
                (min-width: 48em) 3rem,
                3rem"
              className={"cursor-pointer"}
              placeholder="blur"
            />
          </a>
        </Link>
      </div>
    </div>
  );
});
