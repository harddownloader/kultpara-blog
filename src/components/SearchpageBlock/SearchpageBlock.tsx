import React from 'react';
import { PostCards } from "@/components/PostCards";
import { Categories, PostWidget } from "@/components";
import { FeaturedPosts } from "@/components/FeaturedPosts";
import { Posts } from '@/types/Posts';
import { useTranslation } from "next-i18next";


export const SearchpageBlock = ({ posts }: Posts) => {
    const { t } = useTranslation('common');

    return (
        <div className="container mx-auto px-10 mb-8">
            <h1 className={"text-white text-4xl mb-4"}>{ t('search_results') }</h1>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                <div className="lg:col-span-8 col-span-1">
                    { posts?.length
                        ? <PostCards posts={posts} />
                        : <p className={"text-white text-lg"}>{ t('search_no_results') }</p>
                    }
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
            <div className="my-8 mt-12">
                <FeaturedPosts />
            </div>
        </div>
    );
};

export default SearchpageBlock;
