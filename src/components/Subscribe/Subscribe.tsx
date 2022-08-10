import React, { useState, memo } from 'react';
import { useTranslation } from "next-i18next";
import { addSubscriber as addSubscriberReq } from "@/services";
import { useForm, Resolver  } from "react-hook-form";


type FormValues = {
  email: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
        email: {
          type: 'required',
          message: '... some error msg ...',
        },
      }
      : {},
  };
};

export const Subscribe = memo(() => {
  const { t } = useTranslation('common');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({ resolver });

  const onSubmit = async (data: { email: string }) => {
    if(!isSubscribed) addSubscriber(data.email);
  };

  const addSubscriber = (email: string) => {
    handleSubmit(onSubmit);
    setIsSubscribed(true);
    sendEmailHandler(email);
    reset();
  }

  const sendEmailHandler = (email: string) => {
    const resAddSubscriber = addSubscriberReq(email);
  }


  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="email"
            className={"p-2 bg-white text-base text-black"}
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('subscribe_error_text')
              }
            })}
            type="email"
            placeholder={"Email"}
          />
          <button
            type="submit"
            className={"p-2 bg-black border-2 border-white text-base text-white"}
          >{ t('subscribe') }</button>
        </form>
      </div>
      {errors.email && <div className="subscribed_msg m-1 text-center">
        <p className={"text-base text-white"}>{ errors.email.message }</p>
      </div>}
      {isSubscribed && <div className="subscribed_msg m-1 text-center">
        <p className={"text-base text-white"}>{ t('subscribe_success_text') }</p>
      </div>}
    </>
  );
});

export default Subscribe;
