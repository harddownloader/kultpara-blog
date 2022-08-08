import React, { useState } from 'react';
import { useTranslation } from "next-i18next";
import { addSubscriber as addSubscriberReq } from "@/services";


export const Subscribe = () => {
  const [subscribe, setSubscribe] = useState({
    isSubscribed: false,
    email: ''
  });
  const { t } = useTranslation('common');

  const addSubscriber = () => {
    changeSubscribeStatusHandler(true);
    sendEmailHandler()
  }

  const sendEmailHandler = () => {
    if (subscribe?.email) {
      const resAddSubscriber = addSubscriberReq(subscribe.email);
      console.log({resAddSubscriber})
    }
  }

  const subscriberHandler = (e: { target: { name: string; value: string; }; }) => {
    setSubscribe({
      ...subscribe,
      [e.target.name]: e.target.value
    });
  }

  const changeSubscribeStatusHandler = (status: boolean) => {
    setSubscribe({
      ...subscribe,
      isSubscribed: status
    });
  }

  return (
    <>
      <div className="flex justify-center">
        <input
          type="text"
          name="email"
          placeholder={"Email"}
          className={"p-2 bg-white text-base text-black"}
          value={subscribe.email}
          onChange={subscriberHandler}
        />
        <button
          onClick={() => {
            if(!subscribe.isSubscribed) addSubscriber();
          }}
          className={"p-2 bg-black border-2 border-white text-base text-white"}
        >{ t('subscribe') }</button>
      </div>
      {subscribe.isSubscribed && <div className="subscribed_msg m-1 text-center">
        <p className={"text-base text-white"}>{ t('subscribe_success_text') }</p>
      </div>}
    </>
  );
};

export default Subscribe;
