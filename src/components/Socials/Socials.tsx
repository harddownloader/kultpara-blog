import React, { useMemo } from 'react';
import Link from "next/link";


export interface SocialNetwork {
  name: string
  icon: string
  link: string
}

export interface SocialsProps {
  socials: Array<SocialNetwork>
}

export const Socials = ({ socials }: SocialsProps) => {
  const socialsEl = useMemo(() => {
    return socials.filter(social => Boolean(social.link)).map((social) => {
      return (
        <Link href={social.link} title={social.name} key={social.link}>
          <span className={"text-white m-1 text-lg cursor-pointer" +
            "              hover:-translate-y-1\n" +
            "              transition\n" +
            "              duration-500\n" +
            "              ease-in-out"}>
            <social.icon />
          </span>
        </Link>
      );
    })
  }, [socials]);

  return (
    <div className={"flex "}>
      { socialsEl }
    </div>
  );
};

export default Socials;