import React, { useState } from 'react';
import { BLOG_NAME } from '@/lib/const';

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
      <div className="w-full text-center">
        <p className="p-2">
          ©{ year } { BLOG_NAME }
        </p>
      </div>
    </div>
  );
}
