import React, { ReactElement } from 'react';
import { getSearchResults } from "@/services";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { SearchpageBlock, Layout } from "@/components";
import { Posts } from '@/types/Posts';
import {GetServerSideProps} from "next";
import {LocaleEnum} from "@/types/Locale";


export const SearchPage = ({ posts }: Posts) => {

    return (
        <>
            <BaseSeo />
            <div className="py-10">
                <main>
                    <SearchpageBlock posts={posts} />
                </main>
            </div>

        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query , locale } = context;
    const posts = (await getSearchResults(query.search as string, locale as LocaleEnum)) || [];

    return {
        props: {
            posts: posts,
            ...(await serverSideTranslations(locale as string, ['common', 'comments', 'header', 'footer'])),
        },
    }
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SearchPage;
