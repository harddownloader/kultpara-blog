import Link from "next/link";
import React, {ReactElement} from "react";
import { NotFoundSeo } from "@/components/seo/NotFoundSeo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Layout } from "@/components";
import {GetStaticProps} from "next";


function Custom404() {
  const { t } = useTranslation('common');

  return (
    <>
      <NotFoundSeo />
      <div className="min-h-screen container mx-auto px-10">

        <div className="py-10">
          <header className="mb-4">
            <div className="container px-8 text-white">{ t('page_not_found') }</div>
          </header>
          <main>
            <div className="container px-8">
              <Link href={'/'} className={"text-base px-3 py-2" +
                "              bg-black border-2 border-white text-white" +
                "              cursor-pointer" +
                "              hover:-translate-y-1\n" +
                "              transition\n" +
                "              duration-500\n" +
                "              ease-in-out"}>
                { t('go_back_home') }
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...await serverSideTranslations(locale as string),
    }
  };
}

Custom404.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Custom404;
