import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FeaturedPostCard } from '@/components/FeaturedPostCard';
import { getFeaturedPosts } from '@/services';
import { useTranslation } from "next-i18next";
import { LocaleEnum } from "@/types/Locale";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const { i18n: { language } } = useTranslation('common');
  const langEnum: LocaleEnum = language as LocaleEnum;

  useEffect(() => {
    if (language) getFeaturedPosts(langEnum).then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, [language]);


  // type should be 'right' or 'left'
  const Arrow = ({ type, onClick }: { type: string, onClick: any }) => {
    return (
      <>
        <div
          className={`absolute arrow-btn ${type}-0 flex justify-center py-3 cursor-pointer bg-black border-2 border-white rounded-full`}
          onClick={onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-white w-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={type === 'right' ? 'M14 5l7 7m0 0l-7 7m7-7H3' : 'M10 19l-7-7m0 0l7-7m-7 7h18'}
            />
          </svg>
        </div>
      </>
    );
  }


  const CustomLeftArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <Arrow type={"left"} onClick={() => onClick()} />;
  };

  const CustomRightArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType }
    } = rest;
    // onMove means if dragging or swiping in progress.
    return <Arrow type={"right"} onClick={() => onClick()} />;
  };


  return (
    <div className="mb-8 block">
      <Carousel
        infinite
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        responsive={responsive}
        itemClass="px-4"
      >
        {dataLoaded && featuredPosts.map((post, index) => (
          <FeaturedPostCard key={index} post={post} />
        ))}
      </Carousel>
    </div>
  );
};

