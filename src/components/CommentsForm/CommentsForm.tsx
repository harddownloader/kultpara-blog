import React, { useState, useEffect } from 'react';
import { submitComment } from '@/services';
import { useTranslation } from "next-i18next";
import { Comment } from '@/types/Comment';

export const CommentsForm = ({ slug }) => {
  const { t } = useTranslation('comments');
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    comment: null,
    storeData: false
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const {target} = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    const commentObj: Comment = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
        }
      });
  };


  return (
    <div className="bg-black border-2 border-white shadow-lg p-8 pb-12 mb-8">
      <h3 className="text-xl text-white mb-8 font-semibold border-b pb-4">{t('leave-a-reply')}</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment || ""} onChange={onInputChange}
                  className="p-4 outline-none w-full  h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                  name="comment" placeholder={t('comment')}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name || ""} onChange={onInputChange}
               className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder={t('name')} name="name"/>
        <input type="email" value={formData.email || ""} onChange={onInputChange}
               className="py-2 px-4 outline-none w-full focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
               placeholder={t('email')} name="email"/>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData"
                 value="true"/>
          <label className="text-gray-100 cursor-pointer ml-2" htmlFor="storeData">{t('save_comment_data')}</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">{t('validation_warn')}</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission}
                className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-black text-lg border-2 border-white font-medium text-white px-8 py-3 cursor-pointer">
          {t('send')}
        </button>
        {showSuccessMessage &&
            <span className="text-xl float-right font-semibold mt-3 text-green-500">{t('submitting_for_moderation')}</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
