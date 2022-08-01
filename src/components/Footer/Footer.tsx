import React, { useState } from 'react';
import { BLOG_NAME } from '@/lib/const';
import Subscribe from "@/components/Subscribe/Subscribe";

export function Footer({}) {
  const [year] = useState(new Date().getFullYear());

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
        <p className="text-lg capitalize text-center mb-1">receive news:</p>
        <Subscribe />
      </div>
      <div className="w-full text-center">
        <p className="p-2">
          ©{ year } { BLOG_NAME }
        </p>
      </div>
    </div>
  );
}
