import React, {useState, useContext} from 'react';
import { I18nContext } from "next-i18next";
import Router, { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client'
import { languagesVar } from '@/lib/cache';
import { OutsideAlerter } from '@/hooks';

export function LanguageSwitcher({}) {
  const { i18n: { language } } = useContext(I18nContext);
  const languages = useReactiveVar(languagesVar);
  const router = useRouter();
  const [ isDropdown, setIsDropdown ] = useState(false);

  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative h-full">
          <button
            onClick={() => {setIsDropdown(!isDropdown)}}
            className="
              h-full
              dropdown-toggle
              px-6
              py-2
              bg-black
              border-2
              border-white
              text-white
              text-sm
              md:text-base
              font-medium
              leading-tight
              uppercase
              shadow-md
              hover:-translate-y-1
              transition
              duration-500
              ease-in-out
              flex
              items-center
              whitespace-nowrap
            "
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {language}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>
          <OutsideAlerter
            isActive={isDropdown}
            setIsDropdown={setIsDropdown.bind(null, false)}
          >
            <ul
              className={`
                bg-white
                border-2
                border-white
                dropdown-menu
                min-w-full
                absolute
                ${ !isDropdown ? 'hidden' : '' }
                
                text-base
                z-50
                float-left
                
                list-none
                text-left
                
                shadow-lg
                mt-1
                
                m-0
                bg-clip-padding
                border-none
              `}
              aria-labelledby="dropdownMenuButton1"
            >
              {languages.map((lang) => {
                return (
                  <li key={lang}>
                  <span
                    className={`
                      ${lang === language ? 'bg-white text-black' : 'bg-black text-white'}
                      dropdown-item
                      text-sm
                      py-2
                      px-4
                      font-normal
                      block
                      w-full
                      whitespace-nowrap
                      uppercase
                      hover:bg-gray-500
                    `}
                    onClick={() => {
                      Router.push({
                        pathname: router.pathname,
                        query: router.query
                      }, router.asPath, { locale: lang });
                    }}
                  >{lang}</span>
                  </li>
                );
              })}
            </ul>
          </OutsideAlerter>

        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;