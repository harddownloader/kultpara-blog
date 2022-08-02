import React, { useState } from 'react';
import {useTranslation} from "next-i18next";

export const Subscribe = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { t } = useTranslation('common');

  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          name="subscribe"
          placeholder={"Email"}
          className={"p-2 bg-white text-base text-black"}
        />
        <button
          onClick={() => {
            if(!isSubscribed) setIsSubscribed(true);
          }}
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        >{ t('subscribe') }</button>
      </div>
      {isSubscribed && <div className="subscribed_msg m-1 text-center">
        <p className={"text-base text-white"}>{ t('subscribe_success_text') }</p>
      </div>}
    </>
  );
};

export default Subscribe;