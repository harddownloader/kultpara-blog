import React, { ReactElement } from 'react';
import { getSearchResults } from "@/services";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { BaseSeo } from "@/components/seo/BaseSeo";
import { SearchpageBlock, Layout } from "@/components";
// import { GetStaticPropsContext } from "next";


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

// export async function getStaticProps(context: GetStaticPropsContext) {
//     const { params , locale } = context
//     console.log('getStaticProps', context )
//     // const posts = (await getSearchResults(params.query)) || [];
//     return {
//         props: {
//             posts: [],
//             ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
//         },
//     };
// }

export async function getServerSideProps(context) {
    const { query , locale } = context
    // console.log('getServerSideProps', context )
    const posts = (await getSearchResults(query.search)) || [];
    // const posts = await getSearchResults(query.search);
    console.log({posts})

    return {
        props: {
            posts: posts,
            ...(await serverSideTranslations(locale, ['common', 'comments', 'header', 'footer'])),
        }, // will be passed to the page component as props
    }
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default SearchPage;