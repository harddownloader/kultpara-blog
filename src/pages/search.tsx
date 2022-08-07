import React, { ReactElement } from 'react';
import { getSearchResults } from "@/services";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { SearchpageBlock, Layout } from "@/components";


export const SearchPage = ({ posts }) => {

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

export async function getServerSideProps(context) {
    const { query , locale } = context
    const posts = (await getSearchResults(query.search)) || [];

    return {
        props: {
            posts: posts,
            ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
        },
    }
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SearchPage;